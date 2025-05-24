import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { mongoConfig } from "@/main/configs";
import {
  Order,
  OrderSchema,
  Product,
  ProductSchema,
} from "@/infrastructure/mongodb/schemas";

@Module({
  imports: [
    MongooseModule.forRootAsync(mongoConfig),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class MongoDatabaseModule {}
