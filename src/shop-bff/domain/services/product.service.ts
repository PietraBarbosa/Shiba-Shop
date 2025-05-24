import { SqsDispatcherProvider } from "@/infrastructure/messages";
import {
  SQS_MESSAGE_OPERATIONS_ENUM,
  SQS_MESSAGE_TYPES_ENUM,
} from "@/shared/enums";
import { IdDto } from "@/shop-bff/application/dtos";
import {
  CreateProductDto,
  UpdateProductDto,
} from "@/shop-bff/application/dtos/products";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductService {
  constructor(private readonly dispatcher: SqsDispatcherProvider) {}

  async execute<T>(
    operation: SQS_MESSAGE_OPERATIONS_ENUM,
    body: ProductService.Body,
  ) {
    const monitorPayload = this.extractProductMonitorPayload(body);
    return this.dispatcher.send(
      process.env.SQS_INGESTION_QUEUE_NAME ?? "sqs-ingestion-queue",
      SQS_MESSAGE_TYPES_ENUM.PRODUCT,
      operation,
      body,
      monitorPayload,
    );
  }

  private extractProductMonitorPayload(body: Record<string, any>) {
    return {
      id: body.id ?? "NEW_PRODUCT",
    };
  }
}

export namespace ProductService {
  export type Body = CreateProductDto | (UpdateProductDto & IdDto) | IdDto;
}
