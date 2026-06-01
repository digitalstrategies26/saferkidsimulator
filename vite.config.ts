import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, "./client"), // Set Vite root to the client directory
  base: "./", // FORCE relative paths (e.g. assets/index.css) instead of absolute paths
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "./dist/public"),
    emptyOutDir: true,
    assetsDir: "assets",
  },
});
