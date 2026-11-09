import { checkRateLimit } from '@vercel/firewall';

/** Shared Vercel counters; never fall back to unprotected production delivery. */
export async function enquiryRateLimited(
  request: Request,
  check: typeof checkRateLimit = checkRateLimit,
) {
  const result = await check('mahikaar-enquiries', { request, timeout: 3000 });
  // The SDK reports a missing rule as allowed plus an error. Treat it as unavailable.
  if (result.error === 'not-found' || typeof result.rateLimited !== 'boolean') {
    throw new Error('Enquiry rate limiting is not configured.');
  }
  return result.rateLimited;
}
