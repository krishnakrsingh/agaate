import { createFileRoute } from "@tanstack/react-router";
import { AdminSeoGlobal } from "@/components/admin/seo/AdminSeoGlobal";

export const Route = createFileRoute("/agaate-admin/_authed/seo/global")({
  component: SeoGlobalPage,
});

function SeoGlobalPage() {
  const { adminUser } = Route.useRouteContext();
  return <AdminSeoGlobal permissions={adminUser.permissions} />;
}
