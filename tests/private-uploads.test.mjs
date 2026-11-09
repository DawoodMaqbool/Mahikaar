import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import grants from '../.enquiry-tests/lib/storage/upload-grants.js';
import uploads from '../.enquiry-tests/lib/storage/private-upload.js';
const { createUploadGrant, verifyUploadGrant, MAX_UPLOAD_BYTES, GRANT_TTL_MS } = grants;
const { handlePrivateUpload } = uploads;
const secret = 'mock-signing-secret-with-at-least-32-bytes';
const now = 1_800_000_000_000;
const env = { ATTACHMENT_UPLOAD_SIGNING_SECRET: secret, BLOB_STORE_ID: 'mock-store', VERCEL_OIDC_TOKEN: 'mock-oidc' };
const input = { size: 1024, contentType: 'image/png' };
const makeGrant = () => createUploadGrant(input, secret, now);
function request(authorization, body = input, extra = {}) {
  return new Request('https://example.com/api/internal/attachments/upload', {
    method: 'POST', headers: { origin: 'https://example.com', 'content-type': 'application/json', ...(authorization ? { authorization: `Bearer ${authorization}` } : {}), ...extra }, body: JSON.stringify(body),
  });
}
function harness(overrides = {}) {
  const calls = { issued: [], signed: [] };
  const dependencies = {
    env, now: () => now, rateLimit: async () => false,
    issue: async options => { calls.issued.push(options); return { delegationToken: 'mock-delegation', clientSigningToken: 'mock-storage-signing-secret', validUntil: options.validUntil }; },
    presign: async (token, options) => { calls.signed.push({ token, options }); return { presignedUrl: 'https://blob.vercel-storage.com/mock-signed-put' }; },
    ...overrides,
  };
  return { calls, run: req => handlePrivateUpload(req, dependencies) };
}
test('grant creation: randomized server paths, bounded size, restricted formats', () => {
  const first = makeGrant(); const second = makeGrant();
  assert.notEqual(first.grant.pathname, second.grant.pathname);
  assert.match(first.grant.pathname, /^quarantine\/foundation\/.+\.png$/);
  assert.deepEqual(verifyUploadGrant(first.authorization, secret, now), first.grant);
  for (const size of [0, -1, 1.5, MAX_UPLOAD_BYTES + 1]) assert.throws(() => createUploadGrant({ ...input, size }, secret, now));
  assert.throws(() => createUploadGrant({ ...input, contentType: 'application/zip' }, secret, now));
  assert.throws(() => createUploadGrant(input, 'short', now));
});
test('unauthorized, invalid, expired or tampered grants never reach Blob', async () => {
  const { authorization } = makeGrant();
  const parts = authorization.split('.');
  const changed = JSON.parse(Buffer.from(parts[0], 'base64url'));
  changed.pathname = 'quarantine/foundation/other.png';
  const tampered = `${Buffer.from(JSON.stringify(changed)).toString('base64url')}.${parts[1]}`;
  for (const token of [undefined, 'invalid', tampered, createUploadGrant(input, secret, now - GRANT_TTL_MS).authorization]) {
    const h = harness(); const result = await h.run(request(token));
    assert.ok([401, 403].includes(result.status)); assert.equal(h.calls.issued.length, 0);
  }
  assert.throws(() => verifyUploadGrant(authorization, 'another-secret-with-sufficient-length', now));
});
test('signed grants with manipulated traversal paths or future issuance are rejected', () => {
  for (const change of [{ pathname: '../secret.png' }, { pathname: 'quarantine/foundation/%2e%2e/secret.png' }, { issuedAt: now + 1 }, { purpose: 'download' }]) {
    const grant = { ...makeGrant().grant, ...change };
    const payload = Buffer.from(JSON.stringify(grant)).toString('base64url');
    const signature = createHmac('sha256', secret).update(payload).digest('base64url');
    assert.throws(() => verifyUploadGrant(`${payload}.${signature}`, secret, now));
  }
});
test('valid request pins OIDC, private access, exact path, size, type, expiry and no overwrite', async () => {
  const { authorization, grant } = makeGrant(); const h = harness();
  const response = await h.run(request(authorization)); assert.equal(response.status, 200);
  const issued = h.calls.issued[0]; const signed = h.calls.signed[0].options;
  assert.equal(issued.storeId, env.BLOB_STORE_ID); assert.equal(issued.oidcToken, env.VERCEL_OIDC_TOKEN); assert.equal(issued.token, undefined);
  assert.deepEqual(issued.operations, ['put']); assert.equal(issued.pathname, grant.pathname);
  assert.equal(issued.maximumSizeInBytes, input.size); assert.deepEqual(issued.allowedContentTypes, [input.contentType]);
  assert.equal(issued.validUntil, now + 60_000);
  assert.equal(signed.pathname, grant.pathname); assert.equal(signed.access, 'private'); assert.equal(signed.operation, 'put');
  assert.equal(signed.allowOverwrite, false); assert.equal(signed.addRandomSuffix, false); assert.equal(signed.maximumSizeInBytes, input.size);
  assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
  const body = await response.text();
  for (const value of [env.VERCEL_OIDC_TOKEN, secret, 'mock-storage-signing-secret']) assert.ok(!body.includes(value));
});
test('paths, operations, size/type changes and oversized bodies rejected before signing', async () => {
  const { authorization } = makeGrant();
  for (const body of [{ ...input, pathname: 'other.png' }, { ...input, operation: 'get' }, { ...input, size: MAX_UPLOAD_BYTES + 1 }, { ...input, contentType: 'text/html' }]) {
    const h = harness(); assert.equal((await h.run(request(authorization, body))).status, 400); assert.equal(h.calls.issued.length, 0);
  }
  const h = harness(); assert.equal((await h.run(request(authorization, { data: 'x'.repeat(1100) }))).status, 413); assert.equal(h.calls.issued.length, 0);
});
test('origin, protection and OIDC failures fail closed, including no read-write fallback', async () => {
  const { authorization } = makeGrant();
  const checks = [
    [harness(), request(authorization, input, { origin: 'https://evil.example' }), 403],
    [harness({ rateLimit: async () => true }), request(authorization), 429],
    [harness({ rateLimit: undefined }), request(authorization), 503],
    [harness({ rateLimit: async () => { throw new Error('private failure'); } }), request(authorization), 503],
    [harness({ env: { ...env, VERCEL_OIDC_TOKEN: '', BLOB_READ_WRITE_TOKEN: 'must-not-use' } }), request(authorization), 503],
    [harness({ env: {} }), request(authorization), 503],
  ];
  for (const [h, req, status] of checks) { assert.equal((await h.run(req)).status, status); assert.equal(h.calls.issued.length, 0); }
});
test('application exposes no read authorization or private file proxy', async () => {
  const h = harness();
  const read = new Request('https://example.com/api/internal/attachments/upload?pathname=private.png');
  assert.equal((await h.run(read)).status, 405);
  assert.equal((await h.run(request(undefined, { operation: 'get', pathname: 'private.png' }))).status, 401);
  assert.equal(h.calls.issued.length, 0);
  // This is application-boundary coverage, NOT a test of Vercel storage ACLs.
});
test('SDK outages are sanitized; grant replay cannot broaden path or extend expiry', async () => {
  const { authorization } = makeGrant();
  const failed = harness({ issue: async () => { throw new Error('sensitive provider credential'); } });
  const response = await failed.run(request(authorization)); assert.equal(response.status, 503); assert.ok(!(await response.text()).includes('sensitive'));
  const h = harness({ now: () => now + GRANT_TTL_MS - 1000 });
  await h.run(request(authorization)); await h.run(request(authorization));
  assert.equal(h.calls.issued[0].pathname, h.calls.issued[1].pathname);
  assert.equal(h.calls.issued[0].validUntil, now + GRANT_TTL_MS);
});
