import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminSettingsPanel } from "@/components/admin/AdminSettingsPanel";
import { getAdminSettings, listAdminUsers } from "@/functions/admin-contacts";
import {
  canManageSettings,
  DEFAULT_ADMIN_SETTINGS,
  type AdminRole,
  type AdminSettingsForClient,
} from "@/lib/admin-constants";

const SETTINGS_TABS = ["email", "users", "app-links"] as const;
type SettingsTab = (typeof SETTINGS_TABS)[number];

function validateSettingsSearch(search: Record<string, unknown>): { tab?: SettingsTab } {
  const tab = SETTINGS_TABS.find((t) => t === search.tab);
  return tab ? { tab } : {};
}

export const Route = createFileRoute("/agaate-admin/_authed/settings")({
  validateSearch: validateSettingsSearch,
  beforeLoad: ({ context }) => {
    const user = (context as { adminUser?: { role: string } }).adminUser;
    if (!user || !canManageSettings(user.role as AdminRole)) {
      throw redirect({ to: "/agaate-admin" });
    }
  },
  loader: async () => {
    const [settings, users] = await Promise.all([getAdminSettings(), listAdminUsers()]);
    return { settings, users };
  },
  component: SettingsPage,
});

function SettingsPage() {
  const { settings, users } = Route.useLoaderData();
  const { tab } = Route.useSearch();
  const { adminUser } = Route.useRouteContext();
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
      users={users && "ok" in users && users.ok ? users.users : []}
      adminRole={adminUser.role as AdminRole}
      defaultTab={tab ?? "email"}
    />
  );
}
