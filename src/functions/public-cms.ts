import { createServerFn } from "@tanstack/react-start";

export const getHomeCms = createServerFn({ method: "GET" })
  .validator((data: { preview?: boolean } | undefined) => data ?? {})
  .handler(async ({ data }) => {
    const mod = await import("./public-cms.server");
    return mod.handleGetHomeCms(Boolean(data?.preview));
  });
