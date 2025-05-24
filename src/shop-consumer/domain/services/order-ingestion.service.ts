import { Injectable } from "@nestjs/common";
import { OrderRepository } from "@/shop-consumer/domain/repositories";
import { Order } from "@/infrastructure/dynamodb/schemas";
import { randomUUID } from "crypto";

@Injectable()
export class OrderIngestionService {
  constructor(private readonly orderRepo: OrderRepository) {}

  async create(order: Order): Promise<void> {
    const payload = {
      ...order,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };

    await this.orderRepo.create(payload);
  }

  async getById(id: string): Promise<Order | null> {
    return this.orderRepo.findById(id);
  }

  async update(
    id: Record<string, string>,
    updates: Partial<Order>,
  ): Promise<void> {
    if (updates.id) delete updates["id"];
    await this.orderRepo.update(id, updates);
  }

  async delete(id: Record<string, string>): Promise<void> {
    await this.orderRepo.delete(id);
  }
}
