import { createFileRoute } from "@tanstack/react-router";
import { AdminCmsOverview } from "@/components/admin/cms/AdminCmsOverview";
import { getCmsOverview } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import type { CmsOverview } from "@/lib/cms-types";

export const Route = createFileRoute("/agaate-admin/_authed/content/")({
  loader: async () => getCmsOverview(),
  component: ContentOverviewPage,
});

function ContentOverviewPage() {
  const data = Route.useLoaderData();

  if (!isAdminOk<{ overview: CmsOverview; dbConfigured: boolean; newsletterWaitlist: number }>(data)) {
    return <p className="text-sm text-rose-600">{adminError(data, "Unable to load CMS overview.")}</p>;
  }

  return (
    <AdminCmsOverview
      overview={data.overview}
      dbConfigured={data.dbConfigured}
      newsletterWaitlist={data.newsletterWaitlist}
    />
  );
}
