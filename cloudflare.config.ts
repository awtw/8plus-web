import { bindings, defineConfig, defineWorker, triggers } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "8plus-web",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-20",
    compatibilityFlags: ["nodejs_compat"],
    // Keep the workers.dev preview URL alongside the production route
    workersDev: true,
    // Phase 3a: serve www via Worker Route; DNS (CNAME → Vercel) left untouched for rollback
    triggers: [triggers.fetch({ pattern: "www.8plus.app/*", zone: "8plus.app" })],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
    },
  }),
});
