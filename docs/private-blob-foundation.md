> Historical Task 3B operator foundation. For the new, feature-flagged customer workflow, see [customer-attachments.md](customer-attachments.md). No live verification is implied by either implementation.

# Private Blob foundation — Task 3B

This is a protected server foundation, **not customer attachment support**. The
Quote form, modal, Resend endpoint and public site remain untouched. The code
neither receives file bytes nor creates a file-view/download proxy.

## SDK and authentication

Installed and inspected `@vercel/blob` 2.8.2. It exports `issueSignedToken` and
`presignUrl`. The route uses these modern APIs directly, rather than the older
client-token flow or server-proxied avatar sample.

The Vercel store `mahikaar-enquiry-attachments` must remain **Private** and connected
to the intended project/environment. Server configuration is:

- `BLOB_STORE_ID`: connected private store ID, not its display name.
- `VERCEL_OIDC_TOKEN`: managed by Vercel; passed explicitly to Blob with the store ID.
- `ATTACHMENT_UPLOAD_SIGNING_SECRET`: a new, independent, cryptographically random
  secret of at least 32 bytes, server only. Configure manually when approving a
  controlled test; no value is generated, printed or configured by this task.
- `BLOB_WEBHOOK_PUBLIC_KEY`: keep the existing connection variable. This foundation
  does not register completion callbacks, so it does not consume the key yet.

No long-lived Blob read-write token is introduced. The upload endpoint fails
closed without an OIDC token. Local development requires authorized Vercel OIDC
credentials; do not substitute a read-write token to bypass the requirement.

## Authorization contract

1. A **trusted server/operator**, after separate authorization, calls
   `createUploadGrant({ size, contentType }, signingSecret)`. There is intentionally
   no public HTTP grant-minting endpoint and no customer grant UI. Do not expose
   this helper or the signing secret to a client component.
2. The helper creates a UUID path under `quarantine/foundation/`, allowing only
   PNG and PDF for synthetic foundation testing. It returns an HMAC-signed grant
   containing the exact path, maximum size, content type and a five-minute expiry.
   Original filenames and customer data are not included.
3. A controlled client POSTs JSON `{ "size": ..., "contentType": ... }` to
   `/api/internal/attachments/upload`, sending the grant in `Authorization: Bearer`
   and a same-origin `Origin` header. No pathname, access setting or operation is
   accepted in the JSON body. File bytes are not accepted.
4. The route verifies the grant, streamed 1KiB body limit, matching size/type and
   origin. Production uses the existing `mahikaar-enquiries` shared Firewall rule,
   without changing it. Missing protection/provider failures return sanitized
   errors. Localhost development may skip the platform check but never the grant.
5. Blob delegation is restricted to **one exact path**, `operations: ['put']`,
   authorized MIME type and maximum size, using explicit OIDC authentication.
   The route returns a presigned PUT URL valid for at most 60 seconds, never beyond
   the grant's expiry. Both signing layers carry the size/type limits.
6. The presigned operation is private, with `allowOverwrite: false` and
   `addRandomSuffix: false` (the path is already randomized server-side). Only the
   restricted upload URL, path and expiry are returned. OIDC and signing keys stay
   server-side. Treat the returned URL and grant as temporary bearer credentials:
   do not log them, put them in analytics or share them.
7. The controlled client PUTs bytes directly to Blob. No success/acceptance of an
   enquiry or scanned file is inferred from this operation.

Grants can be retried until expiry; they are **not one-time consumed tickets**.
Retries target the same path, cannot extend the grant expiry and cannot authorize
replacement. Actual no-overwrite enforcement must be proven against storage.

The 25,000,000-byte limit is **per authorized file in this foundation**. Five-file
and aggregate per-enquiry reservations are not implemented or claimed. Neither
file signatures, malware scanning, retention, cleanup nor safe staff downloads
are implemented. All uploads stay quarantined; do not use real designs yet.

## Automated checks versus storage enforcement

`npm test` runs the existing enquiry regression tests and private-upload tests.
The Blob token issuer, URL signer and Firewall are mocked. Tests cover unauthorized,
expired and tampered grants; traversal/path manipulation; oversize/type/body
rejection; exact OIDC and private signing options; no-overwrite settings; absence
of read authorization/proxying; safe provider failures; and bounded retries.

