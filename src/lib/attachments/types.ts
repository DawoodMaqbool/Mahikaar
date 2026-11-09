import type { ContentType, FileDescription } from './policy';
export type AttachmentFile = FileDescription & {
  id: string; uploadPath: string; cleanPath: string;
  status: 'pending' | 'ready' | 'rejected';
  verified?: { etag: string; digest: string; scanId: string; scannedAt: number };
};
export type Submission = { id: string; digest: string; firstAttempt: number; leaseUntil: number; accessExpires: number; retainUntil: number; providerId?: string };
export type UploadSession = {
  version: 1; id: string; ownerHash: string; createdAt: number; expiresAt: number;
  state: 'open' | 'sending' | 'accepted' | 'deleting'; files: AttachmentFile[];
  scanLease?: { id: string; until: number }; submission?: Submission;
};
export type StoredSession = { value: UploadSession; etag: string };
export type ObjectMetadata = { size: number; contentType: string; etag: string; pathname: string };
export type ObjectContents = ObjectMetadata & { bytes: Buffer };
export interface AttachmentStore {
  load(id: string): Promise<StoredSession | null>;
  create(session: UploadSession): Promise<void>;
  save(session: UploadSession, etag: string): Promise<void>;
  removeSession(id: string, etag: string): Promise<void>;
  metadata(path: string): Promise<ObjectMetadata | null>;
  read(path: string, maxBytes: number): Promise<ObjectContents>;
  putFile(path: string, bytes: Buffer, contentType: string): Promise<ObjectMetadata>;
  deleteFile(path: string): Promise<void>;
  sessions(cursor?: string): Promise<{ ids: string[]; cursor?: string }>;
  orphanObjects(cursor?: string): Promise<{ objects: { pathname: string; uploadedAt: number }[]; cursor?: string }>;
  checkpoint(): Promise<{ cursor?: string; orphanCursor?: string; leaseUntil: number; etag?: string }>;
  saveCheckpoint(value: { cursor?: string; orphanCursor?: string; leaseUntil: number }, etag?: string): Promise<void>;
}
export type Scan = (bytes: Buffer, contentType: ContentType) => Promise<{ id: string; digest: string }>;
