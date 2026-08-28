import { createFileRoute } from "@tanstack/react-router";
import { AdminLocations } from "@/components/admin/AdminLocations";

export const Route = createFileRoute("/agaate-admin/_authed/locations")({
  component: LocationsPage,
});

function LocationsPage() {
  const { adminUser } = Route.useRouteContext();
  return <AdminLocations permissions={adminUser.permissions} />;
}
