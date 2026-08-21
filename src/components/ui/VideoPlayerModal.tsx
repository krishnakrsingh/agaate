import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowsOut,
  Pause,
  Play,
  SpeakerHigh,
  SpeakerSlash,
  X,
} from "@phosphor-icons/react";
import { EASE } from "@/components/common/motion";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function VideoPlayerModal({
  open,
  onClose,
  src,
  poster,
  title,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  poster?: string;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showChrome, setShowChrome] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseVideo = useCallback(() => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      setPlaying(false);
    }
  }, []);

  const handleClose = useCallback(() => {
    pauseVideo();
    onClose();
  }, [onClose, pauseVideo]);

  const bumpChrome = useCallback(() => {
    setShowChrome(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setShowChrome(false);
    }, 2800);
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
      bumpChrome();
    } else {
      v.pause();
      setPlaying(false);
      setShowChrome(true);
    }
  }, [bumpChrome]);

  useEffect(() => {
    if (!open) return;
    setPlaying(true);
    setMuted(false);
    setProgress(0);
    setCurrent(0);
    setShowChrome(true);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.muted = false;
      void v.play().catch(() => setPlaying(false));
    }
  }, [open, src]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [open, handleClose, togglePlay]);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFullscreen = async () => {
    const el = shellRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      await el.requestFullscreen?.();
    } else {
      await document.exitFullscreen?.();
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * duration;
    bumpChrome();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a1410]/92 backdrop-blur-md p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            ref={shellRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0d1f19] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
            onClick={(e) => e.stopPropagation()}
            onMouseMove={bumpChrome}
            onTouchStart={bumpChrome}
          >
            {/* Header */}
            <div
              className={`absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent px-4 py-3 sm:px-5 sm:py-4 transition-opacity duration-300 ${
                showChrome ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#a3e635] animate-pulse" />
                <p className="truncate font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#d4f4a8]">
                  {title}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Close video"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Video */}
            <div className="relative aspect-video w-full bg-black">
              <video
                ref={videoRef}
                src={src}
                poster={poster}
                playsInline
                preload="metadata"
                className="h-full w-full object-contain"
                onClick={togglePlay}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
                onTimeUpdate={(e) => {
                  const v = e.currentTarget;
                  const dur = v.duration || duration;
                  setCurrent(v.currentTime);
                  setProgress(dur ? (v.currentTime / dur) * 100 : 0);
                }}
                onDurationChange={(e) => setDuration(e.currentTarget.duration || 0)}
                onEnded={() => {
                  setPlaying(false);
                  setShowChrome(true);
                }}
              />

              {/* Center play/pause */}
              <button
                type="button"
                onClick={togglePlay}
                className={`absolute left-1/2 top-1/2 z-10 flex h-14 w-14 sm:h-16 sm:w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#143d31]/75 text-white shadow-lg ring-1 ring-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-[#143d31]/90 ${
                  playing && showChrome ? "opacity-0 scale-90 pointer-events-none" : "opacity-100"
                }`}
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <Pause className="h-6 w-6" weight="fill" />
                ) : (
                  <Play className="h-6 w-6 ml-0.5" weight="fill" />
                )}
              </button>
            </div>

            {/* Controls */}
            <div
              className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-4 pb-4 pt-10 sm:px-5 transition-opacity duration-300 ${
                showChrome ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div
                role="slider"
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={duration}
                aria-valuenow={current}
                className="group mb-3 h-1.5 w-full cursor-pointer rounded-full bg-white/20"
                onClick={seek}
              >
                <div
                  className="relative h-full rounded-full bg-[#a3e635] transition-[width] duration-75"
                  style={{ width: `${progress}%` }}
                >
                  <span className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#a3e635] opacity-0 shadow-md transition-opacity group-hover:opacity-100" />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 text-white">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                    aria-label={playing ? "Pause" : "Play"}
                  >
                    {playing ? (
                      <Pause className="h-4 w-4" weight="fill" />
                    ) : (
                      <Play className="h-4 w-4 ml-0.5" weight="fill" />
                    )}
                  </button>
                  <span className="font-mono text-[11px] tabular-nums text-white/80">
                    {formatTime(current)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                    aria-label={muted ? "Unmute" : "Mute"}
                  >
                    {muted ? (
                      <SpeakerSlash className="h-4 w-4" />
                    ) : (
                      <SpeakerHigh className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => void toggleFullscreen()}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                    aria-label="Fullscreen"
                  >
                    <ArrowsOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
