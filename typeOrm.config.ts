import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432") || 5432,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "mac@postgres",
  database: process.env.DB_NAME || "codes",
  synchronize: true,
  logging: ["query", "error"],
  entities: ["./src/db/entities/**/*.ts"],
  migrations: ["./src/db/migrations/**/*.ts"],
  subscribers: [],
});
