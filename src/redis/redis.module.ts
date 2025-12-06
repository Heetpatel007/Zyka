import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule } from '@nestjs/config';
import Redis from 'ioredis';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT ?? '6379'),
        });
      },
    },
    RedisService,
  ],
  exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule {}
