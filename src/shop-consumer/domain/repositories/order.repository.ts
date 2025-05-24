import { Injectable } from "@nestjs/common";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Order } from "@/infrastructure/dynamodb/schemas";
import { DynamoClient } from "@/infrastructure/dynamodb";

@Injectable()
export class OrderRepository {
  private readonly client: DynamoClient<Order>;

  constructor(dynamo: DynamoDBClient) {
    this.client = new DynamoClient<Order>(dynamo, "OrderTable");
  }

  async create(order: Order) {
    return this.client.put(order);
  }

  async findById(id: string) {
    return this.client.getByKey({ id });
  }

  async update(id: Record<string, string>, updates: Partial<Order>) {
    return this.client.update({ id }, updates);
  }

  async delete(id: Record<string, string>) {
    return this.client.delete(id);
  }
}
