import {
  SQS_MESSAGE_OPERATIONS_ENUM,
  SQS_MESSAGE_TYPES_ENUM,
} from "@/shared/enums";
import { SqsBaseMessage } from "@/shared/types";

export class SqsMessageFactory {
  static ingestion<T>(
    type: SQS_MESSAGE_TYPES_ENUM,
    operation: SQS_MESSAGE_OPERATIONS_ENUM,
    payload: T,
  ): SqsBaseMessage<T> {
    return {
      type,
      operation,
      payload,
      timestamp: Date.now(),
    };
  }
}
