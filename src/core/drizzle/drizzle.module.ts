import { Global, Module } from '@nestjs/common';
import { DrizzleAsyncProvider, DrizzleProvider } from './drizzle.provider';

@Global()
@Module({
  providers: [DrizzleProvider],
  exports: [DrizzleAsyncProvider],
})
export class DrizzleModule {}