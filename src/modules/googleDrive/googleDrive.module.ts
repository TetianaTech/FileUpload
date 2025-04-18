import { Module } from '@nestjs/common';
import { GoogleDriveService } from './googleDrive.service';

@Module({
  imports: [],
  providers: [GoogleDriveService],
  exports: [GoogleDriveService],
})
export class GoogleDriveModule {}
