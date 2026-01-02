import { Dashboard } from "@/components/dashboard";
import { getAllUserNames } from "@/data/sample";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  const res = await getAllUserNames();

  if(res.serverError || !res.data) {
    return <div>Error fetching users</div>;
  }

  return <Dashboard users={res.data} />;
}
