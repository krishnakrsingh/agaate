import { useCallback, useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { getSeoGlobalAdmin, saveSeoGlobalAdmin } from "@/functions/seo";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import { CmsStickySaveBar } from "@/components/admin/cms/CmsStickySaveBar";
import { useCmsDirtyGuard } from "@/components/admin/cms/useCmsDirtyGuard";
import { canManageSeo } from "@/lib/admin-constants";
import { DEFAULT_SEO_GLOBAL_SETTINGS } from "@/lib/seo-utils";
import type { SeoGlobalSettings } from "@/lib/seo-types";
import { CmsImageField } from "@/components/admin/cms/CmsImageField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AdminSeoGlobal({ permissions }: { permissions: string[] }) {
  const toast = useToast();
  const canEdit = canManageSeo({ permissions });
  const [settings, setSettings] = useState<SeoGlobalSettings>(DEFAULT_SEO_GLOBAL_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  useCmsDirtyGuard(dirty);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getSeoGlobalAdmin();
    if (isAdminOk<{ settings: SeoGlobalSettings }>(res)) {
      setSettings(res.settings);
    } else {
      toast.error(adminError(res));
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const update = (patch: Partial<SeoGlobalSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
    setDirty(true);
  };

  const updateSocial = (key: keyof SeoGlobalSettings["socialProfiles"], value: string) => {
    setSettings((prev) => ({
      ...prev,
      socialProfiles: { ...prev.socialProfiles, [key]: value },
    }));
    setDirty(true);
  };

  const save = async () => {
    if (!canEdit) return;
    setSaving(true);
    const res = await saveSeoGlobalAdmin({ data: settings });
    if (isAdminOk(res)) {
      toast.success("Global SEO settings saved.");
      setDirty(false);
    } else {
      toast.error(adminError(res));
    }
    setSaving(false);
  };

  if (loading) {
    return <p className="text-sm text-muted-foreground p-6">Loading global SEO settings…</p>;
  }

  return (
    <form
      className="space-y-6 pb-24"
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
    >
      <CmsPageHeader
        title="Global SEO Settings"
        description="Site-wide defaults used when page-specific SEO fields are empty."
        workflow="live"
      />

      <Tabs defaultValue="basics">
        <TabsList>
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="social">Social & verification</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="mt-4 space-y-4 max-w-2xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Website name</Label>
              <Input
                value={settings.websiteName}
                onChange={(e) => update({ websiteName: e.target.value })}
                disabled={!canEdit}
              />
            </div>
            <div className="space-y-2">
              <Label>Website URL</Label>
              <Input
                value={settings.websiteUrl}
                onChange={(e) => update({ websiteUrl: e.target.value })}
                disabled={!canEdit}
                placeholder="https://agaate.in"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Default SEO title</Label>
            <Input
              value={settings.defaultTitle}
              onChange={(e) => update({ defaultTitle: e.target.value })}
              disabled={!canEdit}
            />
          </div>
          <div className="space-y-2">
            <Label>Title suffix</Label>
            <Input
              value={settings.titleSuffix}
              onChange={(e) => update({ titleSuffix: e.target.value })}
              disabled={!canEdit}
              placeholder=" | Agaate"
            />
          </div>
          <div className="space-y-2">
            <Label>Default meta description</Label>
            <Textarea
              value={settings.defaultDescription}
              onChange={(e) => update({ defaultDescription: e.target.value })}
              disabled={!canEdit}
              rows={3}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <CmsImageField
              label="Default OG image"
              value={settings.defaultOgImage}
              onChange={(url) => update({ defaultOgImage: url })}
              disabled={!canEdit}
              hint="Used when a page has no Open Graph image."
            />
            <CmsImageField
              label="Default Twitter image"
              value={settings.defaultTwitterImage}
              onChange={(url) => update({ defaultTwitterImage: url })}
              disabled={!canEdit}
            />
          </div>
          <div className="space-y-2">
            <Label>Default robots policy</Label>
            <Input
              value={settings.defaultRobots}
              onChange={(e) => update({ defaultRobots: e.target.value })}
              disabled={!canEdit}
              placeholder="index, follow"
            />
          </div>
        </TabsContent>

        <TabsContent value="social" className="mt-4 space-y-4 max-w-2xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {(["twitter", "facebook", "instagram", "linkedin", "youtube"] as const).map((key) => (
              <div key={key} className="space-y-2">
                <Label className="capitalize">{key}</Label>
                <Input
                  value={settings.socialProfiles[key] ?? ""}
                  onChange={(e) => updateSocial(key, e.target.value)}
                  disabled={!canEdit}
                />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label>Google Search Console verification</Label>
            <Input
              value={settings.googleSiteVerification ?? ""}
              onChange={(e) => update({ googleSiteVerification: e.target.value })}
              disabled={!canEdit}
              placeholder="Meta tag content value"
            />
          </div>
          <div className="space-y-2">
            <Label>Bing Webmaster verification</Label>
            <Input
              value={settings.bingSiteVerification ?? ""}
              onChange={(e) => update({ bingSiteVerification: e.target.value })}
              disabled={!canEdit}
            />
          </div>
        </TabsContent>

        <TabsContent value="organization" className="mt-4 space-y-4 max-w-2xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Organization name</Label>
              <Input
                value={settings.organizationName}
                onChange={(e) => update({ organizationName: e.target.value })}
                disabled={!canEdit}
              />
            </div>
            <div className="space-y-2">
              <Label>Legal name</Label>
              <Input
                value={settings.organizationLegalName}
                onChange={(e) => update({ organizationLegalName: e.target.value })}
                disabled={!canEdit}
              />
            </div>
          </div>
          <CmsImageField
            label="Logo URL"
            value={settings.organizationLogo}
            onChange={(url) => update({ organizationLogo: url })}
            disabled={!canEdit}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={settings.organizationEmail}
                onChange={(e) => update({ organizationEmail: e.target.value })}
                disabled={!canEdit}
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={settings.organizationPhone}
                onChange={(e) => update({ organizationPhone: e.target.value })}
                disabled={!canEdit}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Input
              value={settings.organizationAddress}
              onChange={(e) => update({ organizationAddress: e.target.value })}
              disabled={!canEdit}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>City</Label>
              <Input
                value={settings.organizationCity}
                onChange={(e) => update({ organizationCity: e.target.value })}
                disabled={!canEdit}
              />
            </div>
            <div className="space-y-2">
              <Label>Region</Label>
              <Input
                value={settings.organizationRegion}
                onChange={(e) => update({ organizationRegion: e.target.value })}
                disabled={!canEdit}
              />
            </div>
            <div className="space-y-2">
              <Label>Country code</Label>
              <Input
                value={settings.organizationCountry}
                onChange={(e) => update({ organizationCountry: e.target.value })}
                disabled={!canEdit}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="technical" className="mt-4 space-y-4 max-w-2xl">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Enable XML sitemap</p>
              <p className="text-sm text-muted-foreground">Served at /sitemap.xml</p>
            </div>
            <Checkbox
              checked={settings.sitemapEnabled}
              onCheckedChange={(v) => update({ sitemapEnabled: v === true })}
              disabled={!canEdit}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Trailing slash URLs</p>
              <p className="text-sm text-muted-foreground">Keep disabled for clean canonical URLs</p>
            </div>
            <Checkbox
              checked={settings.trailingSlash}
              onCheckedChange={(v) => update({ trailingSlash: v === true })}
              disabled={!canEdit}
            />
          </div>
          <div className="space-y-2">
            <Label>Extra robots.txt rules</Label>
            <Textarea
              value={settings.robotsTxtExtra ?? ""}
              onChange={(e) => update({ robotsTxtExtra: e.target.value })}
              disabled={!canEdit}
              rows={4}
              placeholder="User-agent: Bingbot&#10;Disallow: /private"
            />
          </div>
        </TabsContent>
      </Tabs>

      {canEdit && <CmsStickySaveBar saving={saving} label="Save global settings" />}
    </form>
  );
}
