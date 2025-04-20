import { File } from '../entities/file.entity';

export enum UploadStatuses {
  PENDING = 'pending',
  UPLOADED = 'uploaded',
  FAILED = 'failed',
}

export type CreateFilePayload = Pick<File, 'url' | 'fileName' | 'status'>
export type UpdateFilePayload = Partial<Pick<File, 'status' | 'googleDriveFileUrl'>>;

export interface UploadJobPayload {
  id: number;
  url: string;
}