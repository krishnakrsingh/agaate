import { useCallback, useEffect, useState } from "react";
import { Save, Video } from "lucide-react";
import { getCmsAgriParkTourAdmin, saveCmsAgriParkTourAdmin } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CmsUploadField } from "@/components/admin/cms/CmsUploadField";
import { canManageSettings, type AdminRole } from "@/lib/admin-constants";
import { DEFAULT_HOME_CMS_AGRI_PARK_TOUR, type HomeCmsAgriParkTour } from "@/lib/cms-types";

export function AdminCmsAgriParkTour({ role }: { role: AdminRole }) {
  const toast = useToast();
  const canEdit = canManageSettings(role);
  const [tour, setTour] = useState<HomeCmsAgriParkTour>(DEFAULT_HOME_CMS_AGRI_PARK_TOUR);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dbConfigured, setDbConfigured] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getCmsAgriParkTourAdmin();
    if (isAdminOk<{ agriParkTour: HomeCmsAgriParkTour; dbConfigured: boolean }>(res)) {
      setTour(res.agriParkTour);
      setDbConfigured(res.dbConfigured);
    } else {
      toast.error("Load failed", adminError(res, "Could not load Agri Park tour video."));
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
    const res = await saveCmsAgriParkTourAdmin({ data: tour });
    setSaving(false);
    if (isAdminOk<{ agriParkTour: HomeCmsAgriParkTour }>(res)) {
      setTour(res.agriParkTour);
      toast.success("Video saved", "Agri Park tour video on the homepage is updated.");
    } else {
      toast.error("Save failed", adminError(res, "Could not save Agri Park tour video."));
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Agri Park video tour</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update the video and poster shown when visitors click &quot;Watch Video Tour&quot; in the Agri Park section on
          the homepage.
        </p>
      </div>

      {!dbConfigured && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          MySQL is not configured. Changes are stored in memory only and will not persist across restarts.
        </div>
      )}

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
            <Video className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Agri Park & Smart Nursery video tour</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Upload a new MP4/WebM video and poster image, or paste URLs. Changes apply immediately after saving.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="videoUrl" className="text-xs font-medium">Video URL</Label>
            <Input
              id="videoUrl"
              type="text"
              value={tour.videoUrl}
              onChange={(e) => setTour({ ...tour, videoUrl: e.target.value })}
              placeholder="/videos/farm-first-look.mp4"
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
              <Button type="submit" size="sm" disabled={saving || loading}>
                <Save className="mr-1.5 h-3.5 w-3.5" />
                {saving ? "Saving…" : "Save video"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
