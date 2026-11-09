export const attachmentMessage = 'Attachments are not yet supported. Please remove selected files before submitting. You can share design files with our team after initial contact.';

export function enquiryFields(form: HTMLFormElement) {
  const data = new FormData(form);
  const fields: Record<string, string | string[]> = {};
  for (const [key, value] of data) {
    if (key === 'attachments') continue;
    if (typeof value === 'string') fields[key] = key === 'footwearType' || key === 'brandingOption' ? data.getAll(key) as string[] : value;
  }
  return fields;
}
export async function submitEnquiry(payload: Record<string, unknown>) {
  let response: Response;
  try {
    response = await fetch('/api/enquiries', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload), signal: AbortSignal.timeout(25_000),
    });
  } catch {
    throw new Error('We could not confirm submission. Please check your connection and retry; your details have been kept.');
  }
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.ok !== true) throw new Error(result?.error || 'We could not confirm submission. Please retry; your details have been kept.');
}
