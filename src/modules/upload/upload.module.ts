import { Module, OnModuleInit } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { GoogleDriveModule } from '../googleDrive/googleDrive.module';
import { DownloadModule } from '../download/download.module';
import { UploadRepository } from './upload.repository';
import { UploadProcessor } from './upload.processor';
import { uploadConfigs } from 'src/modules/upload/upload.configs';

@Module({
  imports: [
    BullModule.registerQueue({
      name: uploadConfigs.queueName,
      defaultJobOptions: {
        attempts: uploadConfigs.attempts,
        delay: uploadConfigs.delay
      },
    }),
    
    GoogleDriveModule,
    DownloadModule
  ],
  controllers: [UploadController],
  providers: [UploadService, UploadRepository, UploadProcessor],
})

export class UploadModule implements OnModuleInit {
  constructor(private readonly uploadService: UploadService) {}

  async onModuleInit() {
    try {
      await this.uploadService.requeuePendingFiles();
    } catch (error) {
      console.error(error.message);
    }
  }
}
