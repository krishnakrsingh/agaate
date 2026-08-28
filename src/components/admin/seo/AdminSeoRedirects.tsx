import { useCallback, useEffect, useState } from "react";
import { ArrowRightLeft, Plus, Trash2 } from "lucide-react";
import {
  deleteSeoRedirectAdmin,
  listSeoRedirectsAdmin,
  saveSeoRedirectAdmin,
} from "@/functions/seo";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import { canManageSettings, type AdminRole } from "@/lib/admin-constants";
import type { SeoRedirectRow } from "@/lib/seo-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function AdminSeoRedirects({ role }: { role: AdminRole }) {
  const toast = useToast();
  const canEdit = canManageSettings(role);
  const [redirects, setRedirects] = useState<SeoRedirectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    id: undefined as number | undefined,
    sourcePath: "",
    destinationPath: "",
    redirectType: 301 as 301 | 302,
    isActive: true,
  });

  const load = useCallback(async () => {
    setLoading(true);
    const res = await listSeoRedirectsAdmin();
    if (isAdminOk<{ redirects: SeoRedirectRow[] }>(res)) {
      setRedirects(res.redirects);
    } else {
      toast.error(adminError(res));
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const openNew = () => {
    setForm({
      id: undefined,
      sourcePath: "",
      destinationPath: "",
      redirectType: 301,
      isActive: true,
    });
    setSheetOpen(true);
  };

  const openEdit = (row: SeoRedirectRow) => {
    setForm({
      id: row.id,
      sourcePath: row.sourcePath,
      destinationPath: row.destinationPath,
      redirectType: row.redirectType,
      isActive: row.isActive,
    });
    setSheetOpen(true);
  };

  const save = async () => {
    if (!canEdit) return;
    setSaving(true);
    const res = await saveSeoRedirectAdmin({ data: form });
    if (isAdminOk(res)) {
      toast.success("Redirect saved.");
      setSheetOpen(false);
      load();
    } else {
      toast.error(adminError(res));
    }
    setSaving(false);
  };

  const remove = async (id: number) => {
    if (!canEdit || !window.confirm("Delete this redirect?")) return;
    const res = await deleteSeoRedirectAdmin({ data: { id } });
    if (isAdminOk(res)) {
      toast.success("Redirect deleted.");
      load();
    } else {
      toast.error(adminError(res));
    }
  };

  return (
    <div className="space-y-6">
      <CmsPageHeader
        title="Redirect Manager"
        description="Create 301/302 redirects to preserve SEO when URLs change."
        workflow="live"
        actions={
          canEdit ? (
            <Button onClick={openNew} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add redirect
            </Button>
          ) : undefined
        }
      />

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              {canEdit && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Loading redirects…
                </TableCell>
              </TableRow>
            ) : redirects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No redirects configured.
                </TableCell>
              </TableRow>
            ) : (
              redirects.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-sm">{r.sourcePath}</TableCell>
                  <TableCell className="font-mono text-sm">{r.destinationPath}</TableCell>
                  <TableCell>{r.redirectType}</TableCell>
                  <TableCell>{r.isActive ? "Active" : "Inactive"}</TableCell>
                  {canEdit && (
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(r)}>
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => remove(r.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{form.id ? "Edit redirect" : "New redirect"}</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label>Source path</Label>
              <Input
                value={form.sourcePath}
                onChange={(e) => setForm((f) => ({ ...f, sourcePath: e.target.value }))}
                placeholder="/old-page"
              />
            </div>
            <div className="space-y-2">
              <Label>Destination</Label>
              <Input
                value={form.destinationPath}
                onChange={(e) => setForm((f) => ({ ...f, destinationPath: e.target.value }))}
                placeholder="/new-page or https://..."
              />
            </div>
            <div className="space-y-2">
              <Label>Redirect type</Label>
              <Select
                value={String(form.redirectType)}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, redirectType: Number(v) as 301 | 302 }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="301">301 — Permanent</SelectItem>
                  <SelectItem value="302">302 — Temporary</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={form.isActive}
                onCheckedChange={(v) => setForm((f) => ({ ...f, isActive: v === true }))}
              />
              <Label>Active</Label>
            </div>
            <Button onClick={save} disabled={saving} className="w-full">
              {saving ? "Saving…" : "Save redirect"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
