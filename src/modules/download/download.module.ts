import { Module } from '@nestjs/common';
import { DownloadService } from './download.service';

@Module({
  imports: [],
  providers: [DownloadService],
  exports: [DownloadService],
})
export class DownloadModule {}
