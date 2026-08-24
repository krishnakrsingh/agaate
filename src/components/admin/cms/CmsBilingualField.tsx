import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function CmsBilingualField({
  label,
  en,
  hi,
  onEn,
  onHi,
  disabled,
  multiline,
  variant = "card",
  description,
  rows = 2,
}: {
  label: string;
  en: string;
  hi: string;
  onEn: (v: string) => void;
  onHi: (v: string) => void;
  disabled?: boolean;
  multiline?: boolean;
  variant?: "card" | "plain";
  description?: string;
  rows?: number;
}) {
  const wrapperClass =
    variant === "card" ? "space-y-2 rounded-lg border bg-muted/20 p-3" : "space-y-2";

  return (
    <div className={wrapperClass}>
      <div>
        <p className={cn("text-sm font-medium", variant === "plain" && "font-medium")}>{label}</p>
        {description ? <p className="text-xs text-muted-foreground mt-0.5">{description}</p> : null}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">{variant === "plain" ? "English" : "EN"}</Label>
          {multiline ? (
            <Textarea value={en} onChange={(e) => onEn(e.target.value)} disabled={disabled} rows={rows} />
          ) : (
            <Input value={en} onChange={(e) => onEn(e.target.value)} disabled={disabled} />
          )}
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">{variant === "plain" ? "Hindi" : "HI"}</Label>
          {multiline ? (
            <Textarea value={hi} onChange={(e) => onHi(e.target.value)} disabled={disabled} rows={rows} />
          ) : (
            <Input value={hi} onChange={(e) => onHi(e.target.value)} disabled={disabled} />
          )}
        </div>
      </div>
    </div>
  );
}
