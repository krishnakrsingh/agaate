import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getAdminDashboard } from "@/functions/admin-dashboard";
import { adminError, isAdminOk } from "@/lib/admin-api";
import type { DashboardData } from "@/components/admin/AdminDashboard";

export const Route = createFileRoute("/agaate-admin/_authed/")({
  loader: async () => {
    const res = await getAdminDashboard();
    return { res };
  },
  component: DashboardPage,
});

function DashboardPage() {
  const { res } = Route.useLoaderData();
  const { adminUser } = useRouteContext({ from: "/agaate-admin/_authed" });

  if (!isAdminOk<DashboardData>(res)) {
    return (
      <p className="text-sm text-rose-600">{adminError(res, "Unable to load dashboard.")}</p>
    );
  }

  return <AdminDashboard data={res} user={adminUser} />;
}
