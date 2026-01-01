import Link from "next/link";
import { SignUpForm } from "@/components/auth/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Create Admin Account</h1>
        <p className="text-gray-600">Set up your administrator account</p>
      </div>

      <SignUpForm />

      <div className="text-center">
        <p className="text-gray-600">
          Already have an admin account?{" "}
          <Link href="/signin" className="text-blue-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
