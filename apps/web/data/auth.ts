"use server";

import { signIn, signUp } from "../lib/auth-client";
import { SignInFormData, SignUpFormData } from "../lib/schemas";

export async function signInAction(formData: SignInFormData) {
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

export async function signUpAction(formData: SignUpFormData) {
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
      error:
        error instanceof Error ? error.message : "Failed to create account",
    };
  }
}
