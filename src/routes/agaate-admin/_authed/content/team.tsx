import { createFileRoute } from "@tanstack/react-router";
import { AdminCmsTeam } from "@/components/admin/cms/AdminCmsTeam";

export const Route = createFileRoute("/agaate-admin/_authed/content/team")({
  component: TeamPage,
});

function TeamPage() {
  const { adminUser } = Route.useRouteContext();
  return <AdminCmsTeam role={adminUser.role} />;
}
