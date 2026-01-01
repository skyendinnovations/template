import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

type Auth = ReturnType<typeof betterAuth>;

export function createAuth(
  db: any,
  schema: any,
  baseURL?: string,
  secret?: string
): Auth {
  // Get CORS origins from environment - allow both apps to access auth
  const allowedOrigins = [process.env.NEXT_PUBLIC_APP_URL].filter(
    (url, index, arr) => url && arr.indexOf(url) === index
  ); // Remove duplicates

  return betterAuth({
    baseURL,
    secret: secret || process.env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(db, {
      provider: "pg",
      schema,
    }),
    emailAndPassword: {
      enabled: true,
    },
    // Additional configuration for Better Auth v1.0.0
    trustedOrigins: baseURL ? [baseURL] : undefined,
    // CORS configuration for multiple apps sharing auth
    cors: {
      origin: allowedOrigins,
      credentials: true,
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
