import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import pkg from "./package.json";
import { config } from "./tsdown.config";

export default defineConfig({
  esbuild: {
    banner: config.banner,
  },
  build: {
    lib: {
      entry: resolve(__dirname, config.entry),
      name: pkg.name,
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: config.external,
      output: {
        banner: config.banner,
        globals: {},
      },
    },
    minify: true,
    sourcemap: true,
    reportCompressedSize: false,
    cssCodeSplit: false,
    copyPublicDir: false,
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
});
