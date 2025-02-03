import { env } from "@/data/env";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { Pool } from "pg";

const pool = new Pool({
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  host: env.DB_HOST,
  port: Number(env.DB_PORT) || 5432,
});

export const db = drizzle(pool, { schema });

export const closePool = async () => {
  await pool.end();
};
