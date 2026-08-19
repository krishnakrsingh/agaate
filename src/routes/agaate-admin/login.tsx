import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getAdminSession } from "@/functions/admin-auth";

export const Route = createFileRoute("/agaate-admin/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  beforeLoad: async () => {
    const { user } = await getAdminSession();
    if (user) throw redirect({ to: "/agaate-admin" });
  },
  component: AdminLoginForm,
});
