import { createFileRoute } from "@tanstack/react-router";
import { AdminSeoAudit } from "@/components/admin/seo/AdminSeoAudit";

export const Route = createFileRoute("/agaate-admin/_authed/seo/audit")({
  component: SeoAuditPage,
});

function SeoAuditPage() {
  return <AdminSeoAudit />;
}
