import { redisConfig } from "@/main/configs";
import { MessageLoggerService } from "@/shop-monitor/domain/services";
import { Worker } from "bullmq";

export function createMonitorWorker(loggerService: MessageLoggerService) {
  return new Worker(
    "monitor-message-queue",
    async (job) => {
      const message = job.data;
      const id = message.id ?? `${message.type}-${Date.now()}`;
      await loggerService.handleMessageLog(id, message);
    },
    {
      connection: {
        host: redisConfig.host,
        port: redisConfig.port,
        password: redisConfig.password,
      },
    },
  );
}
