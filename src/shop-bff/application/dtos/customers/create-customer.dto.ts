import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  taxId: string; // CPF, RG, passaporte, etc.

  @IsOptional()
  @IsString()
  address?: string;
}
