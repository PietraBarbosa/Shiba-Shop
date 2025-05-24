import { Model, UpdateQuery, Document } from "mongoose";

export abstract class MongoClient<T> {
  constructor(readonly model: Model<T>) {}

  async create(data: any): Promise<any> {
    const client = new this.model({ ...data }) as any;
    return await client.save();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async getPaginated(
    page = 1,
    limit = 10,
  ): Promise<{ data: T[]; total: number }> {
    const total = await this.model.countDocuments().exec();
    const data = await this.model
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return { data, total };
  }

  async update(id: string, update: Partial<T>): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, update as UpdateQuery<T>, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}
