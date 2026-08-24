import { createFileRoute } from "@tanstack/react-router";
import { AdminCmsHomepageChapters } from "@/components/admin/cms/AdminCmsHomepageChapters";

const CHAPTER_TABS = ["sections", "agri-park"] as const;
type ChapterTab = (typeof CHAPTER_TABS)[number];

function validateChaptersSearch(search: Record<string, unknown>): { tab?: ChapterTab } {
  const tab = CHAPTER_TABS.find((t) => t === search.tab);
  return tab ? { tab } : {};
}

export const Route = createFileRoute("/agaate-admin/_authed/content/homepage-chapters")({
  validateSearch: validateChaptersSearch,
  component: HomepageChaptersPage,
});

function HomepageChaptersPage() {
  const { adminUser } = Route.useRouteContext();
  const { tab } = Route.useSearch();
  return <AdminCmsHomepageChapters role={adminUser.role} defaultTab={tab ?? "sections"} />;
}
