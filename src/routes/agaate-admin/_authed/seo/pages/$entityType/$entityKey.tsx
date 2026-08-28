import { createFileRoute } from "@tanstack/react-router";
import { AdminSeoPageEditor } from "@/components/admin/seo/AdminSeoPageEditor";

export const Route = createFileRoute(
  "/agaate-admin/_authed/seo/pages/$entityType/$entityKey",
)({
  validateSearch: (search: Record<string, unknown>) => ({
    locale: typeof search.locale === "string" ? search.locale : "en",
  }),
  component: SeoPageEditorPage,
});

function SeoPageEditorPage() {
  const { adminUser } = Route.useRouteContext();
  const { entityType, entityKey } = Route.useParams();
  return (
    <AdminSeoPageEditor role={adminUser.role} entityType={entityType} entityKey={entityKey} />
  );
}
