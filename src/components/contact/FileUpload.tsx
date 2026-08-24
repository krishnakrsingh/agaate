import { useRef, useState } from "react";
import { UploadSimple, X, FileText, CloudArrowUp } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPT = "image/jpeg,image/png,image/webp,application/pdf";

export function FileUpload({
  file,
  onChange,
  disabled,
  error,
  label,
  description,
}: {
  file: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
  error?: string;
  label?: string;
  description?: string;
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
      setLocalError("Please upload a JPG, PNG, WebP, or PDF file.");
      return;
    }
    if (f.size > MAX_BYTES) {
      setLocalError("File size must be 5MB or smaller.");
      return;
    }
    onChange(f);
  };

  return (
    <div className="space-y-2 w-full text-left">
      <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
        {label || "Attach Crop Photo or Soil Report (Optional)"}
      </label>

      {file ? (
        <div className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-[#143d31]/15 bg-[#f4f8f5]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-xl bg-[#143d31]/10 flex items-center justify-center shrink-0">
              <FileText className="h-6 w-6 text-[#5d7d37]" weight="bold" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs sm:text-sm font-bold text-[#143d31]">
                {file.name}
              </p>
              <p className="font-mono text-[11px] font-medium text-[#5d7d37]">
                {(file.size / 1024).toFixed(0)} KB · Attached Ready for Agronomist
              </p>
            </div>
          </div>
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              pick(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="cursor-pointer p-2 rounded-full text-[#4f624f] hover:text-red-600 hover:bg-red-50 transition-colors"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" weight="bold" />
          </button>
        </div>
      ) : (
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
          onClick={() => inputRef.current?.click()}
          className={cn(
            "group flex flex-col items-center justify-center p-6 sm:p-7 rounded-2xl border-2 border-dashed border-[#143d31]/20 bg-[#f4f8f5]/50 text-center transition-all cursor-pointer hover:border-[#143d31]/40 hover:bg-[#f4f8f5]",
            dragOver && "border-[#143d31] bg-[#143d31]/10",
          )}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-[#143d31]/10 text-[#5d7d37] shadow-xs group-hover:scale-105 transition-transform mb-2.5">
            <CloudArrowUp className="h-6 w-6 text-[#5d7d37]" weight="bold" />
          </div>
          <p className="font-sans text-xs sm:text-sm font-semibold text-[#143d31]">
            Drag & drop crop photo or soil report here, or{" "}
            <span className="text-[#5d7d37] underline underline-offset-2">browse</span>
          </p>
          <p className="font-mono text-[10px] sm:text-[11px] text-[#4f624f]/80 mt-1">
            Supports JPG, PNG, WebP, PDF (Max 5MB)
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        disabled={disabled}
        onChange={(e) => pick(e.target.files?.[0] || null)}
      />
      {localError || error ? (
        <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-600" role="alert">
          <span>●</span> {localError || error}
        </p>
      ) : null}
    </div>
  );
}
