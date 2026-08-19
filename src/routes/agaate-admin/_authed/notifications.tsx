import { createFileRoute } from "@tanstack/react-router";
import { AdminNotificationsView } from "@/components/admin/AdminNotificationsView";

export const Route = createFileRoute("/agaate-admin/_authed/notifications")({
  component: NotificationsPage,
});

function NotificationsPage() {
  return <AdminNotificationsView />;
}
