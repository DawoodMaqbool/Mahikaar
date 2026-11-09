/** Server-only HTTP boundary. File bytes bypass this endpoint entirely. */
import { issueSignedToken, presignUrl } from '@vercel/blob';
import { signingSecretAvailable, verifyUploadGrant, UploadAuthorizationError } from './upload-grants';

type Dependencies = {
  env?: NodeJS.ProcessEnv;
  now?: () => number;
  issue?: typeof issueSignedToken;
  presign?: typeof presignUrl;
  rateLimit?: (request: Request) => Promise<boolean>;
};
const response = (status: number, error: string) => Response.json({ error }, {
  status, headers: { 'Cache-Control': 'private, no-store' },
});

export async function handlePrivateUpload(request: Request, dependencies: Dependencies = {}) {
  const env = dependencies.env ?? process.env;
  const now = dependencies.now ?? Date.now;
  if (request.method !== 'POST') return response(405, 'Only upload authorization is supported.');
  const secret = env.ATTACHMENT_UPLOAD_SIGNING_SECRET;
  if (!signingSecretAvailable(secret)) return response(503, 'Private upload authorization is not configured.');
  const bearer = request.headers.get('authorization');
  if (!bearer?.startsWith('Bearer ')) return response(401, 'Upload authorization required.');
  try {
    const grant = verifyUploadGrant(bearer.slice(7), secret, now());
    // CORS/origin checks supplement the signed grant; they never replace it.
    const origin = request.headers.get('origin');
    if (!origin || origin !== new URL(request.url).origin || request.headers.get('sec-fetch-site') === 'cross-site') return response(403, 'Invalid upload origin.');
    if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return response(415, 'File bytes must be uploaded directly to private storage.');
    if (Number(request.headers.get('content-length')) > 1024) return response(413, 'Upload request too large.');
    const reader = request.body?.getReader();
    if (!reader) return response(400, 'Missing upload request.');
    const chunks: Uint8Array[] = []; let size = 0;
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > 1024) { await reader.cancel(); return response(413, 'Upload request too large.'); }
      chunks.push(chunk.value);
    }
    let body: unknown;
    try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return response(400, 'Invalid upload request.'); }
    if (!body || typeof body !== 'object' || Array.isArray(body)
      || Object.keys(body).sort().join(',') !== 'contentType,size') return response(400, 'Only size and contentType are accepted; paths and operations are server-controlled.');
    const input = body as { size: unknown; contentType: unknown };
    if (input.size !== grant.size || input.contentType !== grant.contentType) return response(400, 'File does not match upload authorization.');
    // Explicit OIDC avoids any fallback to a long-lived read-write credential.
    if (!env.BLOB_STORE_ID || !env.VERCEL_OIDC_TOKEN) return response(503, 'Private storage authentication is unavailable.');
    const local = env.NODE_ENV === 'development' && ['localhost', '127.0.0.1', '[::1]'].includes(new URL(request.url).hostname);
    if (!dependencies.rateLimit && !local) return response(503, 'Upload protection is unavailable.');
    if (dependencies.rateLimit && await dependencies.rateLimit(request)) return response(429, 'Too many requests. Please retry later.');
    const validUntil = Math.min(grant.expiresAt, now() + 60_000);
    if (validUntil <= now()) return response(403, 'Upload authorization expired.');
    const token = await (dependencies.issue ?? issueSignedToken)({
      storeId: env.BLOB_STORE_ID, oidcToken: env.VERCEL_OIDC_TOKEN,
      pathname: grant.pathname, operations: ['put'], validUntil,
      allowedContentTypes: [grant.contentType], maximumSizeInBytes: grant.size,
      abortSignal: AbortSignal.timeout(5000),
    });
    const { presignedUrl } = await (dependencies.presign ?? presignUrl)(token, {
      operation: 'put', pathname: grant.pathname, access: 'private', validUntil,
      maximumSizeInBytes: grant.size, allowedContentTypes: [grant.contentType],
      allowOverwrite: false, addRandomSuffix: false,
    });
    // No signing token, OIDC credential or read URL is returned.
    return Response.json({ uploadUrl: presignedUrl, pathname: grant.pathname, expiresAt: validUntil }, {
      headers: { 'Cache-Control': 'private, no-store', 'Referrer-Policy': 'no-referrer' },
    });
  } catch (error) {
    if (error instanceof UploadAuthorizationError) return response(403, 'Invalid or expired upload authorization.');
    // Do not echo SDK errors, tokens, filenames or request bodies.
    return response(503, 'Private upload authorization is temporarily unavailable.');
  }
}
