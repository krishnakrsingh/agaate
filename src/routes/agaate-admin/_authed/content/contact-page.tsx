import { createFileRoute } from "@tanstack/react-router";
import { AdminCmsContactPage } from "@/components/admin/cms/AdminCmsContactPage";

export const Route = createFileRoute("/agaate-admin/_authed/content/contact-page")({
  component: ContactPageAdminPage,
});

function ContactPageAdminPage() {
  const { adminUser } = Route.useRouteContext();
  return <AdminCmsContactPage permissions={adminUser.permissions} />;
}
