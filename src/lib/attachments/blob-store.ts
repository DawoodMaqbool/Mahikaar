import { getVercelOidcToken } from '@vercel/oidc';
import { get, head, put, del, list, issueSignedToken, presignUrl, getDownloadUrl } from '@vercel/blob';
import { AttachmentError, validId } from './policy';
import { configuredStorage } from './security';
import type { AttachmentStore, ObjectContents, UploadSession } from './types';
const PREFIX = 'attachments/v2/';
const sessionPath = (id: string) => { if (!validId(id)) throw new AttachmentError('Invalid attachment session.'); return `${PREFIX}sessions/${id}.json`; };
const checkpointPath = PREFIX + 'maintenance/cleanup.json';
async function auth(env: NodeJS.ProcessEnv, oidc = getVercelOidcToken) {
  if (!configuredStorage(env)) throw new AttachmentError('Private attachment storage is unavailable.', 503);
  let token: string;
  try { token = await oidc(); } catch { throw new AttachmentError('Private storage authentication is unavailable.', 503); }
  if (!token) throw new AttachmentError('Private storage authentication is unavailable.', 503);
  return { storeId: env.BLOB_STORE_ID!, oidcToken: token, abortSignal: AbortSignal.timeout(20_000) };
}
function conflict(error: unknown): never {
  if (error instanceof Error && /precondition|already exists|conflict/i.test(error.message)) throw new AttachmentError('Another attachment request is in progress. Please retry.', 409);
  throw new AttachmentError('Private attachment storage is temporarily unavailable. Please retry.', 503);
}
async function readObject(path: string, maxBytes: number, env: NodeJS.ProcessEnv): Promise<ObjectContents> {
  const result = await get(path, { ...await auth(env), access: 'private', useCache: false });
  if (!result || result.statusCode !== 200) throw new AttachmentError('Attachment not found.', 404);
  if (result.blob.pathname !== path || result.blob.size > maxBytes) { await result.stream.cancel(); throw new AttachmentError('Invalid stored attachment size.'); }
  const reader = result.stream.getReader(); const chunks: Uint8Array[] = []; let size = 0;
  while (true) { const part = await reader.read(); if (part.done) break; size += part.value.byteLength; if (size > maxBytes) { await reader.cancel(); throw new AttachmentError('Stored attachment exceeds its limit.'); } chunks.push(part.value); }
  if (size !== result.blob.size) throw new AttachmentError('The stored attachment is incomplete. Please retry.', 409);
  return { bytes: Buffer.concat(chunks), pathname: path, size, etag: result.blob.etag, contentType: result.blob.contentType };
}
async function loadJson(path: string, env: NodeJS.ProcessEnv) {
  try { const object = await readObject(path, 65536, env); return { value: JSON.parse(object.bytes.toString()), etag: object.etag }; }
  catch (error) { if (error instanceof AttachmentError && error.status === 404) return null; throw error; }
}
export function blobStore(env: NodeJS.ProcessEnv): AttachmentStore {
  return {
    async load(id) { return loadJson(sessionPath(id), env); },
    async create(value) { try { await put(sessionPath(value.id), JSON.stringify(value), { ...await auth(env), access: 'private', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: false }); } catch (error) { conflict(error); } },
    async save(value, etag) { try { await put(sessionPath(value.id), JSON.stringify(value), { ...await auth(env), access: 'private', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true, ifMatch: etag }); } catch (error) { conflict(error); } },
    async removeSession(id, etag) { await del(sessionPath(id), { ...await auth(env), ifMatch: etag }); },
    async metadata(path) {
      try { const result = await head(path, await auth(env)); return { size: result.size, contentType: result.contentType, etag: result.etag, pathname: result.pathname }; }
      catch (error) { if (error instanceof Error && /not found|does not exist/i.test(error.message)) return null; throw new AttachmentError('Cannot verify the stored attachment. Please retry.', 503); }
    },
    read(path, maxBytes) { return readObject(path, maxBytes, env); },
    async putFile(path, bytes, contentType) {
      try { const object = await put(path, bytes, { ...await auth(env), access: 'private', contentType, allowOverwrite: false, addRandomSuffix: false }); return { ...object, size: bytes.length }; }
      catch (error) { conflict(error); }
    },
    async deleteFile(path) { await del(path, await auth(env)); },
    async sessions(cursor) {
      const page = await list({ ...await auth(env), prefix: PREFIX + 'sessions/', limit: 50, cursor });
      return { ids: page.blobs.map(item => item.pathname.slice((PREFIX + 'sessions/').length, -5)).filter(validId), cursor: page.hasMore ? page.cursor : undefined };
    },
    async orphanObjects(cursor) {
      const page = await list({ ...await auth(env), prefix: PREFIX, limit: 100, cursor });
      return { objects: page.blobs.map(object => ({ pathname: object.pathname, uploadedAt: object.uploadedAt.getTime() })), cursor: page.hasMore ? page.cursor : undefined };
    },
    async checkpoint() { const object = await loadJson(checkpointPath, env); return object ? { ...object.value, etag: object.etag } : { leaseUntil: 0 }; },
    async saveCheckpoint(value, etag) {
      try { await put(checkpointPath, JSON.stringify(value), { ...await auth(env), access: 'private', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: !!etag, ...(etag ? { ifMatch: etag } : {}) }); } catch (error) { conflict(error); }
    },
  };
}
export async function privateUploadUrl(file: { uploadPath: string; size: number; contentType: string }, expiresAt: number, env: NodeJS.ProcessEnv, sdk: { issue?: typeof issueSignedToken; presign?: typeof presignUrl; oidc?: typeof getVercelOidcToken } = {}) {
  const validUntil = Math.min(expiresAt, Date.now() + 60_000);
  if (validUntil <= Date.now()) throw new AttachmentError('Attachment authorization expired.', 403);
  const token = await (sdk.issue ?? issueSignedToken)({ ...await auth(env, sdk.oidc), pathname: file.uploadPath, operations: ['put'], validUntil, maximumSizeInBytes: file.size, allowedContentTypes: [file.contentType] });
  const { presignedUrl } = await (sdk.presign ?? presignUrl)(token, { operation: 'put', pathname: file.uploadPath, access: 'private', validUntil, maximumSizeInBytes: file.size, allowedContentTypes: [file.contentType], allowOverwrite: false, addRandomSuffix: false });
  return presignedUrl;
}
export async function privateDownloadUrl(path: string, accessExpires: number, env: NodeJS.ProcessEnv, sdk: { issue?: typeof issueSignedToken; presign?: typeof presignUrl; oidc?: typeof getVercelOidcToken } = {}) {
  const validUntil = Math.min(accessExpires, Date.now() + 5 * 60_000);
  if (validUntil <= Date.now()) throw new AttachmentError('File access expired.', 403);
  const token = await (sdk.issue ?? issueSignedToken)({ ...await auth(env, sdk.oidc), pathname: path, operations: ['get'], validUntil });
  const { presignedUrl } = await (sdk.presign ?? presignUrl)(token, { operation: 'get', pathname: path, access: 'private', validUntil, useCache: false });
  return getDownloadUrl(presignedUrl);
}
// Exported type keeps session manifests private; no client import of this adapter.
export type { UploadSession };
