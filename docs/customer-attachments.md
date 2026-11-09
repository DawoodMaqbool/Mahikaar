# Customer attachments: implementation and release checklist

## Status

Implemented, **disabled by default**, and not yet operationally verified. Automated tests mock Blob, Scanii, Firewall and Resend. No customer documents, live scans, real emails, deployments or infrastructure changes were made for this implementation. Do not enable Production attachments until the coordinated Preview checks below pass. The existing operator-only Task 3B endpoint remains separate; customer flows cannot issue its grants.

## Workflow and trust boundaries

1. Request a Quote checks server availability. The file controls remain in their existing position and are disabled when unavailable. Email-only enquiries and Portfolio/Private Label remain independent of storage and scanning.
2. The customer selects files, sees names/sizes, and can remove them. On submission, the server validates a fixed manifest and creates a private durable session. A signed, Secure, HttpOnly, SameSite=Strict host cookie proves ownership. This anonymous capability is scoped to that customer's sessions; it is not a login. Same-origin checks, honeypot and shared Firewall counters restrict creation and operations.
3. Each file receives a server-generated UUID path in `attachments/v2/quarantine/`. The server issues a PUT-only presigned URL for that exact path, type and declared byte ceiling, valid for at most 60 seconds, with overwrite and random suffix disabled. Credentials stay server-side. These owner-authorized URLs are bearer capabilities; they must never be logged or shared. There is no unrestricted public grant issuer.
4. The browser sends file bytes directly to private Blob using XHR, with progress and cancellation. The application API receives bounded JSON metadata only. Sessions reserve at most five files and 25,000,000 bytes. A retry checks for an existing object before attempting another PUT.
5. The server reads the private object, checks actual path/size/type and file structure, and submits the actual bytes to Scanii. Until a clean, correctly bound response is received, the file stays quarantined. Unavailable scanners fail closed. Rejected files are marked rejected before deletion; deletion failures are retried by maintenance.
6. After a clean scan, the exact scanned bytes are copied to a separate immutable private `verified` path that browser grants cannot write. The manifest records its ETag, SHA-256, scan ID and time. Scanii's SHA-1 response checksum, length and MIME must also match. ETag checks prevent a replaced object from using an old scan approval.
7. `/api/enquiries` accepts only owner-bound session/file references, requires the complete fixed file set, rechecks private metadata and scan approval, and binds the session to the normalized enquiry and submission ID. Private manifest ETag compare-and-swap leases serialize scans and sends. Resend receives the existing customer/project fields and Reply-To, sanitized original filenames, byte sizes and a secure access link. Success requires Resend acceptance and recorded acceptance state.
8. The business access link opens `/enquiry-files`. Its token is in the URL fragment, removed immediately after reading, then sent in POST bodies. Access requires an accepted enquiry and unexpired, correctly scoped HMAC capability. Individual downloads are private GET-only presigned URLs lasting at most five minutes, using Blob's download URL helper. No storage credentials reach the reader.

Storage-backed private JSON manifests provide durable state without an additional database. The SDK uses fresh Vercel OIDC credentials, explicitly passes the pinned store ID, and does not fall back to a read-write token. Presigned permissions and private ACL enforcement must still be proven against actual storage in Preview; mocked assertions are not that proof.

## Initial file policy

- PDF and PNG only; maximum five files and **25,000,000 bytes combined**. Each individual file must be nonempty and no larger than that total.
- Filename normalization, length limits and rejection of path separators, control/bidirectional characters and suspicious path-like names. Sanitized original names live only in private manifests and the business email, never in Blob paths or routine logs.
- Extension and declared MIME must agree. Stored size/type/path must agree with the reserved manifest. Actual bytes must pass structural checks and Scanii.
- PNG checks include signature, chunk bounds/order/CRC, supported IHDR values, bounded decompression and scanline validation. Initially non-interlaced PNG only, at most 10,000 pixels per dimension and 16 million pixels total, with a 64 MiB decompression ceiling. Some otherwise valid PNGs will need re-exporting.
- PDF checks include header/version, EOF and cross-reference offset, and reject obvious encrypted/active/embedded content markers. This is a conservative structural screen, **not a complete PDF parser or malware detector**. Obfuscated content is the scanner's responsibility; no scanner guarantees that every malicious document is detected. Open downloads with patched tools and appropriate endpoint protection.
- AI, DXF and ZIP are not advertised or accepted. The format map and content validator are separate from session/storage logic so future formats can add dedicated parsing, expansion limits and scanning policies.

