import { createFileRoute } from "@tanstack/react-router";
import { AdminSeoOverview } from "@/components/admin/seo/AdminSeoOverview";

export const Route = createFileRoute("/agaate-admin/_authed/seo/")({
  component: SeoOverviewPage,
});

function SeoOverviewPage() {
  return <AdminSeoOverview />;
}
