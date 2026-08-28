import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/agaate-admin/_authed/content/careers")({
  beforeLoad: () => {
    throw redirect({ to: "/agaate-admin/careers" });
  },
});
