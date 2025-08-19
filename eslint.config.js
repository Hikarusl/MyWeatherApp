import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import css from "@eslint/css";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      js,
      prettier: pluginPrettier,
    },
    extends: [
      "js/recommended",
      configPrettier
    ],
    languageOptions: { globals: globals.browser }
  },
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"]
  },
]);
