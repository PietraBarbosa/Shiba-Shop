import { MongoClient } from "@/infrastructure/mongodb";
import { Order } from "@/infrastructure/mongodb/schemas";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class OrderRepository extends MongoClient<Order> {
  private readonly logger = new Logger(OrderRepository.name);

  constructor(
    @InjectModel(Order.name)
    model: Model<Order>,
  ) {
    super(model);
  }
}
