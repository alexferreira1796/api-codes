import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { CodeHistory } from "./codeHistory";
@Entity()
export class Code {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  value: string;

  @Column({ default: "BR" })
  type: string;

  @Column({ default: "send" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CodeHistory, (history) => history.code, {
    cascade: true,
    onDelete: "CASCADE",
  })
  history: CodeHistory[];

  constructor() {
    this.id = uuidv4();
    this.value = "";
    this.type = "";
    this.status = "";
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
