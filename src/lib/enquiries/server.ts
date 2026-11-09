/** Server entry point: imported only by the Route Handler. Never log request bodies. */
const MAX_BODY = 32_768;
const emailPattern = /^[^\s<>@,;\r\n]+@[^\s<>@,;\r\n]+\.[^\s<>@,;\r\n]+$/;
const choices: Record<string, Record<string, string>> = {
  footwearType: { oxfords: 'Oxfords', brogues: 'Full & Semi Brogues', chelsea: 'Chelsea Boots', loafers: 'Penny Loafers', monkstraps: 'Monkstraps', bespoke_silhouette: 'Your Own Design' },
  quantityScale: { samples: 'Samples first (1–5 pairs)', trial: '12–24 pairs', boutique: '25–50 pairs', commercial: '50–200 pairs', scaled: '200+ pairs', unsure: 'Not sure yet' },
  timeline: { ss27: 'Spring / Summer 2027', aw27: 'Autumn / Winter 2027', sample_first: 'Sample or prototype first', ongoing: 'Ongoing / repeat orders', discuss: 'To be discussed' },
  brandingOption: { insole_emboss: 'Custom Insole Debossing', packaging: 'Branded Packaging', hardware: 'Branded Hardware', bespoke_lasts: 'Sizing Requirements' },
  volume: { '12–24 Pairs (Trial Order)': '12–24 Pairs (Trial Order)', '25–50 Pairs (Seasonal Capsule)': '25–50 Pairs (Seasonal Capsule)', '50+ Pairs (Private Label Volume)': '50+ Pairs (Private Label Volume)', 'Sample or Prototype Request': 'Sample or Prototype Request' },
};
const labels: Record<string, string> = { fullName: 'Customer name', companyName: 'Brand / Company', businessEmail: 'Business email', territory: 'Country', footwearType: 'Styles of interest', quantityScale: 'Estimated quantity', projectDescription: 'Project description', timeline: 'Preferred delivery window', brandingOption: 'Branding / Customisation', brandUrl: 'Website / Social link', specNotes: 'Materials, sizing and other notes', style: 'Style / Category / Product reference and colour', volume: 'Estimated order volume', requirements: 'Leather, colour and branding requirements' };
class InputError extends Error {}
export function validateEnquiry(input: unknown) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new InputError('Invalid enquiry.');
  const data = input as Record<string, unknown>;
  const quote = data.source === 'Request a Quote';
  if (!quote && data.source !== 'Portfolio' && data.source !== 'Private Label') throw new InputError('Invalid enquiry source.');
  const keys = quote ? ['fullName','companyName','businessEmail','territory','footwearType','quantityScale','projectDescription','timeline','brandingOption','brandUrl','specNotes'] : ['fullName','companyName','businessEmail','style','volume','requirements'];
  if (Object.keys(data).some(key => ![...keys, 'source', 'website', 'submissionId'].includes(key))) throw new InputError('Unsupported enquiry fields. Attachments are not yet supported.');
  if (typeof data.website !== 'string' || data.website !== '') throw new InputError('Unable to submit this enquiry.');
  if (typeof data.submissionId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(data.submissionId)) throw new InputError('Invalid submission reference.');
  const required = ['fullName','companyName','businessEmail', ...(quote ? ['territory'] : ['style'])];
  const values: Record<string, string> = {};
  for (const key of keys) {
    const raw = data[key];
    if (key === 'footwearType' || key === 'brandingOption') {
      if (raw === undefined) continue;
      if (!Array.isArray(raw) || raw.length > Object.keys(choices[key]).length || raw.some(v => typeof v !== 'string' || !Object.hasOwn(choices[key], v)) || new Set(raw).size !== raw.length) throw new InputError(`Invalid ${labels[key]}.`);
      if (raw.length) values[key] = raw.map(v => choices[key][v]).join(', ');
      continue;
    }
    if (raw !== undefined && typeof raw !== 'string') throw new InputError(`Invalid ${labels[key]}.`);
    const value = ((raw as string | undefined) ?? '').trim();
    const max = ['projectDescription','specNotes','requirements'].includes(key) ? 5000 : key === 'brandUrl' ? 2048 : key === 'style' ? 500 : 254;
    if ((required.includes(key) && !value) || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)) throw new InputError(`Please check ${labels[key]} (maximum ${max} characters).`);
    if (!value) continue;
    if (choices[key] && !Object.hasOwn(choices[key], value)) throw new InputError(`Invalid ${labels[key]}.`);
    if (key === 'businessEmail' && !emailPattern.test(value)) throw new InputError('Please enter a valid business email.');
    if (key === 'brandUrl') {
      try { if (!['http:', 'https:'].includes(new URL(value).protocol)) throw new Error(); } catch { throw new InputError('Please enter a valid website URL beginning with https:// or http://.'); }
    }
    values[key] = choices[key]?.[value] ?? value;
  }
  return { source: data.source as string, submissionId: data.submissionId, values };
}
export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]!);
}
export function composeEmail(enquiry: ReturnType<typeof validateEnquiry>) {
  const rows = [['Source', enquiry.source], ...Object.entries(enquiry.values).map(([key,value]) => [labels[key],value])];
  return { subject: `Mahikaar enquiry — ${enquiry.source}`, text: rows.map(([label,value]) => `${label}:\n${value}`).join('\n\n'), html: rows.map(([label,value]) => `<p><strong>${escapeHtml(label)}</strong><br>${escapeHtml(value).replace(/\n/g,'<br>')}</p>`).join('') };
}
const reply = (status: number, error?: string) => Response.json(error ? { error } : { ok: true }, { status, headers: { 'Cache-Control': 'no-store' } });
export async function handleEnquiry(request: Request, dependencies: { env?: NodeJS.ProcessEnv; fetch?: typeof fetch; rateLimit?: (request: Request) => Promise<boolean> } = {}) {
  const env = dependencies.env ?? process.env;
  const send = dependencies.fetch ?? fetch;
  try {
    const origin = request.headers.get('origin');
    if (!origin || origin !== new URL(request.url).origin || request.headers.get('sec-fetch-site') === 'cross-site') return reply(403, 'Please submit from this website.');
    if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return reply(415, 'Only enquiry text is supported. Attachments are not yet supported.');
    if (Number(request.headers.get('content-length')) > MAX_BODY) return reply(413, 'Your enquiry is too large. Please shorten your notes.');
    // Bound bytes while reading, even when Content-Length is absent or inaccurate.
    const reader = request.body?.getReader();
    if (!reader) return reply(400, 'Missing enquiry.');
    const chunks: Uint8Array[] = []; let size = 0;
    while (true) {
      const { done, value } = await reader.read(); if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY) { await reader.cancel(); return reply(413, 'Your enquiry is too large. Please shorten your notes.'); }
      chunks.push(value);
    }
    let input: unknown;
    try { input = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return reply(400, 'Invalid enquiry data.'); }
    const enquiry = validateEnquiry(input);
    // Production must use a shared platform limiter, never an instance-local counter.
    // Only local development may operate without the platform integration.
    const localDevelopment = env.NODE_ENV === 'development' && ['localhost', '127.0.0.1', '[::1]'].includes(new URL(request.url).hostname);
    if (!dependencies.rateLimit && !localDevelopment) return reply(503, 'Enquiry protection is temporarily unavailable. Please try again later.');
    if (dependencies.rateLimit) {
      try {
        if (await dependencies.rateLimit(request)) return Response.json({ error: 'Too many enquiries. Please wait a minute before retrying.' }, { status: 429, headers: { 'Cache-Control': 'no-store', 'Retry-After': '60' } });
      } catch {
        return reply(503, 'Enquiry protection is temporarily unavailable. Please try again later.');
      }
    }
    const { RESEND_API_KEY: key, ENQUIRY_FROM_EMAIL: from, ENQUIRY_TO_EMAIL: to } = env;
    if (!key || !from || !to || !emailPattern.test(to) || /[\r\n]/.test(from)) return reply(503, 'Enquiry delivery is temporarily unavailable. Please try again later or use our contact page.');
    const response = await send('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'Idempotency-Key': `enquiry/${enquiry.submissionId}` },
      body: JSON.stringify({ from, to: [to], reply_to: enquiry.values.businessEmail, ...composeEmail(enquiry) }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) return reply(502, 'We could not submit your enquiry. Please retry; your details have been kept.');
    const result = await response.json();
    if (!result || typeof result.id !== 'string' || !result.id) return reply(502, 'We could not confirm submission. Please retry.');
    return reply(200);
  } catch (error) {
    if (error instanceof InputError) return reply(400, error.message);
    return reply(502, 'We could not confirm submission. Please retry; your details have been kept.');
  }
}
