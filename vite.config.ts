import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [
    vinext(),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
  resolve: {
    alias: {
      // Velite output is imported as a bare ".velite" specifier (tsconfig baseUrl)
      ".velite": fileURLToPath(new URL("./.velite/index.js", import.meta.url)),
    },
  },
});
