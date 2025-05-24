import { MessageQueue } from "@/infrastructure/queues/message.queue";
import { MonitorConsumer } from "@/shop-monitor/application/consumers/monitor.consumer";
import { MessageRepository } from "@/shop-monitor/domain/repositories";
import { MessageLoggerService } from "@/shop-monitor/domain/services";
import { Module } from "@nestjs/common";
import { RedisModule } from "./redis.module";
import { SubMonitorModule } from "./sub-monitor-message.module";

@Module({
  imports: [RedisModule, SubMonitorModule],
  providers: [
    MessageRepository,
    MessageLoggerService,
    MonitorConsumer,
    MessageQueue,
  ],
})
export class MonitorAppModule {}
