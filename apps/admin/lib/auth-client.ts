import { NEXT_PUBLIC_APP_URL } from "@/envs-client";
import { createClientAuth } from "@template/auth/client";

export const authClient = createClientAuth(
  NEXT_PUBLIC_APP_URL || "http://localhost:3001"
);

export const { signIn, signUp, signOut, useSession } = authClient;
