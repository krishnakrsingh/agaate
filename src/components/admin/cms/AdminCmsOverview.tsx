import { Link } from "@tanstack/react-router";
import { BarChart3, Image, Video, Users, ArrowRight, Database } from "lucide-react";
import type { CmsOverview } from "@/lib/cms-types";
import { Button } from "@/components/ui/button";

function StatCard({
  title,
  icon: Icon,
  counts,
  to,
}: {
  title: string;
  icon: typeof BarChart3;
  counts: CmsOverview["stats"];
  to: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold tabular-nums">{counts.published}</p>
          <p className="mt-1 text-xs text-muted-foreground">{counts.published} live on site</p>
        </div>
        <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <Button asChild variant="outline" size="sm" className="mt-4 w-full">
        <Link to={to}>
          Manage
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Link>
      </Button>
    </div>
  );
}

export function AdminCmsOverview({
  overview,
  dbConfigured,
}: {
  overview: CmsOverview;
  dbConfigured: boolean;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Website content</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage site statistics, partner logos, farmer testimonials, and team members. Changes go live
          after publish — no rebuild required.
        </p>
      </div>

      {!dbConfigured && (
        <div className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <Database className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            MySQL is not configured. You can preview the CMS UI with in-memory data, but changes
            will not persist. Set <code className="rounded bg-amber-100 px-1">MYSQL_*</code> env vars
            for production use.
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Site statistics" icon={BarChart3} counts={overview.stats} to="/agaate-admin/content/stats" />
        <StatCard title="Brand logos" icon={Image} counts={overview.logos} to="/agaate-admin/content/logos" />
        <StatCard title="Farmer testimonials" icon={Video} counts={overview.stories} to="/agaate-admin/content/stories" />
        <StatCard title="Team members" icon={Users} counts={overview.team} to="/agaate-admin/content/team" />
      </div>

      <div className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">How it works</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>Open any item to edit — the preview updates as you type.</li>
          <li>Click <strong>Publish</strong> to push changes to the live website immediately.</li>
        </ol>
      </div>
    </div>
  );
}
