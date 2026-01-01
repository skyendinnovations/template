import "./globals.css";
import { Metadata } from "next/types";
import { Toaster } from "sonner";
import { ConditionalHeader } from "./conditional-header";

export const metadata: Metadata = {
  title: "Admin - Template",
  description: "Admin panel for the template application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        <div className="min-h-screen bg-white">
          <ConditionalHeader />
          <main className="flex-1">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
