import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const createDynamoClient = () =>
  new DynamoDBClient({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "fake",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "fake",
    },
    endpoint:
      process.env.DYNAMODB_LOCAL === "true"
        ? process.env.DYNAMODB_LOCAL_ENDPOINT || "http://localhost:8000"
        : undefined,
  });
