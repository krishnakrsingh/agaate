import { createFileRoute } from "@tanstack/react-router";
import { AdminCmsCareers } from "@/components/admin/cms/AdminCmsCareers";

export const Route = createFileRoute("/agaate-admin/_authed/content/careers")({
  component: CareersAdminPage,
});

function CareersAdminPage() {
  const { adminUser } = Route.useRouteContext();
  return <AdminCmsCareers role={adminUser.role} />;
}
