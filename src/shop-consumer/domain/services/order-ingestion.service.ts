import { Injectable, Logger } from "@nestjs/common";
import { OrderRepository } from "@/shop-consumer/domain/repositories";

@Injectable()
export class OrderIngestionService {
  private readonly logger = new Logger(OrderIngestionService.name);

  constructor(private readonly repository: OrderRepository) {}

  async create(payload: any): Promise<void> {
    this.logger.log(`Criando pedido: ${JSON.stringify(payload)}`);
    await this.repository.create(payload);
  }

  async update(payload: any): Promise<void> {
    this.logger.log(`Atualizando pedido: ${JSON.stringify(payload)}`);
    await this.repository.update(payload.id, payload);
  }

  async delete(payload: any): Promise<void> {
    this.logger.log(`Deletando pedido: ${payload.id}`);
    await this.repository.delete(payload.id);
  }
}
