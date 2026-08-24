import { useEffect, useRef } from "react";
import { parseVideoSource } from "@/lib/video-source";

type EmbedVideoPlayerProps = {
  videoUrl: string;
  poster?: string;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  className?: string;
  iframeClassName?: string;
};

export function EmbedVideoPlayer({
  videoUrl,
  poster,
  muted = false,
  loop = true,
  autoPlay = true,
  className = "w-full h-full object-cover",
  iframeClassName = "w-full h-full border-0",
}: EmbedVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const parsed = parseVideoSource(videoUrl);

  useEffect(() => {
    if (parsed.type !== "file") return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    if (autoPlay) {
      void v.play().catch(() => undefined);
    }
  }, [parsed.type, videoUrl, muted, autoPlay]);

  if (parsed.type === "youtube" && parsed.embedUrl) {
    return (
      <iframe
        src={parsed.embedUrl}
        title="YouTube video"
        className={iframeClassName}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  if (parsed.type === "instagram" && parsed.embedUrl) {
    return (
      <iframe
        src={parsed.embedUrl}
        title="Instagram video"
        className={iframeClassName}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  if (parsed.type === "file") {
    return (
      <video
        ref={videoRef}
        src={parsed.originalUrl}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        className={className}
      />
    );
  }

  if (poster) {
    return <img src={poster} alt="" className={className} />;
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-black/40 p-4 text-center text-sm text-white/80">
      Video unavailable
    </div>
  );
}
