import { Job } from "bullmq";
import { Logger } from "@nestjs/common";
import { OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { GoogleDriveService } from "../googleDrive/googleDrive.service";
import { DownloadService } from "../download/download.service";
import { getFileName } from "src/core/utils/getFileName";
import { UploadJobPayload, UploadStatuses } from "./types/upload.types";
import { UploadRepository } from "./upload.repository";
import { uploadConfigs } from 'src/modules/upload/upload.configs';

@Processor(uploadConfigs.queueName)
export class UploadProcessor {
  private readonly logger = new Logger(UploadProcessor.name);

  constructor(
    private readonly uploadRepository: UploadRepository,
    private readonly downloadService: DownloadService,
    private readonly googleDriveService: GoogleDriveService
  ) {}

  @Process({ name: uploadConfigs.jobName, concurrency: uploadConfigs.concurrency })
  async handleUpload(job: Job<UploadJobPayload>) {
      const { url, id } = job.data;
      const { mimeType, fileBuffer } = await this.downloadService.downloadFile(url);
      const fileName = getFileName(url);      
      const googleDriveFileUrl = await this.googleDriveService.uploadFile(fileBuffer, fileName, mimeType);
      console.log('googleDriveFileUrl', googleDriveFileUrl);
      await this.uploadRepository.updateFile(id, { status: UploadStatuses.UPLOADED, googleDriveFileUrl });
  }

  @OnQueueFailed()
  async onQueueFailed(job: Job, error: Error) {
    if (job.attemptsMade >= uploadConfigs.attempts) {
      const { id } = job.data;
      await this.uploadRepository.updateFile(id, { status: UploadStatuses.FAILED });
      
      this.logger.error({
        message: 'Upload permanently failed',
        jobId: job.id,
        fileId: id,
        attempts: job.attemptsMade,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
}