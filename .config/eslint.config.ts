import js from "@eslint/js";
import { globalIgnores } from "eslint/config";
import sonarjs from "eslint-plugin-sonarjs";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config([
  tseslint.configs.recommended,
  sonarjs.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "sonarjs/assertions-in-tests": "off",
      "sonarjs/no-commented-code": "off",
      "sonarjs/no-nested-conditional": "off",
    },
  },
  globalIgnores(["dist/**/*", "api/**/*"]),
]);
