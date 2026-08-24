import { useCallback, useEffect, useMemo, useState } from "react";
import { MoreHorizontal, Plus, RefreshCw, Search } from "lucide-react";
import {
  archiveCmsItemAdmin,
  listCmsStoriesAdmin,
  publishCmsItemAdmin,
  reorderCmsItemsAdmin,
  saveCmsStoryAdmin,
  unpublishCmsItemAdmin,
} from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import type { CmsStatus, CmsStoryRow } from "@/lib/cms-types";
import { useToast } from "@/components/admin/AdminToast";
import { CmsStatusBadge } from "@/components/admin/cms/CmsStatusBadge";
import { CmsStoryPreview } from "@/components/admin/cms/CmsInlinePreview";
import { CmsUploadField } from "@/components/admin/cms/CmsUploadField";
import {
  CmsDragHandle,
  CmsSortableProvider,
  CmsSortableRow,
} from "@/components/admin/cms/CmsSortable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { storySlugFrom } from "@/lib/cms-slug";
import { CmsTranslateToHindiButton } from "@/components/admin/cms/CmsFormAssist";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import {
  CmsTableEmptyAction,
  CmsTableEmptyRow,
  CmsTableLoadingRow,
} from "@/components/admin/cms/CmsTableState";
import { useCmsListConfirm } from "@/components/admin/cms/useCmsListConfirm";
import { useCmsDirtyGuard } from "@/components/admin/cms/useCmsDirtyGuard";
import { autoThumbnailForVideoUrl, isValidVideoSource } from "@/lib/video-source";

const emptyForm = {
  slug: "",
  nameEn: "",
  nameHi: "",
  roleEn: "",
  roleHi: "",
  locationEn: "",
  locationHi: "",
  acresEn: "",
  acresHi: "",
  cropEn: "",
  cropHi: "",
  quoteEn: "",
  quoteHi: "",
  badgeEn: "",
  badgeHi: "",
  thumbnailUrl: "",
  videoUrl: "",
};

