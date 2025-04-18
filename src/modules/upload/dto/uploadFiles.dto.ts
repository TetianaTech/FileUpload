import { IsArray, IsUrl } from 'class-validator';

export class UploadFilesDto {
  @IsArray()
  @IsUrl({}, { each: true })
  urls: string[];
}
