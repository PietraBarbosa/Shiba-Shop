import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { OrderService } from "@/shop-bff/domain/services";
import {
  CreateOrderDto,
  UpdateOrderDto,
} from "@/shop-bff/application/dtos/orders";
import { SQS_MESSAGE_OPERATIONS_ENUM } from "@/shared/enums";

@Controller("orders")
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.service.execute(SQS_MESSAGE_OPERATIONS_ENUM.CREATE, dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateOrderDto) {
    return this.service.execute(SQS_MESSAGE_OPERATIONS_ENUM.UPDATE, {
      id,
      ...dto,
    });
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.service.execute(SQS_MESSAGE_OPERATIONS_ENUM.DELETE, { id });
  }
}
