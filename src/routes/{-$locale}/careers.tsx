import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CareersHero,
  CareersCultureSection,
  OpenRolesSection,
  CampusOutreachSection,
  RoleDetailDrawer,
  ApplicationModal,
} from "@/components/careers";
import type { Filter } from "@/components/careers/filters";
import { getCareersPage } from "@/functions/public-cms";
import { isAdminOk } from "@/lib/admin-api";
import { CAREERS_PAGE_FALLBACK } from "@/data/careers-fallback";
import type { CareerJob, CareersPageContent } from "@/lib/cms-types";
import { fetchPageSeo, headFromSeo } from "@/lib/route-seo";

export const Route = createFileRoute("/{-$locale}/careers")({
  loader: async ({ params }) => {
    const locale = params.locale ?? "en";
    try {
      const res = await getCareersPage({ data: { lang: "en" } });
      const seo = await fetchPageSeo("static_page", "careers", locale);
      if (
        isAdminOk<{
          content: CareersPageContent;
          jobs: CareerJob[];
          jobsEn: CareerJob[];
          jobsHi: CareerJob[];
        }>(res)
      ) {
        return {
          content: res.content,
          jobsEn: res.jobsEn ?? res.jobs,
          jobsHi: res.jobsHi ?? res.jobs,
          locale,
          seo,
        };
      }
    } catch (err) {
      console.warn("Careers page loader fallback:", err);
    }
    return {
      content: CAREERS_PAGE_FALLBACK,
      jobsEn: [] as CareerJob[],
      jobsHi: [] as CareerJob[],
      locale,
      seo: await fetchPageSeo("static_page", "careers", locale),
    };
  },
  head: ({ loaderData }) => headFromSeo(loaderData),
  component: Careers,
});

function Careers() {
  const { i18n } = useTranslation();
  const { content, jobsEn, jobsHi } = Route.useLoaderData();
  const isHindi = i18n.language?.startsWith("hi");
  const jobs = isHindi ? jobsHi : jobsEn;

  const [selectedJob, setSelectedJob] = useState<CareerJob | null>(null);
  const [drawerJob, setDrawerJob] = useState<CareerJob | null>(null);
  const [filter, setFilter] = useState<Filter>("All");

  const heroStats = content.heroStats.map((s) => ({
    value: s.value,
    suffix: s.suffix,
    label: isHindi ? s.labelHi : s.labelEn,
    sub: isHindi ? s.subHi : s.subEn,
  }));

  const cultureCards = content.cultureCards.map((c) => ({
    tag: isHindi ? c.tagHi : c.tagEn,
    title: isHindi ? c.titleHi : c.titleEn,
    desc: isHindi ? c.descHi : c.descEn,
    iconKey: c.iconKey,
  }));

  const campusSkills = content.campusSkills.map((s) => ({
    iconKey: s.iconKey,
    label: isHindi ? s.labelHi : s.labelEn,
  }));

  return (
    <main className="flex min-h-screen flex-col bg-[#f4f8f5] font-sans text-[#143d31] antialiased">
      <Header />
      <CareersHero
        badge={isHindi ? content.heroBadgeHi : content.heroBadgeEn}
        title={isHindi ? content.heroTitleHi : content.heroTitleEn}
        description={isHindi ? content.heroDescriptionHi : content.heroDescriptionEn}
        locationLine={isHindi ? content.heroLocationHi : content.heroLocationEn}
        stats={heroStats}
      />
      <div className="mx-auto w-full max-w-7xl flex-grow space-y-20 sm:space-y-28 lg:space-y-32 px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <CareersCultureSection cards={cultureCards} />
        <OpenRolesSection
          jobs={jobs}
          sectionTitle={isHindi ? content.openRolesTitleHi : content.openRolesTitleEn}
          sectionSubtitle={isHindi ? content.openRolesSubtitleHi : content.openRolesSubtitleEn}
          filter={filter}
          onFilterChange={setFilter}
          onSelectRole={(job) => setDrawerJob(job)}
          onApplyDirect={(job) => setSelectedJob(job)}
        />
        <CampusOutreachSection
          badge={isHindi ? content.campusBadgeHi : content.campusBadgeEn}
          title={isHindi ? content.campusTitleHi : content.campusTitleEn}
          description={isHindi ? content.campusDescriptionHi : content.campusDescriptionEn}
          skills={campusSkills}
          emailSubject={content.campusEmailSubject}
        />
      </div>
      <RoleDetailDrawer
        role={drawerJob}
        onClose={() => setDrawerJob(null)}
        onApply={(role) => setSelectedJob(role)}
      />
      <ApplicationModal
        job={selectedJob}
        jobs={jobs}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />
      <Footer />
    </main>
  );
}
