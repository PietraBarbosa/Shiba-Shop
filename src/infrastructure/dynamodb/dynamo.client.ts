import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  AttributeValue,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export class DynamoClient<T extends Record<string, any>> {
  constructor(
    private readonly client: DynamoDBClient,
    private readonly tableName: string,
  ) {}

  async put(item: T): Promise<void> {
    await this.client.send(
      new PutItemCommand({
        TableName: this.tableName,
        Item: marshall(item),
      }),
    );
  }

  async getByKey(key: Record<string, any>): Promise<T | null> {
    const res = await this.client.send(
      new GetItemCommand({
        TableName: this.tableName,
        Key: marshall(key),
      }),
    );
    return res.Item ? (unmarshall(res.Item) as T) : null;
  }
  async update(key: Record<string, any>, updates: Partial<T>): Promise<void> {
    const updateExpressions = Object.keys(updates).map(
      (k, i) => `#k${i} = :v${i}`,
    );
    const ExpressionAttributeNames = Object.fromEntries(
      Object.keys(updates).map((k, i) => [`#k${i}`, k]),
    );
    const ExpressionAttributeValues: Record<string, AttributeValue> = {};

    Object.entries(updates).forEach(([_, value], i) => {
      ExpressionAttributeValues[`:v${i}`] = marshall({ v: value }).v!;
    });

    await this.client.send(
      new UpdateItemCommand({
        TableName: this.tableName,
        Key: marshall(key),
        UpdateExpression: `SET ${updateExpressions.join(", ")}`,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
      }),
    );
  }

  async delete(key: Record<string, any>): Promise<void> {
    await this.client.send(
      new DeleteItemCommand({
        TableName: this.tableName,
        Key: marshall(key),
      }),
    );
  }
}
