import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

type Auth = ReturnType<typeof betterAuth>;

export function createAuth(db: any, schema: any): Auth {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
      schema,
    }),
    emailAndPassword: {
      enabled: true,
    },
  });
}

// For backward compatibility - creates auth with default database
// This should be deprecated in favor of createAuth(db, schema)
let cachedAuth: Auth | undefined;

export function getAuth(db?: any, schema?: any): Auth {
  if (cachedAuth) {
    return cachedAuth;
  }

  // If no db/schema provided, this will throw an error
  // Apps should use createAuth(db, schema) instead
  if (!db || !schema) {
    throw new Error(
      "getAuth() requires db and schema parameters. Use createAuth(db, schema) instead."
    );
  }

  cachedAuth = createAuth(db, schema);
  return cachedAuth;
}

export { getAuth as auth };
