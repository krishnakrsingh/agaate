import { useRef, useState } from "react";
import { UploadSimple, X, FileText } from "@phosphor-icons/react";
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
      {file ? (
        <div className="flex items-center justify-between gap-3 p-3 rounded-lg border border-neutral-200 bg-neutral-50/80">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-md bg-[#143d31]/10 flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5 text-[#143d31]" weight="bold" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#143d31]">
                {file.name}
              </p>
              <p className="text-xs text-[#5d7d37]">
                {(file.size / 1024).toFixed(0)} KB · Attached
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
            className="cursor-pointer p-1.5 rounded-md text-neutral-500 hover:text-red-600 hover:bg-red-50 transition-colors"
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
        >
          <button
            type="button"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#143d31]/30 bg-white text-xs sm:text-sm font-semibold text-[#143d31] hover:bg-[#143d31]/5 transition-all focus-visible:outline-none shadow-2xs",
              dragOver && "border-[#143d31] bg-[#143d31]/10",
            )}
          >
            <UploadSimple className="h-4 w-4 text-[#143d31]" weight="bold" />
            <span>Add file</span>
          </button>
          <p className="text-xs text-neutral-500 mt-1.5">
            Supported: JPG, PNG, WebP, PDF (Max 5MB)
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
        <p className="text-xs font-medium text-red-600">
          ● {localError || error}
        </p>
      ) : null}
    </div>
  );
}

