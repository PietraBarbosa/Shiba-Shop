import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "@/shop-bff/domain/services";
import {
  CreateProductDto,
  UpdateProductDto,
} from "@/shop-bff/application/dtos/products";
import { SQS_MESSAGE_OPERATIONS_ENUM } from "@/shared/enums";

@Controller("products")
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.service.execute(SQS_MESSAGE_OPERATIONS_ENUM.CREATE, dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateProductDto) {
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
