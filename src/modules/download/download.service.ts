import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DownloadService {

  async downloadFile(url: string) {
    const response = await axios.get(url, { responseType: 'stream' });
    const mimeType = response.headers['content-type'];
    const fileBuffer = response.data;
    return { mimeType, fileBuffer };
  }
}