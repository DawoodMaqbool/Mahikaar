import { deflateSync } from 'node:zlib';
import policy from '../.enquiry-tests/lib/attachments/policy.js';
const { AttachmentError } = policy;
export const clone = value => structuredClone(value);
export function png() {
  function chunk(type, data) {
    const contents = Buffer.concat([Buffer.from(type), data]); let crc = 0xffffffff;
    for (const byte of contents) { crc ^= byte; for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0); }
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const sum = Buffer.alloc(4); sum.writeUInt32BE((crc ^ 0xffffffff) >>> 0); return Buffer.concat([len, contents, sum]);
  }
  const h = Buffer.alloc(13); h.writeUInt32BE(1, 0); h.writeUInt32BE(1, 4); h[8] = 8; h[9] = 6;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR',h), chunk('IDAT',deflateSync(Buffer.from([0,255,255,255,255]))),chunk('IEND',Buffer.alloc(0))]);
}
export const pdf = () => Buffer.from('%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\nxref\n0 1\n0000000000 65535 f \ntrailer\n<< /Size 1 >>\nstartxref\n47\n%%EOF\n');
export const env = {
  ATTACHMENTS_ENABLED: 'true', BLOB_STORE_ID: 'store_mock_preview', ATTACHMENT_EXPECTED_STORE_ID: 'store_mock_preview', VERCEL_OIDC_TOKEN: 'mock-oidc', ATTACHMENT_UPLOAD_SIGNING_SECRET: 'mock-secret-at-least-32-bytes-long-value', ATTACHMENT_BASE_URL: 'https://example.com', SCANII_API_KEY: 'mock-key', SCANII_API_SECRET: 'mock-secret', SCANII_REGION: 'eu1', CRON_SECRET: 'mock-cron-secret-at-least-32-bytes-long', RESEND_API_KEY: 'mock-resend', ENQUIRY_FROM_EMAIL: 'sender@example.com', ENQUIRY_TO_EMAIL: 'recipient@example.com', NODE_ENV: 'production',
};
export class MemoryStore {
  sessionsMap = new Map(); objects = new Map(); revision = 0; checkpointValue; deletes = []; failDelete = false;
  async load(id) { const item = this.sessionsMap.get(id); return item ? clone(item) : null; }
  async create(value) { if (this.sessionsMap.has(value.id)) throw new AttachmentError('conflict',409); this.sessionsMap.set(value.id,{value:clone(value),etag:String(++this.revision)}); }
  async save(value,etag) { if (this.sessionsMap.get(value.id)?.etag !== etag) throw new AttachmentError('conflict',409); this.sessionsMap.set(value.id,{value:clone(value),etag:String(++this.revision)}); }
  async removeSession(id,etag) { if (this.sessionsMap.get(id)?.etag !== etag) throw new AttachmentError('conflict',409); this.sessionsMap.delete(id); }
  async metadata(pathname) { const file = this.objects.get(pathname); return file ? { pathname, size:file.bytes.length, contentType:file.contentType, etag:file.etag } : null; }
  async read(pathname, max) { const file=this.objects.get(pathname); if(!file) throw new AttachmentError('missing',404); if(file.bytes.length>max)throw new AttachmentError('oversized'); return {...await this.metadata(pathname),bytes:Buffer.from(file.bytes)}; }
  async putFile(pathname,bytes,contentType) { if(this.objects.has(pathname))throw new AttachmentError('overwrite forbidden',409);this.objects.set(pathname,{bytes:Buffer.from(bytes),contentType,etag:String(++this.revision)});return this.metadata(pathname); }
  async deleteFile(pathname) { if(this.failDelete)throw new Error('mock delete failure');this.deletes.push(pathname);this.objects.delete(pathname); }
  async sessions() { return {ids:[...this.sessionsMap.keys()]}; }
  async orphanObjects() { return {objects:[]}; }
  async checkpoint() { return this.checkpointValue ? clone(this.checkpointValue) : {leaseUntil:0}; }
  async saveCheckpoint(value,etag) { if(this.checkpointValue?.etag!==etag)throw new AttachmentError('checkpoint conflict',409);this.checkpointValue={...clone(value),etag:String(++this.revision)}; }
}
