// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

/**
 * `[[...]]` in /content marks a fact the owner has not confirmed yet. Production builds list
 * every one that remains. The owner chose to publish with placeholders highlighted for now, so
 * this warns; set STRICT_CONTENT=1 in the Vercel project to make production builds fail again
 * until every placeholder is resolved. Vercel preview deployments are never checked.
 */
function contentPlaceholderGuard(): Plugin {
  let enforce = false;
  const strict = process.env["STRICT_CONTENT"] === "1";
  return {
    name: "content-placeholder-guard",
    apply: "build",
    configResolved(config) {
      enforce = config.mode === "production" && process.env["VERCEL_ENV"] !== "preview";
    },
    buildStart() {
      if (!enforce) return;
      const root = join(process.cwd(), "content");
      const files: string[] = [];
      const walk = (dir: string) => {
        for (const name of readdirSync(dir)) {
          const path = join(dir, name);
          if (statSync(path).isDirectory()) walk(path);
          else files.push(path);
        }
      };
      walk(root);
      const hits = files.flatMap((file) =>
        readFileSync(file, "utf8")
          .split("\n")
          .flatMap((line, i) =>
            line.includes("[[")
              ? [`  ${relative(process.cwd(), file)}:${i + 1}  ${line.trim().slice(0, 100)}`]
              : [],
          ),
      );
      if (!hits.length) return;
      const message = `${hits.length} line(s) in /content still have unconfirmed [[...]] placeholders:\n${hits.join("\n")}`;
      if (strict) this.error(`${message}\nReplace or delete each one before a production build.`);
      else this.warn(message);
    },
  };
}

export default defineConfig({
  plugins: [contentPlaceholderGuard()],
  vite: { define: { __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()) } },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
