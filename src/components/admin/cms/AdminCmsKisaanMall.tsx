import { useCallback, useEffect, useState } from "react";
import { Save, Store } from "lucide-react";
import { getCmsKisaanMallAdmin, saveCmsKisaanMallLandingAdmin } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { canManageSettings, type AdminRole } from "@/lib/admin-constants";
import { DEFAULT_KISAAN_MALL_LANDING, type KisaanMallLanding, type KisaanMallPageContent } from "@/lib/cms-types";
import { KISAAN_MALL_PAGE_FALLBACK } from "@/data/kisaan-mall-page-fallback";
import { AdminCmsKisaanMallPageForm } from "@/components/admin/cms/AdminCmsKisaanMallPageForm";
import type { NewsletterSignupRow } from "@/server/admin-queries";
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

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getCmsKisaanMallAdmin();
    if (isAdminOk<{ landing: KisaanMallLanding; page: KisaanMallPageContent; signups: NewsletterSignupRow[]; dbConfigured: boolean }>(res)) {
      setLanding(res.landing);
      setPage(res.page);
      setSignups(res.signups);
      setDbConfigured(res.dbConfigured);
    } else {
      toast.error("Load failed", adminError(res, "Could not load Kisaan Mall settings."));
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
    const res = await saveCmsKisaanMallLandingAdmin({ data: landing });
    setSaving(false);
    if (isAdminOk<{ landing: KisaanMallLanding }>(res)) {
      setLanding(res.landing);
      toast.success("Landing saved", "Kisaan Mall waitlist page copy is updated.");
    } else {
      toast.error("Save failed", adminError(res, "Could not save landing copy."));
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Kisaan Mall</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit the public <code className="rounded bg-muted px-1">/kisaan-mall</code> page (waitlist or full catalog), FAQs, and review newsletter signups.
        </p>
      </div>

      {!dbConfigured && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          MySQL is not configured. Signups are stored in memory only and will not persist across restarts.
        </div>
      )}

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <h2 className="text-base font-semibold">Full page content</h2>
        <p className="mt-0.5 text-xs text-muted-foreground mb-4">
          Hero, FAQs, and CTA when display mode is set to full mall page.
        </p>
        <AdminCmsKisaanMallPageForm page={page} setPage={setPage} canEdit={canEdit} loading={loading} />
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex items-start gap-3">
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

        <form onSubmit={handleSave} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs">Badge (EN)</Label>
              <Input value={landing.badgeEn} onChange={(e) => setLanding({ ...landing, badgeEn: e.target.value })} disabled={!canEdit || loading} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Badge (HI)</Label>
              <Input value={landing.badgeHi} onChange={(e) => setLanding({ ...landing, badgeHi: e.target.value })} disabled={!canEdit || loading} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Title (EN)</Label>
              <Input value={landing.titleEn} onChange={(e) => setLanding({ ...landing, titleEn: e.target.value })} disabled={!canEdit || loading} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Title (HI)</Label>
              <Input value={landing.titleHi} onChange={(e) => setLanding({ ...landing, titleHi: e.target.value })} disabled={!canEdit || loading} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs">Description (EN)</Label>
              <Textarea value={landing.descriptionEn} onChange={(e) => setLanding({ ...landing, descriptionEn: e.target.value })} disabled={!canEdit || loading} rows={3} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Description (HI)</Label>
              <Textarea value={landing.descriptionHi} onChange={(e) => setLanding({ ...landing, descriptionHi: e.target.value })} disabled={!canEdit || loading} rows={3} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs">Input placeholder (EN)</Label>
              <Input value={landing.placeholderEn} onChange={(e) => setLanding({ ...landing, placeholderEn: e.target.value })} disabled={!canEdit || loading} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Input placeholder (HI)</Label>
              <Input value={landing.placeholderHi} onChange={(e) => setLanding({ ...landing, placeholderHi: e.target.value })} disabled={!canEdit || loading} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Success message (EN)</Label>
              <Input value={landing.successEn} onChange={(e) => setLanding({ ...landing, successEn: e.target.value })} disabled={!canEdit || loading} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Success message (HI)</Label>
              <Input value={landing.successHi} onChange={(e) => setLanding({ ...landing, successHi: e.target.value })} disabled={!canEdit || loading} />
            </div>
          </div>
          {canEdit && (
            <div className="flex justify-end pt-2">
              <Button type="submit" size="sm" disabled={saving || loading}>
                <Save className="mr-1.5 h-3.5 w-3.5" />
                {saving ? "Saving…" : "Save landing copy"}
              </Button>
            </div>
          )}
        </form>
      </div>

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
              <TableRow>
                <TableCell colSpan={3} className="py-8 text-center text-sm text-muted-foreground">
                  No signups yet.
                </TableCell>
              </TableRow>
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
    </div>
  );
}
