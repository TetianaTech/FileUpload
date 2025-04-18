import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadFilesDto } from './dto/uploadFiles.dto';

@Controller('files')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  async uploadFiles(@Body() uploadFilesDto: UploadFilesDto) {
    await this.uploadService.enqueueFileUrls(uploadFilesDto.urls);
      return {
        message: 'Files have been successfully queued for upload'
      };
  }

  @Get()
  getFiles() {
    return this.uploadService.getFiles();
  }
}
