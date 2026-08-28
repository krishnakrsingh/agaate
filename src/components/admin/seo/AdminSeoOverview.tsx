import { Link } from "@tanstack/react-router";
import { ArrowRightLeft, ClipboardCheck, FileSearch, Globe, Search } from "lucide-react";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";

const QUICK_LINKS = [
  {
    to: "/agaate-admin/seo/global",
    label: "Global settings",
    description: "Site-wide defaults, verification, organization info",
    icon: Globe,
  },
  {
    to: "/agaate-admin/seo/pages",
    label: "Page SEO",
    description: "Titles, descriptions, social tags per page",
    icon: FileSearch,
  },
  {
    to: "/agaate-admin/seo/redirects",
    label: "Redirects",
    description: "301/302 URL redirects",
    icon: ArrowRightLeft,
  },
  {
    to: "/agaate-admin/seo/audit",
    label: "SEO audit",
    description: "Scan for missing or duplicate metadata",
    icon: ClipboardCheck,
  },
] as const;

export function AdminSeoOverview() {
  return (
    <div className="space-y-6">
      <CmsPageHeader
        title="SEO Manager"
        description="Manage search visibility, social sharing, sitemaps, and redirects."
        workflow="live"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {QUICK_LINKS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent/30"
          >
            <item.icon className="mb-3 h-6 w-6 text-primary" />
            <p className="font-medium group-hover:text-primary">{item.label}</p>
            <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Technical SEO endpoints</p>
        <ul className="mt-2 space-y-1">
          <li>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              /sitemap.xml
            </a>{" "}
            — dynamic XML sitemap (excludes noindex pages)
          </li>
          <li>
            <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              /robots.txt
            </a>{" "}
            — crawl rules with sitemap reference
          </li>
        </ul>
      </div>
    </div>
  );
}
