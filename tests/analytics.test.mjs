import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST123';
process.env.NEXT_PUBLIC_GA_MANUAL_TRACKING_READY = 'true';
const require = createRequire(import.meta.url);
const analytics = require('../.enquiry-tests/lib/analytics.js');
const { submitEnquiry } = require('../.enquiry-tests/lib/enquiries/client.js');
function storage() {
  const values = new Map();
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}

test('opt-in analytics, pageview deduplication, accepted enquiries only, withdrawal and cookies', async () => {
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;
  const originalFetch = globalThis.fetch;
  let reloads = 0;
  const deleted = [];
  globalThis.window = {
    localStorage: storage(), sessionStorage: storage(),
    location: { hostname: 'www.mahikaar.com', pathname: '/request-a-quote', reload: () => reloads++ },
  };
  globalThis.document = {
    get cookie() { return '_ga=one; _ga_TEST123=two; necessary=keep'; },
    set cookie(value) { deleted.push(value); },
  };
  const events = (name) => (window.dataLayer ?? []).map((entry) => Array.from(entry)).filter((entry) => entry[0] === 'event' && entry[1] === name);
  const payload = (id, source = 'Request a Quote') => ({ submissionId: id, source, fullName: 'PRIVATE', businessEmail: 'PRIVATE@example.test', requirements: 'PRIVATE brief' });
  try {
    assert.equal(analytics.readConsent(), null);
    assert.equal(analytics.startAnalytics(), false);
    assert.equal(window.dataLayer, undefined);
    analytics.setConsent('rejected');
    assert.equal(analytics.startAnalytics(), false);
    globalThis.fetch = async () => Response.json({ ok: true });
    await submitEnquiry(payload('declined'));
    assert.equal(events('generate_lead').length, 0);

    analytics.setConsent('accepted');
    assert.equal(analytics.readConsent(), 'accepted');
    assert.equal(analytics.startAnalytics(), true);
    assert.equal(analytics.startAnalytics(), false);
    const config = window.dataLayer.find((entry) => entry[0] === 'config')[2];
    assert.equal(config.send_page_view, false);
    assert.equal(config.page_referrer, '');
    analytics.trackPageView('/request-a-quote');
    analytics.trackPageView('/request-a-quote'); // React Strict Mode rerun.
    analytics.trackPageView('/portfolio');
    analytics.trackPageView('/portfolio'); // Product/category query-only change.
    analytics.trackPageView('/enquiry-files');
    analytics.trackPageView('/portfolio'); // Back to a public page.
    assert.equal(events('page_view').length, 3);
    assert.ok(events('page_view').every((entry) => !entry[2].page_location.includes('?')));

    await submitEnquiry(payload('declined')); // No retrospective conversion after acceptance.
    assert.equal(events('generate_lead').length, 0);
    for (const [index, source] of ['Contact', 'Request a Quote', 'Portfolio', 'Private Label'].entries()) {
      await submitEnquiry(payload(`success-${index}`, source));
      await submitEnquiry(payload(`success-${index}`, source));
    }
    assert.deepEqual(events('generate_lead').map((entry) => entry[2].form_source), ['contact', 'request_a_quote', 'portfolio', 'private_label']);
    assert.ok(!JSON.stringify(window.dataLayer).includes('PRIVATE'));
    assert.ok(events('generate_lead').every((entry) => Object.keys(entry[2]).sort().join(',') === 'form_source,send_to'));
    for (const response of [Response.json({ ok: false }), Response.json({ ok: true }, { status: 500 }), new Response('bad json')]) {
      globalThis.fetch = async () => response;
      await assert.rejects(submitEnquiry(payload('failure')));
    }
    globalThis.fetch = async () => { throw new Error('offline'); };
    await assert.rejects(submitEnquiry(payload('offline')));
    assert.equal(events('generate_lead').length, 4);

    globalThis.fetch = async () => Response.json({ ok: true });
    analytics.trackPageView('/contact');
    analytics.trackPageView('/request-a-quote');
    await submitEnquiry(payload('contact-entry'));
    assert.equal(events('generate_lead').at(-1)[2].form_source, 'contact');

    // Persisted idempotency survives module reload (as a browser refresh would).
    delete require.cache[require.resolve('../.enquiry-tests/lib/analytics.js')];
    const refreshed = require('../.enquiry-tests/lib/analytics.js');
    refreshed.startAnalytics();
    refreshed.trackSuccessfulEnquiry('Portfolio', 'success-2');
    assert.equal(events('generate_lead').length, 5);

    analytics.setConsent('rejected');
    assert.equal(window['ga-disable-G-TEST123'], true);
    assert.equal(reloads, 1);
    assert.ok(deleted.some((cookie) => cookie.startsWith('_ga=') && cookie.includes('domain=mahikaar.com')));
    assert.ok(deleted.every((cookie) => !cookie.startsWith('necessary=')));
    analytics.trackPageView('/about');
    globalThis.fetch = async () => Response.json({ ok: true });
    await submitEnquiry(payload('withdrawn'));
    assert.equal(events('generate_lead').length, 5);
    window.gtag = () => { throw new Error('blocked'); };
    analytics.setConsent('accepted');
    await submitEnquiry(payload('blocked')); // Accepted enquiry still resolves.
    window.localStorage.setItem = () => { throw new Error('storage blocked'); };
    analytics.setConsent('rejected');
    assert.equal(analytics.readConsent(), 'rejected');
    assert.equal(reloads, 1); // Keep in-memory rejection if it cannot be persisted.
    await submitEnquiry(payload('storage-unavailable'));
  } finally {
    globalThis.window = originalWindow;
    globalThis.document = originalDocument;
    globalThis.fetch = originalFetch;
  }
});

test('unconfigured analytics is fail-closed', () => {
  const saved = process.env.NEXT_PUBLIC_GA_MANUAL_TRACKING_READY;
  delete process.env.NEXT_PUBLIC_GA_MANUAL_TRACKING_READY;
  delete require.cache[require.resolve('../.enquiry-tests/lib/analytics.js')];
  const unconfigured = require('../.enquiry-tests/lib/analytics.js');
  assert.equal(unconfigured.analyticsConfigured, false);
  assert.equal(unconfigured.startAnalytics(), false);
  process.env.NEXT_PUBLIC_GA_MANUAL_TRACKING_READY = saved;
});
