import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/agaate-admin")({
  head: () => ({
    meta: [
      { title: "Agaate Admin" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "googlebot", content: "noindex, nofollow" },
    ],
    links: [{ rel: "icon", type: "image/png", href: "/logo11.png" }],
  }),
  component: () => <Outlet />,
});
