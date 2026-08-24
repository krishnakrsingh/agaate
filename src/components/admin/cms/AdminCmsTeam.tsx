import { useCallback, useEffect, useMemo, useState } from "react";
import { MoreHorizontal, Plus, RefreshCw, Search } from "lucide-react";
import {
  archiveCmsItemAdmin,
  listCmsTeamAdmin,
  publishCmsItemAdmin,
  reorderCmsItemsAdmin,
  saveCmsTeamAdmin,
  unpublishCmsItemAdmin,
} from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import type { CmsIconKey, CmsStatus, CmsTeamMemberRow } from "@/lib/cms-types";
import { CMS_ICON_OPTIONS } from "@/lib/cms-icons";
import { teamSlugFromName } from "@/lib/cms-slug";
import { useToast } from "@/components/admin/AdminToast";
import { CmsStatusBadge } from "@/components/admin/cms/CmsStatusBadge";
import { CmsUploadField } from "@/components/admin/cms/CmsUploadField";
import { CmsDragHandle, CmsSortableProvider, CmsSortableRow } from "@/components/admin/cms/CmsSortable";
import { CmsTranslateToHindiButton } from "@/components/admin/cms/CmsFormAssist";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import { CmsTableEmptyAction, CmsTableEmptyRow, CmsTableLoadingRow } from "@/components/admin/cms/CmsTableState";
import { useCmsListConfirm } from "@/components/admin/cms/useCmsListConfirm";
import { useCmsDirtyGuard } from "@/components/admin/cms/useCmsDirtyGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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

function linesToAch(text: string) {
  return text.split("\n").map((l) => l.trim()).filter(Boolean);
}

function achToLines(items: string[]) {
  return items.join("\n");
}

const emptyForm = {
  slug: "",
  nameEn: "",
  nameHi: "",
  roleEn: "",
  roleHi: "",
  focusEn: "",
  focusHi: "",
  tagEn: "",
  tagHi: "",
  bioEn: "",
  bioHi: "",
  quoteEn: "",
  quoteHi: "",
  pubEn: "",
  pubHi: "",
  keyAchEnText: "",
  keyAchHiText: "",
  imageUrl: "",
  iconKey: "users" as CmsIconKey,
  showInBanner: false,
  bannerBadgeEn: "",
  bannerBadgeHi: "",
};

