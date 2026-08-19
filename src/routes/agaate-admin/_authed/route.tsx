import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminSession } from "@/functions/admin-auth";

export const Route = createFileRoute("/agaate-admin/_authed")({
  beforeLoad: async ({ location }) => {
    const { user } = await getAdminSession();
    if (!user) {
      throw redirect({ to: "/agaate-admin/login", search: { redirect: location.pathname } });
    }
    return { adminUser: user };
  },
  component: AuthedLayout,
});

function AuthedLayout() {
  const { adminUser } = Route.useRouteContext();
  return <AdminShell user={adminUser} />;
}
