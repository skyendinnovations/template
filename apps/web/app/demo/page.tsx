import { DemoForm } from "@/components/demo-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@template/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DemoPage() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Demo Form</h1>
          <p className="text-xl text-gray-600">
            Create a demo record by filling out the form below.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Demo Record</CardTitle>
            <CardDescription>
              Fill out the form to create a new demo record. Each user can only have one demo record.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DemoForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
