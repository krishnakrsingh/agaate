import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminSettingsPanel } from "@/components/admin/AdminSettingsPanel";
import { getAdminCategories, getAdminSettings, listAdminUsers } from "@/functions/admin-contacts";
import { canManageSettings, DEFAULT_ADMIN_SETTINGS, type AdminRole, type AdminSettingsForClient } from "@/lib/admin-constants";

export const Route = createFileRoute("/agaate-admin/_authed/settings")({
  beforeLoad: ({ context }) => {
    const user = (context as { adminUser?: { role: string } }).adminUser;
    if (!user || !canManageSettings(user.role as AdminRole)) {
      throw redirect({ to: "/agaate-admin" });
    }
  },
  loader: async () => {
    const [settings, categories, users] = await Promise.all([
      getAdminSettings(),
      getAdminCategories(),
      listAdminUsers(),
    ]);
    return { settings, categories, users };
  },
  component: SettingsPage,
});

function SettingsPage() {
  const { settings, categories, users } = Route.useLoaderData();
  if (!settings || !("ok" in settings) || !settings.ok) {
    return (
      <p className="text-sm text-rose-300">
        {settings && "error" in settings ? settings.error : "You cannot access settings."}
      </p>
    );
  }
  return (
    <AdminSettingsPanel
      settings={(settings.settings ?? DEFAULT_ADMIN_SETTINGS) as AdminSettingsForClient}
      categories={categories && "ok" in categories && categories.ok ? categories.categories : []}
      users={users && "ok" in users && users.ok ? users.users : []}
    />
  );
}
