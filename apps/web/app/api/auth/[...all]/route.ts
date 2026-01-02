import { getAuth } from "@template/auth";
import { getDb } from "@/lib/db";
import { user, session, account, verification } from "@template/data/schema";
import { toNextJsHandler } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const runtime = "nodejs";

const webSchema = {
  user: user,
  session: session,
  account: account,
  verification: verification,
};

// Create auth instance with app-specific configuration
const auth = getAuth(
  {
    name: "@template/web",
    sendVerificationEmail: async ({ user, url }) => {
      // TODO: Implement email sending
      console.log("Send verification email to:", user.email, "URL:", url);
    },
    sendMagicLink: async ({ email, url }) => {
      // TODO: Implement email sending
      console.log("Send magic link to:", email, "URL:", url);
    },
    sendResetPassword: async ({ user, url }) => {
      // TODO: Implement email sending
      console.log("Send reset password to:", user.email, "URL:", url);
    },
  },
  drizzleAdapter(getDb(), { provider: "pg", schema: webSchema })
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
