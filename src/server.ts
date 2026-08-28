import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

function applySecurityHeaders(response: Response, requestUrl?: string): Response {
  // If response is immutable or already closed, clone headers
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    if (!headers.has(key)) {
      headers.set(key, value);
    }
  }
  try {
    const path = requestUrl ? new URL(requestUrl).pathname : "";
    if (path.startsWith("/agaate-admin")) {
      headers.set("X-Robots-Tag", "noindex, nofollow");
    }
  } catch {
    /* ignore */
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(
  response: Response,
  request: Request,
): Promise<Response> {
  if (response.status < 500) return applySecurityHeaders(response, request.url);
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return applySecurityHeaders(response, request.url);

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return applySecurityHeaders(response, request.url);
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  const errorHeaders = new Headers({
    "content-type": "text/html; charset=utf-8",
    ...SECURITY_HEADERS,
  });

  return new Response(renderErrorPage(), {
    status: 500,
    headers: errorHeaders,
  });
}

async function handleSeoRoutes(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/sitemap.xml") {
    const { handlePublicSitemap } = await import("./functions/seo.server");
    const xml = await handlePublicSitemap();
    return new Response(xml, {
      status: 200,
      headers: {
        "content-type": "application/xml; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    });
  }

  if (path === "/robots.txt") {
    const { handlePublicRobots } = await import("./functions/seo.server");
    const text = await handlePublicRobots();
    return new Response(text, {
      status: 200,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    });
  }

  const { findActiveRedirect } = await import("./server/seo-queries");
  const redirect = await findActiveRedirect(path);
  if (redirect) {
    const dest = redirect.destinationPath.startsWith("http")
      ? redirect.destinationPath
      : `${url.origin}${redirect.destinationPath.startsWith("/") ? "" : "/"}${redirect.destinationPath}`;
    return new Response(null, {
      status: redirect.redirectType,
      headers: {
        Location: dest,
        "cache-control": "public, max-age=86400",
      },
    });
  }

  return null;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const seoResponse = await handleSeoRoutes(request);
      if (seoResponse) return applySecurityHeaders(seoResponse, request.url);

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response, request);
    } catch (error) {
      console.error("[Agaate Server Exception]", error);
      const errorHeaders = new Headers({
        "content-type": "text/html; charset=utf-8",
        ...SECURITY_HEADERS,
      });
      return new Response(renderErrorPage(), {
        status: 500,
        headers: errorHeaders,
      });
    }
  },
};
