import { createContext, useContext, type ReactNode } from "react";
import type { KisaanMallHomeContent } from "@/lib/cms-types";
import { KISAAN_MALL_HOME_DEFAULTS } from "@/data/kisaan-mall-home-fallback";

const KisaanMallPageContext = createContext<KisaanMallHomeContent | null>(null);

export function KisaanMallPageProvider({
  content,
  children,
}: {
  content: KisaanMallHomeContent;
  children: ReactNode;
}) {
  return (
    <KisaanMallPageContext.Provider value={content}>{children}</KisaanMallPageContext.Provider>
  );
}

export function useKisaanMallPage(): KisaanMallHomeContent {
  const ctx = useContext(KisaanMallPageContext);
  return ctx ?? KISAAN_MALL_HOME_DEFAULTS;
}
