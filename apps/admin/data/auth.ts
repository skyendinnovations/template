import { actionClient } from "@/lib/safe-action";
import { signIn, signUp } from "../lib/auth-client";
import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signInActionClient = actionClient
  .inputSchema(signInSchema)
  .action(
    async ({
      parsedInput: formData,
    }): Promise<{ success: boolean; error?: string }> => {
      try {
        await signIn.email({
          email: formData.email,
          password: formData.password,
        });

        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to sign in",
        };
      }
    }
  );

export const signUpActionClient = actionClient
  .inputSchema(signUpSchema)
  .action(
    async ({
      parsedInput: formData,
    }): Promise<{ success: boolean; error?: string }> => {
      try {
        await signUp.email({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        });

        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to sign up",
        };
      }
    }
  );
