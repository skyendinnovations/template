import { getAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const runtime = "nodejs";

export const GET = async (request: Request) => {
  const handler = toNextJsHandler(getAuth());
  return handler.GET(request);
};

export const POST = async (request: Request) => {
  const handler = toNextJsHandler(getAuth());
  return handler.POST(request);
};