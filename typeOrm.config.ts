import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

import { entities, migrations, synchronize, ssl } from "./src/config/envs";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  ssl,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize,
  logging: ["query", "error"],
  entities,
  migrations,
  subscribers: [],
});
