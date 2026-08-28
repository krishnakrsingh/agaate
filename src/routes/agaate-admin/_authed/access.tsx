import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminAccessManager } from "@/components/admin/AdminAccessManager";
import { canManageUsers, type SessionUser } from "@/lib/admin-constants";

export const Route = createFileRoute("/agaate-admin/_authed/access")({
  beforeLoad: ({ context }) => {
    const user = (context as { adminUser?: SessionUser }).adminUser;
    if (!user || !canManageUsers(user)) {
      throw redirect({ to: "/agaate-admin" });
    }
  },
  component: AccessPage,
});

function AccessPage() {
  const { adminUser } = Route.useRouteContext();
  return <AdminAccessManager actor={adminUser} />;
}
