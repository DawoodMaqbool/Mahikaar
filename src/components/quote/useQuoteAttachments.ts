'use client';
import { useEffect, useRef, useState } from 'react';
import { attachmentRequest, describeSelection, uploadFile, type SessionStatus } from '@/lib/attachments/client';
export type SelectedFile = { key: string; file: File; status: string; progress: number };
export function useQuoteAttachments() {
  const [available, setAvailable] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(true);
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [selectionError, setSelectionError] = useState('');
  const session = useRef<{ fingerprint: string; status: SessionStatus } | null>(null);
  const active = useRef<AbortController | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/enquiries/attachments', { cache: 'no-store', signal: controller.signal }).then(response => response.ok ? response.json() : null).then(result => { setAvailable(result?.available === true); }).catch(() => {}).finally(() => setCheckingAvailability(false));
    return () => { controller.abort(); active.current?.abort(); };
  }, []);
  function select(next: File[]) {
    const merged = [...files];
    for (const file of next) if (!merged.some(item => item.file.name === file.name && item.file.size === file.size && item.file.lastModified === file.lastModified)) merged.push({ key: crypto.randomUUID(), file, status: 'Selected', progress: 0 });
    try { describeSelection(merged.map(item => item.file)); setFiles(merged); if (merged.length !== files.length) session.current = null; setSelectionError(''); }
    catch (error) { setSelectionError(error instanceof Error ? error.message : 'Please check your selected files.'); }
  }
  function remove(key: string) { setFiles(items => items.filter(item => item.key !== key)); session.current = null; setSelectionError(''); }
  function clear() { setFiles([]); session.current = null; setSelectionError(''); }
  async function prepare(website: string) {
    if (selectionError) throw new Error(selectionError);
    if (!files.length) return undefined;
    if (!available) throw new Error('Attachments are currently unavailable. Remove selected files to send an email-only enquiry.');
    const descriptions = describeSelection(files.map(item => item.file));
    const fingerprint = files.map(item => item.key).join(',');
    const controller = new AbortController(); active.current = controller;
    const update = (key: string, status: string, progress = 0) => setFiles(items => items.map(item => item.key === key ? { ...item, status, progress } : item));
    let currentKey = files[0].key;
    try {
      if (!session.current || session.current.fingerprint !== fingerprint) {
        const status = await attachmentRequest<SessionStatus>('sessions', { files: descriptions, website }, controller.signal);
        session.current = { fingerprint, status };
      }
      const status = await attachmentRequest<SessionStatus>('status', { sessionId: session.current.status.sessionId }, controller.signal);
      session.current.status = status;
      if (status.files.length !== files.length) throw new Error('Attachment session changed. Remove and select your files again.');
      for (let index = 0; index < files.length; index++) {
        const selected = files[index]; const remote = status.files[index]; currentKey = selected.key;
        if (remote.status === 'rejected') throw new Error('A file did not pass safety checks. Remove or replace it.');
        if (remote.status !== 'ready') {
          update(selected.key, 'Preparing upload');
          const authorization = await attachmentRequest<{ uploaded: boolean; uploadUrl?: string }>('upload', { sessionId: status.sessionId, fileId: remote.id }, controller.signal);
          if (!authorization.uploaded) {
            if (!authorization.uploadUrl) throw new Error('File upload could not be authorized.');
            update(selected.key, 'Uploading');
            await uploadFile(authorization.uploadUrl, selected.file, percent => update(selected.key, 'Uploading', percent), controller.signal);
          }
          update(selected.key, 'Checking file safety', 100);
          await attachmentRequest('verify', { sessionId: status.sessionId, fileId: remote.id }, controller.signal);
        }
        update(selected.key, 'Ready', 100);
      }
      return { sessionId: status.sessionId, fileIds: status.files.map(file => file.id) };
    } catch (error) { update(currentKey, 'Needs retry'); throw error; }
    finally { active.current = null; }
  }
  return { available, checkingAvailability, files, selectionError, select, remove, clear, prepare };
}
