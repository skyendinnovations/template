import { Dashboard } from "@/components/dashboard";
import { getAllUserNames } from "@/data/sample";

export default async function AdminDashboardPage() {
  const res = await getAllUserNames();

  if(res.serverError || !res.data) {
    return <div>Error fetching users</div>;
  }

  return <Dashboard users={res.data} />;
}
