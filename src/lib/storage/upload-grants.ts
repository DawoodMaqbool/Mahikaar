/** Server-only grant primitives. Never import into client components. */
import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';

export const MAX_UPLOAD_BYTES = 25_000_000;
export const GRANT_TTL_MS = 5 * 60 * 1000;
const TYPES = { 'image/png': 'png', 'application/pdf': 'pdf' } as const;
export type FoundationContentType = keyof typeof TYPES;
export type UploadGrant = {
  purpose: 'mahikaar-private-upload-v1';
  pathname: string;
  size: number;
  contentType: FoundationContentType;
  issuedAt: number;
  expiresAt: number;
};
export class UploadAuthorizationError extends Error {}

export function signingSecretAvailable(secret: string | undefined): secret is string {
  return typeof secret === 'string' && Buffer.byteLength(secret) >= 32;
}
function signature(payload: string, secret: string) {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}
function validGrant(value: unknown, now: number): value is UploadGrant {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const grant = value as UploadGrant;
  return Object.keys(grant).sort().join(',') === 'contentType,expiresAt,issuedAt,pathname,purpose,size'
    && grant.purpose === 'mahikaar-private-upload-v1'
    && Object.hasOwn(TYPES, grant.contentType)
    && typeof grant.pathname === 'string'
    && /^quarantine\/foundation\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(png|pdf)$/.test(grant.pathname)
    && grant.pathname.endsWith(`.${TYPES[grant.contentType]}`)
    && Number.isSafeInteger(grant.size) && grant.size > 0 && grant.size <= MAX_UPLOAD_BYTES
    && Number.isSafeInteger(grant.issuedAt) && grant.issuedAt <= now
    && Number.isSafeInteger(grant.expiresAt) && grant.expiresAt > now
    && grant.expiresAt > grant.issuedAt && grant.expiresAt - grant.issuedAt <= GRANT_TTL_MS;
}

/** Trusted server/operator use only. There is deliberately no public grant issuer. */
export function createUploadGrant(
  input: { size: number; contentType: FoundationContentType },
  secret: string,
  now = Date.now(),
) {
  if (!signingSecretAvailable(secret)) throw new Error('Upload signing is not configured.');
  const grant: UploadGrant = {
    purpose: 'mahikaar-private-upload-v1',
    pathname: `quarantine/foundation/${randomUUID()}.${TYPES[input.contentType]}`,
    size: input.size, contentType: input.contentType,
    issuedAt: now, expiresAt: now + GRANT_TTL_MS,
  };
  if (!validGrant(grant, now)) throw new Error('Unsupported upload size or type.');
  const payload = Buffer.from(JSON.stringify(grant)).toString('base64url');
  return { authorization: `${payload}.${signature(payload, secret)}`, grant };
}

export function verifyUploadGrant(authorization: string, secret: string, now = Date.now()): UploadGrant {
  if (!signingSecretAvailable(secret) || authorization.length > 2048) throw new UploadAuthorizationError('Invalid upload authorization.');
  const parts = authorization.split('.');
  if (parts.length !== 2 || parts.some(part => !/^[A-Za-z0-9_-]+$/.test(part))) throw new UploadAuthorizationError('Invalid upload authorization.');
  const [payload, supplied] = parts;
  const expected = signature(payload, secret);
  if (supplied.length !== expected.length || !timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))) throw new UploadAuthorizationError('Invalid upload authorization.');
  let grant: unknown;
  try { grant = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')); } catch { throw new UploadAuthorizationError('Invalid upload authorization.'); }
  if (!validGrant(grant, now)) throw new UploadAuthorizationError('Invalid or expired upload authorization.');
  return grant;
}
