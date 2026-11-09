import { validateManifest, type FileDescription } from './policy';
export type SessionStatus = { sessionId: string; expiresAt: number; files: (FileDescription & { id: string; status: 'pending' | 'ready' | 'rejected' })[] };
export async function attachmentRequest<T>(action: string, data: unknown, signal?: AbortSignal): Promise<T> {
  let response: Response;
  try { response = await fetch('/api/enquiries/attachments/' + action, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), credentials: 'same-origin', signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(100_000)]) : AbortSignal.timeout(100_000) }); }
  catch { throw new Error('Attachment processing was interrupted. Your details are kept; please retry.'); }
  const result = await response.json().catch(() => null);
  if (!response.ok || !result) throw new Error(result?.error || 'Attachment processing failed. Please retry.');
  return result as T;
}
export function describeSelection(files: File[]) {
  return validateManifest(files.map(file => ({ name: file.name, size: file.size, contentType: file.type })));
}
/** Externally injectable XHR makes real progress/interruption handling testable. */
export function uploadFile(url: string, file: File, progress: (percent: number) => void, signal?: AbortSignal, createXhr = () => new XMLHttpRequest()) {
  return new Promise<void>((resolve, reject) => {
    const xhr = createXhr();
    const abort = () => xhr.abort();
    const finish = (error?: Error) => { signal?.removeEventListener('abort', abort); if (error) reject(error); else resolve(); };
    xhr.open('PUT', url); xhr.timeout = 90_000;
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.upload.onprogress = event => { if (event.lengthComputable) progress(Math.round(event.loaded / event.total * 100)); };
    xhr.onload = () => xhr.status >= 200 && xhr.status < 300 ? finish() : finish(new Error('File upload failed. Please retry; completed files will be reused.'));
    xhr.onerror = () => finish(new Error('File upload was interrupted. Check your connection and retry.'));
    xhr.ontimeout = () => finish(new Error('File upload timed out. Please retry.'));
    xhr.onabort = () => finish(new Error('File upload was cancelled. Please retry.'));
    signal?.addEventListener('abort', abort, { once: true });
    if (signal?.aborted) { finish(new Error('File upload was cancelled.')); return; }
    xhr.send(file);
  });
}
