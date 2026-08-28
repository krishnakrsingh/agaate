import { createFileRoute } from "@tanstack/react-router";
import { AdminFarmVisits } from "@/components/admin/AdminFarmVisits";

export const Route = createFileRoute("/agaate-admin/_authed/farm-visits")({
  component: FarmVisitsPage,
});

function FarmVisitsPage() {
  const { adminUser } = Route.useRouteContext();
  return <AdminFarmVisits permissions={adminUser.permissions} />;
}
