import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Durante `npm run dev`, use `wrangler pages dev` numa outra aba para
      // servir /api localmente, ou aponte este proxy para ele:
      "/api": "http://127.0.0.1:8788",
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
