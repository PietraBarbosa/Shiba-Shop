import { Repository, DeepPartial } from "typeorm";

export abstract class PostgresDatabaseClient<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(data: T): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async findById(id: string): Promise<T | null> {
    return this.repository.findOne({ where: { id } as any });
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async update(id: string, update: Partial<T>): Promise<T | null> {
    await this.repository.update(id, update as any);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
