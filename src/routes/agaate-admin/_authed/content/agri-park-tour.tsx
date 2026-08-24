import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/agaate-admin/_authed/content/agri-park-tour")({
  beforeLoad: () => {
    throw redirect({ to: "/agaate-admin/content/homepage-chapters", search: { tab: "agri-park" } });
  },
});