export function AdminCmsStories({ role }: { role: AdminRole }) {
  const toast = useToast();
  const { requestConfirm, confirmDialog } = useCmsListConfirm();
  const canEdit = canManageSettings(role);
  const [items, setItems] = useState<CmsStoryRow[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<CmsStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<CmsStoryRow | null>(null);
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
    const res = await listCmsStoriesAdmin({ data: { q, status } });
    if (isAdminOk<{ items: CmsStoryRow[] }>(res)) setItems(res.items);
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

  const openEdit = (row: CmsStoryRow) => {
    setEditing(row);
    setForm({
      slug: row.slug,
      nameEn: row.nameEn,
      nameHi: row.nameHi,
      roleEn: row.roleEn,
      roleHi: row.roleHi,
      locationEn: row.locationEn,
      locationHi: row.locationHi,
      acresEn: row.acresEn,
      acresHi: row.acresHi,
      cropEn: row.cropEn,
      cropHi: row.cropHi,
      quoteEn: row.quoteEn,
      quoteHi: row.quoteHi,
      badgeEn: row.badgeEn,
      badgeHi: row.badgeHi,
      thumbnailUrl: row.thumbnailUrl,
      videoUrl: row.videoUrl,
    });
    setFormDirty(false);
    setSheetOpen(true);
  };

  const handlePublish = async () => {
    const slug = form.slug || storySlugFrom(form.nameEn, form.cropEn);
    if (!isValidVideoSource(form.videoUrl)) {
      toast.error("Add a valid video: upload MP4/WebM or paste a YouTube or Instagram link.");
      return;
    }
    const thumb = form.thumbnailUrl || autoThumbnailForVideoUrl(form.videoUrl) || "";
    if (!thumb) {
      toast.error("Thumbnail is required (upload image or use a YouTube link for auto-thumbnail).");
      return;
    }
    if (!form.nameEn.trim() || !form.cropEn.trim()) {
      toast.error("Name and crop (English) are required.");
      return;
    }
    setPublishing(true);
    const saveRes = await saveCmsStoryAdmin({
      data: { id: editing?.id, ...form, slug, thumbnailUrl: thumb },
    });
    if (!isAdminOk<{ item: CmsStoryRow }>(saveRes)) {
      toast.error(adminError(saveRes));
      setPublishing(false);
      return;
    }
    const publishRes = await publishCmsItemAdmin({
      data: { type: "stories", id: saveRes.item.id },
    });
    if (isAdminOk(publishRes)) {
      toast.success("Published to live site.");
      setFormDirty(false);
      setSheetOpen(false);
      await load();
    } else toast.error(adminError(publishRes));
    setPublishing(false);
  };

  const handleReorder = async (ids: number[]) => {
    const res = await reorderCmsItemsAdmin({ data: { type: "stories", ids } });
    if (isAdminOk(res)) {
      const map = new Map(items.map((i) => [i.id, i]));
      setItems(ids.map((id, i) => ({ ...map.get(id)!, sortOrder: i })));
    }
  };

  const filtered = useMemo(() => items, [items]);

  return (
    <div className="space-y-6">
      <CmsPageHeader
        title="Farmer testimonials"
        description="Video shorts and quotes for the homepage farmer stories section."
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
                Add testimonial
              </Button>
            )}
          </>
        }
      />

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search name, crop, location…"
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
                <TableHead>Thumbnail</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead>Crop</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? <CmsTableLoadingRow colSpan={6} /> : null}
              {!loading && filtered.length === 0 ? (
                <CmsTableEmptyRow
                  colSpan={6}
                  title="No testimonials yet"
                  description="Add a farmer video story, then publish it to appear on the homepage."
                  action={
                    canEdit ? (
                      <CmsTableEmptyAction label="Add testimonial" onClick={openCreate} />
                    ) : undefined
                  }
                />
              ) : null}
              {!loading
                ? filtered.map((row) => (
                    <CmsSortableRow key={row.id} id={row.id}>
                      <TableCell>{canEdit && <CmsDragHandle id={row.id} />}</TableCell>
                      <TableCell>
                        <img
                          src={row.thumbnailUrl}
                          alt=""
                          className="h-14 w-10 rounded object-cover"
                        />
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{row.nameEn}</p>
                        <p className="text-xs text-muted-foreground">{row.locationEn}</p>
                      </TableCell>
                      <TableCell>{row.cropEn}</TableCell>
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
                                        title: "Unpublish testimonial?",
                                        description: `"${row.nameEn}" will be removed from the live homepage.`,
                                        confirmLabel: "Unpublish",
                                        action: async () => {
                                          const res = await unpublishCmsItemAdmin({
                                            data: { type: "stories", id: row.id },
                                          });
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
                                      title: "Archive testimonial?",
                                      description: `"${row.nameEn}" will be archived and hidden from this list.`,
                                      confirmLabel: "Archive",
                                      destructive: true,
                                      action: async () => {
                                        const res = await archiveCmsItemAdmin({
                                          data: { type: "stories", id: row.id },
                                        });
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
            <SheetTitle>{editing ? "Edit testimonial" : "New testimonial"}</SheetTitle>
            <SheetDescription>
              Preview below, then publish to update the live website.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <CmsStoryPreview
              nameEn={form.nameEn}
              nameHi={form.nameHi}
              roleEn={form.roleEn}
              quoteEn={form.quoteEn}
              badgeEn={form.badgeEn}
              thumbnailUrl={form.thumbnailUrl}
              videoUrl={form.videoUrl}
            />

            <CmsTranslateToHindiButton
              disabled={!canEdit}
              enTexts={[
                form.nameEn,
                form.roleEn,
                form.locationEn,
                form.acresEn,
                form.cropEn,
                form.quoteEn,
                form.badgeEn,
              ]}
              onTranslated={([nameHi, roleHi, locationHi, acresHi, cropHi, quoteHi, badgeHi]) => {
                updateForm((f) => ({
                  ...f,
                  nameHi: nameHi ?? f.nameHi,
                  roleHi: roleHi ?? f.roleHi,
                  locationHi: locationHi ?? f.locationHi,
                  acresHi: acresHi ?? f.acresHi,
                  cropHi: cropHi ?? f.cropHi,
                  quoteHi: quoteHi ?? f.quoteHi,
                  badgeHi: badgeHi ?? f.badgeHi,
                }));
              }}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Name (EN)</Label>
                <Input
                  value={form.nameEn}
                  onChange={(e) => updateForm({ nameEn: e.target.value })}
                  disabled={!canEdit}
                />
              </div>
              <div className="space-y-2">
                <Label>Name (HI)</Label>
                <Input
                  value={form.nameHi}
                  onChange={(e) => updateForm({ nameHi: e.target.value })}
                  disabled={!canEdit}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Role (EN)</Label>
                <Input
                  value={form.roleEn}
                  onChange={(e) => updateForm({ roleEn: e.target.value })}
                  disabled={!canEdit}
                />
              </div>
              <div className="space-y-2">
                <Label>Role (HI)</Label>
                <Input
                  value={form.roleHi}
                  onChange={(e) => updateForm({ roleHi: e.target.value })}
                  disabled={!canEdit}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Location (EN)</Label>
                <Input
                  value={form.locationEn}
                  onChange={(e) => updateForm({ locationEn: e.target.value })}
                  disabled={!canEdit}
                />
              </div>
              <div className="space-y-2">
                <Label>Location (HI)</Label>
                <Input
                  value={form.locationHi}
                  onChange={(e) => updateForm({ locationHi: e.target.value })}
                  disabled={!canEdit}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Acres (EN)</Label>
                <Input
                  value={form.acresEn}
                  onChange={(e) => updateForm({ acresEn: e.target.value })}
                  disabled={!canEdit}
                />
              </div>
              <div className="space-y-2">
                <Label>Acres (HI)</Label>
                <Input
                  value={form.acresHi}
                  onChange={(e) => updateForm({ acresHi: e.target.value })}
                  disabled={!canEdit}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Crop (EN)</Label>
                <Input
                  value={form.cropEn}
                  onChange={(e) => updateForm({ cropEn: e.target.value })}
                  disabled={!canEdit}
                />
              </div>
              <div className="space-y-2">
                <Label>Crop (HI)</Label>
                <Input
                  value={form.cropHi}
                  onChange={(e) => updateForm({ cropHi: e.target.value })}
                  disabled={!canEdit}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Quote (EN)</Label>
              <Textarea
                value={form.quoteEn}
                onChange={(e) => updateForm({ quoteEn: e.target.value })}
                disabled={!canEdit}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Quote (HI)</Label>
              <Textarea
                value={form.quoteHi}
                onChange={(e) => updateForm({ quoteHi: e.target.value })}
                disabled={!canEdit}
                rows={3}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Badge (EN)</Label>
                <Input
                  value={form.badgeEn}
                  onChange={(e) => updateForm({ badgeEn: e.target.value })}
                  disabled={!canEdit}
                />
              </div>
              <div className="space-y-2">
                <Label>Badge (HI)</Label>
                <Input
                  value={form.badgeHi}
                  onChange={(e) => updateForm({ badgeHi: e.target.value })}
                  disabled={!canEdit}
                />
              </div>
            </div>
            <CmsUploadField
              label="Thumbnail"
              kind="image"
              accept="image/jpeg,image/png,image/webp"
              value={form.thumbnailUrl}
              onChange={(url) => updateForm({ thumbnailUrl: url })}
              disabled={!canEdit}
            />
            <div className="space-y-2">
              <Label>Video URL</Label>
              <Input
                value={form.videoUrl}
                onChange={(e) => updateForm({ videoUrl: e.target.value })}
                onBlur={() => {
                  if (!form.thumbnailUrl && form.videoUrl) {
                    const auto = autoThumbnailForVideoUrl(form.videoUrl);
                    if (auto) updateForm((f) => ({ ...f, thumbnailUrl: auto }));
                  }
                }}
                placeholder="https://youtube.com/shorts/... or https://instagram.com/reel/..."
                disabled={!canEdit}
              />
              <p className="text-xs text-muted-foreground">
                Paste a YouTube or Instagram reel link, or upload MP4/WebM below. YouTube links
                auto-fill the thumbnail.
              </p>
            </div>
            <CmsUploadField
              label="Upload video (MP4/WebM)"
              kind="video"
              accept="video/mp4,video/webm"
              value={form.videoUrl}
              onChange={(url) => updateForm({ videoUrl: url })}
              disabled={!canEdit}
            />
          </div>
          {canEdit && (
            <SheetFooter className="mt-6">
              <Button
                onClick={() => void handlePublish()}
                disabled={
                  publishing ||
                  !isValidVideoSource(form.videoUrl) ||
                  !(form.thumbnailUrl || autoThumbnailForVideoUrl(form.videoUrl))
                }
                className="w-full"
              >
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
