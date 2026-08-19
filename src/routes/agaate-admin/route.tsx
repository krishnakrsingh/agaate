import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/agaate-admin")({
  head: () => ({
    meta: [
      { title: "Agaate Admin" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "googlebot", content: "noindex, nofollow" },
    ],
    links: [{ rel: "icon", type: "image/png", href: "/logo.png" }],
  }),
  component: AdminLayoutRoot,
});

function AdminLayoutRoot() {
  return (
    <div className="agaate-admin-root min-h-screen bg-background text-foreground font-sans antialiased">
      <Outlet />
    </div>
  );
}
