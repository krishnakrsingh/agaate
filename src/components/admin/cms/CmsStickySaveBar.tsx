import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CmsStickySaveBar({
  saving,
  disabled,
  label = "Save",
}: {
  saving?: boolean;
  disabled?: boolean;
  label?: string;
}) {
  if (disabled) return null;

  return (
    <div className="sticky bottom-0 z-10 -mx-6 mt-6 border-t bg-background/95 px-6 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving…" : label}
        </Button>
      </div>
    </div>
  );
}
