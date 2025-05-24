import {
  UserRepository,
  ProductRepository,
  OrderRepository,
} from "@/shop-consumer/domain/repositories";
import { Module } from "@nestjs/common";
import { MongoDatabaseModule } from "./mongodb.module";
import { PostgresDatabaseModule } from "./postgres.module";

@Module({
  imports: [MongoDatabaseModule, PostgresDatabaseModule],
  providers: [UserRepository, ProductRepository, OrderRepository],
  exports: [UserRepository, ProductRepository, OrderRepository],
})
export class RepositoriesModule {}
