import { pgTable, serial, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { UploadStatuses } from 'src/modules/upload/types/upload.types';

export const statusEnum = pgEnum('statuses', Object.values(UploadStatuses) as [string, ...string[]]);

export const files = pgTable('files', {
  id: serial('id').primaryKey(),
  status: statusEnum().default(UploadStatuses.PENDING),
  url: text('url').notNull(),
  fileName: text('file_name').notNull(),
  googleDriveFileUrl: text('google_drive_file_url'),
});