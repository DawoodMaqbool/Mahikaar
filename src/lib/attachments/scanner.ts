import { createHash } from 'node:crypto';
import { AttachmentError } from './policy';
import { hash } from './security';
import type { Scan } from './types';
/** Real synchronous Scanii v2.2 integration. No callbacks, public URLs or mocked verdicts. */
export function scaniiScanner(env: NodeJS.ProcessEnv, transport: typeof fetch = fetch): Scan {
  return async (bytes, contentType) => {
    const regions = ['us1','eu1','eu2','ap1','ap2','ca1'];
    if (!env.SCANII_API_KEY || !env.SCANII_API_SECRET || !regions.includes(env.SCANII_REGION ?? '')) throw new AttachmentError('File safety checks are temporarily unavailable. Please retry later.', 503);
    const body = new FormData();
    body.set('file', new Blob([new Uint8Array(bytes)], { type: contentType }), contentType === 'image/png' ? 'upload.png' : 'upload.pdf');
    try {
      const response = await transport(`https://api-${env.SCANII_REGION}.scanii.com/v2.2/files`, { method: 'POST', headers: { Authorization: 'Basic ' + Buffer.from(env.SCANII_API_KEY + ':' + env.SCANII_API_SECRET).toString('base64') }, body, redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(40_000) });
      if (!response.ok) throw new Error();
      const result = await response.json();
      if (!result || typeof result.id !== 'string' || !result.id || result.checksum !== createHash('sha1').update(bytes).digest('hex') || result.content_length !== bytes.length || result.content_type !== contentType || !Array.isArray(result.findings) || result.findings.some((item: unknown) => typeof item !== 'string')) throw new Error();
      if (result.findings.length) throw new AttachmentError('A file did not pass the required safety checks. Remove or replace it.', 422);
      return { id: result.id, digest: hash(bytes) };
    } catch (error) {
      if (error instanceof AttachmentError) throw error;
      throw new AttachmentError('File safety checks could not be verified. Your file remains quarantined; please retry later.', 503);
    }
  };
}
