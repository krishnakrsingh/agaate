import { useCallback, useEffect, useState } from "react";
import { Save, Smartphone } from "lucide-react";
import { getCmsAppLinksAdmin, saveCmsAppLinksAdmin } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { canManageSettings, type AdminRole } from "@/lib/admin-constants";
import { DEFAULT_HOME_CMS_APP_LINKS, type HomeCmsAppLinks } from "@/lib/cms-types";

export function AdminCmsAppLinks({ role }: { role: AdminRole }) {
  const toast = useToast();
  const canEdit = canManageSettings(role);
  const [links, setLinks] = useState<HomeCmsAppLinks>(DEFAULT_HOME_CMS_APP_LINKS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dbConfigured, setDbConfigured] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getCmsAppLinksAdmin();
    if (isAdminOk<{ appLinks: HomeCmsAppLinks; dbConfigured: boolean }>(res)) {
      setLinks(res.appLinks);
      setDbConfigured(res.dbConfigured);
    } else {
      toast.error("Load failed", adminError(res, "Could not load app store links."));
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!canEdit) return;
    setSaving(true);
    const res = await saveCmsAppLinksAdmin({ data: links });
    setSaving(false);
    if (isAdminOk<{ appLinks: HomeCmsAppLinks }>(res)) {
      setLinks(res.appLinks);
      toast.success("Links saved", "App store badges on the homepage are updated.");
    } else {
      toast.error("Save failed", adminError(res, "Could not save app store links."));
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">App store links</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Set the Google Play and Apple App Store URLs used by the download badges in the mobile app section on the
          homepage.
        </p>
      </div>

      {!dbConfigured && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          MySQL is not configured. Changes are stored in memory only and will not persist across restarts.
        </div>
      )}

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
            <Smartphone className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Download badge links</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Paste the full store URLs for your Agaate mobile app. Changes apply immediately after saving.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="googlePlayUrl" className="text-xs font-medium">Google Play URL</Label>
            <Input
              id="googlePlayUrl"
              type="url"
              value={links.googlePlayUrl}
              onChange={(e) => setLinks({ ...links, googlePlayUrl: e.target.value })}
              placeholder="https://play.google.com/store/apps/details?id=..."
              disabled={!canEdit || loading}
              className="h-9 text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="appStoreUrl" className="text-xs font-medium">Apple App Store URL</Label>
            <Input
              id="appStoreUrl"
              type="url"
              value={links.appStoreUrl}
              onChange={(e) => setLinks({ ...links, appStoreUrl: e.target.value })}
              placeholder="https://apps.apple.com/app/id..."
              disabled={!canEdit || loading}
              className="h-9 text-sm"
            />
          </div>

          {canEdit && (
            <div className="flex justify-end pt-2">
              <Button type="submit" size="sm" disabled={saving || loading}>
                <Save className="mr-1.5 h-3.5 w-3.5" />
                {saving ? "Saving…" : "Save links"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
