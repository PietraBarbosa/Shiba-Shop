import { SqsDispatcherProvider } from "@/infrastructure/messages";
import {
  SQS_MESSAGE_OPERATIONS_ENUM,
  SQS_MESSAGE_TYPES_ENUM,
} from "@/shared/enums";
import { IdDto } from "@/shop-bff/application/dtos";
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from "@/shop-bff/application/dtos/customers";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerService {
  constructor(private readonly dispatcher: SqsDispatcherProvider) {}

  async execute<T>(
    operation: SQS_MESSAGE_OPERATIONS_ENUM,
    body: CustomerService.Body,
  ) {
    const monitorPayload = this.extractMonitorPayload(body);

    return this.dispatcher.send(
      process.env.SQS_INGESTION_QUEUE_NAME ?? "sqs-ingestion-queue",
      SQS_MESSAGE_TYPES_ENUM.USER,
      operation,
      body,
      monitorPayload,
    );
  }

  private extractMonitorPayload(
    body: CreateCustomerDto | (UpdateCustomerDto & IdDto) | IdDto,
  ) {
    return {
      taxId: (body as any).taxId ?? (body as any).id ?? "UNKNOWN_USER",
    };
  }
}

export namespace CustomerService {
  export type Body = CreateCustomerDto | (UpdateCustomerDto & IdDto) | IdDto;
}
