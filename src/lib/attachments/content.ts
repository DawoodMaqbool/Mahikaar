import { inflateSync } from 'node:zlib';
import { AttachmentError, type ContentType } from './policy';
function crc32(bytes: Uint8Array) {
  let crc = 0xffffffff;
  for (const byte of bytes) { crc ^= byte; for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0); }
  return (crc ^ 0xffffffff) >>> 0;
}
/** Practical structural checks, not a replacement for malware scanning. */
export function validateContent(bytes: Buffer, type: ContentType) {
  const bad = () => { throw new AttachmentError('The file content is invalid or does not match its declared format.'); };
  if (type === 'application/pdf') {
    const header = bytes.subarray(0, 12).toString('ascii');
    const tail = bytes.subarray(Math.max(0, bytes.length - 2048)).toString('latin1');
    if (!/^%PDF-(1\.[0-7]|2\.0)[\r\n ]/.test(header) || !/%%EOF\s*$/.test(tail)) bad();
    const xref = /startxref\s+(\d+)\s+%%EOF\s*$/.exec(tail);
    if (!xref || Number(xref[1]) >= bytes.length || Number(xref[1]) <= 0) bad();
    // Initial policy excludes encrypted and explicitly active documents.
    if (/\/(Encrypt|JavaScript|JS|Launch|OpenAction|EmbeddedFile)\b/.test(bytes.toString('latin1'))) throw new AttachmentError('Encrypted, embedded-file or active PDF documents are not supported.');
    return;
  }
  if (!bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) bad();
  let offset = 8; let width = 0; let height = 0; let depth = 0; let colour = 0; let ended = false; let palette = false; let seenData = false; let dataEnded = false;
  const compressed: Buffer[] = [];
  while (offset < bytes.length) {
    if (offset + 12 > bytes.length) bad();
    const length = bytes.readUInt32BE(offset);
    if (length > bytes.length - offset - 12) bad();
    const kind = bytes.toString('ascii', offset + 4, offset + 8);
    const data = bytes.subarray(offset + 8, offset + 8 + length);
    if (!/^[A-Za-z]{4}$/.test(kind) || crc32(bytes.subarray(offset + 4, offset + 8 + length)) !== bytes.readUInt32BE(offset + 8 + length)) bad();
    if (offset === 8 && kind !== 'IHDR') bad();
    if (kind === 'IHDR') {
      if (offset !== 8 || length !== 13) bad();
      width = data.readUInt32BE(0); height = data.readUInt32BE(4); depth = data[8]; colour = data[9];
      const depths: Record<number, number[]> = { 0:[1,2,4,8,16],2:[8,16],3:[1,2,4,8],4:[8,16],6:[8,16] };
      if (!width || !height || width > 10000 || height > 10000 || width * height > 16_000_000 || !depths[colour]?.includes(depth) || data[10] !== 0 || data[11] !== 0 || data[12] !== 0) bad();
    } else if (kind === 'IDAT') { if (dataEnded) bad(); seenData = true; compressed.push(data); }
    else {
      if (seenData) dataEnded = true;
      if (kind === 'PLTE') { if (seenData || !length || length % 3 || length > 768) bad(); palette = true; }
      else if (kind === 'IEND') { if (length || !seenData || offset + 12 !== bytes.length) bad(); ended = true; }
      else if (kind[0] === kind[0].toUpperCase()) bad();
    }
    offset += length + 12;
  }
  if (!ended || (colour === 3 && !palette)) bad();
  const channels: Record<number, number> = { 0:1,2:3,3:1,4:2,6:4 };
  const row = Math.ceil(width * channels[colour] * depth / 8) + 1;
  const expected = row * height;
  if (expected > 64 * 1024 * 1024) bad();
  try {
    const decoded = inflateSync(Buffer.concat(compressed), { maxOutputLength: expected });
    if (decoded.length !== expected) bad();
    for (let y = 0; y < height; y++) if (decoded[y * row] > 4) bad();
  } catch { bad(); }
}
