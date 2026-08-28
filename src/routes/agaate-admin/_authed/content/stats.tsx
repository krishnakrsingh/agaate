import { createFileRoute } from "@tanstack/react-router";
import { AdminCmsStats } from "@/components/admin/cms/AdminCmsStats";

export const Route = createFileRoute("/agaate-admin/_authed/content/stats")({
  component: StatsPage,
});

function StatsPage() {
  const { adminUser } = Route.useRouteContext();
  return <AdminCmsStats permissions={adminUser.permissions} />;
}
