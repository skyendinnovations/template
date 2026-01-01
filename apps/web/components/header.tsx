"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Button } from "@template/ui";
import { UserMenu } from "@/components/user-menu";

export function Header() {
  const { data: session, isPending } = useSession();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Template
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
