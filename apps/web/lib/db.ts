import { DATABASE_URL } from "@/envs";
import { neon } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "@template/data/schema";

type DbType = NeonHttpDatabase<typeof schema>;

let cachedDb: DbType | undefined;

export function getDb(): DbType {
  if (cachedDb) {
    return cachedDb;
  }

  const url = DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const sql = neon(url);
  cachedDb = drizzle(sql, { schema });
  return cachedDb;
}

export default getDb;
