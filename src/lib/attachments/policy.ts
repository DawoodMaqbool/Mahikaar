export const MAX_FILES = 5;
export const MAX_TOTAL_BYTES = 25_000_000;
export const DAY = 86_400_000;
export const UPLOAD_LIFETIME = DAY;
export const LINK_LIFETIME = 7 * DAY;
export const RETENTION = 30 * DAY;
export const MIME_EXTENSIONS = { 'application/pdf': 'pdf', 'image/png': 'png' } as const;
export type ContentType = keyof typeof MIME_EXTENSIONS;
export type FileDescription = { name: string; size: number; contentType: ContentType };
export class AttachmentError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}
export function sanitizeFilename(input: unknown) {
  if (typeof input !== 'string' || input.length > 180 || /[\x00-\x1f\x7f/\\\u202a-\u202e\u2066-\u2069]/.test(input)) throw new AttachmentError('Please use a simple filename without folder paths or control characters.');
  const normalized = input.normalize('NFKC').trim();
  if (/[\x00-\x1f\x7f/\\\u2028\u2029\u202a-\u202e\u2066-\u2069]/.test(normalized)) throw new AttachmentError('Please check the filename.');
  if (normalized.length > 180) throw new AttachmentError('Please use a shorter filename.');
  const name = normalized.replace(/[<>:"|?*]/g, '_');
  if (!name || name.startsWith('.') || name.endsWith('.') || name.includes('..')) throw new AttachmentError('Please check the filename.');
  return name;
}
export function validateManifest(input: unknown): FileDescription[] {
  if (!Array.isArray(input) || !input.length || input.length > MAX_FILES) throw new AttachmentError('Select between one and five files.');
  const files = input.map(value => {
    if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).sort().join(',') !== 'contentType,name,size') throw new AttachmentError('Invalid file information.');
    const name = sanitizeFilename(value.name);
    if (typeof value.contentType !== 'string' || !Object.hasOwn(MIME_EXTENSIONS, value.contentType)) throw new AttachmentError('Only PDF and PNG files are supported.');
    const contentType = value.contentType as ContentType;
    if (!name.toLowerCase().endsWith('.' + MIME_EXTENSIONS[contentType])) throw new AttachmentError('The filename extension must match the PDF or PNG file type.');
    if (!Number.isSafeInteger(value.size) || value.size <= 0 || value.size > MAX_TOTAL_BYTES) throw new AttachmentError('Files must not be empty or larger than 25 MB.');
    return { name, size: value.size as number, contentType };
  });
  if (files.reduce((total, file) => total + file.size, 0) > MAX_TOTAL_BYTES) throw new AttachmentError('Attachments must total no more than 25 MB (25,000,000 bytes).');
  return files;
}
export function validId(value: unknown): value is string {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(value);
}
