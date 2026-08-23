import { createFileRoute } from "@tanstack/react-router";
import { AdminCmsAppLinks } from "@/components/admin/cms/AdminCmsAppLinks";

export const Route = createFileRoute("/agaate-admin/_authed/content/app-links")({
  component: AppLinksPage,
});

function AppLinksPage() {
  const { adminUser } = Route.useRouteContext();
  return <AdminCmsAppLinks role={adminUser.role} />;
}
