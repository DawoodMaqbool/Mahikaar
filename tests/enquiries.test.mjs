import { test } from 'node:test';
import assert from 'node:assert/strict';
import server from '../.enquiry-tests/lib/enquiries/server.js';
import client from '../.enquiry-tests/lib/enquiries/client.js';
import limiter from '../.enquiry-tests/lib/enquiries/rate-limit.js';
const { validateEnquiry, composeEmail } = server;
// Every ordinary test supplies a mocked shared limiter; no live service is called.
const handleEnquiry = (request, dependencies = {}) => server.handleEnquiry(request, { rateLimit: async () => false, ...dependencies });
const { submitEnquiry } = client;
const env = { RESEND_API_KEY: 'mock-key', ENQUIRY_FROM_EMAIL: 'sender@example.com', ENQUIRY_TO_EMAIL: 'recipient@example.com' };
const quote = { source: 'Request a Quote', fullName: 'Buyer', companyName: 'Brand', businessEmail: 'buyer@example.com', territory: 'UK', website: '', submissionId: '12345678-1234-1234-1234-123456789012' };
const request = (data = quote, headers = {}) => new Request('https://example.com/api/enquiries', { method: 'POST', headers: { origin: 'https://example.com', 'content-type': 'application/json', ...headers }, body: JSON.stringify(data) });
test('quote: required fields, enums, email, URL, lengths, honeypot and attachments', () => {
  assert.equal(validateEnquiry(quote).values.fullName, 'Buyer');
  for (const change of [{ fullName: ' ' }, { businessEmail: 'invalid' }, { footwearType: ['invalid'] }, { quantityScale: 'invalid' }, { brandingOption: ['invalid'] }, { timeline: 'invalid' }, { brandUrl: 'javascript:alert(1)' }, { specNotes: 'x'.repeat(5001) }, { website: 'spam' }, { attachments: ['file'] }, { to: 'other@example.com' }]) assert.throws(() => validateEnquiry({ ...quote, ...change }));
});
test('modal sources and exact style context survive; quote-only country not required', () => {
  for (const source of ['Portfolio', 'Private Label']) {
    const { territory, ...base } = quote; void territory;
    const result = validateEnquiry({ ...base, source, style: 'Oxford • OX-01 • Black', volume: '12–24 Pairs (Trial Order)' });
    assert.match(composeEmail(result).text, /OX-01 • Black/);
    assert.equal(result.source, source);
    assert.throws(() => validateEnquiry({ ...base, source, style: 'Oxford', volume: 'bad' }));
  }
});
test('optional blanks omitted and HTML escaped', () => {
  const email = composeEmail(validateEnquiry({ ...quote, projectDescription: '<script>&"\'\nnotes', specNotes: '' }));
  assert.ok(!email.html.includes('<script>')); assert.match(email.html, /&lt;script&gt;/); assert.ok(!email.text.includes('other notes'));
});
test('acceptance: fixed server recipient, reply-to and idempotency', async () => {
  let calls = 0;
  const response = await handleEnquiry(request(), { env, fetch: async (url, options) => {
    calls++; assert.equal(url, 'https://api.resend.com/emails');
    const data = JSON.parse(options.body); assert.deepEqual(data.to, [env.ENQUIRY_TO_EMAIL]); assert.equal(data.reply_to, quote.businessEmail); assert.equal(data.from, env.ENQUIRY_FROM_EMAIL); assert.ok(options.headers['Idempotency-Key']);
    return Response.json({ id: 'mock-email-id' });
  }});
  assert.equal(calls, 1); assert.equal(response.status, 200); assert.deepEqual(await response.json(), { ok: true });
});
test('origin, size, malformed JSON, missing configuration rejected without delivery', async () => {
  const fetch = async () => { throw new Error('must not send'); };
  assert.equal((await handleEnquiry(request(quote, { origin: 'https://evil.example' }), { env, fetch })).status, 403);
  assert.equal((await handleEnquiry(request(quote, { 'content-type': 'multipart/form-data' }), { env, fetch })).status, 415);
  assert.equal((await handleEnquiry(request({ ...quote, specNotes: 'x'.repeat(33000) }), { env, fetch })).status, 413);
  assert.equal((await handleEnquiry(request(), { env: {}, fetch })).status, 503);
  const bad = new Request('https://example.com/api/enquiries', { method: 'POST', headers: { origin: 'https://example.com', 'content-type': 'application/json' }, body: '{' });
  assert.equal((await handleEnquiry(bad, { env, fetch })).status, 400);
});
test('provider rejection, network/timeout, and malformed success never return success', async () => {
  for (const fetch of [async () => Response.json({ error: 'private detail' }, { status: 429 }), async () => { throw new Error('private detail'); }, async () => Response.json({}), async () => new Response('not JSON')]) {
    const response = await handleEnquiry(request(), { env, fetch }); assert.equal(response.status, 502); assert.ok(!(await response.text()).includes('private detail'));
  }
});

