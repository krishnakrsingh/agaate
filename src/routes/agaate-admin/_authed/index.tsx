import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getAdminDashboard } from "@/functions/admin-contacts";
import { adminError, isAdminOk } from "@/lib/admin-api";

export const Route = createFileRoute("/agaate-admin/_authed/")({
  loader: async () => {
    const res = await getAdminDashboard();
    return res;
  },
  component: DashboardPage,
});

function DashboardPage() {
  const data = Route.useLoaderData();
  if (!isAdminOk<{ kpis?: Record<string, number>; charts?: object }>(data)) {
    return <p className="text-sm text-rose-600">{adminError(data, "Unable to load dashboard.")}</p>;
  }

  return <AdminDashboard kpis={data.kpis ?? {}} charts={data.charts ?? {}} />;
}
