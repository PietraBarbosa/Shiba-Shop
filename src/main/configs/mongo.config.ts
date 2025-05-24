import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";

export const mongoConfig: MongooseModuleAsyncOptions = {
  useFactory: async () => ({
    uri: process.env.MONGO_URI || "mongodb://localhost:27017",
    dbName: "shiba-shop",
  }),
};
