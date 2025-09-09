// eslint.config.js (flat config, ESLint v9+)
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended, // base rules
  {
    files: ["**/*.{js,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        ...globals.node, // <-- gives you process, module, require, etc.
        // ...globals.browser, // add this too if some files run in the browser
      },
    },
    rules: {
      // your overrides here
      // "no-underscore-dangle": ["error", { allow: ["_id"] }],
    },
  },
]);
