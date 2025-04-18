import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Inject, Injectable } from '@nestjs/common';
import { DrizzleAsyncProvider } from '../../core/drizzle/drizzle.provider';
import * as schema from '../../core/drizzle/schema';
import { File } from './entities/file.entity';
import { CreateFileDTO } from './types/upload.types';
import { UploadStatuses } from './types/upload.types';

@Injectable()
export class UploadRepository {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}  

  async createFiles(data: CreateFileDTO[]): Promise<File[]> {
    return this.db.insert(schema.files).values(data).returning();
  }

  async updateFile(id: number, data: Partial<File>) {
    return this.db.update(schema.files).set(data).where(eq(schema.files.id, id)).returning();
  }

  async getFiles() {
    return this.db.select().from(schema.files);
  }

  async getPendingFiles() {
    return this.db.select().from(schema.files).where(eq(schema.files.status, UploadStatuses.PENDING));
  }
}