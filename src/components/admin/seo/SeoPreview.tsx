import { cn } from "@/lib/utils";
import type { ResolvedSeo } from "@/lib/seo-types";

type SeoSearchPreviewProps = {
  seo: ResolvedSeo;
  url?: string;
  className?: string;
};

export function SeoSearchPreview({ seo, url, className }: SeoSearchPreviewProps) {
  const displayUrl = url ?? seo.canonical;
  let hostname = "agaate.in";
  let path = "/";
  try {
    const parsed = new URL(displayUrl);
    hostname = parsed.hostname;
    path = parsed.pathname;
  } catch {
    /* use defaults */
  }

  return (
    <div className={cn("rounded-lg border bg-card p-4", className)}>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Google search preview
      </p>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">
          {hostname}
          <span className="text-muted-foreground/70"> › {path.replace(/^\//, "") || "home"}</span>
        </p>
        <p className="text-xl text-[#1a0dab] hover:underline line-clamp-1">{seo.title}</p>
        <p className="text-sm text-[#4d5156] line-clamp-2">{seo.description}</p>
      </div>
    </div>
  );
}

type SeoSocialPreviewProps = {
  seo: ResolvedSeo;
  className?: string;
};

export function SeoSocialPreview({ seo, className }: SeoSocialPreviewProps) {
  return (
    <div className={cn("rounded-lg border bg-card overflow-hidden", className)}>
      <p className="px-4 pt-4 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Social preview
      </p>
      <div className="aspect-[1.91/1] bg-muted">
        {seo.og.image ? (
          <img src={seo.og.image} alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image set
          </div>
        )}
      </div>
      <div className="space-y-1 p-4">
        <p className="text-xs uppercase text-muted-foreground">{seo.og.siteName}</p>
        <p className="font-medium line-clamp-1">{seo.og.title}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">{seo.og.description}</p>
      </div>
    </div>
  );
}
