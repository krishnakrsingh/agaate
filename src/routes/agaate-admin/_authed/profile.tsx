import { createFileRoute } from "@tanstack/react-router";
import { AdminProfilePanel } from "@/components/admin/AdminProfilePanel";

export const Route = createFileRoute("/agaate-admin/_authed/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return <AdminProfilePanel />;
}
