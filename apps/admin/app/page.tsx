"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@template/ui";
import {
  Shield,
  Users,
  Settings,
  BarChart3,
  Lock,
  Database,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminHome() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (session) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive administration interface for managing your
            application. Secure, powerful, and easy to use.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts, roles, and permissions with ease
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Database className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>
                Control and organize your application's content and resources
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>
                Monitor performance and generate detailed reports
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Settings className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure application settings and preferences
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle>Security Monitoring</CardTitle>
              <CardDescription>
                Track security events and manage access controls
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-indigo-600" />
              </div>
              <CardTitle>Admin Tools</CardTitle>
              <CardDescription>
                Powerful tools for system administration and maintenance
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Get Started</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sign in to access the admin panel or create a new admin account to
              begin managing your application.
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <Button size="lg" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
