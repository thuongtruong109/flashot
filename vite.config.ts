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
      external: [
        ...config.external,
        "@takumi-rs/helpers",
        "@takumi-rs/core",
        "shiki",
      ],
      output: {
        banner: config.banner,
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
      rollupTypes: false, // Don't bundle types, keep separate files
      copyDtsFiles: true,
    }),
  ],
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
});
