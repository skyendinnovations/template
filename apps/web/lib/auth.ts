import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "./db";
import * as schema from "@template/data/schema";

type Auth = ReturnType<typeof betterAuth>;

let cachedAuth: Auth | undefined;

export function getAuth(): Auth {
  if (cachedAuth) {
    return cachedAuth;
  }

  cachedAuth = betterAuth({
    database: drizzleAdapter(getDb(), {
      provider: "pg",
      schema,
    }),
    emailAndPassword: {
      enabled: true,
    },
  });

  return cachedAuth;
}

export { getAuth as auth };
