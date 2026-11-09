'use client';
import { useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { useQuoteAttachments } from './useQuoteAttachments';
export function QuoteAttachments({ controller, disabled }: { controller: ReturnType<typeof useQuoteAttachments>; disabled: boolean }) {
  const input = useRef<HTMLInputElement>(null); const [dragging, setDragging] = useState(false);
  // Availability already reflects the server feature flag and required configuration.
  // Render nothing while checking, disabled or unavailable; keep future uploads intact.
  if (controller.checkingAvailability || !controller.available) return null;
  const pickerDisabled = disabled || controller.checkingAvailability || !controller.available;
  return (
    <div className="space-y-2">
      <span className="block type-body-sm font-medium text-on-surface" id="attachments-label">Attach Files (optional)</span>
      <label htmlFor="fileInput"
        onDragOver={event => { event.preventDefault(); if (!pickerDisabled) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={event => { event.preventDefault(); setDragging(false); if (!pickerDisabled) controller.select(Array.from(event.dataTransfer.files)); }}
        className={`min-w-0 border border-dashed border-outline px-4 py-8 sm:px-8 text-center cursor-pointer hover:bg-surface-container flex flex-col items-center justify-center space-y-3 has-focus-visible:ring-2 has-focus-visible:ring-ink ${dragging ? 'bg-surface-container-high' : 'bg-surface'}`}>
        <span className="w-12 h-12 flex items-center justify-center text-secondary"><Icon name="folder_zip" className="text-[24px]" /></span>
        <span className="space-y-1 block">
          <span className="type-headline-sm text-on-surface block">{controller.available ? 'Click to select or drag files here' : 'Design files'}</span>
          <span id="attachment-instructions" className="type-body-sm text-on-surface-variant block">
            {controller.checkingAvailability ? 'Checking attachment availability…' : controller.available ? 'PDF and PNG only. Maximum 5 files and 25 MB combined (25,000,000 bytes). Files are checked before your enquiry is submitted.' : 'Attachments are currently unavailable. Please submit without files; design files can be shared after initial contact.'}
          </span>
        </span>
        <input ref={input} id="fileInput" name="attachments" type="file" multiple accept=".pdf,.png,application/pdf,image/png" disabled={pickerDisabled}
          aria-labelledby="attachments-label" aria-describedby="attachment-instructions fileStatus" className="sr-only"
          onChange={event => { controller.select(Array.from(event.currentTarget.files ?? [])); event.currentTarget.value = ''; }} />
        <span id="fileStatus" aria-live="polite" className="type-body-sm text-secondary max-w-full break-all">
          {controller.files.length ? `${controller.files.length} files selected · ${controller.files.reduce((sum, item) => sum + item.file.size, 0).toLocaleString()} bytes` : 'No documents attached yet'}
        </span>
      </label>
      {!!controller.files.length && <ul className="space-y-3" aria-label="Selected attachments">
        {controller.files.map(item => <li key={item.key} className="p-3 border border-outline-variant space-y-2">
          <div className="flex items-start justify-between gap-3">
            <span className="type-body-sm min-w-0 break-all">{item.file.name} · {item.file.size.toLocaleString()} bytes</span>
            <button type="button" className="editorial-link type-body-sm shrink-0" disabled={disabled} onClick={() => controller.remove(item.key)} aria-label={`Remove ${item.file.name}`}>Remove</button>
          </div>
          <p role="status" className="type-body-sm text-on-surface-variant">{item.status}{item.status === 'Uploading' ? ` · ${item.progress}%` : ''}</p>
          {item.status === 'Uploading' && <progress className="w-full accent-ink" value={item.progress} max={100} aria-label={`Upload progress for ${item.file.name}`} />}
        </li>)}
      </ul>}
      {controller.selectionError && <p role="alert" className="type-body-sm text-on-surface">{controller.selectionError}</p>}
      {(!!controller.files.length || !!controller.selectionError) && <button type="button" className="editorial-link type-body-sm" disabled={disabled} onClick={controller.clear}>Clear selected files</button>}
    </div>
  );
}
