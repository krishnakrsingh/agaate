import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsLetter from "@/components/ui/pinky-news-letter";
import {
  KisaanMallHero,
  MallAisles,
  MallSupplyChain,
  MallTrustBand,
  MallFaq,
  MallCta,
} from "@/components/kisaan-mall";
import { getKisaanMallPage } from "@/functions/public-cms";
import { isAdminOk } from "@/lib/admin-api";
import { DEFAULT_KISAAN_MALL_LANDING } from "@/lib/cms-types";
import { KISAAN_MALL_PAGE_FALLBACK } from "@/data/kisaan-mall-page-fallback";
import { KisaanMallPageProvider } from "@/contexts/KisaanMallPageContext";

export const Route = createFileRoute("/{-$locale}/kisaan-mall")({
  loader: async () => {
    try {
      const res = await getKisaanMallPage();
      if (isAdminOk<{ landing: typeof DEFAULT_KISAAN_MALL_LANDING; page: typeof KISAAN_MALL_PAGE_FALLBACK }>(res)) {
        return { landing: res.landing, page: res.page };
      }
    } catch (err) {
      console.warn("Kisaan Mall page loader fallback:", err);
    }
    return { landing: DEFAULT_KISAAN_MALL_LANDING, page: KISAAN_MALL_PAGE_FALLBACK };
  },
  head: () => ({
    meta: [
      { title: "Kisaan Mall — Agaate | Direct Agri Inputs for Farmers" },
      {
        name: "description",
        content:
          "Agaate Kisaan Mall — 100% genuine seeds, biologicals, drip kits, and nursery saplings sourced directly from certified manufacturers.",
      },
    ],
  }),
  component: KisaanMallPage,
});

function KisaanMallPage() {
  const { i18n } = useTranslation();
  const { landing, page } = Route.useLoaderData();
  const isHindi = i18n.language?.startsWith("hi");

  if (page.displayMode === "coming_soon") {
    return (
      <div className="relative flex min-h-screen w-full flex-col justify-between bg-[#f4f8f5]">
        <Header />
        <div className="flex-1 pt-16">
          <NewsLetter
            badge={isHindi ? landing.badgeHi : landing.badgeEn}
            title={isHindi ? landing.titleHi : landing.titleEn}
            description={isHindi ? landing.descriptionHi : landing.descriptionEn}
            placeholder={isHindi ? landing.placeholderHi : landing.placeholderEn}
            successMessage={isHindi ? landing.successHi : landing.successEn}
            sourcePage="/kisaan-mall"
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <KisaanMallPageProvider content={page}>
      <main className="min-h-screen bg-[#f4f8f5] font-sans text-[#143d31] antialiased overflow-x-clip">
        <Header />
        <KisaanMallHero />
        <MallAisles />
        <MallSupplyChain />
        <MallTrustBand />
        <MallFaq />
        <MallCta />
        <Footer />
      </main>
    </KisaanMallPageProvider>
  );
}
