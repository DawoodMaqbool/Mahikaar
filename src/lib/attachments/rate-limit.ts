import { checkRateLimit } from '@vercel/firewall';
import { AttachmentError } from './policy';
/** Separate budgets prevent legitimate multi-file workflows exhausting enquiry sends. */
export async function attachmentRateLimited(request: Request, category: 'sessions' | 'operations' | 'downloads') {
  const result = await checkRateLimit('mahikaar-attachment-' + category, { request, timeout: 3000 });
  if (result.error) throw new AttachmentError('Attachment protection is unavailable.', 503);
  return result.rateLimited;
}
