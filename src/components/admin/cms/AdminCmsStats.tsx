import { useCallback, useEffect, useMemo, useState } from "react";
import { MoreHorizontal, Plus, RefreshCw, Search } from "lucide-react";
import {
  archiveCmsItemAdmin,
  listCmsStatsAdmin,
  publishCmsItemAdmin,
  reorderCmsItemsAdmin,
  saveCmsStatAdmin,
  unpublishCmsItemAdmin,
} from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import type { CmsIconKey, CmsStatRow, CmsStatus } from "@/lib/cms-types";
import { CMS_ICON_OPTIONS } from "@/lib/cms-icons";
import { useToast } from "@/components/admin/AdminToast";
import { CmsStatusBadge } from "@/components/admin/cms/CmsStatusBadge";
import { CmsStatPreview } from "@/components/admin/cms/CmsInlinePreview";
import { CmsDragHandle, CmsSortableProvider, CmsSortableRow } from "@/components/admin/cms/CmsSortable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { canManageSettings, type AdminRole } from "@/lib/admin-constants";
import { statSlugFromLabel } from "@/lib/cms-slug";
import { CmsSlugField, CmsTranslateToHindiButton } from "@/components/admin/cms/CmsFormAssist";

const emptyForm = {
  slug: "",
  iconKey: "tractor" as CmsIconKey,
  numValue: 0,
  prefix: "",
  suffixEn: "+",
  suffixHi: "+",
  labelEn: "",
  labelHi: "",
};

