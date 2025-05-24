import { SqsDispatcherProvider } from "@/infrastructure/messages";
import { CustomerController } from "@/shop-bff/application/controllers/customer.controller";
import { OrderController } from "@/shop-bff/application/controllers/order.controller";
import { ProductController } from "@/shop-bff/application/controllers/product.controller";
import {
  CustomerService,
  ProductService,
  OrderService,
} from "@/shop-bff/domain/services";
import { Module } from "@nestjs/common";
import { PubMessagingModule } from "./pub-messaging.module";

@Module({
  imports: [PubMessagingModule],
  controllers: [CustomerController, ProductController, OrderController],
  providers: [CustomerService, ProductService, OrderService],
})
export class BffAppModule {}
