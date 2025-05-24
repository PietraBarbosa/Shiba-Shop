import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { ProcessOrderCommand } from "@/shop-consumer/application/commands";
import { OrderIngestionService } from "@/shop-consumer/domain/services";
import { SQS_MESSAGE_OPERATIONS_ENUM } from "@/shared/enums";

@CommandHandler(ProcessOrderCommand)
export class OrderHandler implements ICommandHandler<ProcessOrderCommand> {
  private readonly logger = new Logger(OrderHandler.name);

  constructor(private readonly ingestionService: OrderIngestionService) {}

  async execute(command: ProcessOrderCommand): Promise<void> {
    const { operation, payload } = command;

    this.logger.debug(`Executando operação '${operation}' para pedido`);

    switch (operation) {
      case SQS_MESSAGE_OPERATIONS_ENUM.CREATE:
        await this.ingestionService.create(payload);
        break;
      case SQS_MESSAGE_OPERATIONS_ENUM.UPDATE:
        await this.ingestionService.update(payload);
        break;
      case SQS_MESSAGE_OPERATIONS_ENUM.DELETE:
        await this.ingestionService.delete(payload);
        break;
      default:
        this.logger.error(
          `Operação '${operation}' não suportada para usuários.`,
        );
    }
  }
}
