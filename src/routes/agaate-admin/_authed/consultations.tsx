import { createFileRoute } from "@tanstack/react-router";
import { AdminConsultations } from "@/components/admin/AdminConsultations";

export const Route = createFileRoute("/agaate-admin/_authed/consultations")({
  component: ConsultationsPage,
});

function ConsultationsPage() {
  return <AdminConsultations />;
}
