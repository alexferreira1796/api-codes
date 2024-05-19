import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn, // Importar a anotação JoinColumn
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Code } from "./code";

@Entity()
export class CodeHistory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Code, (code) => code.history, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "codeId" })
  code: Code;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  step: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    this.id = uuidv4();
    this.title = "";
    this.description = "";
    this.step = 1;
    this.description = "";
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