export function AdminCmsStats({ role }: { role: AdminRole }) {
  const toast = useToast();
  const canEdit = canManageSettings(role);
  const [items, setItems] = useState<CmsStatRow[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<CmsStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<CmsStatRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [publishing, setPublishing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await listCmsStatsAdmin({ data: { q, status } });
    if (isAdminOk<{ items: CmsStatRow[] }>(res)) setItems(res.items);
    else toast.error(adminError(res));
    setLoading(false);
  }, [q, status, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setSheetOpen(true);
  };

  const openEdit = (row: CmsStatRow) => {
    setEditing(row);
    setForm({
      slug: row.slug,
      iconKey: row.iconKey,
      numValue: row.numValue,
      prefix: row.prefix ?? "",
      suffixEn: row.suffixEn,
      suffixHi: row.suffixHi,
      labelEn: row.labelEn,
      labelHi: row.labelHi,
    });
    setSheetOpen(true);
  };

  const handlePublish = async () => {
    if (!form.slug.trim() || !form.labelEn.trim()) {
      toast.error("Slug and English label are required.");
      return;
    }
    setPublishing(true);
    const saveRes = await saveCmsStatAdmin({
      data: {
        id: editing?.id,
        ...form,
        prefix: form.prefix || undefined,
      },
    });
    if (!isAdminOk<{ item: CmsStatRow }>(saveRes)) {
      toast.error(adminError(saveRes));
      setPublishing(false);
      return;
    }
    const publishRes = await publishCmsItemAdmin({ data: { type: "stats", id: saveRes.item.id } });
    if (isAdminOk(publishRes)) {
      toast.success("Published to live site.");
      setSheetOpen(false);
      await load();
    } else toast.error(adminError(publishRes));
    setPublishing(false);
  };

  const handleReorder = async (ids: number[]) => {
    const res = await reorderCmsItemsAdmin({ data: { type: "stats", ids } });
    if (isAdminOk(res)) {
      const map = new Map(items.map((i) => [i.id, i]));
      setItems(ids.map((id, i) => ({ ...map.get(id)!, sortOrder: i })));
    }
  };

  const filtered = useMemo(() => items, [items]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Site statistics</h1>
          <p className="text-sm text-muted-foreground">
            Key metrics shared across pages and sections of the website.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => void load()} disabled={loading}>
            <RefreshCw className="mr-1.5 h-4 w-4" />
            Refresh
          </Button>
          {canEdit && (
            <Button size="sm" onClick={openCreate}>
              <Plus className="mr-1.5 h-4 w-4" />
              Add stat
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search labels or slug…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <Select value={status} onValueChange={(v) => setStatus(v as CmsStatus | "all")}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All active</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <CmsSortableProvider items={filtered} onReorder={(ids) => void handleReorder(ids)}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10" />
                <TableHead>Label</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row) => (
                <CmsSortableRow key={row.id} id={row.id}>
                  <TableCell>{canEdit && <CmsDragHandle id={row.id} />}</TableCell>
                  <TableCell>
                    <p className="font-medium">{row.labelEn}</p>
                    <p className="text-xs text-muted-foreground">{row.slug}</p>
                  </TableCell>
                  <TableCell className="tabular-nums">
                    {row.prefix}
                    {row.numValue.toLocaleString()}
                    {row.suffixEn}
                  </TableCell>
                  <TableCell>
                    <CmsStatusBadge status={row.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(row)}>Edit & publish</DropdownMenuItem>
                        {canEdit && row.status !== "archived" && (
                          <>
                            {row.status === "published" && (
                              <DropdownMenuItem
                                onClick={async () => {
                                  const res = await unpublishCmsItemAdmin({ data: { type: "stats", id: row.id } });
                                  if (isAdminOk(res)) {
                                    toast.success("Removed from live site.");
                                    await load();
                                  }
                                }}
                              >
                                Unpublish
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-rose-600"
                              onClick={async () => {
                                const res = await archiveCmsItemAdmin({ data: { type: "stats", id: row.id } });
                                if (isAdminOk(res)) {
                                  toast.success("Archived.");
                                  await load();
                                }
                              }}
                            >
                              Archive
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </CmsSortableRow>
              ))}
            </TableBody>
          </Table>
        </CmsSortableProvider>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{editing ? "Edit stat" : "New stat"}</SheetTitle>
            <SheetDescription>Preview below, then publish to update the live website.</SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <CmsStatPreview
              iconKey={form.iconKey}
              numValue={form.numValue}
              prefix={form.prefix || undefined}
              suffixEn={form.suffixEn}
              suffixHi={form.suffixHi}
              labelEn={form.labelEn}
              labelHi={form.labelHi}
            />

            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground">Fill English labels, then translate.</p>
              <CmsTranslateToHindiButton
                disabled={!canEdit}
                enTexts={[form.suffixEn, form.labelEn]}
                onTranslated={([suffixHi, labelHi]) => {
                  setForm((f) => ({
                    ...f,
                    suffixHi: suffixHi ?? f.suffixHi,
                    labelHi: labelHi ?? f.labelHi,
                  }));
                }}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <CmsSlugField
                value={form.slug}
                onChange={(slug) => setForm({ ...form, slug })}
                onAuto={() => statSlugFromLabel(form.labelEn)}
                disabled={!canEdit}
              />
              <div className="space-y-2">
                <Label>Icon</Label>
                <Select value={form.iconKey} onValueChange={(v) => setForm({ ...form, iconKey: v as CmsIconKey })} disabled={!canEdit}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CMS_ICON_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Prefix</Label>
                <Input value={form.prefix} onChange={(e) => setForm({ ...form, prefix: e.target.value })} disabled={!canEdit} />
              </div>
              <div className="space-y-2">
                <Label>Value</Label>
                <Input type="number" value={form.numValue} onChange={(e) => setForm({ ...form, numValue: Number(e.target.value) })} disabled={!canEdit} />
              </div>
              <div className="space-y-2">
                <Label>Suffix (EN)</Label>
                <Input value={form.suffixEn} onChange={(e) => setForm({ ...form, suffixEn: e.target.value })} disabled={!canEdit} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Suffix (HI)</Label>
              <Input value={form.suffixHi} onChange={(e) => setForm({ ...form, suffixHi: e.target.value })} disabled={!canEdit} />
            </div>
            <div className="space-y-2">
              <Label>Label (EN)</Label>
              <Input value={form.labelEn} onChange={(e) => setForm({ ...form, labelEn: e.target.value })} disabled={!canEdit} />
            </div>
            <div className="space-y-2">
              <Label>Label (HI)</Label>
              <Input value={form.labelHi} onChange={(e) => setForm({ ...form, labelHi: e.target.value })} disabled={!canEdit} />
            </div>
          </div>

          {canEdit && (
            <SheetFooter className="mt-6">
              <Button onClick={() => void handlePublish()} disabled={publishing} className="w-full">
                {publishing ? "Publishing…" : "Publish"}
              </Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
