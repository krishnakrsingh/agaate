// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

/**
 * Optimizes @phosphor-icons/react imports by rewriting root barrel imports
 * to direct subpath imports (e.g. @phosphor-icons/react/dist/csr/Plant.es.js).
 * Prevents Vite from traversing 7,200+ icon modules on every build.
 */
function phosphorIconsOptimizePlugin(): Plugin {
  return {
    name: "vite-plugin-phosphor-optimize",
    enforce: "pre",
    transform(code, id) {
      if (!id.match(/\.[jt]sx?$/) || !code.includes("@phosphor-icons/react")) {
        return null;
      }

      const importRegex =
        /import\s+(type\s+)?\{([^}]+)\}\s+from\s+["']@phosphor-icons\/react["'];?/g;
      if (!importRegex.test(code)) {
        return null;
      }

      const transformed = code.replace(importRegex, (_fullMatch, isTypeKeyword, specifiersStr) => {
        const isWholeImportType = Boolean(isTypeKeyword);
        const specifiers = specifiersStr
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean);
        const statements: string[] = [];

        for (const spec of specifiers) {
          const isInlineType = spec.startsWith("type ");
          const cleanSpec = isInlineType ? spec.slice(5).trim() : spec;
          const [origName] = cleanSpec.split(/\s+as\s+/).map((s: string) => s.trim());

          if (
            isWholeImportType ||
            isInlineType ||
            origName === "Icon" ||
            origName === "IconProps" ||
            origName === "IconWeight"
          ) {
            statements.push(
              `import type { ${cleanSpec} } from "@phosphor-icons/react/dist/lib/types";`,
            );
          } else if (origName === "IconContext") {
            statements.push(
              `import { ${cleanSpec} } from "@phosphor-icons/react/dist/lib/context";`,
            );
          } else if (origName === "IconBase") {
            statements.push(
              `import { ${cleanSpec} } from "@phosphor-icons/react/dist/lib/IconBase";`,
            );
          } else {
            statements.push(`import { ${cleanSpec} } from "@phosphor-icons/react/${origName}";`);
          }
        }

        return statements.join("\n");
      });

      return {
        code: transformed,
        map: null,
      };
    },
  };
}

export default defineConfig({
  vite: {
    plugins: [phosphorIconsOptimizePlugin()],
    server: {
      watch: {
        ignored: [
          "**/.git/**",
          "**/node_modules/**",
          "**/.output/**",
          "**/.tanstack/**",
          "**/.wrangler/**",
          "**/sql/**",
          "**/infodoc/**",
          "**/dist/**",
          "**/*.log",
        ],
      },
    },
    resolve: {
      dedupe: ["react", "react-dom", "@react-three/fiber", "three"],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-router",
        "@tanstack/router-core",
        "@tanstack/router-core/isServer",
        "@tanstack/router-core/ssr/client",
        "@tanstack/react-query",
        "@tanstack/react-store",
        "seroval",
        "seroval-plugins/web",
        "framer-motion",
        "gsap",
        "gsap/ScrollTrigger",
        "@gsap/react",
        "three",
        "@react-three/fiber",
        "recharts",
        "i18next",
        "react-i18next",
        "clsx",
        "tailwind-merge",
        "class-variance-authority",
        "zod",
        "lucide-react",
        "@radix-ui/react-slot",
        "@radix-ui/react-avatar",
        "@radix-ui/react-alert-dialog",
        "@radix-ui/react-checkbox",
        "@radix-ui/react-collapsible",
        "@radix-ui/react-dialog",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-label",
        "@radix-ui/react-popover",
        "@radix-ui/react-scroll-area",
        "@radix-ui/react-select",
        "@radix-ui/react-separator",
        "@radix-ui/react-switch",
        "@radix-ui/react-tabs",
        "@radix-ui/react-tooltip",
        "@dnd-kit/core",
        "@dnd-kit/sortable",
        "@dnd-kit/utilities",
        "@paper-design/shaders-react",
        "cmdk",
        "leaflet",
        "sonner",
        "react-wrap-balancer",
      ],
      exclude: [
        "@phosphor-icons/react",
        "mysql2",
        "mysql2/promise",
        "nodemailer",
        "bcryptjs",
      ],
    },
  },
  nitro: {
    preset: "node-server",
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    serverFns: {
      disableCsrfMiddlewareWarning: true,
    },
  },
});
