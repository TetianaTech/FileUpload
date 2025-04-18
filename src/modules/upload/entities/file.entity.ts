export interface File {
  id: number;
  status: string | null;
  url: string;
  fileName: string;
  googleDriveFileUrl: string | null;
}