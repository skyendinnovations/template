import "./globals.css";
import { Header } from "@/components/header";
import { Metadata } from "next/types";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Template",
  description: "Production-ready monorepo template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
