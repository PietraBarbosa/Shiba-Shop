import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { CustomerService } from "@/shop-bff/domain/services";
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from "@/shop-bff/application/dtos/customers";
import { SQS_MESSAGE_OPERATIONS_ENUM } from "@/shared/enums";

@Controller("customers")
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Post()
  create(@Body() dto: CreateCustomerDto) {
    return this.service.execute(SQS_MESSAGE_OPERATIONS_ENUM.CREATE, dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateCustomerDto) {
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
