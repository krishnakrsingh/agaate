import { useState } from "react";
import { Languages } from "lucide-react";
import { translateCmsToHindiAdmin } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";

export function CmsTranslateToHindiButton({
  disabled,
  enTexts,
  onTranslated,
  hint = "Fill English fields, then translate to Hindi.",
  variant = "card",
}: {
  disabled?: boolean;
  enTexts: string[];
  onTranslated: (translations: string[]) => void;
  hint?: string;
  variant?: "card" | "inline";
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

  return variant === "inline" ? (
    <div className="space-y-1">
      <Button
        type="button"
        size="sm"
        className="gap-1.5 bg-forest-deep hover:bg-forest text-cream font-bold text-xs shadow-sm transition-all cursor-pointer"
        disabled={disabled || loading}
        onClick={() => void handleTranslate()}
      >
        <Languages className="h-4 w-4" />
        {loading ? "Translating…" : "Translate to Hindi"}
      </Button>
      {hint ? <p className="text-[11px] text-muted-foreground font-medium">{hint}</p> : null}
    </div>
  ) : (
    <div className="rounded-xl border-2 border-forest/35 bg-gradient-to-br from-forest/15 via-forest/8 to-transparent p-4 shadow-sm ring-1 ring-forest/10">
      <Button
        type="button"
        size="lg"
        className="w-full gap-2 bg-forest-deep text-base font-bold text-cream shadow-md hover:bg-forest transition-all cursor-pointer"
        disabled={disabled || loading}
        onClick={() => void handleTranslate()}
      >
        <Languages className="h-5 w-5" />
        {loading ? "Translating…" : "Translate to Hindi"}
      </Button>
      <p className="mt-2 text-center text-xs font-semibold text-forest-deep/90">{hint}</p>
    </div>
  );
}
