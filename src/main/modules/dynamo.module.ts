import { Module } from "@nestjs/common";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

@Module({
  providers: [
    {
      provide: DynamoDBClient,
      useFactory: () =>
        new DynamoDBClient({
          region: process.env.AWS_REGION,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
          endpoint:
            process.env.DYNAMODB_LOCAL === "true"
              ? process.env.DYNAMODB_LOCAL_ENDPOINT
              : undefined,
        }),
    },
  ],
  exports: [DynamoDBClient],
})
export class DynamoDBModule {}
