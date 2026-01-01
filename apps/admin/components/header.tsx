"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Button } from "@template/ui";
import { UserMenu } from "@/components/user-menu";

export function Header() {
  const { data: session, isPending } = useSession();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Admin Panel
          </Link>

          <nav className="flex items-center space-x-4">
            {isPending ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            ) : session ? (
              <UserMenu />
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
