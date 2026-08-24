import { createFileRoute } from "@tanstack/react-router";
import { AdminCmsOverview } from "@/components/admin/cms/AdminCmsOverview";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import { getCmsOverview } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import type { CmsOverview } from "@/lib/cms-types";

export const Route = createFileRoute("/agaate-admin/_authed/content/")({
  loader: async () => getCmsOverview(),
  component: ContentOverviewPage,
});

function ContentOverviewPage() {
  const data = Route.useLoaderData();

  if (!isAdminOk<{ overview: CmsOverview; dbConfigured: boolean; newsletterWaitlist: number; careersJobs: number; careerApplications: number }>(data)) {
    return <p className="text-sm text-rose-600">{adminError(data, "Unable to load CMS overview.")}</p>;
  }

  return (
    <div className="space-y-6">
      <CmsPageHeader
        title="Content library"
        description="Browse and manage every editable area of the public website from one place."
        workflow="live"
      />
      <AdminCmsOverview
        overview={data.overview}
        dbConfigured={data.dbConfigured}
        newsletterWaitlist={data.newsletterWaitlist}
        careersJobs={data.careersJobs}
        careerApplications={data.careerApplications}
        showHeading={false}
      />
    </div>
  );
}
