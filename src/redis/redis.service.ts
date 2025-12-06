import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private redisClient: Redis) {}

  async setRefreshToken(userId: string, token: string): Promise<void> {
    await this.redisClient.set(`refresh:${userId}`, token);
  }

  async getRefreshToken(userId: string): Promise<string | null> {
    return this.redisClient.get(`refresh:${userId}`);
  }

  async removeRefreshToken(userId: string): Promise<void> {
    await this.redisClient.del(`refresh:${userId}`);
  }

  async set(key: string, value: string, ttl: number) {
    await this.redisClient.set(key, value, 'EX', ttl);
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async delete(key: string) {
    await this.redisClient.del(key);
  }
}
