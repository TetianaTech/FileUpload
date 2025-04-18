import { Injectable } from '@nestjs/common';
import { google, drive_v3 } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import { Readable } from 'stream';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleDriveService {
  private authClient: GoogleAuth;
  private driveClient: drive_v3.Drive;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.initializeGoogleDrive();
  }

  private async initializeGoogleDrive() {
    try {
      this.authClient = new GoogleAuth({
        keyFile: this.configService.get('GOOGLE_CREDENTIALS_PATH'),
        scopes: ['https://www.googleapis.com/auth/drive'],
      });

      this.driveClient = google.drive({ 
        version: 'v3', 
        auth: this.authClient 
      });
    } catch (error) {
      throw new Error(`Failed to initialize Google Drive: ${error.message}`);
    }
  }

  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string,
    folderId?: string,
  ): Promise<string> {
    try {
      const media = {
        mimeType,
        body: Readable.from(fileBuffer),
      };

      const fileMetadata: drive_v3.Schema$File = {
        name: fileName,
        ...(folderId ? { parents: [folderId] } : {}),
      };

      const response = await this.driveClient.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, webViewLink',
      });

      await this.driveClient.permissions.create({
        fileId: response.data.id!,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      return response.data.webViewLink;
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }
}

