This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Enquiry email delivery

Both `/request-a-quote` and the shared Portfolio/Private Label enquiry dialog submit
JSON to `POST /api/enquiries`. The server calls Resend's HTTPS API directly.
The small `@vercel/firewall` SDK enforces shared production rate limits. Recipients are never accepted from
client submissions. Customer email is used only as `reply_to`; sender and recipient
come exclusively from server configuration. Portfolio reference/colour context is
preserved in the style field. This context is user-supplied information, not an
order or a verified catalogue specification.

### Manual Resend and Vercel setup

1. Create/sign in to your Resend account at https://resend.com. Check whether the
   business already has an account before creating another.
2. Open **Domains → Add domain**. Choose a business-owned sending domain, preferably
   a dedicated subdomain. A personal Gmail address is a recipient, not a sending
   domain you can verify.
3. At the domain's DNS host, manually add the exact record names, types, values,
   priorities and region-specific settings displayed by Resend. These normally
   include DKIM TXT and SPF TXT / return-path MX records. Do not replace the
   business's existing inbound MX records or create duplicate SPF records at the
   same hostname. Review existing SPF/DMARC policies with the domain administrator.
   Enable sending; receiving through Resend is not needed. Wait for Resend to show
   the sending domain as verified. Cloudflare Email Routing is not the outbound
   service used by this implementation.
4. Under **API Keys**, create a sending-access key, restricted to the verified
   sending domain where available. Store it privately; never commit or paste it
   into client code.
5. Copy `.env.example` to `.env.local` for local development and privately set:
   - `RESEND_API_KEY`: the sending API key.
   - `ENQUIRY_FROM_EMAIL`: a sender authorized on the verified domain (plain
     address or `Mahikaar <authorized-address>`).
   - `ENQUIRY_TO_EMAIL`: your personal Gmail address initially, as one plain email
     address, not a comma-separated list.
6. In **Vercel → Project → Settings → Environment Variables**, add the same three
   variables. Select the intended Production/Preview/Development scopes. Keep
   Preview recipients isolated from the business inbox. Never prefix these names
   with `NEXT_PUBLIC_`. Redeploy after changing environment variables; restart the
   local development server after changing `.env.local`.
7. After explicit approval for a real test, submit each interface and inspect
   Resend's delivery status and the Gmail inbox/spam folder. Check Reply-To and all
   optional fields. API acceptance does not establish mailbox delivery.
8. To switch to the official Mahikaar inbox, change only `ENQUIRY_TO_EMAIL` in the
   appropriate Vercel environment and redeploy. No code/public contact edits are
   needed. Perform an authorized delivery check afterward.

References: [Resend domain verification](https://resend.com/docs/dashboard/domains/introduction),
[Resend email API](https://resend.com/docs/api-reference/emails/send-email),
[Vercel environment variables](https://vercel.com/docs/environment-variables).

### Boundaries and launch requirements

- **Attachments are deferred.** The picker remains present, but selected files
  block submission with an explanatory error. No file bytes are uploaded or
  emailed. Use **Clear selected files** to keep your typed details and submit without files. Multipart requests and unsupported fields are rejected server-side.
  The previous unenforced 25MB promise is replaced with accurate limitation copy.
- Success means Resend accepted the request and returned a message ID, not
  confirmed inbox delivery. Provider delivery/bounce monitoring remains necessary.
  There is no database, durable queue, automatic acknowledgement or delivery-status
  webhook. During failures, customers retain their form data and can retry.
- Same-payload retries reuse an idempotency key for the lifetime of the mounted
  form, preventing duplicate provider sends within Resend's retention window.
  Refreshing the page creates a new attempt. Editing data creates a new key.
- Server validation checks required text, lengths, email/URL syntax, select and
  checkbox allowlists, and a hidden honeypot. JSON bodies are limited to 32KiB,
  including streamed requests without Content-Length. Origin must match the
  actual request URL; cross-site requests are rejected. Verify this behaviour on
  the deployed custom domain and preview domain. Origin headers are not a bot
  defense by themselves.
- **Before a deployed real-email test**, manually configure Vercel Firewall:
  open the project's **Firewall → Configure → New Rule**, select the
  `@vercel/firewall` condition and set Rate limit ID to **`mahikaar-enquiries`**.
  Configure a per-IP limit (start with 5 requests per 60 seconds), with rate-limit
  enforcement enabled. Save, review and publish the rule. Avoid extra conditions
  that could leave enquiry requests unmatched. Confirm plan support. For Preview,
  follow Vercel's protection-bypass/system-variable prerequisites. See the
  [official SDK setup](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting-sdk).
  No dashboard settings are modified by this repository. Counters are shared per
  region; there is no in-memory limiter. Production returns 429 when limited and
  503 if the rule is missing, the platform check fails, or its 3-second timeout
  expires. No email request is made in those cases. Protection is skipped only
  for localhost development; production outside Vercel also needs the platform
  integration and cannot silently fall back to unrestricted sending.
- No enquiry content, credentials or provider error bodies are logged by this
  implementation. Restrict access to recipient mailboxes and Resend records and
  establish a retention policy. No attachments or enquiries are saved locally.
- Form presentation, labels, options, required fields, product selection and
  public contact information are preserved. New states use existing styles; the
  modal remains open after success so the confirmation can be read.

### Verification

Run `npm test`, `npm run lint`, `npx tsc --noEmit`, `git diff --check`, and
`npm run build`. Tests compile the isolated enquiry utilities into the ignored
`.enquiry-tests` directory and use Node's built-in test runner. All outbound
responses are mocked: tests do not read live credentials or send emails.

Production configuration, DNS verification, actual inbox receipt and browser
interaction on Vercel must be checked separately after authorization. Until those
checks are completed, the integration is implemented but **not operationally
verified**.
