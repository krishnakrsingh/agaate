import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsLetter from "@/components/ui/pinky-news-letter";
import { getKisaanMallPage } from "@/functions/public-cms";
import { isAdminOk } from "@/lib/admin-api";
import { DEFAULT_KISAAN_MALL_LANDING } from "@/lib/cms-types";

export const Route = createFileRoute("/{-$locale}/kisaan-mall")({
  loader: async () => {
    try {
      const res = await getKisaanMallPage();
      if (isAdminOk<{ landing: typeof DEFAULT_KISAAN_MALL_LANDING }>(res)) {
        return { landing: res.landing };
      }
    } catch (err) {
      console.warn("Kisaan Mall page loader fallback:", err);
    }
    return { landing: DEFAULT_KISAAN_MALL_LANDING };
  },
  head: () => ({
    meta: [
      { title: "Kisaan Mall — Coming Soon | Agaate" },
      {
        name: "description",
        content:
          "Agaate Kisaan Mall is coming soon. Stay updated on our official opening and exclusive launch offers.",
      },
    ],
  }),
  component: KisaanMallPage,
});

function KisaanMallPage() {
  const { i18n } = useTranslation();
  const { landing } = Route.useLoaderData();
  const isHindi = i18n.language?.startsWith("hi");

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
