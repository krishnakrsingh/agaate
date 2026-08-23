import { Link } from "@tanstack/react-router";
import { BarChart3, Image, Video, Users, ArrowRight, Database, Smartphone, Store, Briefcase, MessageCircle, BookOpen, MessageSquare } from "lucide-react";
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
  newsletterWaitlist = 0,
  careersJobs = 0,
  careerApplications = 0,
}: {
  overview: CmsOverview;
  dbConfigured: boolean;
  newsletterWaitlist?: number;
  careersJobs?: number;
  careerApplications?: number;
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Site contact & social</p>
              <p className="mt-2 text-sm text-foreground">Phones, WhatsApp, emails, facilities</p>
              <p className="mt-1 text-xs text-muted-foreground">Header, footer, contact page, and CTAs</p>
            </div>
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <MessageCircle className="h-5 w-5" />
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="mt-4 w-full sm:w-auto">
            <Link to="/agaate-admin/content/site-contact">
              Manage contact
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">App store links</p>
              <p className="mt-2 text-sm text-foreground">Google Play & App Store download badge URLs</p>
              <p className="mt-1 text-xs text-muted-foreground">Shown in the mobile app section on the homepage</p>
            </div>
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <Smartphone className="h-5 w-5" />
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="mt-4 w-full sm:w-auto">
            <Link to="/agaate-admin/content/app-links">
              Manage links
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Agri Park video tour</p>
              <p className="mt-2 text-sm text-foreground">Homepage &quot;Watch Video Tour&quot; modal</p>
              <p className="mt-1 text-xs text-muted-foreground">Agri Park & Smart Nursery video and poster</p>
            </div>
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <Video className="h-5 w-5" />
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="mt-4 w-full sm:w-auto">
            <Link to="/agaate-admin/content/agri-park-tour">
              Manage video
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">About page</p>
              <p className="mt-2 text-sm text-foreground">Hero, pillars, milestones, footprint</p>
              <p className="mt-1 text-xs text-muted-foreground">Public /about page copy and metrics</p>
            </div>
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="mt-4 w-full sm:w-auto">
            <Link to="/agaate-admin/content/about">
              Manage about
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Contact page</p>
              <p className="mt-2 text-sm text-foreground">FAQs, inquiry tracks, form options</p>
              <p className="mt-1 text-xs text-muted-foreground">Public /contact page beyond site contact</p>
            </div>
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <MessageSquare className="h-5 w-5" />
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="mt-4 w-full sm:w-auto">
            <Link to="/agaate-admin/content/contact-page">
              Manage contact page
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Kisaan Mall waitlist</p>
              <p className="mt-2 text-3xl font-bold tabular-nums">{newsletterWaitlist}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Email and mobile signups from the coming-soon page
              </p>
            </div>
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <Store className="h-5 w-5" />
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="mt-4 w-full sm:w-auto">
            <Link to="/agaate-admin/content/kisaan-mall">
              Manage waitlist
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Careers</p>
              <p className="mt-2 text-3xl font-bold tabular-nums">{careersJobs}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {careerApplications} application{careerApplications === 1 ? "" : "s"} received
              </p>
            </div>
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <Briefcase className="h-5 w-5" />
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="mt-4 w-full sm:w-auto">
            <Link to="/agaate-admin/content/careers">
              Manage careers
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
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
