import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { mongoConfig } from "@/main/configs";
import { Product, ProductSchema } from "@/infrastructure/mongodb/schemas";

@Module({
  imports: [
    MongooseModule.forRootAsync(mongoConfig),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  exports: [MongooseModule],
})
export class MongoDatabaseModule {}
