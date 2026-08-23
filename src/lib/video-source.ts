export type VideoSourceType = "file" | "youtube" | "instagram" | "unknown";

export type ParsedVideoSource = {
  type: VideoSourceType;
  originalUrl: string;
  embedUrl?: string;
  watchUrl?: string;
  youtubeId?: string;
  instagramId?: string;
  instagramKind?: "reel" | "p";
};

function trimUrl(url: string): string {
  return url.trim();
}

export function youtubeThumbnail(id: string): string {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

function parseYoutubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/")[2] ?? null;
      }
      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/")[2] ?? null;
      }
      const v = parsed.searchParams.get("v");
      if (v) return v;
    }
  } catch {
    return null;
  }
  return null;
}

function parseInstagram(url: string): { id: string; kind: "reel" | "p" } | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host !== "instagram.com") return null;

    const parts = parsed.pathname.split("/").filter(Boolean);
    const kind = parts[0];
    const id = parts[1];
    if (kind === "reel" && id) return { id, kind: "reel" };
    if (kind === "p" && id) return { id, kind: "p" };
    if (kind === "reels" && id) return { id, kind: "reel" };
  } catch {
    return null;
  }
  return null;
}

function isFileVideoUrl(url: string): boolean {
  if (url.startsWith("/")) return true;
  try {
    const parsed = new URL(url);
    return /\.(mp4|webm|mov)(\?|$)/i.test(parsed.pathname);
  } catch {
    return false;
  }
}

export function parseVideoSource(url: string): ParsedVideoSource {
  const originalUrl = trimUrl(url);
  if (!originalUrl) {
    return { type: "unknown", originalUrl };
  }

  const youtubeId = parseYoutubeId(originalUrl);
  if (youtubeId) {
    return {
      type: "youtube",
      originalUrl,
      youtubeId,
      watchUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1`,
    };
  }

  const instagram = parseInstagram(originalUrl);
  if (instagram) {
    return {
      type: "instagram",
      originalUrl,
      instagramId: instagram.id,
      instagramKind: instagram.kind,
      watchUrl: originalUrl,
      embedUrl: `https://www.instagram.com/${instagram.kind}/${instagram.id}/embed`,
    };
  }

  if (isFileVideoUrl(originalUrl)) {
    return {
      type: "file",
      originalUrl,
      watchUrl: originalUrl,
    };
  }

  return { type: "unknown", originalUrl, watchUrl: originalUrl };
}

export function isValidVideoSource(url: string): boolean {
  const parsed = parseVideoSource(url);
  return parsed.type === "file" || parsed.type === "youtube" || parsed.type === "instagram";
}

export function autoThumbnailForVideoUrl(url: string): string | null {
  const parsed = parseVideoSource(url);
  if (parsed.type === "youtube" && parsed.youtubeId) {
    return youtubeThumbnail(parsed.youtubeId);
  }
  return null;
}
