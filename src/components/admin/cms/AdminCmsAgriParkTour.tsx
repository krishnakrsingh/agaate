import { useCallback, useEffect, useState } from "react";
import { Video } from "lucide-react";
import {
  getCmsAgriParkTourAdmin,
  saveCmsAgriParkChapterAdmin,
  saveCmsAgriParkTourAdmin,
} from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { CmsBilingualField } from "@/components/admin/cms/CmsBilingualField";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import { CmsSectionHeader } from "@/components/admin/cms/CmsSectionHeader";
import { CmsStickySaveBar } from "@/components/admin/cms/CmsStickySaveBar";
import { useCmsDirtyGuard } from "@/components/admin/cms/useCmsDirtyGuard";
import { CmsTranslateToHindiButton } from "@/components/admin/cms/CmsFormAssist";
import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CmsUploadField } from "@/components/admin/cms/CmsUploadField";
import { canEditCms } from "@/lib/admin-constants";
import {
  DEFAULT_HOME_CMS_AGRI_PARK_TOUR,
  type HomeAgriParkChapterContent,
  type HomeCmsAgriParkTour,
} from "@/lib/cms-types";
import { AGRI_PARK_CHAPTER_FALLBACK } from "@/data/agri-park-chapter-fallback";

export function AdminCmsAgriParkTour({
  permissions,
  embedded = false,
}: {
  permissions: string[];
  embedded?: boolean;
}) {
  const toast = useToast();
  const canEdit = canEditCms({ permissions });
  const [tour, setTour] = useState<HomeCmsAgriParkTour>(DEFAULT_HOME_CMS_AGRI_PARK_TOUR);
  const [chapter, setChapter] = useState<HomeAgriParkChapterContent>(AGRI_PARK_CHAPTER_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [savingVideo, setSavingVideo] = useState(false);
  const [savingChapter, setSavingChapter] = useState(false);
  const [dbConfigured, setDbConfigured] = useState(true);
  const [videoDirty, setVideoDirty] = useState(false);
  const [chapterDirty, setChapterDirty] = useState(false);
  useCmsDirtyGuard(videoDirty || chapterDirty);

  const updateTour = (next: HomeCmsAgriParkTour) => {
    setTour(next);
    setVideoDirty(true);
  };

  const updateChapter = (next: HomeAgriParkChapterContent) => {
    setChapter(next);
    setChapterDirty(true);
  };

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getCmsAgriParkTourAdmin();
    if (
      isAdminOk<{
        agriParkTour: HomeCmsAgriParkTour;
        chapter: HomeAgriParkChapterContent;
        dbConfigured: boolean;
      }>(res)
    ) {
      setTour(res.agriParkTour);
      setChapter(res.chapter);
      setDbConfigured(res.dbConfigured);
      setVideoDirty(false);
      setChapterDirty(false);
    } else {
      toast.error("Load failed", adminError(res, "Could not load Agri Park settings."));
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleSaveVideo(e: React.FormEvent) {
    e.preventDefault();
    if (!canEdit) return;
    setSavingVideo(true);
    const res = await saveCmsAgriParkTourAdmin({ data: tour });
    setSavingVideo(false);
    if (isAdminOk<{ agriParkTour: HomeCmsAgriParkTour }>(res)) {
      setTour(res.agriParkTour);
      setVideoDirty(false);
      toast.success("Video saved", "Agri Park tour video on the homepage is updated.");
    } else {
      toast.error("Save failed", adminError(res, "Could not save Agri Park tour video."));
    }
  }

  async function handleSaveChapter(e: React.FormEvent) {
    e.preventDefault();
    if (!canEdit) return;
    setSavingChapter(true);
    const res = await saveCmsAgriParkChapterAdmin({ data: chapter });
    setSavingChapter(false);
    if (isAdminOk<{ chapter: HomeAgriParkChapterContent }>(res)) {
      setChapter(res.chapter);
      setChapterDirty(false);
      toast.success("Chapter saved", "Agri Park homepage section copy is updated.");
    } else {
      toast.error("Save failed", adminError(res, "Could not save Agri Park chapter."));
    }
  }

  return (
    <div className={embedded ? "space-y-4" : "space-y-6"}>
      {!embedded ? (
        <CmsPageHeader
          title="Agri Park (homepage)"
          description="Edit the homepage Agri Park chapter copy, map image, and video tour shown in the scroll narrative."
          workflow="live"
        />
      ) : null}
      {!dbConfigured && (
        <p className="text-xs text-amber-600">
          Database is not configured — changes will not persist until Supabase is connected.
        </p>
      )}

      <Tabs defaultValue="video" className="space-y-4">
        <TabsList>
          <TabsTrigger value="video">Video tour</TabsTrigger>
          <TabsTrigger value="chapter">Homepage chapter</TabsTrigger>
        </TabsList>

        <TabsContent value="video">
          <div className="rounded-xl border bg-card shadow-sm">
            <div className="flex items-center gap-2 border-b px-5 py-4">
              <Video className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold">Video tour</h2>
            </div>
            <form onSubmit={handleSaveVideo} className="space-y-4 p-5">
              <div className="space-y-2">
                <Label htmlFor="videoUrl" className="text-xs font-medium">
                  Video URL
                </Label>
                <Input
                  id="videoUrl"
                  type="text"
                  value={tour.videoUrl}
                  onChange={(e) => updateTour({ ...tour, videoUrl: e.target.value })}
                  placeholder="/videos/agri-park-tour.mp4"
                  disabled={!canEdit || loading}
                  className="h-9 text-sm"
                />
                <CmsUploadField
                  label="Upload video"
                  value={tour.videoUrl}
                  onChange={(url) => updateTour({ ...tour, videoUrl: url })}
                  kind="video"
                  accept="video/mp4,video/webm"
                  disabled={!canEdit || loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="posterUrl" className="text-xs font-medium">
                  Poster image URL
                </Label>
                <Input
                  id="posterUrl"
                  type="text"
                  value={tour.posterUrl}
                  onChange={(e) => updateTour({ ...tour, posterUrl: e.target.value })}
                  placeholder="/videos/posters/farm-first-look.webp"
                  disabled={!canEdit || loading}
                  className="h-9 text-sm"
                />
                <CmsUploadField
                  label="Upload poster"
                  value={tour.posterUrl}
                  onChange={(url) => updateTour({ ...tour, posterUrl: url })}
                  kind="image"
                  accept="image/jpeg,image/png,image/webp"
                  disabled={!canEdit || loading}
                />
              </div>

              {tour.posterUrl && (
                <div className="rounded-lg border bg-muted/30 p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Preview</p>
                  <img
                    src={tour.posterUrl}
                    alt="Agri Park tour poster preview"
                    className="max-h-40 rounded-md object-cover"
                  />
                </div>
              )}

              <CmsStickySaveBar saving={savingVideo} disabled={!canEdit} label="Save video" />
            </form>
          </div>
        </TabsContent>

        <TabsContent value="chapter">
          <div className="rounded-xl border bg-card shadow-sm">
            <div className="border-b px-5 py-4">
              <h2 className="text-sm font-semibold">Homepage chapter copy</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Text, stats, checklist, and map shown in the Agri Park section on the homepage.
              </p>
            </div>
            <form onSubmit={handleSaveChapter} className="space-y-4 p-5">
              <CmsTranslateToHindiButton
                variant="inline"
                disabled={!canEdit || loading}
                enTexts={[
                  chapter.badgeEn,
                  chapter.titleEn,
                  chapter.descriptionEn,
                  chapter.bookVisitLabelEn,
                  chapter.watchTourLabelEn,
                  chapter.locationBadgeEn,
                  chapter.mapAltEn,
                  ...chapter.stats.flatMap((s) => [s.suffixEn, s.labelEn]),
                  chapter.checklistEn.join("\n"),
                ]}
                onTranslated={(t) => {
                  let i = 0;
                  const take = () => t[i++] ?? "";
                  updateChapter({
                    ...chapter,
                    badgeHi: take() || chapter.badgeHi,
                    titleHi: take() || chapter.titleHi,
                    descriptionHi: take() || chapter.descriptionHi,
                    bookVisitLabelHi: take() || chapter.bookVisitLabelHi,
                    watchTourLabelHi: take() || chapter.watchTourLabelHi,
                    locationBadgeHi: take() || chapter.locationBadgeHi,
                    mapAltHi: take() || chapter.mapAltHi,
                    stats: chapter.stats.map((s) => ({
                      ...s,
                      suffixHi: take() || s.suffixHi,
                      labelHi: take() || s.labelHi,
                    })),
                    checklistHi: take().split("\n").filter(Boolean) || chapter.checklistHi,
                  });
                }}
              />
              <CmsBilingualField
                label="Badge"
                en={chapter.badgeEn}
                hi={chapter.badgeHi}
                onEn={(v) => updateChapter({ ...chapter, badgeEn: v })}
                onHi={(v) => updateChapter({ ...chapter, badgeHi: v })}
                disabled={!canEdit || loading}
              />
              <CmsBilingualField
                label="Title"
                en={chapter.titleEn}
                hi={chapter.titleHi}
                onEn={(v) => updateChapter({ ...chapter, titleEn: v })}
                onHi={(v) => updateChapter({ ...chapter, titleHi: v })}
                disabled={!canEdit || loading}
              />
              <CmsBilingualField
                label="Description"
                en={chapter.descriptionEn}
                hi={chapter.descriptionHi}
                onEn={(v) => updateChapter({ ...chapter, descriptionEn: v })}
                onHi={(v) => updateChapter({ ...chapter, descriptionHi: v })}
                disabled={!canEdit || loading}
                multiline
              />

              <div className="space-y-3">
                <p className="text-sm font-medium">Stats</p>
                {chapter.stats.map((stat, i) => (
                  <div key={i} className="rounded-lg border p-3 space-y-2">
                    <div className="grid gap-2 sm:grid-cols-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Value</Label>
                        <Input
                          type="number"
                          value={stat.numValue}
                          onChange={(e) =>
                            updateChapter({
                              ...chapter,
                              stats: chapter.stats.map((s, idx) =>
                                idx === i ? { ...s, numValue: Number(e.target.value) } : s,
                              ),
                            })
                          }
                          disabled={!canEdit || loading}
                        />
                      </div>
                      <CmsBilingualField
                        label="Suffix"
                        en={stat.suffixEn}
                        hi={stat.suffixHi}
                        onEn={(v) =>
                          updateChapter({
                            ...chapter,
                            stats: chapter.stats.map((s, idx) =>
                              idx === i ? { ...s, suffixEn: v } : s,
                            ),
                          })
                        }
                        onHi={(v) =>
                          updateChapter({
                            ...chapter,
                            stats: chapter.stats.map((s, idx) =>
                              idx === i ? { ...s, suffixHi: v } : s,
                            ),
                          })
                        }
                        disabled={!canEdit || loading}
                      />
                    </div>
                    <CmsBilingualField
                      label="Label"
                      en={stat.labelEn}
                      hi={stat.labelHi}
                      onEn={(v) =>
                        updateChapter({
                          ...chapter,
                          stats: chapter.stats.map((s, idx) =>
                            idx === i ? { ...s, labelEn: v } : s,
                          ),
                        })
                      }
                      onHi={(v) =>
                        updateChapter({
                          ...chapter,
                          stats: chapter.stats.map((s, idx) =>
                            idx === i ? { ...s, labelHi: v } : s,
                          ),
                        })
                      }
                      disabled={!canEdit || loading}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Checklist (EN)</Label>
                <Textarea
                  value={chapter.checklistEn.join("\n")}
                  onChange={(e) =>
                    updateChapter({
                      ...chapter,
                      checklistEn: e.target.value.split("\n").filter(Boolean),
                    })
                  }
                  disabled={!canEdit || loading}
                  rows={4}
                  placeholder="One item per line"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Checklist (HI)</Label>
                <Textarea
                  value={chapter.checklistHi.join("\n")}
                  onChange={(e) =>
                    updateChapter({
                      ...chapter,
                      checklistHi: e.target.value.split("\n").filter(Boolean),
                    })
                  }
                  disabled={!canEdit || loading}
                  rows={4}
                  placeholder="One item per line"
                />
              </div>

              <CmsBilingualField
                label="Book visit button"
                en={chapter.bookVisitLabelEn}
                hi={chapter.bookVisitLabelHi}
                onEn={(v) => updateChapter({ ...chapter, bookVisitLabelEn: v })}
                onHi={(v) => updateChapter({ ...chapter, bookVisitLabelHi: v })}
                disabled={!canEdit || loading}
              />
              <CmsBilingualField
                label="Watch tour button"
                en={chapter.watchTourLabelEn}
                hi={chapter.watchTourLabelHi}
                onEn={(v) => updateChapter({ ...chapter, watchTourLabelEn: v })}
                onHi={(v) => updateChapter({ ...chapter, watchTourLabelHi: v })}
                disabled={!canEdit || loading}
              />
              <CmsBilingualField
                label="Location badge"
                en={chapter.locationBadgeEn}
                hi={chapter.locationBadgeHi}
                onEn={(v) => updateChapter({ ...chapter, locationBadgeEn: v })}
                onHi={(v) => updateChapter({ ...chapter, locationBadgeHi: v })}
                disabled={!canEdit || loading}
              />

              <div className="space-y-2">
                <Label className="text-xs font-medium">Map image URL</Label>
                <Input
                  value={chapter.mapImageUrl}
                  onChange={(e) => updateChapter({ ...chapter, mapImageUrl: e.target.value })}
                  disabled={!canEdit || loading}
                />
                <CmsUploadField
                  label="Upload map image"
                  value={chapter.mapImageUrl}
                  onChange={(url) => updateChapter({ ...chapter, mapImageUrl: url })}
                  kind="image"
                  accept="image/jpeg,image/png,image/webp"
                  disabled={!canEdit || loading}
                />
              </div>
              <CmsBilingualField
                label="Map alt text"
                en={chapter.mapAltEn}
                hi={chapter.mapAltHi}
                onEn={(v) => updateChapter({ ...chapter, mapAltEn: v })}
                onHi={(v) => updateChapter({ ...chapter, mapAltHi: v })}
                disabled={!canEdit || loading}
              />

              <CmsStickySaveBar
                saving={savingChapter}
                disabled={!canEdit}
                label="Save chapter copy"
              />
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
