import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "i18next";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to={"/" as any}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-lg text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        {import.meta.env.DEV && error?.message && (
          <pre className="mt-4 p-3 bg-red-50 text-red-700 text-xs rounded text-left overflow-auto max-h-48 border border-red-200">
            {error.message}
            {error.stack ? `\n\n${error.stack}` : ""}
          </pre>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Agaate — Integrated Seed-to-Market Agri Business" },
      {
        name: "description",
        content:
          "Agaate is an integrated agricultural enterprise combining Bio-Boosted seedling infrastructure, input commerce, on-ground field advisory, market linkage, and carbon monetization.",
      },
      { name: "author", content: "Agaate (Anzix Farm Technologies Pvt Ltd)" },
      { property: "og:title", content: "Agaate — Integrated Seed-to-Market Agri Business" },
      {
        property: "og:description",
        content:
          "High-yield bio-boosted nursery saplings, verified agri inputs, AI precision crop advisory, and guaranteed buyback market linkage.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Agaate" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@AgaateAgri" },
      { name: "twitter:title", content: "Agaate — Integrated Seed-to-Market Agri Business" },
      {
        name: "twitter:description",
        content:
          "High-yield bio-boosted nursery saplings, verified agri inputs, AI precision crop advisory, and guaranteed buyback market linkage.",
      },
      {
        property: "og:image",
        content: "/logo.png",
      },
      {
        name: "twitter:image",
        content: "/logo.png",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/logo11.png",
      },
      {
        rel: "apple-touch-icon",
        href: "/logo11.png",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const localeMatch = router.state?.matches?.find((m) => m.routeId === "/{-$locale}");
  const lang = (localeMatch?.params as any)?.locale ?? "en";
  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400..800;1,400..800&family=Outfit:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap"
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { i18n } = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </I18nextProvider>
    </QueryClientProvider>
  );
}
