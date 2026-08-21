import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadCmsMediaAdmin } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { cn } from "@/lib/utils";

export function CmsUploadField({
  label,
  value,
  onChange,
  kind,
  accept,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  kind: "image" | "video";
  accept: string;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | null) => {
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1] ?? "");
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const res = await uploadCmsMediaAdmin({
        data: {
          filename: file.name,
          mime: file.type,
          base64,
          kind,
        },
      });
      if (isAdminOk<{ url: string }>(res)) {
        onChange(res.url);
      } else {
        setError(adminError(res, "Upload failed."));
      }
    } catch {
      setError("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      {value ? (
        <div className="relative overflow-hidden rounded-lg border bg-muted/30 p-2">
          {kind === "image" ? (
            <img src={value} alt="" className="mx-auto max-h-32 object-contain" />
          ) : (
            <video src={value} controls className="mx-auto max-h-40 w-full" />
          )}
          {!disabled && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1 h-7 w-7"
              onClick={() => onChange("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        <button
          type="button"
          disabled={disabled || uploading}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-8 text-sm text-muted-foreground transition hover:bg-muted/40",
            (disabled || uploading) && "pointer-events-none opacity-60",
          )}
        >
          <Upload className="h-5 w-5" />
          {uploading ? "Uploading…" : `Drop or click to upload ${kind}`}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => void handleFile(e.target.files?.[0] ?? null)}
      />
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
}
