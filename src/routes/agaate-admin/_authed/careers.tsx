import { createFileRoute } from "@tanstack/react-router";
import { AdminCareers } from "@/components/admin/AdminCareers";

export const Route = createFileRoute("/agaate-admin/_authed/careers")({
  component: CareersPage,
});

function CareersPage() {
  const { adminUser } = Route.useRouteContext();
  return <AdminCareers permissions={adminUser.permissions} />;
}
