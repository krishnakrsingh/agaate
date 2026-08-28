import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";
import type { SeoChecklistItem } from "@/lib/seo-types";
import { descriptionLengthScore, titleLengthScore } from "@/lib/seo-utils";
import type { ResolvedSeo } from "@/lib/seo-types";
import { cn } from "@/lib/utils";

export function buildSeoChecklist(seo: ResolvedSeo, focusKeyword?: string): SeoChecklistItem[] {
  const items: SeoChecklistItem[] = [];

  const titleScore = titleLengthScore(seo.title);
  items.push({
    id: "title-length",
    label: "Title length",
    status: titleScore === "good" ? "pass" : titleScore === "warn" ? "warn" : "fail",
    hint: `${seo.title.length} characters — aim for 30–60`,
  });

  const descScore = descriptionLengthScore(seo.description);
  items.push({
    id: "desc-length",
    label: "Meta description length",
    status: descScore === "good" ? "pass" : descScore === "warn" ? "warn" : "fail",
    hint: `${seo.description.length} characters — aim for 120–160`,
  });

  items.push({
    id: "canonical",
    label: "Canonical URL",
    status: seo.canonical ? "pass" : "fail",
    hint: seo.canonical ? "Canonical is set" : "Add an absolute canonical URL",
  });

  items.push({
    id: "robots",
    label: "Indexing",
    status: seo.noindex ? "warn" : "pass",
    hint: seo.noindex ? "Page is set to noindex" : "Page is indexable",
  });

  items.push({
    id: "og-image",
    label: "Social image",
    status: seo.og.image ? "pass" : "warn",
    hint: seo.og.image ? "OG image configured" : "Add an Open Graph image",
  });

  items.push({
    id: "schema",
    label: "Structured data",
    status: seo.schemaJsonLd ? "pass" : "warn",
    hint: seo.schemaJsonLd ? "JSON-LD present" : "Uses auto-generated schema when empty",
  });

  if (focusKeyword?.trim()) {
    const inTitle = seo.title.toLowerCase().includes(focusKeyword.toLowerCase());
    const inDesc = seo.description.toLowerCase().includes(focusKeyword.toLowerCase());
    items.push({
      id: "focus-keyword",
      label: "Focus keyword usage",
      status: inTitle && inDesc ? "pass" : inTitle || inDesc ? "warn" : "fail",
      hint: inTitle
        ? inDesc
          ? "Keyword appears in title and description"
          : "Keyword in title — consider adding to description"
        : "Focus keyword not found in title",
    });
  }

  return items;
}

const iconMap = {
  pass: CheckCircle2,
  warn: AlertTriangle,
  fail: XCircle,
};

const colorMap = {
  pass: "text-emerald-600",
  warn: "text-amber-600",
  fail: "text-red-600",
};

export function SeoChecklist({
  items,
  className,
}: {
  items: SeoChecklistItem[];
  className?: string;
}) {
  const passCount = items.filter((i) => i.status === "pass").length;
  return (
    <div className={cn("rounded-lg border bg-card p-4", className)}>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium">SEO checklist</p>
        <p className="text-xs text-muted-foreground">
          {passCount}/{items.length} checks passed
        </p>
      </div>
      <ul className="space-y-2">
        {items.map((item) => {
          const Icon = iconMap[item.status];
          return (
            <li key={item.id} className="flex items-start gap-2 text-sm">
              <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", colorMap[item.status])} />
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.hint}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 flex items-start gap-1.5 text-xs text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Scores are guidelines based on SEO best practices, not ranking guarantees.
      </p>
    </div>
  );
}