test('client only accepts explicit successful API confirmation; errors allow retry', async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => Response.json({ ok: true });
    await submitEnquiry(quote);
    for (const response of [Response.json({ error: 'Try again' }, { status: 502 }), Response.json({}), new Response('platform error', { status: 413 })]) {
      globalThis.fetch = async () => response;
      await assert.rejects(submitEnquiry(quote));
    }
    globalThis.fetch = async () => { throw new Error('Network failure'); };
    await assert.rejects(submitEnquiry(quote));
    globalThis.fetch = async () => Response.json({ ok: true });
    await submitEnquiry(quote);
  } finally { globalThis.fetch = original; }
});

test('rate-limited requests and protection outages never reach Resend', async () => {
  let sends = 0;
  const fetch = async () => { sends++; return Response.json({ id: 'mock' }); };
  const limited = await handleEnquiry(request(), { env, fetch, rateLimit: async () => true });
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get('Retry-After'), '60');
  const unavailable = await handleEnquiry(request(), { env, fetch, rateLimit: async () => { throw new Error('internal'); } });
  assert.equal(unavailable.status, 503);
  const missing = await server.handleEnquiry(request(), { env, fetch });
  assert.equal(missing.status, 503);
  assert.equal(sends, 0);
});

test('duplicate requests reuse the same provider key; mocked provider sends once', async () => {
  const sent = new Map();
  let deliveries = 0;
  const fetch = async (_, options) => {
    const key = options.headers['Idempotency-Key'];
    if (!sent.has(key)) { deliveries++; sent.set(key, { id: 'mock-id' }); }
    return Response.json(sent.get(key));
  };
  const results = await Promise.all([handleEnquiry(request(), { env, fetch }), handleEnquiry(request(), { env, fetch })]);
  assert.deepEqual(results.map(r => r.status), [200, 200]);
  assert.equal(deliveries, 1);
});

test('invalid data is rejected before either external service is called', async () => {
  let calls = 0;
  const response = await handleEnquiry(request({ ...quote, businessEmail: 'bad' }), {
    env, rateLimit: async () => { calls++; return false; }, fetch: async () => { calls++; return Response.json({ id: 'mock' }); },
  });
  assert.equal(response.status, 400); assert.equal(calls, 0);
});

test('Firewall adapter rejects missing rules and propagates platform failures', async () => {
  const { enquiryRateLimited } = limiter;
  assert.equal(await enquiryRateLimited(request(), async (id, options) => {
    assert.equal(id, 'mahikaar-enquiries'); assert.equal(options.timeout, 3000);
    return { rateLimited: false };
  }), false);
  assert.equal(await enquiryRateLimited(request(), async () => ({ rateLimited: true })), true);
  await assert.rejects(enquiryRateLimited(request(), async () => ({ rateLimited: false, error: 'not-found' })));
  await assert.rejects(enquiryRateLimited(request(), async () => { throw new Error('timeout'); }));
});
