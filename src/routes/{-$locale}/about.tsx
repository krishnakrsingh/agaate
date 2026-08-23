import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  AboutHero,
  WhoWeAre,
  ValuesTriptych,
  ImpactScaleReach,
  MilestonesSection,
  LeadershipRoster,
  LifeAtAgaate,
  FootprintSection,
  AboutCta,
} from "@/components/about";
import { getTeamCms, getAboutPage } from "@/functions/public-cms";
import { isAdminOk } from "@/lib/admin-api";
import { TEAM_CMS_FALLBACK } from "@/data/team-fallback";
import { ABOUT_PAGE_FALLBACK } from "@/data/about-page-fallback";
import { AboutPageProvider } from "@/contexts/AboutPageContext";

export const Route = createFileRoute("/{-$locale}/about")({
  staleTime: 0,
  loader: async ({ params }) => {
    let teamCms = TEAM_CMS_FALLBACK;
    let aboutPage = ABOUT_PAGE_FALLBACK;
    try {
      const teamRes = await getTeamCms({ data: { preview: false } });
      if (isAdminOk<{ data: typeof TEAM_CMS_FALLBACK }>(teamRes)) {
        teamCms = teamRes.data;
      }
      const aboutRes = await getAboutPage();
      if (isAdminOk<{ content: typeof ABOUT_PAGE_FALLBACK }>(aboutRes)) {
        aboutPage = aboutRes.content;
      }
    } catch (err) {
      console.warn("About page loader fallback:", err);
    }
    return { teamCms, aboutPage, locale: params.locale ?? "en" };
  },
  head: () => ({
    meta: [
      { title: "About Us — Agaate | Rooted in Science, Built for Farmers" },
      {
        name: "description",
        content:
          "Agaate is an integrated agricultural enterprise combining Bio-Boosted seedling infrastructure, input commerce, on-ground field advisory, and sustainable market linkage.",
      },
    ],
  }),
  component: About,
});

function About() {
  const { teamCms, aboutPage, locale } = Route.useLoaderData();
  const isHi = locale === "hi";
  const members = isHi ? teamCms.membersHi : teamCms.membersEn;

  return (
    <AboutPageProvider content={aboutPage}>
      <main className="min-h-screen bg-[#f4f8f5] font-sans text-[#143d31] antialiased overflow-x-clip">
        <Header />
        <AboutHero isHi={isHi} />
        <WhoWeAre isHi={isHi} />
        <ValuesTriptych isHi={isHi} />
        <ImpactScaleReach isHi={isHi} />
        <MilestonesSection isHi={isHi} />
        <LeadershipRoster members={members} />
        <LifeAtAgaate />
        <FootprintSection isHi={isHi} />
        <AboutCta isHi={isHi} />
        <Footer />
      </main>
    </AboutPageProvider>
  );
}
