import { Controller, Logger } from "@nestjs/common";
import { SqsMessageHandler } from "@ssut/nestjs-sqs";
import { CommandBus } from "@nestjs/cqrs";

import {
  ProcessUserCommand,
  ProcessOrderCommand,
  ProcessProductCommand,
} from "@/shop-consumer/application/commands";
import { SqsBaseMessage, SqsConsumeBaseMessage } from "@/shared/types";
import { SQS_MESSAGE_TYPES_ENUM } from "@/shared/enums";

@Controller()
export class ShibaConsumer {
  private readonly logger = new Logger(ShibaConsumer.name);

  constructor(private readonly commandBus: CommandBus) {}

  @SqsMessageHandler("sqs-ingestion-queue", false)
  async handle(message: SqsConsumeBaseMessage<any>): Promise<void> {
    this.logger.log(`Mensagem recebida: ${JSON.stringify(message)}`);

    const { type, operation, payload } = JSON.parse(
      message.Body,
    ) as SqsBaseMessage<any>;

    this.logger.debug(`Payload:`, { message, type, operation, payload });

    try {
      switch (type) {
        case SQS_MESSAGE_TYPES_ENUM.USER:
          await this.commandBus.execute(
            new ProcessUserCommand(operation, payload),
          );
          break;
        case SQS_MESSAGE_TYPES_ENUM.PRODUCT:
          await this.commandBus.execute(
            new ProcessProductCommand(operation, payload),
          );
          break;
        case SQS_MESSAGE_TYPES_ENUM.ORDER:
          await this.commandBus.execute(
            new ProcessOrderCommand(operation, payload),
          );
          break;
        default:
          this.logger.warn(`Tipo desconhecido: ${type}`);
      }
    } catch (error) {
      this.logger.error(
        `Erro ao processar mensagem: ${error.message}`,
        error.stack,
      );
    }
  }
}
