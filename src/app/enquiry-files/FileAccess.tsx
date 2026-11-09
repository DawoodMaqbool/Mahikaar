'use client';
import { useEffect, useRef, useState } from 'react';
import { attachmentRequest } from '@/lib/attachments/client';
export function FileAccess() {
  const access = useRef(''); const busy = useRef(false);
  const [hasAccess, setHasAccess] = useState(false); const [pending, setPending] = useState(false);
  const [files, setFiles] = useState<{ id: string; name: string; size: number }[] | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const token = new URLSearchParams(window.location.hash.slice(1)).get('access');
    // Preserve the in-memory capability when development Strict Mode repeats effects.
    if (token) {
      access.current = token;
      window.history.replaceState(null, '', window.location.pathname);
    }
    let mounted = true;
    queueMicrotask(() => { if (mounted) setHasAccess(!!access.current); });
    return () => { mounted = false; };
  }, []);
  async function request(fileId?: string) {
    if (busy.current) return; busy.current = true; setPending(true); setError('');
    try {
      if (fileId) {
        const result = await attachmentRequest<{ downloadUrl: string }>('download', { access: access.current, fileId });
        const link = document.createElement('a'); link.href = result.downloadUrl; link.referrerPolicy = 'no-referrer'; link.rel = 'noreferrer'; link.download = files?.find(file => file.id === fileId)?.name ?? 'attachment'; document.body.appendChild(link); link.click(); link.remove();
      } else setFiles((await attachmentRequest<{ files: { id: string; name: string; size: number }[] }>('download', { access: access.current })).files);
    } catch (error) { setError(error instanceof Error ? error.message : 'Private file access is unavailable.'); }
    finally { busy.current = false; setPending(false); }
  }
  return <div className="space-y-5" aria-busy={pending}>
    {!hasAccess && <p className="type-body-sm">Open the complete access link from the enquiry email. Refreshing this page clears access; reopen the original link if needed.</p>}
    {hasAccess && !files && <button type="button" disabled={pending} className="action-primary" onClick={() => request()}>View available files</button>}
    {files && <ul className="space-y-4">{files.map(file => <li key={file.id} className="p-4 border border-outline-variant space-y-2">
      <p className="type-body-sm break-all">{file.name} · {file.size.toLocaleString()} bytes</p>
      <button type="button" disabled={pending} className="action-secondary" onClick={() => request(file.id)}>Download file</button>
    </li>)}</ul>}
    <p role="status" className="type-body-sm">{pending ? 'Checking private file access…' : ''}</p>
    {error && <p role="alert" className="type-body-sm">{error}</p>}
  </div>;
}
