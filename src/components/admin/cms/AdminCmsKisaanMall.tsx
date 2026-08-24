import { useCallback, useEffect, useState } from "react";
import { Store } from "lucide-react";
import { getCmsKisaanMallAdmin, saveCmsKisaanMallLandingAdmin } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { CmsBilingualField } from "@/components/admin/cms/CmsBilingualField";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import { CmsStickySaveBar } from "@/components/admin/cms/CmsStickySaveBar";
import { CmsTranslateToHindiButton } from "@/components/admin/cms/CmsFormAssist";
import { CmsTableEmptyRow } from "@/components/admin/cms/CmsTableState";
import { useCmsDirtyGuard } from "@/components/admin/cms/useCmsDirtyGuard";
import { AdminCmsKisaanMallPageForm } from "@/components/admin/cms/AdminCmsKisaanMallPageForm";
import { canManageSettings, type AdminRole } from "@/lib/admin-constants";
import { DEFAULT_KISAAN_MALL_LANDING, type KisaanMallLanding, type KisaanMallPageContent } from "@/lib/cms-types";
import { KISAAN_MALL_PAGE_FALLBACK } from "@/data/kisaan-mall-page-fallback";
import type { NewsletterSignupRow } from "@/server/admin-queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function AdminCmsKisaanMall({ role }: { role: AdminRole }) {
  const toast = useToast();
  const canEdit = canManageSettings(role);
  const [landing, setLanding] = useState<KisaanMallLanding>(DEFAULT_KISAAN_MALL_LANDING);
  const [page, setPage] = useState<KisaanMallPageContent>(KISAAN_MALL_PAGE_FALLBACK);
  const [signups, setSignups] = useState<NewsletterSignupRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dbConfigured, setDbConfigured] = useState(true);
  const [landingDirty, setLandingDirty] = useState(false);
  const [pageDirty, setPageDirty] = useState(false);
  useCmsDirtyGuard(landingDirty || pageDirty);

  const updateLanding = (next: KisaanMallLanding) => {
    setLanding(next);
    setLandingDirty(true);
  };

  const updatePage = (next: KisaanMallPageContent) => {
    setPage(next);
    setPageDirty(true);
  };

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getCmsKisaanMallAdmin();
    if (isAdminOk<{ landing: KisaanMallLanding; page: KisaanMallPageContent; signups: NewsletterSignupRow[]; dbConfigured: boolean }>(res)) {
      setLanding(res.landing);
      setPage(res.page);
      setSignups(res.signups);
      setDbConfigured(res.dbConfigured);
      setLandingDirty(false);
      setPageDirty(false);
    } else {
      toast.error("Load failed", adminError(res, "Could not load Kisaan Mall settings."));
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleSaveLanding(e: React.FormEvent) {
    e.preventDefault();
    if (!canEdit) return;
    setSaving(true);
    const res = await saveCmsKisaanMallLandingAdmin({ data: landing });
    setSaving(false);
    if (isAdminOk<{ landing: KisaanMallLanding }>(res)) {
      setLanding(res.landing);
      setLandingDirty(false);
      toast.success("Landing saved", "Kisaan Mall waitlist page copy is updated.");
    } else {
      toast.error("Save failed", adminError(res, "Could not save landing copy."));
    }
  }

  return (
    <div className="space-y-6">
      <CmsPageHeader
        title="Kisaan Mall"
        description="Edit the public /kisaan-mall page (waitlist or full catalog), FAQs, and review newsletter signups."
        workflow="live"
      />

      {!dbConfigured && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          MySQL is not configured. Signups are stored in memory only and will not persist across restarts.
        </div>
      )}

      <Tabs defaultValue="waitlist" className="space-y-4">
        <TabsList>
          <TabsTrigger value="waitlist">Waitlist landing</TabsTrigger>
          <TabsTrigger value="page">Full mall page</TabsTrigger>
          <TabsTrigger value="signups">Signups ({signups.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="waitlist">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-6">
              <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                <Store className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold">Landing page copy</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  English and Hindi text shown on the public waitlist page.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveLanding} className="space-y-4">
              <CmsTranslateToHindiButton
                variant="inline"
                disabled={!canEdit || loading}
                enTexts={[
                  landing.badgeEn,
                  landing.titleEn,
                  landing.descriptionEn,
                  landing.placeholderEn,
                  landing.successEn,
                ]}
                onTranslated={([badgeHi, titleHi, descriptionHi, placeholderHi, successHi]) => {
                  updateLanding({
                    ...landing,
                    badgeHi: badgeHi ?? landing.badgeHi,
                    titleHi: titleHi ?? landing.titleHi,
                    descriptionHi: descriptionHi ?? landing.descriptionHi,
                    placeholderHi: placeholderHi ?? landing.placeholderHi,
                    successHi: successHi ?? landing.successHi,
                  });
                }}
              />
              <CmsBilingualField
                label="Badge"
                en={landing.badgeEn}
                hi={landing.badgeHi}
                onEn={(v) => updateLanding({ ...landing, badgeEn: v })}
                onHi={(v) => updateLanding({ ...landing, badgeHi: v })}
                disabled={!canEdit || loading}
              />
              <CmsBilingualField
                label="Title"
                en={landing.titleEn}
                hi={landing.titleHi}
                onEn={(v) => updateLanding({ ...landing, titleEn: v })}
                onHi={(v) => updateLanding({ ...landing, titleHi: v })}
                disabled={!canEdit || loading}
              />
              <CmsBilingualField
                label="Description"
                en={landing.descriptionEn}
                hi={landing.descriptionHi}
                onEn={(v) => updateLanding({ ...landing, descriptionEn: v })}
                onHi={(v) => updateLanding({ ...landing, descriptionHi: v })}
                disabled={!canEdit || loading}
                multiline
                rows={3}
              />
              <CmsBilingualField
                label="Input placeholder"
                en={landing.placeholderEn}
                hi={landing.placeholderHi}
                onEn={(v) => updateLanding({ ...landing, placeholderEn: v })}
                onHi={(v) => updateLanding({ ...landing, placeholderHi: v })}
                disabled={!canEdit || loading}
              />
              <CmsBilingualField
                label="Success message"
                en={landing.successEn}
                hi={landing.successHi}
                onEn={(v) => updateLanding({ ...landing, successEn: v })}
                onHi={(v) => updateLanding({ ...landing, successHi: v })}
                disabled={!canEdit || loading}
              />
              <CmsStickySaveBar saving={saving} disabled={!canEdit} label="Save landing copy" />
            </form>
          </div>
        </TabsContent>

        <TabsContent value="page">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-base font-semibold">Full page content</h2>
            <p className="mt-0.5 text-xs text-muted-foreground mb-4">
              Hero, FAQs, and CTA when display mode is set to full mall page.
            </p>
            <AdminCmsKisaanMallPageForm
              page={page}
              setPage={updatePage}
              canEdit={canEdit}
              loading={loading}
              onSaved={() => setPageDirty(false)}
            />
          </div>
        </TabsContent>

        <TabsContent value="signups">
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <div className="border-b px-6 py-4">
              <h2 className="text-base font-semibold">Waitlist signups</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{signups.length} total signups</p>
            </div>
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="text-xs">Contact</TableHead>
                  <TableHead className="text-xs">Type</TableHead>
                  <TableHead className="text-xs">Signed up</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {signups.length === 0 ? (
                  <CmsTableEmptyRow colSpan={3} title="No signups yet" description="Waitlist signups from the public page will appear here." />
                ) : (
                  signups.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-mono text-xs">{row.contact}</TableCell>
                      <TableCell className="text-xs capitalize">{row.contact_type}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(row.created_at).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
