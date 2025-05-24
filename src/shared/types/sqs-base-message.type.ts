import {
  SQS_MESSAGE_OPERATIONS_ENUM,
  SQS_MESSAGE_TYPES_ENUM,
} from "@/shared/enums";

export interface SqsBaseMessage<T> {
  type: SQS_MESSAGE_TYPES_ENUM;
  operation: SQS_MESSAGE_OPERATIONS_ENUM;
  payload: T;
  timestamp: number;
}

export interface SqsConsumeBaseMessage<T> {
  Body: string;
}
