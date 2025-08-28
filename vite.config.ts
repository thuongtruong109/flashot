import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

const license = readFileSync(resolve(__dirname, "LICENSE"), "utf-8");
const banner = `
  /**
  * ${pkg.name} v${pkg.version}
  * ${license
    .split("\n")
    .map((line) => ` * ${line}`.trimEnd())
    .join("\n")}
  */`;

export default defineConfig({
  esbuild: {
    banner,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: pkg.name,
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: ["@takumi-rs/core", "@takumi-rs/helpers", "shiki"],
      output: {
        banner,
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
