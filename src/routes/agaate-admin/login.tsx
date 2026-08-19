import { createFileRoute, isRedirect, redirect } from "@tanstack/react-router";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getAdminSession } from "@/functions/admin-auth";

export const Route = createFileRoute("/agaate-admin/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  beforeLoad: async () => {
    try {
      const res = await getAdminSession();
      if (res?.user) throw redirect({ to: "/agaate-admin" });
    } catch (err) {
      if (isRedirect(err)) throw err;
    }
  },
  component: AdminLoginForm,
});
