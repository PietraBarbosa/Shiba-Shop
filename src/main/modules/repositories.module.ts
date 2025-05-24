import {
  UserRepository,
  ProductRepository,
  OrderRepository,
} from "@/shop-consumer/domain/repositories";
import { Module } from "@nestjs/common";
import { MongoDatabaseModule } from "./mongodb.module";
import { PostgresDatabaseModule } from "./postgres.module";
import { DynamoDBModule } from "./dynamo.module";

@Module({
  imports: [MongoDatabaseModule, PostgresDatabaseModule, DynamoDBModule],
  providers: [UserRepository, ProductRepository, OrderRepository],
  exports: [UserRepository, ProductRepository, OrderRepository],
})
export class RepositoriesModule {}
