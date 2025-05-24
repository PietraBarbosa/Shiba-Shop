import { Injectable, Logger } from "@nestjs/common";
import { UserRepository } from "@/shop-consumer/domain/repositories";

@Injectable()
export class UserIngestionService {
  private readonly logger = new Logger(UserIngestionService.name);

  constructor(private readonly repository: UserRepository) {}

  async create(payload: any): Promise<void> {
    this.logger.log(`Criando usuário: ${JSON.stringify(payload)}`);
    await this.repository.create(payload);
  }

  async update(payload: any): Promise<void> {
    this.logger.log(`Atualizando usuário: ${JSON.stringify(payload)}`);
    await this.repository.update(payload.id, payload);
  }

  async delete(payload: any): Promise<void> {
    this.logger.log(`Deletando usuário: ${JSON.stringify(payload)}`);
    await this.repository.delete(payload.id);
  }
}
