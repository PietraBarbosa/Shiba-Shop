import { SQS_MESSAGE_OPERATIONS_ENUM } from "@/shared/enums";

export class ProcessProductCommand {
  constructor(
    public readonly operation: SQS_MESSAGE_OPERATIONS_ENUM,
    public readonly payload: any,
  ) {}
}
