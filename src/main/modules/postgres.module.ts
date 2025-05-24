import { Module } from "@nestjs/common";
import { postgresConfig } from "@/main/configs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@/infrastructure/postgres/schemas";

@Module({
  imports: [
    TypeOrmModule.forRootAsync(postgresConfig),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [TypeOrmModule],
})
export class PostgresDatabaseModule {}
