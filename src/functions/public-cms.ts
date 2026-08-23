import { createServerFn } from "@tanstack/react-start";

export const getHomeCms = createServerFn({ method: "GET" })
  .validator((data: { preview?: boolean } | undefined) => data ?? {})
  .handler(async ({ data }) => {
    const mod = await import("./public-cms.server");
    return mod.handleGetHomeCms(Boolean(data?.preview));
  });

export const getTeamCms = createServerFn({ method: "GET" })
  .validator((data: { preview?: boolean } | undefined) => data ?? {})
  .handler(async ({ data }) => {
    const mod = await import("./public-cms.server");
    return mod.handleGetTeamCms(Boolean(data?.preview));
  });

export const getKisaanMallPage = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./public-cms.server");
  return mod.handleGetKisaanMallPage();
});

export const getCareersPage = createServerFn({ method: "GET" })
  .validator((data: { lang?: "en" | "hi" } | undefined) => data ?? {})
  .handler(async ({ data }) => {
    const mod = await import("./public-cms.server");
    return mod.handleGetCareersPage(data?.lang ?? "en");
  });
