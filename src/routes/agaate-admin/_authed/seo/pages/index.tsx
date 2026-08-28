import { createFileRoute } from "@tanstack/react-router";
import { AdminSeoPages } from "@/components/admin/seo/AdminSeoPages";

export const Route = createFileRoute("/agaate-admin/_authed/seo/pages/")({
  component: SeoPagesListPage,
});

function SeoPagesListPage() {
  return <AdminSeoPages />;
}
