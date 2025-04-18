export enum UploadStatuses {
  PENDING = 'pending',
  UPLOADED = 'uploaded',
  FAILED = 'failed',
}

export interface CreateFileDTO {
  id?: number;
  url: string;
  fileName: string;
  status: UploadStatuses;
  googleDriveFileUrl?: string;
}

export interface UploadJobDTO {
  id: number;
  url: string;
}