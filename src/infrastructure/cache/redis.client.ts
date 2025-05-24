import { Inject, Injectable } from "@nestjs/common";
import { RedisClientType } from "redis";

export const REDIS_CLIENT = "REDIS_CLIENT";

@Injectable()
export abstract class RedisClient {
  constructor(
    @Inject(REDIS_CLIENT)
    protected readonly redis: RedisClientType<any, any, any>,
  ) {}

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const json = JSON.stringify(value);
    if (ttlSeconds) {
      await this.redis.set(key, json, { EX: ttlSeconds });
    } else {
      await this.redis.set(key, json);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.redis.exists(key)) === 1;
  }
}
