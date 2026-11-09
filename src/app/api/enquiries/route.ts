import { handleEnquiry } from '@/lib/enquiries/server';
import { enquiryRateLimited } from '@/lib/enquiries/rate-limit';

export const runtime = 'nodejs';
export const maxDuration = 30;
export async function POST(request: Request) {
  return handleEnquiry(request, {
    rateLimit: process.env.NODE_ENV === 'production' ? enquiryRateLimited : undefined,
  });
}
