import { Injectable, Logger } from "@nestjs/common";
import { ProductRepository } from "@/shop-consumer/domain/repositories";

@Injectable()
export class ProductIngestionService {
  private readonly logger = new Logger(ProductIngestionService.name);

  constructor(private readonly repository: ProductRepository) {}

  async create(payload: any): Promise<void> {
    this.logger.log(`Criando produto: ${JSON.stringify(payload)}`);
    await this.repository.create(payload);
  }

  async update(payload: any): Promise<void> {
    this.logger.log(`Atualizando produto: ${JSON.stringify(payload)}`);
    await this.repository.update(payload.id, payload);
  }

  async delete(payload: any): Promise<void> {
    this.logger.log(`Deletando produto: ${payload.id}`);
    await this.repository.delete(payload.id);
  }
}
