import { createFileRoute } from "@tanstack/react-router";
import { AdminCmsLogos } from "@/components/admin/cms/AdminCmsLogos";

export const Route = createFileRoute("/agaate-admin/_authed/content/logos")({
  component: LogosPage,
});

function LogosPage() {
  const { adminUser } = Route.useRouteContext();
  return <AdminCmsLogos permissions={adminUser.permissions} />;
}
