import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import type { SeoEntityType } from "@/lib/seo-types";
import { Button } from "@/components/ui/button";

type AdminCmsSeoShortcutProps = {
  entityType: SeoEntityType;
  entityKey: string;
  label?: string;
};

export function AdminCmsSeoShortcut({ entityType, entityKey, label }: AdminCmsSeoShortcutProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-dashed bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <Search className="mt-0.5 h-4 w-4 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Page SEO</p>
          <p className="text-xs text-muted-foreground">
            Manage title, description, social previews, and indexing for this page.
          </p>
        </div>
      </div>
      <Button variant="outline" size="sm" asChild className="shrink-0">
        <Link
          to="/agaate-admin/seo/pages/$entityType/$entityKey"
          params={{ entityType, entityKey }}
          search={{ locale: "en" }}
        >
          Edit {label ?? "SEO"}
        </Link>
      </Button>
    </div>
  );
}
