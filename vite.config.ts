import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },

  build: {
    // Target modern browsers — allows smaller output (no legacy polyfills)
    target: "es2020",

    rollupOptions: {
      output: {
        /**
         * manualChunks splits vendor libraries into separate, independently-cached chunks.
         *
         * Why this matters for a landing page:
         * - On repeat visits, if only section code changed, GSAP / Lenis / React
         *   chunks are already in the browser cache → near-instant load.
         * - Browsers can download multiple chunks in parallel.
         * - React.lazy() section splits combine with these vendor splits for
         *   maximum granularity.
         */
        manualChunks: {
          "vendor-gsap":  ["gsap", "@gsap/react"],
          "vendor-lenis": ["lenis"],
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-icons": ["lucide-react"],
          "vendor-utils": ["clsx", "tailwind-merge", "class-variance-authority"],
        },
      },
    },

    // Warn when any individual chunk exceeds 400 KB uncompressed
    chunkSizeWarningLimit: 400,
  },
}));
