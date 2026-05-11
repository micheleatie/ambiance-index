import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const repoRoot = fileURLToPath(new URL(".", import.meta.url));
const rootSeoFiles = ["sitemap.xml", "robots.txt"];

export default defineConfig(({ command }) => ({
  root: "app",
  base: command === "serve" ? "/" : "/ambiance-index/",
  publicDir: false,
  plugins: [
    {
      name: "copy-root-seo-files",
      apply: "build",
      closeBundle() {
        for (const fileName of rootSeoFiles) {
          copyFileSync(resolve(repoRoot, fileName), resolve(repoRoot, "dist", fileName));
        }
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
