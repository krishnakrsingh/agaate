import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import { useScrollTriggerRefresh } from "@/hooks";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import SectionHero from "@/components/sections/SectionHero";
import {
  SectionStatsMarquee,
  PillarsHorizontalParallax,
  MallChapter,
  PillarMarket,
  AppChapter,
  AgriParkChapter,
  BrandsAssociationsChapter,
  PeopleChapter,
  ProofChapter,
  ClosingChapter,
} from "@/components/home";
import { getHomeCms, getTeamCms, getKisaanMallPage, getAgriParkChapter } from "@/functions/public-cms";
import { isAdminOk } from "@/lib/admin-api";
import { HOMEPAGE_CMS_FALLBACK } from "@/data/homepage-fallback";
import { TEAM_CMS_FALLBACK } from "@/data/team-fallback";
import { KISAAN_MALL_PAGE_FALLBACK } from "@/data/kisaan-mall-page-fallback";
import { AGRI_PARK_CHAPTER_FALLBACK } from "@/data/agri-park-chapter-fallback";
import { KisaanMallPageProvider } from "@/contexts/KisaanMallPageContext";
import { AgriParkChapterProvider } from "@/contexts/AgriParkChapterContext";

export const Route = createFileRoute("/{-$locale}/")({
  staleTime: 0,
  loader: async () => {
    try {
      const [homeRes, teamRes, mallRes, agriRes] = await Promise.all([
        getHomeCms({ data: { preview: false } }),
        getTeamCms({ data: { preview: false } }),
        getKisaanMallPage(),
        getAgriParkChapter(),
      ]);
      const cms = isAdminOk<{ data: typeof HOMEPAGE_CMS_FALLBACK }>(homeRes)
        ? homeRes.data
        : HOMEPAGE_CMS_FALLBACK;
      const teamCms = isAdminOk<{ data: typeof TEAM_CMS_FALLBACK }>(teamRes)
        ? teamRes.data
        : TEAM_CMS_FALLBACK;
      const kisaanMallPage = isAdminOk<{ page: typeof KISAAN_MALL_PAGE_FALLBACK }>(mallRes)
        ? mallRes.page
        : KISAAN_MALL_PAGE_FALLBACK;
      const agriParkChapter = isAdminOk<{ chapter: typeof AGRI_PARK_CHAPTER_FALLBACK }>(agriRes)
        ? agriRes.chapter
        : AGRI_PARK_CHAPTER_FALLBACK;
      return { cms, teamCms, kisaanMallPage, agriParkChapter };
    } catch (err) {
      console.warn("Homepage CMS loader fallback:", err);
    }
    return {
      cms: HOMEPAGE_CMS_FALLBACK,
      teamCms: TEAM_CMS_FALLBACK,
      kisaanMallPage: KISAAN_MALL_PAGE_FALLBACK,
      agriParkChapter: AGRI_PARK_CHAPTER_FALLBACK,
    };
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
  const { cms, teamCms, kisaanMallPage, agriParkChapter } = Route.useLoaderData();
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

  const location = useLocation();

  const handleHeroAnimationComplete = useCallback(() => {
    setContentReady(true);
  }, []);

  useEffect(() => {
    if (contentReady) {
      const rawHash = location.hash || (typeof window !== "undefined" ? window.location.hash : "");
      const hash = rawHash.replace(/^#/, "");
      if (hash) {
        const timer = setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [contentReady, location.hash]);

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
          <KisaanMallPageProvider content={kisaanMallPage}>
            <AgriParkChapterProvider content={agriParkChapter}>
              <SectionStatsMarquee stats={cms.stats} />
              <PillarsHorizontalParallax />
              <MallChapter />
              <AppChapter appLinks={cms.appLinks} />
              <PillarMarket buyers={cms.logos?.buyers} />
              <AgriParkChapter agriParkTour={cms.agriParkTour} />
              <BrandsAssociationsChapter brands={cms.logos} />
              <PeopleChapter teamCms={teamCms} />
              <ProofChapter storiesEn={cms.storiesEn} storiesHi={cms.storiesHi} />
              <ClosingChapter />
              <Footer />
            </AgriParkChapterProvider>
          </KisaanMallPageProvider>
        )}
      </main>
    </>
  );
}
