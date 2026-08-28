import { createFileRoute } from "@tanstack/react-router";
import { AdminSeoRedirects } from "@/components/admin/seo/AdminSeoRedirects";

export const Route = createFileRoute("/agaate-admin/_authed/seo/redirects")({
  component: SeoRedirectsPage,
});

function SeoRedirectsPage() {
  const { adminUser } = Route.useRouteContext();
  return <AdminSeoRedirects permissions={adminUser.permissions} />;
}
