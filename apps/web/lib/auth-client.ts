import { BETTER_AUTH_URL } from "@/envs-client";
import { createClientAuth } from "@template/auth/client";

export const authClient = createClientAuth(BETTER_AUTH_URL!);

export const { signIn, signUp, signOut, useSession } = authClient;
