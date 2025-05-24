import { UserEntity } from "@/infrastructure/postgres/schemas";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";

export const postgresConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async () => ({
    type: "postgres",
    host: process.env.PG_HOST || "localhost",
    port: Number(process.env.PG_PORT) || 5432,
    username: process.env.PG_USER || "admin",
    password: process.env.PG_PASSWORD || "admin",
    database: process.env.PG_DATABASE || "shiba",
    entities: [UserEntity],
    synchronize: true,
  }),
};
