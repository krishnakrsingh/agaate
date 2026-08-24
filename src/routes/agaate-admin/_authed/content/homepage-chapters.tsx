import { createFileRoute } from "@tanstack/react-router";
import { AdminCmsHomepageChapters } from "@/components/admin/cms/AdminCmsHomepageChapters";

export const Route = createFileRoute("/agaate-admin/_authed/content/homepage-chapters")({
  validateSearch: (search: Record<string, unknown>) => ({
    tab:
      search.tab === "sections" || search.tab === "agri-park" ? search.tab : undefined,
  }),
  component: HomepageChaptersPage,
});

function HomepageChaptersPage() {
  const { adminUser } = Route.useRouteContext();
  const { tab } = Route.useSearch();
  return (
    <AdminCmsHomepageChapters
      role={adminUser.role}
      defaultTab={tab ?? "sections"}
    />
  );
}
