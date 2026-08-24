import { createFileRoute } from "@tanstack/react-router";
import { AdminCmsHomepageChapters } from "@/components/admin/cms/AdminCmsHomepageChapters";

export const Route = createFileRoute("/agaate-admin/_authed/content/homepage-chapters")({
  component: HomepageChaptersPage,
});

function HomepageChaptersPage() {
  const { adminUser } = Route.useRouteContext();
  return <AdminCmsHomepageChapters role={adminUser.role} />;
}
