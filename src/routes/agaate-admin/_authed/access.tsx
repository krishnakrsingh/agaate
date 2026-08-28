import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminAccessManager } from "@/components/admin/AdminAccessManager";
import { canManageUsers, type AdminRole } from "@/lib/admin-constants";

export const Route = createFileRoute("/agaate-admin/_authed/access")({
  beforeLoad: ({ context }) => {
    const user = (context as { adminUser?: { role: string } }).adminUser;
    if (!user || !canManageUsers(user.role as AdminRole)) {
      throw redirect({ to: "/agaate-admin" });
    }
  },
  component: AccessPage,
});

function AccessPage() {
  const { adminUser } = Route.useRouteContext();
  return <AdminAccessManager actorRole={adminUser.role as AdminRole} actorId={adminUser.id} />;
}
