import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    // Legacy code predates lint setup (2026-10-01). Kept visible as warnings;
    // tighten back to "error" once cleaned up.
    // Same files as eslint-config-next registers its plugins for (no .cjs).
    files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    // CommonJS config files (tailwind/postcss) must use require().
    files: ["**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    ignores: [
      ".next/**",
      ".cloudflare/**",
      "dist/**",
      ".velite/**",
      "node_modules/**",
      "public/**",
      "_bmad/**",
      ".claude/**",
      ".planning/**",
      "docs/**",
      "8plus Design System/**",
      "packages/*/dist/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
