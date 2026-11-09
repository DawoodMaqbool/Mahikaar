import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { AttachmentError, DAY } from './policy';
export const OWNER_COOKIE = '__Host-mahikaar-uploads';
export const hash = (value: string | Buffer) => createHash('sha256').update(value).digest('hex');
export function secretReady(env: NodeJS.ProcessEnv) { return (env.ATTACHMENT_UPLOAD_SIGNING_SECRET?.length ?? 0) >= 32; }
export function signCapability(payload: Record<string, unknown>, env: NodeJS.ProcessEnv) {
  if (!secretReady(env)) throw new AttachmentError('Attachment security is unavailable.', 503);
  const value = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return value + '.' + createHmac('sha256', env.ATTACHMENT_UPLOAD_SIGNING_SECRET!).update('attachments-v2:' + value).digest('base64url');
}
export function readCapability(token: unknown, kind: string, env: NodeJS.ProcessEnv, now = Date.now()): Record<string, unknown> {
  if (!secretReady(env) || typeof token !== 'string' || token.length > 2048 || !/^[\w-]+\.[\w-]+$/.test(token)) throw new AttachmentError('Invalid or expired attachment access.', 403);
  const [value, signature] = token.split('.');
  const expected = createHmac('sha256', env.ATTACHMENT_UPLOAD_SIGNING_SECRET!).update('attachments-v2:' + value).digest('base64url');
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) throw new AttachmentError('Invalid or expired attachment access.', 403);
  let payload: Record<string, unknown>;
  try { payload = JSON.parse(Buffer.from(value, 'base64url').toString()); } catch { throw new AttachmentError('Invalid attachment access.', 403); }
  if (!payload || payload.kind !== kind || !Number.isSafeInteger(payload.exp) || (payload.exp as number) <= now) throw new AttachmentError('Invalid or expired attachment access.', 403);
  return payload;
}
export function ownerFromRequest(request: Request, env: NodeJS.ProcessEnv, now = Date.now()) {
  const cookie = request.headers.get('cookie')?.split(';').map(part => part.trim()).find(part => part.startsWith(OWNER_COOKIE + '='))?.slice(OWNER_COOKIE.length + 1);
  const owner = readCapability(cookie, 'owner', env, now);
  if (typeof owner.subject !== 'string' || !/^[0-9a-f]{64}$/.test(owner.subject)) throw new AttachmentError('Attachment session access is invalid.', 403);
  return hash(owner.subject);
}
export function createOwner(env: NodeJS.ProcessEnv, now = Date.now()) {
  const subject = randomBytes(32).toString('hex');
  const token = signCapability({ kind: 'owner', subject, exp: now + DAY }, env);
  return { ownerHash: hash(subject), cookie: `${OWNER_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400` };
}
export function sameOrigin(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin || request.headers.get('sec-fetch-site') === 'cross-site') throw new AttachmentError('Please submit from this website.', 403);
}
export function capabilityEqual(actual: string | null, expected: string | undefined) {
  if (!expected || expected.length < 32 || !actual) return false;
  const left = Buffer.from(actual); const right = Buffer.from('Bearer ' + expected);
  return left.length === right.length && timingSafeEqual(left, right);
}
export function configuredStorage(env: NodeJS.ProcessEnv) {
  return !!env.BLOB_STORE_ID && env.BLOB_STORE_ID === env.ATTACHMENT_EXPECTED_STORE_ID && !!env.VERCEL_OIDC_TOKEN && secretReady(env);
}
export function attachmentsAvailable(env: NodeJS.ProcessEnv) {
  let origin = false;
  try { const url = new URL(env.ATTACHMENT_BASE_URL!); origin = url.protocol === 'https:' && url.origin === env.ATTACHMENT_BASE_URL; } catch {}
  return env.ATTACHMENTS_ENABLED === 'true' && configuredStorage(env) && origin && !!env.SCANII_API_KEY && !!env.SCANII_API_SECRET && ['us1','eu1','eu2','ap1','ap2','ca1'].includes(env.SCANII_REGION ?? '') && (env.CRON_SECRET?.length ?? 0) >= 32;
}
export function requireAvailable(env: NodeJS.ProcessEnv) {
  if (!attachmentsAvailable(env)) throw new AttachmentError('Attachments are temporarily unavailable. Remove selected files to submit an email-only enquiry.', 503);
}
export async function readJson(request: Request, maximum = 8192): Promise<Record<string, unknown>> {
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') throw new AttachmentError('Only JSON metadata is accepted.', 415);
  if (Number(request.headers.get('content-length')) > maximum) throw new AttachmentError('Request too large.', 413);
  const reader = request.body?.getReader(); if (!reader) throw new AttachmentError('Missing request.');
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) { const next = await reader.read(); if (next.done) break; size += next.value.byteLength; if (size > maximum) { await reader.cancel(); throw new AttachmentError('Request too large.', 413); } chunks.push(next.value); }
  try { const data = JSON.parse(Buffer.concat(chunks).toString()); if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error(); return data; } catch { throw new AttachmentError('Invalid request metadata.'); }
}
