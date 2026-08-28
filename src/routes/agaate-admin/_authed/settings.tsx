import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminSettingsPanel } from "@/components/admin/AdminSettingsPanel";
import { getAdminSettings } from "@/functions/admin-contacts";
import {
  canManageSettings,
  DEFAULT_ADMIN_SETTINGS,
  type AdminSettingsForClient,
  type SessionUser,
} from "@/lib/admin-constants";

const SETTINGS_TABS = ["email", "app-links"] as const;
type SettingsTab = (typeof SETTINGS_TABS)[number];

function validateSettingsSearch(search: Record<string, unknown>): { tab?: SettingsTab } {
  const tab = SETTINGS_TABS.find((t) => t === search.tab);
  return tab ? { tab } : {};
}

export const Route = createFileRoute("/agaate-admin/_authed/settings")({
  validateSearch: validateSettingsSearch,
  beforeLoad: ({ context }) => {
    const user = (context as { adminUser?: SessionUser }).adminUser;
    if (!user || !canManageSettings(user)) {
      throw redirect({ to: "/agaate-admin" });
    }
  },
  loader: async () => {
    const settings = await getAdminSettings();
    return { settings };
  },
  component: SettingsPage,
});

function SettingsPage() {
  const { settings } = Route.useLoaderData();
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
      permissions={adminUser.permissions}
      defaultTab={tab ?? "email"}
    />
  );
}
