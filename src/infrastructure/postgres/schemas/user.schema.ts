import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column() name: string;

  @Column({ unique: true }) email: string;

  @Column({ nullable: true }) address: string;

  @CreateDateColumn() created_at: Date;
}
