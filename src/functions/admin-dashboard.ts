import { createServerFn } from "@tanstack/react-start";

export const getAdminDashboard = createServerFn({ method: "GET" }).handler(async () => {
  const mod = await import("./admin-dashboard.server");
  return mod.handleGetAdminDashboard();
});
