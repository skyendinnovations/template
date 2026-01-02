import { admin, magicLink } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";
import { getCookiePrefix } from "./cookie-prefix";
import { isAdminDomain } from "./auth-utils";

import type { AuthConfigAdmin, AuthConfigWeb, AuthConfig } from "./types";


const getAuthAdmin = (
  adapter: Parameters<typeof betterAuth>[0]["database"],
  config: AuthConfigAdmin
) => {
  const {
    sendVerificationEmail,
    sendMagicLink,
    sendResetPassword,
    onPasswordReset,
    beforeUserCreateHook,
  } = config;

  return betterAuth({
    trustedOrigins: ["http://localhost:3001"],
    database: adapter,
    user: {
      fields: {
        name: "name",
        role: "role",
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      sendOnSignIn: true,
      autoSignInAfterVerification: true,
      sendVerificationEmail,
    },
    emailAndPassword: {
      enabled: true,
      sendResetPassword,
      onPasswordReset,
    },
    plugins: [
      admin(),
      magicLink({
        sendMagicLink,
      }),
      nextCookies(),
    ],
    databaseHooks: {
      user: {
        create: {
          before: beforeUserCreateHook,
        },
      },
    },
    advanced: {
      cookiePrefix: getCookiePrefix("@template/admin"),
      generateId: () => crypto.randomUUID(),
    },
  });
};

const getAuthWeb = (
  adapter: Parameters<typeof betterAuth>[0]["database"],
  config: AuthConfigWeb
) => {
  const {
    sendVerificationEmail,
    sendMagicLink,
    sendResetPassword,
    onPasswordReset,
    beforeUserCreateHook,
  } = config;

  return betterAuth({
    trustedOrigins: ["http://localhost:3000"],
    database: adapter,
    user: {
      fields: {
        name: "name",
        role: "role",
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      sendOnSignIn: true,
      autoSignInAfterVerification: true,
      sendVerificationEmail,
    },
    emailAndPassword: {
      enabled: true,
      sendResetPassword,
      onPasswordReset,
    },
    plugins: [
      admin(),
      magicLink({
        sendMagicLink,
      }),
      nextCookies(),
    ],
    databaseHooks: {
      user: {
        create: {
          before: beforeUserCreateHook,
          after: async (user) => {
            // Create admin record if user has admin domain email
            if (isAdminDomain(user.email)) {
              try {
                const db = adapter as any;
                await db
                  .insertInto("admins")
                  .values({
                    id: user.id,
                    userId: user.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  })
                  .execute();
              } catch (error) {
                console.error("Failed to create admin record:", error);
              }
            }
          },
        },
      },
    },
    advanced: {
      cookiePrefix: getCookiePrefix("@template/web"),
      generateId: () => crypto.randomUUID(),
    },
  });
};

export type AuthAdmin = ReturnType<typeof getAuthAdmin>;
export type AuthWeb = ReturnType<typeof getAuthWeb>;

type AuthByName<N> = N extends "@template/admin"
  ? AuthAdmin
  : N extends "@template/web"
    ? AuthWeb
    : never;

export const getAuth = <N extends AuthConfig["name"]>(
  config: Extract<AuthConfig, { name: N }>,
  adapter: Parameters<typeof betterAuth>[0]["database"]
) => {
  const { name } = config;

  switch (name) {
    case "@template/admin": {
      return getAuthAdmin(adapter, config as AuthConfigAdmin) as AuthByName<N>;
    }

    case "@template/web": {
      return getAuthWeb(adapter, config as AuthConfigWeb) as AuthByName<N>;
    }

    default:
      const exhaustiveCheck: never = name;
      throw new Error(`Invalid application type: ${exhaustiveCheck}.`);
  }
};
