import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { useScrollTriggerRefresh } from "@/hooks";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import SectionHero from "@/components/sections/SectionHero";
import {
  SectionStatsMarquee,
  PillarsHorizontalParallax,
  AppChapter,
  MallChapter,
  AgriParkChapter,
  BrandsAssociationsChapter,
  PeopleChapter,
  ProofChapter,
  ClosingChapter,
} from "@/components/home";
import { getHomeCms, getTeamCms } from "@/functions/public-cms";
import { isAdminOk } from "@/lib/admin-api";
import { HOMEPAGE_CMS_FALLBACK } from "@/data/homepage-fallback";
import { TEAM_CMS_FALLBACK } from "@/data/team-fallback";

export const Route = createFileRoute("/{-$locale}/")({
  staleTime: 0,
  loader: async () => {
    try {
      const [homeRes, teamRes] = await Promise.all([
        getHomeCms({ data: { preview: false } }),
        getTeamCms({ data: { preview: false } }),
      ]);
      const cms = isAdminOk<{ data: typeof HOMEPAGE_CMS_FALLBACK }>(homeRes)
        ? homeRes.data
        : HOMEPAGE_CMS_FALLBACK;
      const teamCms = isAdminOk<{ data: typeof TEAM_CMS_FALLBACK }>(teamRes)
        ? teamRes.data
        : TEAM_CMS_FALLBACK;
      return { cms, teamCms };
    } catch (err) {
      console.warn("Homepage CMS loader fallback:", err);
    }
    return { cms: HOMEPAGE_CMS_FALLBACK, teamCms: TEAM_CMS_FALLBACK };
  },
  head: () => ({
    meta: [
      { title: "Agaate — Integrated Seed-to-Market Agri Business" },
      {
        name: "description",
        content:
          "Agaate is an integrated agricultural enterprise combining Bio-Boosted seedling infrastructure, input commerce, on-ground field advisory, market linkage, and carbon monetization.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { cms, teamCms } = Route.useLoaderData();
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  const handleComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const handleWipeStart = useCallback(() => {
    setStartHeroAnimation(true);
  }, []);

  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  const handleHeroAnimationComplete = useCallback(() => {
    setContentReady(true);
  }, []);

  useScrollTriggerRefresh(contentReady);

  return (
    <>
      {loading && (
        <LoadingScreen
          onComplete={handleComplete}
          videoLoaded={videoLoaded}
          onWipeStart={handleWipeStart}
        />
      )}
      <main className="overflow-x-clip bg-[#f4f8f5] text-ink antialiased">
        <Header />
        <SectionHero
          onVideoLoaded={handleVideoLoaded}
          startAnimation={startHeroAnimation}
          onAnimationComplete={handleHeroAnimationComplete}
        />

        {contentReady && (
          <>
            <SectionStatsMarquee stats={cms.stats} />
            <PillarsHorizontalParallax />
            <AppChapter />
            <MallChapter />
            <AgriParkChapter />
            <BrandsAssociationsChapter brands={cms.logos} />
            <PeopleChapter teamCms={teamCms} />
            <ProofChapter storiesEn={cms.storiesEn} storiesHi={cms.storiesHi} />
            <ClosingChapter />
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
