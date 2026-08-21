import { useCallback, useEffect, useMemo, useState } from "react";
import { MoreHorizontal, Plus, RefreshCw, Search } from "lucide-react";
import {
  archiveCmsItemAdmin,
  listCmsLogosAdmin,
  publishCmsItemAdmin,
  reorderCmsItemsAdmin,
  saveCmsLogoAdmin,
  unpublishCmsItemAdmin,
} from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import type { CmsBrandGroup, CmsLogoRow, CmsStatus } from "@/lib/cms-types";
import { CMS_BRAND_GROUP_LABELS } from "@/lib/cms-types";
import { useToast } from "@/components/admin/AdminToast";
import { CmsStatusBadge } from "@/components/admin/cms/CmsStatusBadge";
import { CmsLogoPreview } from "@/components/admin/cms/CmsInlinePreview";
import { CmsUploadField } from "@/components/admin/cms/CmsUploadField";
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

const emptyForm = { name: "", group: "partners" as CmsBrandGroup, imageUrl: "" };

export function AdminCmsLogos({ role }: { role: AdminRole }) {
  const toast = useToast();
  const canEdit = canManageSettings(role);
  const [items, setItems] = useState<CmsLogoRow[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<CmsStatus | "all">("all");
  const [group, setGroup] = useState<CmsBrandGroup | "all">("all");
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<CmsLogoRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [publishing, setPublishing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await listCmsLogosAdmin({ data: { q, status, group } });
    if (isAdminOk<{ items: CmsLogoRow[] }>(res)) setItems(res.items);
    else toast.error(adminError(res));
    setLoading(false);
  }, [q, status, group, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, group: group === "all" ? "partners" : group });
    setSheetOpen(true);
  };

  const openEdit = (row: CmsLogoRow) => {
    setEditing(row);
    setForm({ name: row.name, group: row.group, imageUrl: row.imageUrl });
    setSheetOpen(true);
  };

  const handlePublish = async () => {
    if (!form.name.trim() || !form.imageUrl) {
      toast.error("Name and image are required.");
      return;
    }
    setPublishing(true);
    const saveRes = await saveCmsLogoAdmin({ data: { id: editing?.id, ...form } });
    if (!isAdminOk<{ item: CmsLogoRow }>(saveRes)) {
      toast.error(adminError(saveRes));
      setPublishing(false);
      return;
    }
    const publishRes = await publishCmsItemAdmin({ data: { type: "logos", id: saveRes.item.id } });
    if (isAdminOk(publishRes)) {
      toast.success("Published to live site.");
      setSheetOpen(false);
      await load();
    } else toast.error(adminError(publishRes));
    setPublishing(false);
  };

  const handleReorder = async (ids: number[]) => {
    const res = await reorderCmsItemsAdmin({ data: { type: "logos", ids } });
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
          <h1 className="text-2xl font-bold">Brand logos</h1>
          <p className="text-sm text-muted-foreground">
            Partner, customer, and buyer logos shared across the website.
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
              Add logo
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search name…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <Select value={group} onValueChange={(v) => setGroup(v as CmsBrandGroup | "all")}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All groups</SelectItem>
            {(Object.keys(CMS_BRAND_GROUP_LABELS) as CmsBrandGroup[]).map((g) => (
              <SelectItem key={g} value={g}>{CMS_BRAND_GROUP_LABELS[g]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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
                <TableHead>Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row) => (
                <CmsSortableRow key={row.id} id={row.id}>
                  <TableCell>{canEdit && <CmsDragHandle id={row.id} />}</TableCell>
                  <TableCell>
                    <img src={row.imageUrl} alt="" className="h-10 w-20 object-contain" />
                  </TableCell>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{CMS_BRAND_GROUP_LABELS[row.group]}</TableCell>
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
                                  const res = await unpublishCmsItemAdmin({ data: { type: "logos", id: row.id } });
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
                                const res = await archiveCmsItemAdmin({ data: { type: "logos", id: row.id } });
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
            <SheetTitle>{editing ? "Edit logo" : "New logo"}</SheetTitle>
            <SheetDescription>Preview below, then publish to update the live website.</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <CmsLogoPreview name={form.name} imageUrl={form.imageUrl} group={form.group} />

            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={!canEdit} />
            </div>
            <div className="space-y-2">
              <Label>Tab group</Label>
              <Select value={form.group} onValueChange={(v) => setForm({ ...form, group: v as CmsBrandGroup })} disabled={!canEdit}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(Object.keys(CMS_BRAND_GROUP_LABELS) as CmsBrandGroup[]).map((g) => (
                    <SelectItem key={g} value={g}>{CMS_BRAND_GROUP_LABELS[g]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <CmsUploadField
              label="Logo image"
              kind="image"
              accept="image/jpeg,image/png,image/webp"
              value={form.imageUrl}
              onChange={(url) => setForm({ ...form, imageUrl: url })}
              disabled={!canEdit}
            />
            <div className="space-y-2">
              <Label>Or paste image URL</Label>
              <Input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} disabled={!canEdit} />
            </div>
          </div>
          {canEdit && (
            <SheetFooter className="mt-6">
              <Button onClick={() => void handlePublish()} disabled={publishing || !form.imageUrl} className="w-full">
                {publishing ? "Publishing…" : "Publish"}
              </Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