## Scanner setup — required before enabling

The implemented adapter uses **Scanii v2.2 synchronous analysis**, not a mocked verdict or extension-only substitute. Configure a Scanii account/API credential and a regional endpoint. Supported region identifiers: `us1`, `eu1`, `eu2`, `ap1`, `ap2`, `ca1`. Credentials are server-only; requests use HTTPS, no redirects, a 40-second timeout and generic filenames without customer identity. Any findings, malformed/inconsistent response or unavailable provider blocks release. A successful response must contain the matching checksum, MIME, length and a scan ID.

Before enabling, the owner must approve the account/tier and document-processing terms, select the processing region, and confirm the account accepts individual files up to 25,000,000 bytes with sufficient quotas. Costs depend on the selected account; no paid account was created. Scanii states that file contents are discarded after analysis, while result metadata can be retained for up to 400 days. Its retention is distinct from Mahikaar's 30-day Blob retention. Review the current DPA, privacy terms and chosen regional endpoint for confidential customer designs.

References: [Scanii resource contract](https://docs.scanii.com/article/113-version-2-1-resources), [official v2.2 CLI](https://github.com/scanii/scanii-cli), [security](https://docs.scanii.com/article/122-security-overview), [privacy](https://docs.scanii.com/article/142-privacy-policy).

## Configuration (names only; never commit values)

Existing variables remain in place:

- `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, `ENQUIRY_TO_EMAIL`
- `BLOB_STORE_ID`, `BLOB_WEBHOOK_PUBLIC_KEY`
- `ATTACHMENT_UPLOAD_SIGNING_SECRET` (at least 32 characters; HMAC domains distinguish the existing operator grants and customer capabilities)
- `VERCEL_OIDC_TOKEN` (Vercel-managed; do not manually publish or persist)

New variables:

- `ATTACHMENTS_ENABLED`: keep false in Production; true only for the approved configured Preview test.
- `ATTACHMENT_EXPECTED_STORE_ID`: must equal the effective `BLOB_STORE_ID`. Pin Preview to `mahikaar-enquiry-attachments-preview-security`'s ID, never the Production store ID. The equality check detects configuration drift; independently verify the ID/name/environment mapping in Vercel.
- `ATTACHMENT_BASE_URL`: HTTPS origin only, no path, query, credentials or trailing slash. Use a stable protected Preview origin for tests and the approved business origin later. This determines email access links, never a client-supplied host.
- `SCANII_API_KEY`, `SCANII_API_SECRET`, `SCANII_REGION`
- `CRON_SECRET`: independent random secret, at least 32 characters. Vercel supplies it as a Bearer header for scheduled requests.

All variables are server-only: no `NEXT_PUBLIC_` variants. The webhook public key is retained for the existing foundation but this synchronous customer flow requires no upload callback. No long-lived Blob read-write token is needed. Do not modify Production credentials, DNS or the Production store while configuring Preview.

## Firewall and operational setup

Keep the existing `mahikaar-enquiries` rule unchanged. Add and publish three SDK rate-limit rules, with per-IP enforcement and no extra condition that accidentally excludes these routes:

| Rate limit ID | Suggested starting budget |
| --- | --- |
| `mahikaar-attachment-sessions` | 3 requests per 10 minutes |
| `mahikaar-attachment-operations` | 60 requests per 10 minutes |
| `mahikaar-attachment-downloads` | 30 requests per minute |

These are initial operational values, not guarantees against all abuse. Validate SDK support and counters in the actual plan/Preview environment; tune for shared corporate NATs and retries. Missing rules, SDK errors and timeouts fail closed. Only localhost development bypasses platform counters. Availability can report configured services before the first Firewall/scanner request proves them healthy; actual operations still fail closed. Preserve Deployment Protection; do not create a bypass secret automatically.

`vercel.json` schedules authenticated cleanup every 15 minutes. Confirm the Vercel plan supports that frequency and the 120-second route duration before deploying. If not, use an approved scheduler with the same authenticated endpoint and interval, or upgrade the plan; do not leave cleanup unscheduled. Vercel cron normally runs on Production, so invoke it manually with authorized credentials during Preview verification. No scheduler or alert has been configured by this code change.

Configure alerts on cleanup non-2xx responses and the generic `attachment_cleanup_failed` / `attachment_rejection_cleanup_failed` events, plus scanner and quota failures. Logs contain counts/event names, not filenames, document contents, tokens or provider bodies. Restrict platform logs and third-party request instrumentation: signed Blob query URLs and POST capability bodies must not be captured by tracing/analytics.

## Access, retention and failures

- Email bearer access expires seven days from the **first submission attempt**. This timestamp stays fixed across uncertain Resend retries so its idempotency key always has the same email body. Forwarding the email grants access to the files; mailbox compromise does too. This is capability-based access, not recipient identity verification. The link remains reusable within its window. Protect the business mailbox, and never paste links into tickets or logs.
- Individual private download URLs expire after approximately five minutes (or earlier if email access expires). The download helper requests attachment disposition; confirm actual storage headers in Preview. Browsers may retain the randomized storage name for cross-origin downloads; original names are shown in the email and access page.
- Accepted files and manifests expire 30 days after acceptance. Copies in recipient downloads/email metadata are outside Blob cleanup. Quarantine originals are retained with accepted sessions until that cleanup.
- Truly abandoned sessions expire after 24 hours. Rejected sessions are deleted promptly, with scheduled retry on failure. An uncertain email attempt is retained conservatively for 30 days to avoid deleting files for an email the provider may already have accepted.
- Cleanup claims manifests before deleting fixed recorded paths. It processes 50 manifests and 100 objects per invocation, persists cursors and a global lease, and reconciles late/orphaned upload completions after 24 hours. Large backlogs require additional authorized invocations/monitoring; deletion is scheduled, not an exact-time guarantee. Failed deletions remain retryable and return a failure status.
- Interrupted uploads can retry without duplicating a completed object. Clean files are reused for the same file selection. A changed file set creates a new session; abandoned sets are cleaned later. Failed scans retain quarantine for retry; unsafe files must be removed/replaced.
- Attachment-bearing enquiries bind one session to one submission/payload. Concurrent requests are rejected; an accepted replay does not resend. Uncertain Resend failures can retry the same attempt within its 24-hour idempotency window. Editing an already attempted enquiry requires a new file session, with explicit error guidance. Refreshing clears client state; automatic cross-refresh recovery is not implemented.
- Failures preserve entered form values. The frontend never claims inbox delivery or success for incomplete files. Disabling customer uploads does not disable access to previously accepted files or cleanup, provided storage/signing configuration remains valid.

## Automated validation and its limits

Run `npm test`, `npm run lint`, `npx tsc --noEmit`, `git diff --check`, and `npm run build -- --webpack`. Tests cover policy, metadata, ownership, grants, leases, scanner response binding, rejected/unavailable scans, retries, Resend errors/idempotency, access expiry/scope, cleanup/orphans, and existing email-only behaviour. XHR tests cover progress, interruption and cancellation. Storage, scanner and email responses are mocked. They do not prove Vercel's live private ACL, signed constraints/CORS, conditional writes, scanner subscription, actual mail delivery or browser behaviour.

## One coordinated Preview verification plan

After review, authorize one isolated Preview session covering all of the following:

1. Configure the new scanner credentials/region, independent cron secret, origin, storage pin and three Firewall IDs in Preview only. Confirm the test store is private and isolated, OIDC is active, Production flag remains false, test inbox is correct, and Deployment Protection stays enabled. Confirm the plan supports route duration and cleanup schedule. Deploy the reviewed code to Preview only.
2. With harmless synthetic PNG/PDF fixtures, exercise the real browser flow: selection, drag/drop, removal, progress, five-file aggregate boundary, field preservation, interrupted request and retry. Verify direct bytes go to Blob, not the enquiry endpoint. Test no-file Quote and Portfolio/Private Label regression once real email testing is authorized.
3. Verify actual storage enforcement with narrowly scoped disposable test grants: unsigned GET/HEAD rejection, path/operation tampering, expired authorization, maximum size, no overwrite, and inability to use quarantine grants on verified paths. Verify real CAS conflicts do not produce duplicate sends or lost state. Do not log signed URLs.
4. Verify the configured real scanner accepts clean fixtures and matches bytes/metadata. Simulate scanner network failure and confirm quarantine/no email/no download; use a scanner-approved harmless antivirus test fixture only under explicit test approval. Check malformed content and a changed stored object cannot reuse approval.
5. Submit an approved clean enquiry to the test inbox; inspect Resend acceptance and actual email/Reply-To, filenames and sizes. Retry the exact submission and confirm no second send. Verify forged/cross-session/partial references fail and feature-off still permits no-file enquiries.
6. Open the business access link under Preview protection. Verify expiry/scope, unsigned storage rejection, private signed download expiry, forced-download headers, and exact downloaded bytes. Confirm page/API responses are not cached and tokens do not enter logs.
7. Exercise authenticated cleanup using test-only expired manifests, rejected objects and a simulated interrupted deletion; verify successful retry and orphan reconciliation. Restore the isolated store to its agreed baseline and report every object retained/deleted. Review count-only alerts and ensure no Production data changed.

Do not call any item live-verified until its actual response has been observed. Keep Production attachments disabled until this consolidated verification and service/data-processing configuration are approved.

## Files changed in this implementation pass

Existing files modified:

- `.env.example`
- `README.md`
- `docs/private-blob-foundation.md`
- `package.json`
- `package-lock.json`
- `src/app/api/enquiries/route.ts` (longer ceiling for attachment verification/commit; no-file client timeout unchanged)
- `src/components/quote/QuoteForm.tsx`
- `src/lib/enquiries/client.ts`
- `src/lib/enquiries/server.ts`
- `tests/enquiries.test.mjs`
- `tests/private-uploads.test.mjs` (compiled import location only)

New files:

- `docs/customer-attachments.md`
- `vercel.json`
- `tsconfig.tests.json`
- `src/app/api/enquiries/attachments/route.ts`
- `src/app/api/enquiries/attachments/sessions/route.ts`
- `src/app/api/enquiries/attachments/status/route.ts`
- `src/app/api/enquiries/attachments/upload/route.ts`
- `src/app/api/enquiries/attachments/verify/route.ts`
- `src/app/api/enquiries/attachments/download/route.ts`
- `src/app/api/internal/attachments/cleanup/route.ts`
- `src/app/enquiry-files/page.tsx`
- `src/app/enquiry-files/FileAccess.tsx`
- `src/components/quote/QuoteAttachments.tsx`
- `src/components/quote/useQuoteAttachments.ts`
- `src/lib/attachments/policy.ts`
- `src/lib/attachments/content.ts`
- `src/lib/attachments/security.ts`
- `src/lib/attachments/types.ts`
- `src/lib/attachments/blob-store.ts`
- `src/lib/attachments/scanner.ts`
- `src/lib/attachments/service.ts`
- `src/lib/attachments/http.ts`
- `src/lib/attachments/rate-limit.ts`
- `src/lib/attachments/client.ts`
- `tests/attachment-helpers.mjs`
- `tests/attachments.test.mjs`

The existing `src/lib/storage/` and internal operator upload route are reused, not replaced. Pre-existing uncommitted foundation files and `Content-Refinement.md` are not new work from this pass. No environment file containing real credentials was changed. The only newly added direct dependency in this pass is `@vercel/oidc` 3.8.10 (already present transitively); `@vercel/blob` remains 2.8.2.
