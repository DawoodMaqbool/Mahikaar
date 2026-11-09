import { handleAttachment } from '@/lib/attachments/http';
export const runtime = 'nodejs';
export const maxDuration = 120;
export async function GET(request: Request) {
  return handleAttachment(request, 'cleanup');
}
