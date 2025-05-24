import { Queue } from "bullmq";
import { Injectable } from "@nestjs/common";
import { redisConfig } from "@/main/configs";

@Injectable()
export class MessageQueue {
  private readonly queue: Queue;

  constructor() {
    this.queue = new Queue("monitor-message-queue", {
      connection: {
        host: redisConfig.host,
        port: redisConfig.port,
        password: redisConfig.password,
      },
    });
  }

  async enqueue(message: any) {
    await this.queue.add("log-message", message, {
      removeOnComplete: true,
      removeOnFail: false,
    });
  }
}
