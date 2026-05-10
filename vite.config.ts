import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const repoRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ command }) => ({
  root: "app",
  base: command === "serve" ? "/" : "/ambiance-index/",
  publicDir: false,
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
