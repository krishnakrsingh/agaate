import { CMS_ICON_MAP } from "@/lib/cms-icons";
import type { CmsIconKey } from "@/lib/cms-types";
import { CMS_BRAND_GROUP_LABELS, type CmsBrandGroup } from "@/lib/cms-types";
import { EmbedVideoPlayer } from "@/components/ui/EmbedVideoPlayer";
import { isValidVideoSource } from "@/lib/video-source";

export function CmsStatPreview({
  iconKey,
  numValue,
  prefix,
  suffixEn,
  suffixHi,
  labelEn,
  labelHi,
}: {
  iconKey: CmsIconKey;
  numValue: number;
  prefix?: string;
  suffixEn: string;
  suffixHi: string;
  labelEn: string;
  labelHi: string;
}) {
  const Icon = CMS_ICON_MAP[iconKey];

  return (
    <div className="rounded-xl border bg-[#f4f8f5] p-4 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Preview</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {(["EN", "HI"] as const).map((lang) => {
          const suffix = lang === "EN" ? suffixEn : suffixHi;
          const label = lang === "EN" ? labelEn : labelHi;
          return (
            <div
              key={lang}
              className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm border border-[#143d31]/10"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-[#123c30]">
                <Icon weight="fill" className="h-[18px] w-[18px] text-white" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase text-[#5d7d37]">{lang}</p>
                <p className="font-semibold tabular-nums text-[#0d2a21]">
                  {prefix}
                  {numValue.toLocaleString()}
                  {suffix}
                </p>
                <p className="truncate text-[10px] font-bold uppercase tracking-wide text-[#5d7d37]">
                  {label || "—"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CmsLogoPreview({
  name,
  imageUrl,
  group,
}: {
  name: string;
  imageUrl: string;
  group: CmsBrandGroup;
}) {
  return (
    <div className="rounded-xl border bg-[#f4f8f5] p-4 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Preview</p>
      <div className="flex flex-col items-center gap-3 rounded-lg bg-white p-6 border border-[#143d31]/10">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="max-h-14 w-full max-w-[185px] object-contain" />
        ) : (
          <div className="flex h-[72px] w-[150px] items-center justify-center rounded-[18px] border border-dashed text-xs text-muted-foreground">
            No image
          </div>
        )}
        <p className="font-medium text-sm">{name || "Brand name"}</p>
        <p className="text-xs text-muted-foreground">{CMS_BRAND_GROUP_LABELS[group]}</p>
      </div>
    </div>
  );
}

export function CmsStoryPreview({
  nameEn,
  nameHi,
  roleEn,
  quoteEn,
  badgeEn,
  thumbnailUrl,
  videoUrl,
}: {
  nameEn: string;
  nameHi: string;
  roleEn: string;
  quoteEn: string;
  badgeEn: string;
  thumbnailUrl: string;
  videoUrl: string;
}) {
  return (
    <div className="rounded-xl border bg-[#f4f8f5] p-4 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Preview</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="relative aspect-[9/14] bg-[#143d31]/5">
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                Thumbnail
              </div>
            )}
            {badgeEn && (
              <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold text-[#143d31]">
                {badgeEn}
              </span>
            )}
          </div>
          <div className="p-3 space-y-1">
            <p className="font-semibold text-sm">{nameEn || "Farmer name"}</p>
            <p className="text-xs text-muted-foreground">{roleEn || "Role"}</p>
            <p className="text-xs line-clamp-2 text-[#536253]">{quoteEn || "Quote preview…"}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase text-[#5d7d37]">Hindi</p>
          <p className="font-semibold text-sm">{nameHi || "—"}</p>
          {videoUrl && isValidVideoSource(videoUrl) ? (
            <div className="aspect-video max-h-40 overflow-hidden rounded-lg border bg-black">
              <EmbedVideoPlayer
                videoUrl={videoUrl}
                poster={thumbnailUrl}
                muted
                autoPlay={false}
                loop={false}
                className="h-full w-full object-contain"
                iframeClassName="h-full w-full border-0"
              />
            </div>
          ) : videoUrl ? (
            <p className="text-xs text-muted-foreground rounded-lg border border-dashed p-3">
              Paste a valid YouTube, Instagram, or file video URL to preview.
            </p>
          ) : (
            <div className="flex h-24 items-center justify-center rounded-lg border border-dashed text-xs text-muted-foreground">
              Video preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
