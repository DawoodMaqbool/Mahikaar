import { handleAttachment } from '@/lib/attachments/http';
export const runtime = 'nodejs';
export const maxDuration = 120;
export async function POST(request: Request) {
  return handleAttachment(request, 'status');
}
