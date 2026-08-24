import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    // Бекенд поднимается отдельно (`make start-backend`) и отдаёт /api.
    proxy: {
      "/api": {
        target: "http://localhost:5001",
      },
    },
  },
});
