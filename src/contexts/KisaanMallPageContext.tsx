import { createContext, useContext, type ReactNode } from "react";
import type { KisaanMallPageContent } from "@/lib/cms-types";
import { KISAAN_MALL_PAGE_FALLBACK } from "@/data/kisaan-mall-page-fallback";

const KisaanMallPageContext = createContext<KisaanMallPageContent | null>(null);

export function KisaanMallPageProvider({
  content,
  children,
}: {
  content: KisaanMallPageContent;
  children: ReactNode;
}) {
  return (
    <KisaanMallPageContext.Provider value={content}>{children}</KisaanMallPageContext.Provider>
  );
}

export function useKisaanMallPage(): KisaanMallPageContent {
  const ctx = useContext(KisaanMallPageContext);
  return ctx ?? KISAAN_MALL_PAGE_FALLBACK;
}
