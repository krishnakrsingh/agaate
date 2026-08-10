import { useRef, useState } from "react";
import { FileUp, X } from "lucide-react";
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
    <div>
      <p className="mb-1.5 text-sm font-medium text-forest-deep">
        Soil report or crop photo (optional)
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
          "rounded-md border border-dashed px-4 py-5 text-center transition-colors",
          dragOver ? "border-forest bg-neutral-50" : "border-neutral-300 bg-white",
          disabled && "opacity-60",
        )}
      >
        {file ? (
          <div className="flex items-center justify-between gap-3 text-left">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-forest-deep">{file.name}</p>
              <p className="text-xs text-neutral-500">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
            <button
              type="button"
              disabled={disabled}
              onClick={() => {
                pick(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="rounded-md p-2 text-neutral-500 hover:bg-neutral-100 hover:text-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
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
            className="mx-auto flex flex-col items-center gap-2 text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
          >
            <FileUp className="h-5 w-5 text-neutral-400" strokeWidth={1.75} />
            <span className="text-sm font-medium text-forest-deep">Drop a file or browse</span>
            <span className="text-xs text-neutral-500">JPG · PNG · WebP · PDF · max 5MB</span>
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
      {(error || localError) && (
        <p className="mt-1.5 text-xs font-medium text-destructive" role="alert">
          {error || localError}
        </p>
      )}
    </div>
  );
}
