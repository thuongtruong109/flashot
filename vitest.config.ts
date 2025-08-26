import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      include: ["src"],
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
