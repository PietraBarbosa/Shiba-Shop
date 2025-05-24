import { ShibaConsumer } from "@/shop-consumer/application/consumers/shop.consumer";
import {
  UserHandler,
  ProductHandler,
  OrderHandler,
} from "@/shop-consumer/application/handlers";
import {
  UserIngestionService,
  ProductIngestionService,
  OrderIngestionService,
} from "@/shop-consumer/domain/services";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { SubIngestionModule } from "./sub-ingestion-message.module";
import { RepositoriesModule } from "./repositories.module";

@Module({
  imports: [CqrsModule, SubIngestionModule, RepositoriesModule],
  controllers: [ShibaConsumer],
  providers: [
    UserIngestionService,
    ProductIngestionService,
    OrderIngestionService,
    UserHandler,
    ProductHandler,
    OrderHandler,
    ShibaConsumer,
  ],
  exports: [
    UserIngestionService,
    ProductIngestionService,
    OrderIngestionService,
  ],
})
export class ConsumerAppModule {}
