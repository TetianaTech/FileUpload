import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { ConfigService } from '@nestjs/config';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { getPostgresUrl } from '../utils/getPostgresUrl';

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const DrizzleProvider = {
  provide: DrizzleAsyncProvider,
  inject: [ConfigService],
  useFactory: async () => {
    const connectionString = getPostgresUrl();
    const pool = new Pool({
      connectionString,
    });

    return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
  },
}