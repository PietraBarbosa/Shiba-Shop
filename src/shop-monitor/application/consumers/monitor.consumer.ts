import { SqsMessageHandler } from "@ssut/nestjs-sqs";
import { Injectable, Logger } from "@nestjs/common";
import { MessageQueue } from "@/infrastructure/queues/message.queue";
import { SqsBaseMessage } from "@/shared/types";

@Injectable()
export class MonitorConsumer {
  private readonly logger = new Logger(MonitorConsumer.name);

  constructor(private readonly messageQueue: MessageQueue) {}

  @SqsMessageHandler("sqs-monitor-queue", false)
  async handleMessage(message: any): Promise<void> {
    message = JSON.parse(message.Body) as SqsBaseMessage<any>;

    this.logger.debug(
      `Enfileirando mensagem no BullMQ: ${JSON.stringify(message)}`,
    );
    await this.messageQueue.enqueue(message);
  }
}
