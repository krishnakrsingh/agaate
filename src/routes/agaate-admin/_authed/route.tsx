import { createFileRoute, isRedirect, redirect } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminSession } from "@/functions/admin-auth";

export const Route = createFileRoute("/agaate-admin/_authed")({
  beforeLoad: async ({ location }) => {
    try {
      const res = await getAdminSession();
      if (!res?.user) {
        throw redirect({ to: "/agaate-admin/login", search: { redirect: location.pathname } });
      }
      return { adminUser: res.user };
    } catch (err) {
      if (isRedirect(err)) throw err;
      throw redirect({ to: "/agaate-admin/login", search: { redirect: location.pathname } });
    }
  },
  component: AuthedLayout,
});

function AuthedLayout() {
  const { adminUser } = Route.useRouteContext();
  return <AdminShell user={adminUser} />;
}
