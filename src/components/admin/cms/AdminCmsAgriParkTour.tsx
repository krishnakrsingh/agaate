import { useCallback, useEffect, useState } from "react";
import { Save, Video } from "lucide-react";
import {
  getCmsAgriParkTourAdmin,
  saveCmsAgriParkChapterAdmin,
  saveCmsAgriParkTourAdmin,
} from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CmsUploadField } from "@/components/admin/cms/CmsUploadField";
import { canManageSettings, type AdminRole } from "@/lib/admin-constants";
import {
  DEFAULT_HOME_CMS_AGRI_PARK_TOUR,
  type HomeAgriParkChapterContent,
  type HomeCmsAgriParkTour,
} from "@/lib/cms-types";
import { AGRI_PARK_CHAPTER_FALLBACK } from "@/data/agri-park-chapter-fallback";

function Bilingual({
  label,
  en,
  hi,
  onEn,
  onHi,
  disabled,
  multiline,
}: {
  label: string;
  en: string;
  hi: string;
  onEn: (v: string) => void;
  onHi: (v: string) => void;
  disabled?: boolean;
  multiline?: boolean;
}) {
  return (
    <div className="space-y-2 rounded-lg border bg-muted/20 p-3">
      <p className="text-sm font-medium">{label}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">EN</Label>
          {multiline ? (
            <Textarea value={en} onChange={(e) => onEn(e.target.value)} disabled={disabled} rows={2} />
          ) : (
            <Input value={en} onChange={(e) => onEn(e.target.value)} disabled={disabled} />
          )}
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">HI</Label>
          {multiline ? (
            <Textarea value={hi} onChange={(e) => onHi(e.target.value)} disabled={disabled} rows={2} />
          ) : (
            <Input value={hi} onChange={(e) => onHi(e.target.value)} disabled={disabled} />
          )}
        </div>
      </div>
    </div>
  );
}

