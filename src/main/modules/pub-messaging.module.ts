import { SqsDispatcherProvider } from "@/infrastructure/messages";
import { Module } from "@nestjs/common";
import { SqsModule } from "@ssut/nestjs-sqs";

@Module({
  imports: [
    SqsModule.register({
      producers: [
        {
          name: "sqs-ingestion-queue",
          queueUrl:
            process.env.SQS_INGESTION_QUEUE_URL ??
            "https://localhost.localstack.cloud:4566/000000000000/sqs-ingestion-queue",
          region: process.env.AWS_REGION ?? "us-east-1",
        },
        {
          name: "sqs-monitor-queue",
          queueUrl:
            process.env.SQS_MONITOR_QUEUE_URL ??
            "https://localhost.localstack.cloud:4566/000000000000/sqs-monitor-queue",
          region: process.env.AWS_REGION ?? "us-east-1",
        },
      ],
      consumers: [],
    }),
  ],
  providers: [SqsDispatcherProvider],
  exports: [SqsDispatcherProvider, SqsModule],
})
export class PubMessagingModule {}
