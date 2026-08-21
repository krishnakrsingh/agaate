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
  FootprintSection,
  AboutCta,
} from "@/components/about";
import { getTeamCms } from "@/functions/public-cms";
import { isAdminOk } from "@/lib/admin-api";
import { TEAM_CMS_FALLBACK } from "@/data/team-fallback";

export const Route = createFileRoute("/{-$locale}/about")({
  staleTime: 0,
  loader: async ({ params }) => {
    try {
      const res = await getTeamCms({ data: { preview: false } });
      if (isAdminOk<{ data: typeof TEAM_CMS_FALLBACK }>(res)) {
        return { teamCms: res.data, locale: params.locale ?? "en" };
      }
    } catch (err) {
      console.warn("About team CMS loader fallback:", err);
    }
    return { teamCms: TEAM_CMS_FALLBACK, locale: params.locale ?? "en" };
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
  const { teamCms, locale } = Route.useLoaderData();
  const isHi = locale === "hi";
  const members = isHi ? teamCms.membersHi : teamCms.membersEn;

  return (
    <main className="min-h-screen bg-[#f4f8f5] font-sans text-[#143d31] antialiased overflow-x-clip">
      <Header />
      <AboutHero />
      <WhoWeAre />
      <ValuesTriptych />
      <ImpactScaleReach />
      <MilestonesSection />
      <LeadershipRoster members={members} />
      <FootprintSection />
      <AboutCta />
      <Footer />
    </main>
  );
}
