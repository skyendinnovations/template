import { BETTER_AUTH_URL } from "@/envs";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: BETTER_AUTH_URL || "http://localhost:3000",
});

export const { signIn, signUp, signOut, useSession } = authClient;
