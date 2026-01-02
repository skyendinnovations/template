"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@template/ui";

export default function Home() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="container mx-auto px-4 py-8 bg-red-500">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Welcome back, {session.user.name}!</h1>
            <p className="text-xl text-gray-600">You&apos;re successfully logged in to your dashboard.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  View Profile
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure your preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Open Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Demo Form</CardTitle>
                <CardDescription>Create and manage demo records</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/demo">
                    Create Demo Record
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">
            Welcome to Template
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A production-ready monorepo template with authentication, database, and modern UI components.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>Secure user authentication with Better Auth</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Database</CardTitle>
              <CardDescription>PostgreSQL with Drizzle ORM and Neon</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modern UI</CardTitle>
              <CardDescription>Beautiful components with Tailwind CSS and shadcn/ui</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="flex justify-center space-x-4">
          <Button size="lg" asChild>
            <Link href="/signin">
              Sign In
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/signup">
              Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}


