import { DynamoClient } from "@/infrastructure/dynamodb";

export class DynamoRepository<T extends Record<string, any>> {
  constructor(protected readonly client: DynamoClient<T>) {}

  create(item: T) {
    return this.client.put(item);
  }

  findById(key: Partial<T>) {
    return this.client.getByKey(key);
  }

  update(key: Partial<T>, updates: Partial<T>) {
    return this.client.update(key, updates);
  }

  delete(key: Partial<T>) {
    return this.client.delete(key);
  }
}
