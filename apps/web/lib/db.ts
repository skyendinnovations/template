import { DATABASE_URL } from "@/envs";
import { neon } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";

type DbType = NeonHttpDatabase<Record<string, never>>;

let cachedDb: DbType | undefined;

export function getDb(): DbType {
  if (cachedDb) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/d079f950-e730-4743-b235-6696b1e2c7f7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'apps/web/lib/db.ts:10',message:'Using cached database connection',data:{app:'web'},timestamp:Date.now(),sessionId:'debug-session',runId:'initial',hypothesisId:'H6'})}).catch(()=>{});
    // #endregion

    return cachedDb;
  }

  const url = DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/d079f950-e730-4743-b235-6696b1e2c7f7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'apps/web/lib/db.ts:19',message:'Creating new database connection',data:{app:'web',hasUrl:!!url},timestamp:Date.now(),sessionId:'debug-session',runId:'initial',hypothesisId:'H6'})}).catch(()=>{});
  // #endregion

  const sql = neon(url);
  cachedDb = drizzle(sql);
  return cachedDb;
}

export default getDb;
