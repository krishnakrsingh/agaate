import { createFileRoute } from "@tanstack/react-router";
import { AdminCmsSiteContact } from "@/components/admin/cms/AdminCmsSiteContact";

export const Route = createFileRoute("/agaate-admin/_authed/content/site-contact")({
  component: SiteContactAdminPage,
});

function SiteContactAdminPage() {
  const { adminUser } = Route.useRouteContext();
  return <AdminCmsSiteContact permissions={adminUser.permissions} />;
}
