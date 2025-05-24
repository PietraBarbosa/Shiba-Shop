import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { ProcessProductCommand } from "@/shop-consumer/application/commands";
import { ProductIngestionService } from "@/shop-consumer/domain/services";
import { SQS_MESSAGE_OPERATIONS_ENUM } from "@/shared/enums";

@CommandHandler(ProcessProductCommand)
export class ProductHandler implements ICommandHandler<ProcessProductCommand> {
  private readonly logger = new Logger(ProductHandler.name);

  constructor(private readonly ingestionService: ProductIngestionService) {}

  async execute(command: ProcessProductCommand): Promise<void> {
    const { operation, payload } = command;

    this.logger.debug(`Executando operação '${operation}' para produto`);

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
