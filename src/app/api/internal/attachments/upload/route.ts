import { handlePrivateUpload } from '@/lib/storage/private-upload';
import { enquiryRateLimited } from '@/lib/enquiries/rate-limit';

export const runtime = 'nodejs';
export const maxDuration = 15;
export async function POST(request: Request) {
  return handlePrivateUpload(request, {
    rateLimit: process.env.NODE_ENV === 'production' ? enquiryRateLimited : undefined,
  });
}
