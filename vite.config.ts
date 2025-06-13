import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/omni-course-dash-main/", // Set the base path

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
 
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "this": path.resolve(__dirname, "./src"), 
    },
  },
}));
