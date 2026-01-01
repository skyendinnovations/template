import Link from "next/link";
import { SignInForm } from "@/components/auth/sign-in-form";

export default function SignInPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Sign In</h1>
        <p className="text-gray-600">
          Sign in to access the admin panel
        </p>
      </div>

      <SignInForm />

      <div className="text-center">
        <p className="text-gray-600">
          Need an admin account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
