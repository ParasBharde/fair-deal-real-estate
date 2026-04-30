import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
    server: {
    host: true,                 // allow external access
    allowedHosts: [
      "commuting-livable-sedate.ngrok-free.dev"
    ]
  },
    plugins: [react()]
});
