import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const repoRoot = fileURLToPath(new URL(".", import.meta.url));
const rootSitemap = resolve(repoRoot, "sitemap.xml");
const distSitemap = resolve(repoRoot, "dist", "sitemap.xml");

export default defineConfig(({ command }) => ({
  root: "app",
  base: command === "serve" ? "/" : "/ambiance-index/",
  publicDir: false,
  plugins: [
    {
      name: "copy-root-sitemap",
      apply: "build",
      closeBundle() {
        copyFileSync(rootSitemap, distSitemap);
      }
    }
  ],
  build: {
    outDir: "../dist",
    emptyOutDir: true
  },
  server: {
    fs: {
      allow: [repoRoot]
    }
  }
}));
