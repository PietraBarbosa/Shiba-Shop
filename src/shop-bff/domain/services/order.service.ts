import { SqsDispatcherProvider } from "@/infrastructure/messages";
import {
  SQS_MESSAGE_OPERATIONS_ENUM,
  SQS_MESSAGE_TYPES_ENUM,
} from "@/shared/enums";
import { IdDto } from "@/shop-bff/application/dtos";
import {
  CreateOrderDto,
  UpdateOrderDto,
} from "@/shop-bff/application/dtos/orders";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OrderService {
  constructor(private readonly dispatcher: SqsDispatcherProvider) {}

  async execute<T>(
    operation: SQS_MESSAGE_OPERATIONS_ENUM,
    body: OrderService.Body,
  ) {
    const monitorPayload = this.extractOrderMonitorPayload(body);
    return this.dispatcher.send(
      process.env.SQS_INGESTION_QUEUE_NAME ?? "sqs-ingestion-queue",
      SQS_MESSAGE_TYPES_ENUM.ORDER,
      operation,
      body,
      monitorPayload,
    );
  }

  private extractOrderMonitorPayload(body: Record<string, any>) {
    return {
      id: body.productId ?? "UNKNOWN_PRODUCT",
    };
  }
}

export namespace OrderService {
  export type Body = CreateOrderDto | (UpdateOrderDto & IdDto) | IdDto;
}
