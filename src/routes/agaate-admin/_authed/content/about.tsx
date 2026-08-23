import { createFileRoute } from "@tanstack/react-router";
import { AdminCmsAbout } from "@/components/admin/cms/AdminCmsAbout";

export const Route = createFileRoute("/agaate-admin/_authed/content/about")({
  component: AboutAdminPage,
});

function AboutAdminPage() {
  const { adminUser } = Route.useRouteContext();
  return <AdminCmsAbout role={adminUser.role} />;
}
