import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  ssl: {
    rejectUnauthorized: false,
  },
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, // Production is false
  logging: ["query", "error"],
  entities: ["./src/db/entities/**/*.ts"],
  migrations: ["./src/db/migrations/**/*.ts"],
  subscribers: [],
});
