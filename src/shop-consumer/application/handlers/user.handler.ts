import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ProcessUserCommand } from "@/shop-consumer/application/commands";
import { Logger } from "@nestjs/common";
import { UserIngestionService } from "@/shop-consumer/domain/services";
import { SQS_MESSAGE_OPERATIONS_ENUM } from "@/shared/enums";

@CommandHandler(ProcessUserCommand)
export class UserHandler implements ICommandHandler<ProcessUserCommand> {
  private readonly logger = new Logger(UserHandler.name);

  constructor(private readonly ingestionService: UserIngestionService) {}

  async execute(command: ProcessUserCommand): Promise<void> {
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
