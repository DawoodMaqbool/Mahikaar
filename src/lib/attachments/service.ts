import { randomUUID } from 'node:crypto';
import { AttachmentError, DAY, LINK_LIFETIME, RETENTION, UPLOAD_LIFETIME, MIME_EXTENSIONS, validateManifest, validId } from './policy';
import { hash, readCapability, signCapability } from './security';
import { validateContent } from './content';
import type { AttachmentStore, Scan, StoredSession, UploadSession, AttachmentFile } from './types';
export type AttachmentReference = { sessionId: string; fileIds: string[] };
export function parseReference(value: unknown): AttachmentReference {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).sort().join(',') !== 'fileIds,sessionId') throw new AttachmentError('Invalid attachment references.');
  const ref = value as AttachmentReference;
  if (!validId(ref.sessionId) || !Array.isArray(ref.fileIds) || !ref.fileIds.length || ref.fileIds.length > 5 || ref.fileIds.some(id => !validId(id)) || new Set(ref.fileIds).size !== ref.fileIds.length) throw new AttachmentError('Invalid or duplicated attachment references.');
  return ref;
}
function inspectSession(stored: StoredSession, id: string) {
  const session = stored.value;
  if (session.version !== 1 || session.id !== id || !Array.isArray(session.files) || !session.files.length || session.files.length > 5) throw new AttachmentError('Attachment session is invalid.', 503);
  validateManifest(session.files.map(file => ({ name: file.name, size: file.size, contentType: file.contentType })));
  const ids = new Set<string>();
  for (const file of session.files) {
    if (!validId(file.id) || ids.has(file.id) || file.uploadPath !== `attachments/v2/quarantine/${id}/${file.id}.${MIME_EXTENSIONS[file.contentType]}` || file.cleanPath !== `attachments/v2/verified/${id}/${file.id}.${MIME_EXTENSIONS[file.contentType]}`) throw new AttachmentError('Invalid attachment storage scope.', 503);
    ids.add(file.id);
  }
  return stored;
}
export class AttachmentService {
  constructor(public store: AttachmentStore, private scan: Scan, private now: () => number = Date.now) {}
  async load(id: string) {
    if (!validId(id)) throw new AttachmentError('Invalid attachment session.');
    const stored = await this.store.load(id);
    if (!stored) throw new AttachmentError('Attachment session expired. Please select your files again.', 410);
    return inspectSession(stored, id);
  }
  async owned(id: string, ownerHash: string) {
    const stored = await this.load(id);
    if (stored.value.ownerHash !== ownerHash) throw new AttachmentError('Attachment session access denied.', 403);
    if (stored.value.state === 'deleting' || (stored.value.state !== 'accepted' && stored.value.expiresAt <= this.now())) throw new AttachmentError('Attachment session expired. Please select your files again.', 410);
    return stored;
  }
  async create(input: unknown, ownerHash: string) {
    const descriptions = validateManifest(input); const id = randomUUID(); const createdAt = this.now();
    const session: UploadSession = { version: 1, id, ownerHash, createdAt, expiresAt: createdAt + UPLOAD_LIFETIME, state: 'open', files: descriptions.map(description => {
      const fileId = randomUUID(); const extension = MIME_EXTENSIONS[description.contentType];
      return { ...description, id: fileId, uploadPath: `attachments/v2/quarantine/${id}/${fileId}.${extension}`, cleanPath: `attachments/v2/verified/${id}/${fileId}.${extension}`, status: 'pending' };
    }) };
    await this.store.create(session); return this.publicStatus(session);
  }
  publicStatus(session: UploadSession) {
    return { sessionId: session.id, expiresAt: session.expiresAt, files: session.files.map(file => ({ id: file.id, name: file.name, size: file.size, contentType: file.contentType, status: file.status })) };
  }
  async upload(id: string, fileId: unknown, owner: string) {
    const { value } = await this.owned(id, owner);
    if (value.state !== 'open' || value.scanLease?.until && value.scanLease.until > this.now()) throw new AttachmentError('Files are being checked or submitted. Please wait.', 409);
    const file = value.files.find(file => file.id === fileId);
    if (!file || file.status === 'rejected') throw new AttachmentError('File is not authorized for this session.', 403);
    const stored = await this.store.metadata(file.uploadPath);
    if (stored) { this.checkMetadata(file, stored); return { uploaded: true as const }; }
    if (file.status === 'ready') throw new AttachmentError('The verified upload is unavailable.', 409);
    return { uploaded: false as const, file, expiresAt: value.expiresAt };
  }
  private checkMetadata(file: AttachmentFile, stored: { size: number; contentType: string; pathname: string }, clean = false) {
    if (stored.size !== file.size || stored.contentType !== file.contentType || stored.pathname !== (clean ? file.cleanPath : file.uploadPath)) throw new AttachmentError('The stored file does not match its authorized size, type or path.');
  }
  async verify(id: string, fileId: unknown, owner: string) {
    const stored = await this.owned(id, owner); const session = stored.value;
    if (session.state !== 'open') throw new AttachmentError('This file set is already linked to an enquiry.', 409);
    const file = session.files.find(file => file.id === fileId);
    if (!file) throw new AttachmentError('File does not belong to this session.', 403);
    if (file.status === 'ready') { await this.checkVerified(file); return this.publicStatus(session); }
    if (file.status === 'rejected') throw new AttachmentError('This file did not pass safety checks. Please replace it.', 422);
    if (session.scanLease && session.scanLease.until > this.now()) throw new AttachmentError('File checks are already in progress. Please wait and retry.', 409);
    const lease = randomUUID(); session.scanLease = { id: lease, until: this.now() + 120_000 };
    await this.store.save(session, stored.etag);
    try {
      const object = await this.store.read(file.uploadPath, file.size);
      this.checkMetadata(file, object); validateContent(object.bytes, file.contentType);
      const verdict = await this.scan(object.bytes, file.contentType);
      if (!verdict.id || verdict.digest !== hash(object.bytes)) throw new AttachmentError('The scan could not be bound to this file.', 503);
      const current = await this.owned(id, owner);
      if (current.value.scanLease?.id !== lease || current.value.state !== 'open' || current.value.scanLease.until <= this.now()) throw new AttachmentError('File-check authorization expired. Please retry.', 409);
      // Publish only the exact scanned bytes to a path that browser grants can never write.
      let clean = await this.store.metadata(file.cleanPath);
      if (clean) {
        const existing = await this.store.read(file.cleanPath, file.size);
        if (hash(existing.bytes) !== verdict.digest) throw new AttachmentError('Verified file conflict.', 409);
        clean = existing;
      } else clean = await this.store.putFile(file.cleanPath, object.bytes, file.contentType);
      this.checkMetadata(file, clean, true);
      const target = current.value.files.find(item => item.id === file.id)!;
      target.status = 'ready'; target.verified = { etag: clean.etag, digest: verdict.digest, scanId: verdict.id, scannedAt: this.now() };
      delete current.value.scanLease;
      await this.store.save(current.value, current.etag);
      return this.publicStatus(current.value);
    } catch (error) {
      const current = await this.load(id);
      if (current.value.scanLease?.id === lease && current.value.state === 'open') {
        delete current.value.scanLease;
        const target = current.value.files.find(item => item.id === file.id)!;
        const rejected = error instanceof AttachmentError && [400,422].includes(error.status);
        if (rejected) { target.status = 'rejected'; delete target.verified; }
        await this.store.save(current.value, current.etag);
        if (rejected) {
          // Failures remain marked rejected even if deletion needs a cleanup retry.
          try { await this.store.deleteFile(target.uploadPath); await this.store.deleteFile(target.cleanPath); } catch { console.error('attachment_rejection_cleanup_failed'); }
        }
      }
      throw error;
    }
  }
  async checkVerified(file: AttachmentFile) {
    if (file.status !== 'ready' || !file.verified || !/^[0-9a-f]{64}$/.test(file.verified.digest) || !file.verified.scanId) throw new AttachmentError('All attachments must complete safety checks before submission.', 409);
    const object = await this.store.metadata(file.cleanPath);
    if (!object) throw new AttachmentError('A verified attachment is missing. Please retry.', 409);
    this.checkMetadata(file, object, true);
    if (object.etag !== file.verified.etag) throw new AttachmentError('A file changed after scanning and cannot be released.', 409);
  }
  async claim(reference: unknown, owner: string, submissionId: string, digest: string) {
    const ref = parseReference(reference); const stored = await this.owned(ref.sessionId, owner); const session = stored.value;
    if (ref.fileIds.length !== session.files.length || ref.fileIds.some(id => !session.files.some(file => file.id === id))) throw new AttachmentError('Attachment references do not match this session.', 403);
    if (session.submission && (session.submission.id !== submissionId || session.submission.digest !== digest)) throw new AttachmentError('These files are bound to a previous submission. Retry that enquiry, or remove and reselect the files for a new enquiry.', 409);
    if (session.state === 'accepted') return { session, alreadyAccepted: true };
    if (session.scanLease?.until && session.scanLease.until > this.now()) throw new AttachmentError('Attachment checks are still in progress.', 409);
    if (session.submission?.leaseUntil && session.submission.leaseUntil > this.now()) throw new AttachmentError('This enquiry is being submitted. Please wait before retrying.', 409);
    if (session.submission && this.now() - session.submission.firstAttempt >= DAY) throw new AttachmentError('The safe retry window expired. Please contact our team before resubmitting.', 409);
    await Promise.all(session.files.map(file => this.checkVerified(file)));
    session.state = 'sending';
    session.submission ??= { id: submissionId, digest, firstAttempt: this.now(), leaseUntil: 0, accessExpires: this.now() + LINK_LIFETIME, retainUntil: this.now() + RETENTION };
    session.submission.leaseUntil = this.now() + 90_000;
    await this.store.save(session, stored.etag);
    return { session, alreadyAccepted: false };
  }
  async finish(id: string, submissionId: string, providerId?: string) {
    const stored = await this.load(id); const session = stored.value;
    if (session.state === 'deleting' || session.submission?.id !== submissionId) throw new AttachmentError('Attachment submission state changed.', 409);
    if (session.state === 'accepted') return;
    if (providerId) { session.state = 'accepted'; session.submission.providerId = providerId; session.submission.retainUntil = this.now() + RETENTION; }
    session.submission.leaseUntil = 0;
    await this.store.save(session, stored.etag);
  }
  businessLink(session: UploadSession, env: NodeJS.ProcessEnv) {
    if (!session.submission) throw new AttachmentError('Enquiry access is unavailable.', 409);
    const token = signCapability({ kind: 'download', sessionId: session.id, submissionId: session.submission.id, exp: session.submission.accessExpires }, env);
    return env.ATTACHMENT_BASE_URL + '/enquiry-files#access=' + token;
  }
  async downloadAccess(token: unknown, fileId: unknown, env: NodeJS.ProcessEnv) {
    const claims = readCapability(token, 'download', env, this.now());
    if (!validId(claims.sessionId)) throw new AttachmentError('Invalid file access.', 403);
    const { value: session } = await this.load(claims.sessionId);
    if (session.state !== 'accepted' || !session.submission || session.submission.id !== claims.submissionId || session.submission.accessExpires !== claims.exp || session.submission.retainUntil <= this.now()) throw new AttachmentError('File access expired or is unavailable.', 403);
    if (fileId === undefined) return { session, files: session.files.map(file => ({ id: file.id, name: file.name, size: file.size })) };
    const file = session.files.find(file => file.id === fileId);
    if (!file) throw new AttachmentError('File access denied.', 403);
    await this.checkVerified(file);
    return { session, file };
  }
  async cleanup() {
    const checkpoint = await this.store.checkpoint();
    if (checkpoint.leaseUntil > this.now()) throw new AttachmentError('Cleanup is already in progress.', 409);
    await this.store.saveCheckpoint({ cursor: checkpoint.cursor, orphanCursor: checkpoint.orphanCursor, leaseUntil: this.now() + 180_000 }, checkpoint.etag);
    let removed = 0; let failed = 0; let cursor = checkpoint.cursor; let orphanCursor = checkpoint.orphanCursor;
    try {
      const page = await this.store.sessions(cursor); cursor = page.cursor;
      for (const id of page.ids) {
        try {
          const stored = await this.load(id); const session = stored.value;
          if ((session.submission?.leaseUntil ?? 0) > this.now() || (session.scanLease?.until ?? 0) > this.now()) continue;
          const deadline = session.submission ? session.submission.retainUntil : session.createdAt + DAY;
          if (session.state !== 'deleting' && !session.files.some(file => file.status === 'rejected') && deadline > this.now()) continue;
          if (session.state !== 'deleting') { session.state = 'deleting'; await this.store.save(session, stored.etag); }
          for (const file of session.files) { await this.store.deleteFile(file.uploadPath); await this.store.deleteFile(file.cleanPath); }
          const deleting = await this.load(id); await this.store.removeSession(id, deleting.etag); removed++;
        } catch { failed++; }
      }
      // Reconcile late upload completions and objects left after a worker interruption.
      const orphans = await this.store.orphanObjects(orphanCursor); orphanCursor = orphans.cursor;
      for (const object of orphans.objects) {
        const match = /^attachments\/v2\/(quarantine|verified)\/([0-9a-f-]{36})\/([0-9a-f-]{36})\.(pdf|png)$/.exec(object.pathname);
        if (!match || !validId(match[2]) || !validId(match[3]) || object.uploadedAt + DAY > this.now()) continue;
        try {
          const manifest = await this.store.load(match[2]);
          if (!manifest) { await this.store.deleteFile(object.pathname); removed++; }
        } catch { failed++; }
      }
    } catch { failed++; }
    finally {
      const current = await this.store.checkpoint();
      await this.store.saveCheckpoint({ cursor, orphanCursor, leaseUntil: 0 }, current.etag);
    }
    if (failed) console.error('attachment_cleanup_failed', { count: failed });
    return { removed, failed, hasMore: !!cursor || !!orphanCursor };
  }
}
