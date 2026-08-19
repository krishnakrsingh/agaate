import { useRef, useState } from "react";
import { UploadSimple, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPT = "image/jpeg,image/png,image/webp,application/pdf";

export function FileUpload({
  file,
  onChange,
  disabled,
  error,
}: {
  file: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [localError, setLocalError] = useState<string | undefined>();

  const pick = (f: File | null) => {
    setLocalError(undefined);
    if (!f) {
      onChange(null);
      return;
    }
    if (!ACCEPT.split(",").includes(f.type)) {
      setLocalError("Upload a JPG, PNG, WebP, or PDF.");
      return;
    }
    if (f.size > MAX_BYTES) {
      setLocalError("File must be 5MB or smaller.");
      return;
    }
    onChange(f);
  };

  return (
    <div className="space-y-1.5">
      <p className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
        Soil report or crop disease photo (optional)
      </p>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          pick(e.dataTransfer.files?.[0] || null);
        }}
        className={cn(
          "rounded-2xl border border-dashed px-4 py-5 text-center transition-all duration-200",
          dragOver
            ? "border-[#143d31] bg-[#143d31]/5"
            : "border-[#143d31]/20 bg-white/60 hover:bg-white hover:border-[#143d31]/40",
          disabled && "opacity-60",
        )}
      >
        {file ? (
          <div className="flex items-center justify-between gap-3 text-left">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold font-sans text-[#143d31]">{file.name}</p>
              <p className="font-mono text-xs text-[#5d7d37]">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
            <button
              type="button"
              disabled={disabled}
              onClick={() => {
                pick(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="cursor-pointer rounded-lg p-2 text-[#4f624f] hover:bg-[#143d31]/10 hover:text-[#143d31] focus-visible:outline-none"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
            className="mx-auto flex flex-col items-center gap-1.5 text-[#4f624f] cursor-pointer focus-visible:outline-none"
          >
            <UploadSimple className="h-5 w-5 text-[#5d7d37]" weight="bold" />
            <span className="text-sm font-semibold text-[#143d31]">Drop a file or browse</span>
            <span className="font-mono text-[10px] text-[#4f624f]">JPG · PNG · WebP · PDF (max 5MB)</span>
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="sr-only"
          disabled={disabled}
          onChange={(e) => pick(e.target.files?.[0] || null)}
        />
      </div>
      {localError || error ? (
        <p className="font-mono text-xs text-red-600 font-semibold">{localError || error}</p>
      ) : null}
    </div>
  );
}
