import { Injectable, Logger } from "@nestjs/common";
import { SqsService } from "@ssut/nestjs-sqs";
import {
  SQS_MESSAGE_OPERATIONS_ENUM,
  SQS_MESSAGE_TYPES_ENUM,
} from "@/shared/enums";
import { SqsMessageFactory } from "@/infrastructure/messages";

@Injectable()
export class SqsDispatcherProvider {
  private readonly logger = new Logger(SqsDispatcherProvider.name);

  constructor(private readonly sqsService: SqsService) {}

  async send<T>(
    queue: string,
    type: SQS_MESSAGE_TYPES_ENUM,
    operation: SQS_MESSAGE_OPERATIONS_ENUM,
    payload: T,
    monitorPayload: Partial<T>,
  ): Promise<void> {
    const ingestionMessage = SqsMessageFactory.ingestion(
      type,
      operation,
      payload,
    );
    const monitorMessage = SqsMessageFactory.ingestion(
      type,
      operation,
      monitorPayload,
    );

    try {
      await Promise.all([
        this.sqsService.send(queue, {
          id: `${type}-${Date.now()}`,
          body: ingestionMessage,
        }),

        this.sqsService.send("sqs-monitor-queue", {
          id: `${type}-${Date.now()}`,
          body: monitorMessage,
        }),
      ]);

      this.logger.log(`[${queue}] enviado: ${type}`);
    } catch (err) {
      this.logger.error(`Erro ao enviar para fila ${queue}:`, err);
      throw err;
    }
  }
}
