import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';
import { UploadRepository } from './upload.repository';
import { File } from './entities/file.entity';
import { getFileName } from 'src/core/utils/getFileName';
import { CreateFilePayload } from './types/upload.types';
import { UploadStatuses } from './types/upload.types';
import { uploadConfigs } from 'src/modules/upload/upload.configs';

@Injectable()
export class UploadService {
  constructor(
    @InjectQueue(uploadConfigs.queueName) private uploadQueue: Queue,
    private readonly uploadRepository: UploadRepository
  ) {}

  private async addJobsToQueue(files: File[]) {       
    await this.uploadQueue.addBulk(files.map(file => ({
      name: uploadConfigs.jobName,
      data: { id: file.id, url: file.url },
    })));
  }

  async enqueueFileUrls(urls: string[]) {
    const files: CreateFilePayload[] = urls.map((url) => ({
      url,
      fileName: getFileName(url),
      status: UploadStatuses.PENDING,
    }));

    const createdFiles = await this.uploadRepository.createFiles(files);
    await this.addJobsToQueue(createdFiles);
  }

  async requeuePendingFiles() {
    const pendingFiles = await this.uploadRepository.getPendingFiles();
    await this.addJobsToQueue(pendingFiles);
  }

  getFiles() {
    return this.uploadRepository.getFiles();
  }
}
