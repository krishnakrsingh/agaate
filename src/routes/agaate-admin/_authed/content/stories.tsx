import { createFileRoute } from "@tanstack/react-router";
import { AdminCmsStories } from "@/components/admin/cms/AdminCmsStories";

export const Route = createFileRoute("/agaate-admin/_authed/content/stories")({
  component: StoriesPage,
});

function StoriesPage() {
  const { adminUser } = Route.useRouteContext();
  return <AdminCmsStories role={adminUser.role} />;
}
