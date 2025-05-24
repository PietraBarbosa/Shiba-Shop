import { Injectable, Logger } from "@nestjs/common";
import { MessageRepository } from "@/shop-monitor/domain/repositories";

@Injectable()
export class MessageLoggerService {
  private readonly logger = new Logger(MessageLoggerService.name);

  constructor(private readonly repository: MessageRepository) {}

  async handleMessageLog(id: string, message: any): Promise<void> {
    this.logger.debug(`Logando mensagem ${id}`);
    await this.repository.log(id, {
      ...message,
      loggedAt: new Date().toISOString(),
    });
  }
}
