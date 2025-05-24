import { Module } from "@nestjs/common";
import { createClient } from "redis";
import { redisConfig } from "@/main/configs";
import { REDIS_CLIENT } from "@/infrastructure/cache";

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: async () => {
        const client = createClient({
          socket: {
            host: redisConfig.host,
            port: redisConfig.port,
          },
          password: redisConfig.password,
        });

        await client.connect();
        return client;
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
