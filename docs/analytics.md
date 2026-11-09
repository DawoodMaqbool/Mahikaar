# GA4 and enquiry measurement

## Implementation and audit

The application previously had no analytics, cookie consent or privacy policy. The persistent footer now hosts minimal opt-in controls; visitors can reopen Analytics preferences on every page. Preference is saved locally as accepted/rejected. Storage failures fall back to page-memory consent. If withdrawal cannot be saved, the page keeps its in-memory rejection and GA disable flag rather than reloading into a stale saved acceptance; this preference cannot persist reliably until browser storage is available. No Google Analytics script, preconnect, consent ping or custom event is sent before acceptance.

Next.js `next/script` loads gtag.js after acceptance, with no added dependencies or GTM container. Built-in Script is used rather than adding `@next/third-parties` so configuration, opt-in loading and manual event control remain explicit. Google uses the googletagmanager.com domain to serve gtag.js; this does not install Google Tag Manager.

The shared enquiry client checks both HTTP success and `{ ok: true }` before invoking analytics. Email validation, API responses, delivery, success messages and submission IDs remain unchanged. Sources are allowlisted: contact, request_a_quote, portfolio, private_label. Contact has no independent form: it links to Request a Quote or email/telephone. A visit directly from Contact to the quote route is labelled contact while consented; otherwise the quote form is labelled request_a_quote. Email/telephone clicks are not successful API enquiries and produce no lead event.

Successful submission IDs are kept in memory and sessionStorage solely for local deduplication, never sent to Google. Retries and refreshes in the same tab do not replay leads, including successes that happened while consent was rejected. Cross-device deduplication and guaranteed delivery through browser blockers are not possible with this client-only integration. No names, email addresses, phone numbers, messages, files, style descriptions or enquiry payloads are sent as event parameters.

Page views are manual and pathname-only for the seven public routes. Initial consented view, internal navigation and Back/Forward are counted once per pathname transition. Catalogue category/product/colourway changes on the same pathname do not create extra page views. Query strings, fragments and referrer URLs are omitted; private utility routes are not sent as page views. Consent itself sends no custom analytics event. Advertising consent is denied and Google signals/ad personalisation disabled.

## Required GA4 configuration BEFORE enabling in Vercel

1. Open the GA4 property for measurement ID `G-2XE0WF03NM`.
2. Go to Admin → Data streams → the web stream for https://www.mahikaar.com.
3. Turn Enhanced Measurement OFF and save. This avoids history-generated page views and automatic form/search/click events. `send_page_view: false` in code disables the configuration page view but does NOT independently disable Enhanced Measurement history tracking.
4. Do not install another GA tag, GTM container (`GTM-TK6T4X48`) or hosting-injected analytics tag for this measurement ID. Review connected site tags/destinations; this integration is intended only for GA4.
5. Once confirmed, set Vercel Production build variables:
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-2XE0WF03NM`
   - `NEXT_PUBLIC_GA_MANUAL_TRACKING_READY=true`
6. Rebuild/redeploy manually: NEXT_PUBLIC values are inlined at build time. Leave the readiness flag false/unset until step 3 is complete; analytics and its UI remain disabled while unconfigured. Preview environments should stay disabled unless deliberately used for testing.
7. In Admin → Events/Key events, mark `generate_lead` as a key event. If it is not listed yet, send a consented test lead or create the key event by name. Use once-per-event counting.
8. Optional: add an event-scoped custom dimension named Form source with event parameter `form_source` for later reporting. DebugView can inspect parameters without this dimension.

No environment variable was changed in Vercel by this task. Keep `ATTACHMENTS_ENABLED=false` in Production. No attachment configuration or Cron schedule was changed.

References: [Google manual pageview configuration](https://developers.google.com/analytics/devguides/collection/ga4/views), [Google disable-analytics flag](https://developers.google.com/tag-platform/security/guides/privacy).

## Verification after a manual deployment

Use a fresh browser profile, DevTools Network with Preserve log, and filter for `gtag/js`, `g/collect` or `google-analytics`. Disable blockers only for the positive test. Never paste/log an enquiry payload into the console.

1. Clear this site's storage/cookies. Load the homepage and navigate internally without accepting: no gtag.js or Google Analytics collection request should appear. The initial HTML should not contain a GA script/preload.
2. Reject analytics, navigate and reload. No tracking requests should appear. Preference should persist and all forms should still work.
3. Open footer Analytics preferences and accept. Expect one gtag.js load and exactly one `page_view` for the current public pathname. Navigate to About and Portfolio, then Back/Forward: one `page_view` per route transition. Change catalogue category/product/colourway: no extra page view. Reload: one new initial page view. Inspect collection requests to confirm no query string, access token or customer data in the page location/referrer.
4. For DebugView, enable Google Analytics Debugger in the test browser, or after consent run `window.gtag('set', { debug_mode: true })` in DevTools and then navigate. In GA4 → Admin → DebugView, select the test device. Alternatively use Reports → Realtime and inspect page_view and generate_lead event counts; reporting can be delayed and blockers can suppress delivery.
5. With consent accepted, submit one authorised test enquiry through Request a Quote, Portfolio/product dialog and Private Label dialog. Also test Contact → Request a Quote. This sends actual email on a deployed site, so coordinate test content. Wait for the existing success message and a successful `/api/enquiries` response containing `ok: true`. Expect one `generate_lead` per unique submission, with only the intended `form_source` and standard GA parameters. Confirm the email arrives separately; analytics is not proof of delivery.
6. In a local/test environment, intercept `/api/enquiries` with HTTP 500, `{ ok: false }`, malformed JSON or a network failure. Expect the existing error and no generate_lead. Use mocked tests for idempotent resubmission; do not spam the production API to simulate retries.
7. Submit with GA blocked and with consent rejected: the normal enquiry success flow must still work, with no conversion tracking. Previously declined successful enquiries must not be replayed after acceptance.
8. Withdraw via footer Analytics preferences → Reject analytics. The page reloads intentionally to discard the running Google library. Check `_ga`/`_ga_*` cookies are removed on the host/parent domain, then navigate and submit: no further GA requests. Repeat in two tabs to verify withdrawal propagates through the storage event. Requests already in flight cannot be recalled; withdrawal cannot remove historical data from Google's servers.
9. Clear debug mode after testing (`window.gtag('set', { debug_mode: false })`) or close the test profile. Debug and internal-traffic filters can affect production reports.

## Validation and limitations

Local checks: TypeScript, ESLint, production webpack build with the two public analytics variables enabled, focused analytics tests, existing mocked enquiry-delivery tests, and SEO/catalogue regressions. Analytics tests model consent/storage/cookies, pageview deduplication, four allowlisted sources, duplicate submissions, failures, withdrawal and unavailable tracking. They do not prove live Google delivery, browser-script behaviour or actual inbox delivery.

No live GA4 delivery or account configuration has been verified. No automatic deployment was performed. No privacy policy exists in the repository: a business-approved notice covering Google Analytics, cookies, purposes, retention, recipients/transfers and withdrawal remains a launch-readiness item. The minimal consent text does not replace that notice. Choose appropriate GA4 retention/settings with the business; do not infer legal compliance from this implementation.

Withdrawal deletes accessible first-party GA cookies on current-path/root and host/parent-domain scopes. Cookies inaccessible to JavaScript cannot be removed by this UI. A reload is necessary because removing a script element alone does not stop a running analytics library.
