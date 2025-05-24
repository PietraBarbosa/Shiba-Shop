import { IsNotEmpty, IsString, IsArray, IsNumber } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  taxId: string;

  @IsArray()
  productIds: string[];

  @IsNumber()
  total: number;
}