These tests **do not prove Vercel's storage backend enforces ACLs, byte limits,
signed expiry or overwrite restrictions**. No live Blob request is made by tests.

## Exact controlled live test procedure — approval required

**Not executed.** Approval must cover temporary synthetic uploads and their deletion
in the nominated store. Do not deploy automatically. If using a preview, its
deployment needs separate approval. Confirm store ID, Private access mode, OIDC
connection and the new signing secret privately before starting. Reuse the existing
Firewall rule; verify it applies in the nominated environment without changing it.

Use an authorized local development server with valid OIDC credentials, or an
approved preview. Set `APP_ORIGIN` to that origin for all requests. Keep grants,
signed URLs and credentials in memory; do not print them or commit test artifacts.

1. Compile utilities with `npm test` (mocked only). In a trusted Node operator
   process load `createUploadGrant` from
   `.enquiry-tests/storage/upload-grants.js`. Supply the signing secret privately
   from the operator environment, never a source-code literal or shell history.
2. Decode this harmless 1x1 PNG in memory:
   `iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/l9sAAAAASUVORK5CYII=`.
   Use the resulting byte length as `size` and `image/png` as `contentType`.
3. Call `createUploadGrant` for those values. POST the same JSON to
   `APP_ORIGIN/api/internal/attachments/upload` with `Origin: APP_ORIGIN`,
   `Content-Type: application/json` and `Authorization: Bearer <grant>`.
   Expect 200 and a short-lived PUT URL. Confirm no storage signing key or OIDC
   credential occurs in the response. Do not print the URL.
4. PUT the PNG buffer to that URL with `Content-Type: image/png`. Expect success;
   retain the returned Blob metadata privately. Verify the object belongs to the
   nominated private store and exact authorized path.
5. Fetch the returned **unsigned** object URL without cookies or Authorization,
   from a fresh client, with redirects disabled. Expect an authentication denial
   and no file bytes. Repeat for HEAD. A 200 or public redirect fails the test.
6. Request GET on the upload-authorization API and attempt to mint an upload URL
   without a grant, with an altered grant, and with an expired grant. Expect
   405, 401/403 and no successful storage authorization. Add `pathname`, `access`
   or `operation: 'get'` to the JSON body; expect 400.
7. With a fresh grant/unused path, change each presigned URL field independently:
   pathname, private access, maximum size, allowed type, expiry and overwrite flag.
   Send a PUT. Each modified request must fail authorization and create no object.
   Do not merely check that the SDK accepts the private option.
8. With another fresh unused path and an unmodified URL, PUT a buffer one byte
   larger than its authorized size. Expect rejection and verify no object exists.
   Repeat with the wrong MIME type. Then authorize exactly 25,000,000 bytes for
   a synthetic buffer; confirm acceptance at the boundary and rejection of
   25,000,001. This is a byte-limit test, not a PNG format-validation test.
9. Attempt another PUT at the successful path using an unmodified authorization.
   Expect a conflict/precondition rejection. Compare the existing object's ETag
   and size to confirm it was not replaced.
10. Obtain a new URL for an unused path, wait until its returned `expiresAt` plus
    a small clock margin, then PUT. Expect an authentication denial and no object.
11. Using trusted server OIDC access or the private dashboard only, list the exact
    test paths and delete all test-created objects. Confirm absence afterward.
    Do not delete other objects or change store access settings.
12. Record only test labels, status codes and pass/fail results. Any public read,
    successful tampered/expired PUT, overwrite or size-limit bypass blocks customer
    integration. Keep the endpoint protected and investigate before proceeding.

## Next task boundary

Before connecting the form: build upload-session/count/aggregate reservations,
completion verification, scanner/quarantine handling, expiring authenticated
retrieval, retention/cleanup, retry association and attachment email references.
The existing email-only enquiry path must remain independent.

References:
- https://vercel.com/docs/vercel-blob/vercel-signed-urls
- https://vercel.com/docs/vercel-blob/private-storage
