import { NEXT_PUBLIC_BETTER_AUTH_URL } from "@/envs-client";
import { createClientAuth } from "@template/auth/client";

export const authClient = createClientAuth(NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000");

export const { signIn, signUp, signOut, useSession } = authClient;
