"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";

export function ConditionalHeader() {
  const pathname = usePathname();

  // Don't show header on auth pages
  const isAuthPage = pathname === "/signin" || pathname === "/signup";

  if (isAuthPage) {
    return null;
  }

  return <Header />;
}


