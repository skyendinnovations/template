import { createAuth } from "@template/auth";
import { getDb } from "@/lib/db";
import * as schema from "@template/data/schema";
import { toNextJsHandler } from "better-auth/next-js";
import { NEXT_PUBLIC_APP_URL } from "@/envs";

export const runtime = "nodejs";

// #region agent log
fetch("http://127.0.0.1:7243/ingest/d079f950-e730-4743-b235-6696b1e2c7f7", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    location: "apps/web/app/api/auth/[...all]/route.ts:10",
    message: "Auth API route initialized",
    data: { app: "web", baseURL: NEXT_PUBLIC_APP_URL },
    timestamp: Date.now(),
    sessionId: "debug-session",
    runId: "initial",
    hypothesisId: "H1",
  }),
}).catch(() => {});
// #endregion

// Create auth instance with app-specific database and schema
const auth = createAuth(
  getDb(),
  schema,
  NEXT_PUBLIC_APP_URL,
  process.env.BETTER_AUTH_SECRET
);

export const GET = async (request: Request) => {
  // #region agent log
  fetch("http://127.0.0.1:7243/ingest/d079f950-e730-4743-b235-6696b1e2c7f7", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      location: "apps/web/app/api/auth/[...all]/route.ts:16",
      message: "GET request received",
      data: {
        method: "GET",
        url: request.url,
        cookies: request.headers.get("cookie"),
      },
      timestamp: Date.now(),
      sessionId: "debug-session",
      runId: "initial",
      hypothesisId: "H2",
    }),
  }).catch(() => {});
  // #endregion

  const handler = toNextJsHandler(auth);
  return handler.GET(request);
};

export const POST = async (request: Request) => {
  // #region agent log
  fetch("http://127.0.0.1:7243/ingest/d079f950-e730-4743-b235-6696b1e2c7f7", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      location: "apps/web/app/api/auth/[...all]/route.ts:25",
      message: "POST request received",
      data: {
        method: "POST",
        url: request.url,
        contentType: request.headers.get("content-type"),
      },
      timestamp: Date.now(),
      sessionId: "debug-session",
      runId: "initial",
      hypothesisId: "H2",
    }),
  }).catch(() => {});
  // #endregion

  const handler = toNextJsHandler(auth);
  return handler.POST(request);
};
