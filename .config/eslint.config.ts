import js from "@eslint/js";
import sonarjs from "eslint-plugin-sonarjs";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    ignores: ["coverage/**", "dist/**"],
    plugins: { js },
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "sonarjs/assertions-in-tests": "off",
      "sonarjs/no-commented-code": "off",
    },
  },
  tseslint.configs.recommended,
  sonarjs.configs.recommended,
]);
