import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../ds_server/static", // Correct output directory
    emptyOutDir: true, // Clear output directory before building
  },
});
