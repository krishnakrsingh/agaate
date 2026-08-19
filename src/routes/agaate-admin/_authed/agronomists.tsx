import { createFileRoute } from "@tanstack/react-router";
import { AdminAgronomists } from "@/components/admin/AdminAgronomists";

export const Route = createFileRoute("/agaate-admin/_authed/agronomists")({
  component: AgronomistsPage,
});

function AgronomistsPage() {
  return <AdminAgronomists />;
}
