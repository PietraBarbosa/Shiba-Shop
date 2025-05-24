import { MongoClient } from "@/infrastructure/mongodb";
import { Product } from "@/infrastructure/mongodb/schemas";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductRepository extends MongoClient<Product> {
  constructor(
    @InjectModel(Product.name)
    model: Model<Product>,
  ) {
    super(model);
  }
}
