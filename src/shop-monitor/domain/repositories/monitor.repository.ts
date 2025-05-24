import { RedisClient } from "@/infrastructure/cache";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MessageRepository extends RedisClient {
  private readonly prefix = "monitor:message:";

  async log(id: string, data: any): Promise<void> {
    await this.set(`${this.prefix}${id}`, data);
  }

  async getLog(id: string): Promise<any | null> {
    return this.get(`${this.prefix}${id}`);
  }

  async deleteLog(id: string): Promise<void> {
    await this.delete(`${this.prefix}${id}`);
  }

  async existsLog(id: string): Promise<boolean> {
    return this.exists(`${this.prefix}${id}`);
  }
}
