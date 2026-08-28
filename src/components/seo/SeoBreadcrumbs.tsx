import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { getLocalizedPath } from "@/lib/i18n";
import type { SeoPageDefinition } from "@/lib/seo-types";
import { cn } from "@/lib/utils";

type BreadcrumbItem = { name: string; path: string };

type SeoBreadcrumbsProps = {
  items: BreadcrumbItem[];
  locale?: string;
  className?: string;
};

export function SeoBreadcrumbs({ items, locale, className }: SeoBreadcrumbsProps) {
  if (!items || items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm text-muted-foreground", className)}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const href = getLocalizedPath(item.path, locale);
          return (
            <li key={item.path} className="flex items-center gap-1">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />}
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link to={href as "/"} className="hover:text-foreground hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function breadcrumbsFromPage(page: SeoPageDefinition | undefined): BreadcrumbItem[] {
  return page?.breadcrumb ?? [];
}
