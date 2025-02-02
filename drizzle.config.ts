import { defineConfig } from "drizzle-kit";
import { env } from "./src/data/env";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  strict: true,
  verbose: true,
  dialect: "postgresql",
  dbCredentials: {
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    ssl: false,
  },
});