export function AdminCmsAgriParkTour({ role }: { role: AdminRole }) {
  const toast = useToast();
  const canEdit = canManageSettings(role);
  const [tour, setTour] = useState<HomeCmsAgriParkTour>(DEFAULT_HOME_CMS_AGRI_PARK_TOUR);
  const [chapter, setChapter] = useState<HomeAgriParkChapterContent>(AGRI_PARK_CHAPTER_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [savingVideo, setSavingVideo] = useState(false);
  const [savingChapter, setSavingChapter] = useState(false);
  const [dbConfigured, setDbConfigured] = useState(true);

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
      toast.success("Chapter saved", "Agri Park homepage section copy is updated.");
    } else {
      toast.error("Save failed", adminError(res, "Could not save Agri Park chapter."));
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Agri Park (homepage)</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit the homepage Agri Park chapter copy, map image, and video tour shown in the scroll narrative.
        </p>
        {!dbConfigured && (
          <p className="mt-2 text-xs text-amber-600">
            Database is not configured — changes will not persist until Supabase is connected.
          </p>
        )}
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <div className="flex items-center gap-2 border-b px-5 py-4">
          <Video className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold">Video tour</h2>
        </div>
        <form onSubmit={handleSaveVideo} className="space-y-4 p-5">
          <div className="space-y-2">
            <Label htmlFor="videoUrl" className="text-xs font-medium">Video URL</Label>
            <Input
              id="videoUrl"
              type="text"
              value={tour.videoUrl}
              onChange={(e) => setTour({ ...tour, videoUrl: e.target.value })}
              placeholder="/videos/agri-park-tour.mp4"
              disabled={!canEdit || loading}
              className="h-9 text-sm"
            />
            <CmsUploadField
              label="Upload video"
              value={tour.videoUrl}
              onChange={(url) => setTour({ ...tour, videoUrl: url })}
              kind="video"
              accept="video/mp4,video/webm"
              disabled={!canEdit || loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="posterUrl" className="text-xs font-medium">Poster image URL</Label>
            <Input
              id="posterUrl"
              type="text"
              value={tour.posterUrl}
              onChange={(e) => setTour({ ...tour, posterUrl: e.target.value })}
              placeholder="/videos/posters/farm-first-look.webp"
              disabled={!canEdit || loading}
              className="h-9 text-sm"
            />
            <CmsUploadField
              label="Upload poster"
              value={tour.posterUrl}
              onChange={(url) => setTour({ ...tour, posterUrl: url })}
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

          {canEdit && (
            <div className="flex justify-end pt-2">
              <Button type="submit" size="sm" disabled={savingVideo || loading}>
                <Save className="mr-1.5 h-3.5 w-3.5" />
                {savingVideo ? "Saving…" : "Save video"}
              </Button>
            </div>
          )}
        </form>
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <div className="border-b px-5 py-4">
          <h2 className="text-sm font-semibold">Homepage chapter copy</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Text, stats, checklist, and map shown in the Agri Park section on the homepage.
          </p>
        </div>
        <form onSubmit={handleSaveChapter} className="space-y-4 p-5">
          <Bilingual
            label="Badge"
            en={chapter.badgeEn}
            hi={chapter.badgeHi}
            onEn={(v) => setChapter({ ...chapter, badgeEn: v })}
            onHi={(v) => setChapter({ ...chapter, badgeHi: v })}
            disabled={!canEdit || loading}
          />
          <Bilingual
            label="Title"
            en={chapter.titleEn}
            hi={chapter.titleHi}
            onEn={(v) => setChapter({ ...chapter, titleEn: v })}
            onHi={(v) => setChapter({ ...chapter, titleHi: v })}
            disabled={!canEdit || loading}
          />
          <Bilingual
            label="Description"
            en={chapter.descriptionEn}
            hi={chapter.descriptionHi}
            onEn={(v) => setChapter({ ...chapter, descriptionEn: v })}
            onHi={(v) => setChapter({ ...chapter, descriptionHi: v })}
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
                        setChapter({
                          ...chapter,
                          stats: chapter.stats.map((s, idx) =>
                            idx === i ? { ...s, numValue: Number(e.target.value) } : s,
                          ),
                        })
                      }
                      disabled={!canEdit || loading}
                    />
                  </div>
                  <Bilingual
                    label="Suffix"
                    en={stat.suffixEn}
                    hi={stat.suffixHi}
                    onEn={(v) =>
                      setChapter({
                        ...chapter,
                        stats: chapter.stats.map((s, idx) => (idx === i ? { ...s, suffixEn: v } : s)),
                      })
                    }
                    onHi={(v) =>
                      setChapter({
                        ...chapter,
                        stats: chapter.stats.map((s, idx) => (idx === i ? { ...s, suffixHi: v } : s)),
                      })
                    }
                    disabled={!canEdit || loading}
                  />
                </div>
                <Bilingual
                  label="Label"
                  en={stat.labelEn}
                  hi={stat.labelHi}
                  onEn={(v) =>
                    setChapter({
                      ...chapter,
                      stats: chapter.stats.map((s, idx) => (idx === i ? { ...s, labelEn: v } : s)),
                    })
                  }
                  onHi={(v) =>
                    setChapter({
                      ...chapter,
                      stats: chapter.stats.map((s, idx) => (idx === i ? { ...s, labelHi: v } : s)),
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
                setChapter({
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
                setChapter({
                  ...chapter,
                  checklistHi: e.target.value.split("\n").filter(Boolean),
                })
              }
              disabled={!canEdit || loading}
              rows={4}
              placeholder="One item per line"
            />
          </div>

          <Bilingual
            label="Book visit button"
            en={chapter.bookVisitLabelEn}
            hi={chapter.bookVisitLabelHi}
            onEn={(v) => setChapter({ ...chapter, bookVisitLabelEn: v })}
            onHi={(v) => setChapter({ ...chapter, bookVisitLabelHi: v })}
            disabled={!canEdit || loading}
          />
          <Bilingual
            label="Watch tour button"
            en={chapter.watchTourLabelEn}
            hi={chapter.watchTourLabelHi}
            onEn={(v) => setChapter({ ...chapter, watchTourLabelEn: v })}
            onHi={(v) => setChapter({ ...chapter, watchTourLabelHi: v })}
            disabled={!canEdit || loading}
          />
          <Bilingual
            label="Location badge"
            en={chapter.locationBadgeEn}
            hi={chapter.locationBadgeHi}
            onEn={(v) => setChapter({ ...chapter, locationBadgeEn: v })}
            onHi={(v) => setChapter({ ...chapter, locationBadgeHi: v })}
            disabled={!canEdit || loading}
          />

          <div className="space-y-2">
            <Label className="text-xs font-medium">Map image URL</Label>
            <Input
              value={chapter.mapImageUrl}
              onChange={(e) => setChapter({ ...chapter, mapImageUrl: e.target.value })}
              disabled={!canEdit || loading}
            />
            <CmsUploadField
              label="Upload map image"
              value={chapter.mapImageUrl}
              onChange={(url) => setChapter({ ...chapter, mapImageUrl: url })}
              kind="image"
              accept="image/jpeg,image/png,image/webp"
              disabled={!canEdit || loading}
            />
          </div>
          <Bilingual
            label="Map alt text"
            en={chapter.mapAltEn}
            hi={chapter.mapAltHi}
            onEn={(v) => setChapter({ ...chapter, mapAltEn: v })}
            onHi={(v) => setChapter({ ...chapter, mapAltHi: v })}
            disabled={!canEdit || loading}
          />

          {canEdit && (
            <Button type="submit" disabled={savingChapter || loading}>
              <Save className="mr-2 h-4 w-4" />
              {savingChapter ? "Saving…" : "Save chapter copy"}
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
