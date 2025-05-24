import { PostgresDatabaseClient } from "@/infrastructure/postgres";
import { UserEntity } from "@/infrastructure/postgres/schemas";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository extends PostgresDatabaseClient<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
  ) {
    super(repository);
  }
}
