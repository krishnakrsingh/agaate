import { createFileRoute } from "@tanstack/react-router";
import { AdminCmsAgriParkTour } from "@/components/admin/cms/AdminCmsAgriParkTour";

export const Route = createFileRoute("/agaate-admin/_authed/content/agri-park-tour")({
  component: AgriParkTourPage,
});

function AgriParkTourPage() {
  const { adminUser } = Route.useRouteContext();
  return <AdminCmsAgriParkTour role={adminUser.role} />;
}
