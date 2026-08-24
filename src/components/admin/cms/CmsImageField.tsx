import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CmsUploadField } from "@/components/admin/cms/CmsUploadField";

export function CmsImageField({
  label,
  value,
  onChange,
  disabled,
  hint,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  hint?: string;
}) {
  return (
    <div className="space-y-3">
      <div>
        <Label className="text-sm font-medium">{label}</Label>
        {hint ? <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="/images/example.webp or https://..."
      />
      <CmsUploadField
        label="Upload image"
        value={value}
        onChange={onChange}
        kind="image"
        accept="image/jpeg,image/png,image/webp,image/gif"
        disabled={disabled}
      />
    </div>
  );
}
