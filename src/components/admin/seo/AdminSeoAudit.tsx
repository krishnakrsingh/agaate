import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ClipboardCheck, RefreshCw } from "lucide-react";
import { runSeoAuditAdmin } from "@/functions/seo";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import type { SeoAuditIssue } from "@/lib/seo-types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const severityStyles = {
  critical: "border-red-200 bg-red-50 text-red-800",
  high: "border-orange-200 bg-orange-50 text-orange-800",
  medium: "border-amber-200 bg-amber-50 text-amber-800",
  low: "border-blue-200 bg-blue-50 text-blue-800",
  good: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

export function AdminSeoAudit() {
  const toast = useToast();
  const [issues, setIssues] = useState<SeoAuditIssue[]>([]);
  const [summary, setSummary] = useState({ critical: 0, high: 0, medium: 0, low: 0, good: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const run = useCallback(async () => {
    setLoading(true);
    const res = await runSeoAuditAdmin();
    if (isAdminOk<{ issues: SeoAuditIssue[]; summary: typeof summary }>(res)) {
      setIssues(res.issues);
      setSummary(res.summary);
    } else {
      toast.error(adminError(res));
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    run();
  }, [run]);

  const filtered = useMemo(() => {
    if (filter === "all") return issues.filter((i) => i.severity !== "good");
    return issues.filter((i) => i.severity === filter);
  }, [issues, filter]);

  return (
    <div className="space-y-6">
      <CmsPageHeader
        title="SEO Audit"
        description="Scan your site for missing metadata, duplicates, and indexing issues."
        workflow="live"
        actions={
          <Button variant="outline" size="sm" onClick={run} disabled={loading}>
            <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} />
            Re-run audit
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-5">
        {(["critical", "high", "medium", "low", "good"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={cn(
              "rounded-lg border p-3 text-left transition-colors",
              filter === s && "ring-2 ring-primary",
              severityStyles[s],
            )}
          >
            <p className="text-2xl font-bold">{summary[s]}</p>
            <p className="text-xs capitalize">{s}</p>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All issues</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="good">Good</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">{filtered.length} items</p>
      </div>

      <div className="space-y-3">
        {loading ? (
          <p className="text-sm text-muted-foreground">Running audit…</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">No issues in this category.</p>
        ) : (
          filtered.map((issue) => (
            <div
              key={issue.id}
              className={cn("rounded-lg border p-4", severityStyles[issue.severity])}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="capitalize bg-white/50">
                      {issue.severity}
                    </Badge>
                    <span className="text-xs font-medium uppercase">{issue.category}</span>
                  </div>
                  <p className="mt-1 font-medium">{issue.message}</p>
                  <p className="mt-1 text-sm opacity-90">{issue.recommendation}</p>
                  {issue.path && (
                    <p className="mt-1 text-xs font-mono opacity-75">{issue.path}</p>
                  )}
                </div>
                {issue.entityType && issue.entityKey && (
                  <Link
                    to="/agaate-admin/seo/pages/$entityType/$entityKey"
                    params={{
                      entityType: issue.entityType,
                      entityKey: issue.entityKey,
                    }}
                    search={{ locale: issue.locale ?? "en" }}
                    className="text-sm font-medium underline"
                  >
                    Fix →
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
