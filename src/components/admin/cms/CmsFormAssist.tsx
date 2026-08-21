import { useState } from "react";
import { Languages, Wand2 } from "lucide-react";
import { translateCmsToHindiAdmin } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CmsSlugField({
  label = "Slug",
  value,
  onChange,
  onAuto,
  disabled,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onAuto: () => string;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="shrink-0 gap-1.5"
          disabled={disabled}
          onClick={() => onChange(onAuto())}
        >
          <Wand2 className="h-3.5 w-3.5" />
          Auto
        </Button>
      </div>
    </div>
  );
}

export function CmsTranslateToHindiButton({
  disabled,
  enTexts,
  onTranslated,
}: {
  disabled?: boolean;
  enTexts: string[];
  onTranslated: (translations: string[]) => void;
}) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    const hasContent = enTexts.some((t) => t.trim());
    if (!hasContent) {
      toast.error("Fill in English fields first.");
      return;
    }
    setLoading(true);
    try {
      const res = await translateCmsToHindiAdmin({ data: { texts: enTexts } });
      if (isAdminOk<{ translations: string[] }>(res)) {
        onTranslated(res.translations);
        toast.success("Hindi fields updated.");
      } else {
        toast.error(adminError(res, "Translation failed."));
      }
    } catch {
      toast.error("Translation failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      className="gap-1.5"
      disabled={disabled || loading}
      onClick={() => void handleTranslate()}
    >
      <Languages className="h-3.5 w-3.5" />
      {loading ? "Translating…" : "Translate to Hindi"}
    </Button>
  );
}
