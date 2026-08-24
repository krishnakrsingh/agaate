import { createFileRoute, isRedirect, redirect } from "@tanstack/react-router";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getAdminSession } from "@/functions/admin-auth";

function validateLoginSearch(search: Record<string, unknown>): { redirect?: string } {
  return typeof search.redirect === "string" ? { redirect: search.redirect } : {};
}

export const Route = createFileRoute("/agaate-admin/login")({
  validateSearch: validateLoginSearch,
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
