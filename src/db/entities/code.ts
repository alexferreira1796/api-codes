import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Code {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  value: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: "BR" })
  type: string;

  @Column({ default: "send" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    this.id = uuidv4();
    this.value = "";
    this.title = "";
    this.description = "";
    this.type = "";
    this.status = "";
    this.description = "";
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
