import { createAuth } from "@template/auth";
import { getDb } from "@/lib/db";
import * as schema from "@template/data/schema";
import { toNextJsHandler } from "better-auth/next-js";

export const runtime = "nodejs";

// Create auth instance with app-specific database and schema
const auth = createAuth(getDb(), schema);

export const GET = async (request: Request) => {
  const handler = toNextJsHandler(auth);
  return handler.GET(request);
};

export const POST = async (request: Request) => {
  const handler = toNextJsHandler(auth);
  return handler.POST(request);
};
