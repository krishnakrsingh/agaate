import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/agaate-admin/_authed/content/app-links")({
  beforeLoad: () => {
    throw redirect({ to: "/agaate-admin/settings", search: { tab: "app-links" } });
  },
});
