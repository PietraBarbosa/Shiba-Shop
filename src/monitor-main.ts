import "dotenv/config";
import * as express from "express";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter as BullBoardExpressAdapter } from "@bull-board/express";
import { Queue } from "bullmq";
import { redisConfig } from "./main/configs";
import { MonitorAppModule } from "./main/modules/monitor-app.module";
import { MessageLoggerService } from "./shop-monitor/domain/services";
import { createMonitorWorker } from "./shop-monitor/application/processors/monitor.processor";

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(
    MonitorAppModule,
    new ExpressAdapter(server),
    {
      logger: ["log", "error", "warn", "debug", "verbose"],
    },
  );

  const monitorQueue = new Queue("monitor-message-queue", {
    connection: {
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password,
    },
  });

  const bullBoardAdapter = new BullBoardExpressAdapter();
  bullBoardAdapter.setBasePath("/admin/queues");

  createBullBoard({
    queues: [new BullMQAdapter(monitorQueue)],
    serverAdapter: bullBoardAdapter,
  });

  server.use("/admin/queues", bullBoardAdapter.getRouter());

  const loggerService = app.get(MessageLoggerService);
  createMonitorWorker(loggerService);

  await app.listen(3002);
  console.log(`Monitor listening on http://localhost:3002`);
}
bootstrap();
