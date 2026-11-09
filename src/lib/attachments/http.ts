import { AttachmentError } from './policy';
import { attachmentsAvailable, configuredStorage, requireAvailable, sameOrigin, readJson, ownerFromRequest, createOwner, capabilityEqual, hash } from './security';
import { AttachmentService } from './service';
import { blobStore, privateUploadUrl, privateDownloadUrl } from './blob-store';
import { scaniiScanner } from './scanner';
import { attachmentRateLimited } from './rate-limit';
import type { AttachmentStore, Scan } from './types';
export type AttachmentAction = 'availability' | 'session' | 'status' | 'upload' | 'verify' | 'download' | 'cleanup';
type Dependencies = { env?: NodeJS.ProcessEnv; store?: AttachmentStore; scan?: Scan; rateLimit?: (request: Request) => Promise<boolean>; now?: () => number; uploadUrl?: typeof privateUploadUrl; downloadUrl?: typeof privateDownloadUrl };
export function attachmentResponse(data: unknown, status = 200, headers?: HeadersInit) {
  return Response.json(data, { status, headers: { 'Cache-Control': 'private, no-store', 'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff', ...headers } });
}
export function attachmentFailure(error: unknown) {
  return attachmentResponse({ error: error instanceof AttachmentError ? error.message : 'Attachment processing is temporarily unavailable. Please retry.' }, error instanceof AttachmentError ? error.status : 503);
}
async function protect(request: Request, dependencies: Dependencies, env: NodeJS.ProcessEnv, action: AttachmentAction) {
  sameOrigin(request);
  const local = env.NODE_ENV === 'development' && ['localhost','127.0.0.1','[::1]'].includes(new URL(request.url).hostname);
  const limited = dependencies.rateLimit ?? (local ? async () => false : (request: Request) => attachmentRateLimited(request, action === 'session' ? 'sessions' : action === 'download' ? 'downloads' : 'operations'));
  try { if (await limited(request)) throw new AttachmentError('Too many attachment requests. Please wait before retrying.', 429); }
  catch (error) { if (error instanceof AttachmentError) throw error; throw new AttachmentError('Attachment protection is unavailable. Please retry later.', 503); }
}
function exact(body: Record<string, unknown>, keys: string[]) {
  if (Object.keys(body).some(key => !keys.includes(key))) throw new AttachmentError('Unsupported attachment request fields.');
}
export async function handleAttachment(request: Request, action: AttachmentAction, dependencies: Dependencies = {}) {
  const env = dependencies.env ?? process.env; const now = dependencies.now ?? Date.now;
  try {
    if (action === 'availability') return attachmentResponse({ available: attachmentsAvailable(env), formats: ['PDF','PNG'], maximumFiles: 5, maximumTotalBytes: 25_000_000 });
    const store = dependencies.store ?? blobStore(env); const service = new AttachmentService(store, dependencies.scan ?? scaniiScanner(env), now);
    if (action === 'cleanup') {
      if (!capabilityEqual(request.headers.get('authorization'), env.CRON_SECRET)) throw new AttachmentError('Cleanup access denied.', 401);
      if (!configuredStorage(env)) throw new AttachmentError('Cleanup storage is unavailable.', 503);
      const result = await service.cleanup(); return attachmentResponse(result, result.failed ? 503 : 200);
    }
    if (action !== 'download') requireAvailable(env);
    else if (!configuredStorage(env)) throw new AttachmentError('Private files are temporarily unavailable.', 503);
    await protect(request, dependencies, env, action);
    const body = await readJson(request);
    if (action === 'download') {
      exact(body, ['access','fileId']);
      const result = await service.downloadAccess(body.access, body.fileId, env);
      if (!result.file) return attachmentResponse({ files: result.files });
      const url = await (dependencies.downloadUrl ?? privateDownloadUrl)(result.file.cleanPath, result.session.submission!.accessExpires, env);
      return attachmentResponse({ downloadUrl: url });
    }
    let owner: string;
    if (action === 'session') {
      exact(body, ['files','website']); if (body.website !== '') throw new AttachmentError('Unable to authorize attachments.', 403);
      let cookie: string | undefined;
      try { owner = ownerFromRequest(request, env, now()); } catch { const created = createOwner(env, now()); owner = created.ownerHash; cookie = created.cookie; }
      const result = await service.create(body.files, owner);
      return attachmentResponse(result, 201, cookie ? { 'Set-Cookie': cookie } : undefined);
    }
    owner = ownerFromRequest(request, env, now());
    exact(body, action === 'status' ? ['sessionId'] : ['sessionId','fileId']);
    if (typeof body.sessionId !== 'string') throw new AttachmentError('Missing attachment session.');
    if (action === 'status') { const session = await service.owned(body.sessionId, owner); return attachmentResponse(service.publicStatus(session.value)); }
    if (action === 'verify') return attachmentResponse(await service.verify(body.sessionId, body.fileId, owner));
    const result = await service.upload(body.sessionId, body.fileId, owner);
    if (result.uploaded) return attachmentResponse({ uploaded: true });
    return attachmentResponse({ uploaded: false, uploadUrl: await (dependencies.uploadUrl ?? privateUploadUrl)(result.file, result.expiresAt, env) });
  } catch (error) { return attachmentFailure(error); }
}
/** Called only for attachment-bearing enquiries; email-only delivery has no storage dependency. */
export function enquiryAttachments(request: Request, env: NodeJS.ProcessEnv) {
  requireAvailable(env);
  const service = new AttachmentService(blobStore(env), scaniiScanner(env));
  const owner = ownerFromRequest(request, env);
  return { service, owner, digest: (data: unknown) => hash(JSON.stringify(data)) };
}
