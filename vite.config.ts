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
 * `[[...]]` in /content marks a fact the owner has not confirmed yet. Production builds fail
 * while any remain, so unconfirmed claims (the Security page especially) can never go live.
 * Vercel preview deployments are exempt so the pages can still be reviewed before sign-off.
 */
function contentPlaceholderGuard(): Plugin {
  let enforce = false;
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
      if (hits.length)
        this.error(
          `${hits.length} line(s) in /content still have unconfirmed [[...]] placeholders. Replace or delete each one before a production build:\n${hits.join("\n")}`,
        );
    },
  };
}

export default defineConfig({
  plugins: [contentPlaceholderGuard()],
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