export function AdminCmsTeam({ role }: { role: AdminRole }) {
  const toast = useToast();
  const { requestConfirm, confirmDialog } = useCmsListConfirm();
  const canEdit = canManageSettings(role);
  const [items, setItems] = useState<CmsTeamMemberRow[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<CmsStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<CmsTeamMemberRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [publishing, setPublishing] = useState(false);
  const [formDirty, setFormDirty] = useState(false);
  const { handleSheetOpenChange } = useCmsDirtyGuard(formDirty && sheetOpen);

  const updateForm = (
    patch: Partial<typeof emptyForm> | ((prev: typeof emptyForm) => typeof emptyForm),
  ) => {
    if (typeof patch === "function") {
      setForm((prev) => patch(prev));
    } else {
      setForm((prev) => ({ ...prev, ...patch }));
    }
    setFormDirty(true);
  };

  const load = useCallback(async () => {
    setLoading(true);
    const res = await listCmsTeamAdmin({ data: { q, status } });
    if (isAdminOk<{ items: CmsTeamMemberRow[] }>(res)) setItems(res.items);
    else toast.error(adminError(res));
    setLoading(false);
  }, [q, status, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormDirty(false);
    setSheetOpen(true);
  };

  const openEdit = (row: CmsTeamMemberRow) => {
    setEditing(row);
    setForm({
      slug: row.slug,
      nameEn: row.nameEn,
      nameHi: row.nameHi,
      roleEn: row.roleEn,
      roleHi: row.roleHi,
      focusEn: row.focusEn,
      focusHi: row.focusHi,
      tagEn: row.tagEn,
      tagHi: row.tagHi,
      bioEn: row.bioEn,
      bioHi: row.bioHi,
      quoteEn: row.quoteEn,
      quoteHi: row.quoteHi,
      pubEn: row.pubEn,
      pubHi: row.pubHi,
      keyAchEnText: achToLines(row.keyAchEn),
      keyAchHiText: achToLines(row.keyAchHi),
      imageUrl: row.imageUrl,
      iconKey: row.iconKey,
      showInBanner: row.showInBanner,
      bannerBadgeEn: row.bannerBadgeEn,
      bannerBadgeHi: row.bannerBadgeHi,
    });
    setFormDirty(false);
    setSheetOpen(true);
  };

  const handlePublish = async () => {
    const slug = form.slug || teamSlugFromName(form.nameEn);
    if (!form.nameEn.trim() || !form.imageUrl) {
      toast.error("Name (English) and photo are required.");
      return;
    }
    setPublishing(true);
    const payload = {
      id: editing?.id,
      slug,
      nameEn: form.nameEn,
      nameHi: form.nameHi,
      roleEn: form.roleEn,
      roleHi: form.roleHi,
      focusEn: form.focusEn,
      focusHi: form.focusHi,
      tagEn: form.tagEn,
      tagHi: form.tagHi,
      bioEn: form.bioEn,
      bioHi: form.bioHi,
      quoteEn: form.quoteEn,
      quoteHi: form.quoteHi,
      pubEn: form.pubEn,
      pubHi: form.pubHi,
      keyAchEn: linesToAch(form.keyAchEnText),
      keyAchHi: linesToAch(form.keyAchHiText),
      imageUrl: form.imageUrl,
      iconKey: form.iconKey,
      showInBanner: form.showInBanner,
      bannerBadgeEn: form.bannerBadgeEn,
      bannerBadgeHi: form.bannerBadgeHi,
    };
    const saveRes = await saveCmsTeamAdmin({ data: payload });
    if (!isAdminOk<{ item: CmsTeamMemberRow }>(saveRes)) {
      toast.error(adminError(saveRes));
      setPublishing(false);
      return;
    }
    const publishRes = await publishCmsItemAdmin({ data: { type: "team", id: saveRes.item.id } });
    if (isAdminOk(publishRes)) {
      toast.success("Published to live site.");
      setFormDirty(false);
      setSheetOpen(false);
      await load();
    } else toast.error(adminError(publishRes));
    setPublishing(false);
  };

  const handleReorder = async (ids: number[]) => {
    const res = await reorderCmsItemsAdmin({ data: { type: "team", ids } });
    if (isAdminOk(res)) {
      const map = new Map(items.map((i) => [i.id, i]));
      setItems(ids.map((id, i) => ({ ...map.get(id)!, sortOrder: i })));
    }
  };

  const filtered = useMemo(() => items, [items]);

  return (
    <div className="space-y-6">
      <CmsPageHeader
        title="Team members"
        description="Leadership roster on the About page and founders banner on the homepage."
        workflow="publish"
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => void load()} disabled={loading}>
              <RefreshCw className="mr-1.5 h-4 w-4" />
              Refresh
            </Button>
            {canEdit && (
              <Button size="sm" onClick={openCreate}>
                <Plus className="mr-1.5 h-4 w-4" />
                Add member
              </Button>
            )}
          </>
        }
      />

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search name, role…" value={q} onChange={(e) => setQ(e.target.value)} />
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
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Banner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? <CmsTableLoadingRow colSpan={7} /> : null}
              {!loading && filtered.length === 0 ? (
                <CmsTableEmptyRow
                  colSpan={7}
                  title="No team members yet"
                  description="Add leadership profiles or run npm run seed:cms for defaults."
                  action={canEdit ? <CmsTableEmptyAction label="Add member" onClick={openCreate} /> : undefined}
                />
              ) : null}
              {!loading
                ? filtered.map((row) => (
                <CmsSortableRow key={row.id} id={row.id}>
                  <TableCell>{canEdit && <CmsDragHandle id={row.id} />}</TableCell>
                  <TableCell>
                    <img src={row.imageUrl} alt="" className="h-12 w-12 rounded-full object-cover" />
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{row.nameEn}</p>
                    <p className="text-xs text-muted-foreground">{row.focusEn}</p>
                  </TableCell>
                  <TableCell>{row.roleEn}</TableCell>
                  <TableCell>{row.showInBanner ? "Yes" : "—"}</TableCell>
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
                        <DropdownMenuItem onClick={() => openEdit(row)}>Edit</DropdownMenuItem>
                        {canEdit && row.status !== "archived" && (
                          <>
                            {row.status === "published" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  requestConfirm({
                                    title: "Unpublish team member?",
                                    description: `"${row.nameEn}" will be removed from the live site.`,
                                    confirmLabel: "Unpublish",
                                    action: async () => {
                                      const res = await unpublishCmsItemAdmin({ data: { type: "team", id: row.id } });
                                      if (isAdminOk(res)) {
                                        toast.success("Removed from live site.");
                                        await load();
                                      } else toast.error(adminError(res));
                                    },
                                  })
                                }
                              >
                                Unpublish
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-rose-600"
                              onClick={() =>
                                requestConfirm({
                                  title: "Archive team member?",
                                  description: `"${row.nameEn}" will be archived and hidden from this list.`,
                                  confirmLabel: "Archive",
                                  destructive: true,
                                  action: async () => {
                                    const res = await archiveCmsItemAdmin({ data: { type: "team", id: row.id } });
                                    if (isAdminOk(res)) {
                                      toast.success("Archived.");
                                      await load();
                                    } else toast.error(adminError(res));
                                  },
                                })
                              }
                            >
                              Archive
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </CmsSortableRow>
                ))
                : null}
            </TableBody>
          </Table>
        </CmsSortableProvider>
      </div>

      <Sheet open={sheetOpen} onOpenChange={(open) => handleSheetOpenChange(open, setSheetOpen)}>
        <SheetContent className="overflow-y-auto sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>{editing ? "Edit team member" : "New team member"}</SheetTitle>
            <SheetDescription>Publish to update the About page and homepage leadership banner.</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <CmsTranslateToHindiButton
              disabled={!canEdit}
              enTexts={[
                form.nameEn,
                form.roleEn,
                form.focusEn,
                form.tagEn,
                form.bioEn,
                form.quoteEn,
                form.pubEn,
                form.keyAchEnText,
                form.bannerBadgeEn,
              ]}
              onTranslated={([
                nameHi,
                roleHi,
                focusHi,
                tagHi,
                bioHi,
                quoteHi,
                pubHi,
                keyAchHiText,
                bannerBadgeHi,
              ]) => {
                updateForm((f) => ({
                  ...f,
                  nameHi: nameHi ?? f.nameHi,
                  roleHi: roleHi ?? f.roleHi,
                  focusHi: focusHi ?? f.focusHi,
                  tagHi: tagHi ?? f.tagHi,
                  bioHi: bioHi ?? f.bioHi,
                  quoteHi: quoteHi ?? f.quoteHi,
                  pubHi: pubHi ?? f.pubHi,
                  keyAchHiText: keyAchHiText ?? f.keyAchHiText,
                  bannerBadgeHi: bannerBadgeHi ?? f.bannerBadgeHi,
                }));
              }}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Name (EN)</Label>
                <Input value={form.nameEn} onChange={(e) => updateForm({ nameEn: e.target.value })} disabled={!canEdit} />
              </div>
              <div className="space-y-2">
                <Label>Name (HI)</Label>
                <Input value={form.nameHi} onChange={(e) => updateForm({ nameHi: e.target.value })} disabled={!canEdit} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Role (EN)</Label>
                <Input value={form.roleEn} onChange={(e) => updateForm({ roleEn: e.target.value })} disabled={!canEdit} />
              </div>
              <div className="space-y-2">
                <Label>Role (HI)</Label>
                <Input value={form.roleHi} onChange={(e) => updateForm({ roleHi: e.target.value })} disabled={!canEdit} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Focus (EN)</Label>
                <Input value={form.focusEn} onChange={(e) => updateForm({ focusEn: e.target.value })} disabled={!canEdit} />
              </div>
              <div className="space-y-2">
                <Label>Focus (HI)</Label>
                <Input value={form.focusHi} onChange={(e) => updateForm({ focusHi: e.target.value })} disabled={!canEdit} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Tag (EN)</Label>
                <Input value={form.tagEn} onChange={(e) => updateForm({ tagEn: e.target.value })} disabled={!canEdit} />
              </div>
              <div className="space-y-2">
                <Label>Tag (HI)</Label>
                <Input value={form.tagHi} onChange={(e) => updateForm({ tagHi: e.target.value })} disabled={!canEdit} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Bio (EN)</Label>
              <Textarea value={form.bioEn} onChange={(e) => updateForm({ bioEn: e.target.value })} disabled={!canEdit} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Bio (HI)</Label>
              <Textarea value={form.bioHi} onChange={(e) => updateForm({ bioHi: e.target.value })} disabled={!canEdit} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Quote (EN)</Label>
              <Textarea value={form.quoteEn} onChange={(e) => updateForm({ quoteEn: e.target.value })} disabled={!canEdit} rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Quote (HI)</Label>
              <Textarea value={form.quoteHi} onChange={(e) => updateForm({ quoteHi: e.target.value })} disabled={!canEdit} rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Key achievements (EN) — one per line</Label>
              <Textarea value={form.keyAchEnText} onChange={(e) => updateForm({ keyAchEnText: e.target.value })} disabled={!canEdit} rows={4} />
            </div>
            <div className="space-y-2">
              <Label>Key achievements (HI) — one per line</Label>
              <Textarea value={form.keyAchHiText} onChange={(e) => updateForm({ keyAchHiText: e.target.value })} disabled={!canEdit} rows={4} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Publication (EN)</Label>
                <Input value={form.pubEn} onChange={(e) => updateForm({ pubEn: e.target.value })} disabled={!canEdit} />
              </div>
              <div className="space-y-2">
                <Label>Publication (HI)</Label>
                <Input value={form.pubHi} onChange={(e) => updateForm({ pubHi: e.target.value })} disabled={!canEdit} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Icon</Label>
              <Select value={form.iconKey} onValueChange={(v) => updateForm({ iconKey: v as CmsIconKey })} disabled={!canEdit}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CMS_ICON_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 rounded-lg border p-3">
              <Checkbox
                id="showInBanner"
                checked={form.showInBanner}
                onCheckedChange={(v) => updateForm({ showInBanner: Boolean(v) })}
                disabled={!canEdit}
              />
              <Label htmlFor="showInBanner" className="cursor-pointer">
                Show in founders banner (About page &amp; homepage)
              </Label>
            </div>
            {form.showInBanner && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Banner badge (EN)</Label>
                  <Input value={form.bannerBadgeEn} onChange={(e) => updateForm({ bannerBadgeEn: e.target.value })} disabled={!canEdit} placeholder="Founder" />
                </div>
                <div className="space-y-2">
                  <Label>Banner badge (HI)</Label>
                  <Input value={form.bannerBadgeHi} onChange={(e) => updateForm({ bannerBadgeHi: e.target.value })} disabled={!canEdit} placeholder="संस्थापक" />
                </div>
              </div>
            )}
            <CmsUploadField
              label="Photo"
              kind="image"
              accept="image/jpeg,image/png,image/webp"
              value={form.imageUrl}
              onChange={(url) => updateForm({ imageUrl: url })}
              disabled={!canEdit}
            />
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
      {confirmDialog}
    </div>
  );
}
