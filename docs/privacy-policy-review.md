# Privacy disclosure — business-owner review required

The `/privacy-policy` page is a draft. It has not been approved as a final legal notice or deployed by this task. Its banner and final section explicitly identify owner review. There are no placeholder company details, invented retention periods, legal bases, transfer safeguards or compliance guarantees.

## Verified implementation facts

| Disclosure | Evidence |
| --- | --- |
| Name, company, business email, country for quotes, optional project fields and selected style/context | `src/components/quote/QuoteForm.tsx`, `src/components/portfolio/InquiryModal.tsx`, `src/lib/enquiries/server.ts` |
| Enquiry details/source sent through Resend; supplied business email used as Reply-To; acceptance required before success | `src/lib/enquiries/server.ts`, `src/lib/enquiries/client.ts` |
| Vercel hosting and production rate limiting | `src/app/api/enquiries/route.ts`, `src/lib/enquiries/rate-limit.ts`, existing deployment documentation |
| Opt-in GA4; no custom enquiry content; pathname-only views; consent and local submission deduplication storage | `src/lib/analytics.ts`, `src/components/analytics/AnalyticsConsent.tsx`, `docs/analytics.md` |
| Google Fonts icon stylesheet loads independently of analytics; text fonts use next/font | `src/app/layout.tsx` |
| Lahore, Pakistan and existing privacy contact email | `src/components/contact/ContactBlocks.tsx` |
| Customer uploads disabled by the existing server feature flag/availability checks | `src/lib/attachments/security.ts`, `src/lib/attachments/http.ts`, `.env.example`, `docs/customer-attachments.md` |

Production account settings were not inspected or changed. The description of disabled uploads relies on the project's required Production setting `ATTACHMENTS_ENABLED=false`; confirm it remains false before release. Existing attachment documentation contains storage-specific retention rules; these are not email retention rules and have not been represented as retention for current enquiries.

## Owner decisions before final publication

- Confirm the legal identity and appropriate contact details of the person or organisation responsible for personal information. The draft uses only the existing Mahikaar business name, workshop city/country and public contact email.
- Confirm which privacy laws apply, the legal bases for enquiry/operational processing, and whether representative or other disclosures are required. The draft describes the analytics opt-in mechanism without asserting broader legal bases.
- Set retention periods or documented criteria for business mailbox records, correspondence, Resend records, Vercel/security logs and GA4 data/cookies. Verify deletion workflows and any records that need to be retained. No period is inferred from code or provider defaults.
- Identify the business mailbox provider, actual service-provider/account processing regions, recipients and any international-transfer arrangements. Review applicable agreements and safeguards before making claims about them.
- Assign responsibility for privacy requests, identity checks where needed, response procedures, applicable rights and complaint routes. The draft makes rights conditional on applicable law and circumstances; it invents no response deadlines or DPO.
- Confirm the disclosure covers actual business practices beyond the website (such as email follow-up, telephone enquiries, other tools or any marketing use).
- Review the Google Fonts icon request that occurs without analytics consent. This task discloses the existing request and does not change font delivery or branding.
- Review and approve the final wording, then replace the draft label and record the actual approval/effective date. No effective date has been invented.

General review reference: [ICO transparency guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/). This supports the review checklist, not a claim that UK GDPR applies to all Mahikaar activity or that this draft guarantees compliance. Business-specific statements are sourced from this repository.

## UI and SEO scope

The footer and existing analytics consent panel link to `/privacy-policy`. The page uses the existing metadata helper and canonical origin. Adding it to `routes` automatically includes it in the existing sitemap; no second sitemap or structured-data system was added. The existing GA4 public-page allowlist/event logic is untouched, so this new notice does not introduce a new tracked pageview route.

The quote form consumes the existing availability state. While disabled, unavailable or checking, the upload component renders nothing and optional section labels do not mention design files. With availability approved, the existing picker, instructions and labels return. The availability request, preparation/submission logic, server flag, storage, scanner, cleanup Cron and security checks are untouched. Product/Private Label dialogs have no upload controls and required no changes.

The permanent privacy notice states that uploads are currently disabled. Review the notice for accuracy before enabling uploads in the future, alongside the existing operational verification requirements.

## Validation

Run `npx tsc --noEmit`, `npm run lint`, a production build, then the focused tests. `tests/privacy-interface.test.mjs` renders the actual UI with controlled availability states and checks that the ordinary form fields remain; it checks both navigation links and the draft notice. `tests/seo-output.test.mjs` checks all eight built public pages and the sitemap. Existing analytics and enquiry tests verify consent, deduplication, failure behaviour and mocked email acceptance/delivery.

Local validation does not prove live GA4 delivery, inbox delivery, Production feature-flag state or legal compliance. No automatic deployment is included.
