import { createFileRoute } from "@tanstack/react-router";
import { AdminCmsKisaanMall } from "@/components/admin/cms/AdminCmsKisaanMall";

export const Route = createFileRoute("/agaate-admin/_authed/content/kisaan-mall")({
  component: KisaanMallAdminPage,
});

function KisaanMallAdminPage() {
  const { adminUser } = Route.useRouteContext();
  return <AdminCmsKisaanMall role={adminUser.role} />;
}
