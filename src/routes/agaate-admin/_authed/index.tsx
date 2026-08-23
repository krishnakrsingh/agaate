import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, Settings } from "lucide-react";
import { AdminCmsOverview } from "@/components/admin/cms/AdminCmsOverview";
import { getCmsOverview } from "@/functions/admin-cms";
import { getAdminSettings } from "@/functions/admin-contacts";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { DEFAULT_ADMIN_SETTINGS } from "@/lib/admin-constants";
import type { CmsOverview } from "@/lib/cms-types";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/agaate-admin/_authed/")({
  loader: async () => {
    const [cmsRes, settingsRes] = await Promise.all([getCmsOverview(), getAdminSettings()]);
    return { cmsRes, settingsRes };
  },
  component: DashboardPage,
});

function DashboardPage() {
  const { cmsRes, settingsRes } = Route.useLoaderData();

  if (!isAdminOk<{ overview: CmsOverview; dbConfigured: boolean }>(cmsRes)) {
    return <p className="text-sm text-rose-600">{adminError(cmsRes, "Unable to load CMS overview.")}</p>;
  }

  const settings =
    settingsRes && "ok" in settingsRes && settingsRes.ok && settingsRes.settings
      ? settingsRes.settings
      : DEFAULT_ADMIN_SETTINGS;
  const smtpReady = Boolean(
    settings.smtp.host && settings.smtp.user && "passConfigured" in settings.smtp && settings.smtp.passConfigured,
  );

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Contact form delivery</p>
              <p className="mt-1 text-sm text-foreground">
                Submissions email to{" "}
                <span className="font-semibold">{settings.contactNotificationEmail}</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                SMTP {smtpReady ? "configured" : "not configured — set up in Settings"}
              </p>
            </div>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/agaate-admin/settings">
              <Settings className="mr-1.5 h-3.5 w-3.5" />
              Email settings
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      <AdminCmsOverview overview={cmsRes.overview} dbConfigured={cmsRes.dbConfigured} />
    </div>
  );
}
