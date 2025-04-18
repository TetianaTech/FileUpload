import { Module } from '@nestjs/common';
import { UploadModule } from './modules/upload/upload.module';
import { HealthModule } from './modules/health/health.module';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './core/drizzle/drizzle.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    DrizzleModule,
    HealthModule,
    UploadModule
  ],
})
export class AppModule {}
