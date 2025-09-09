import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "tsdown";
import pkg from "./package.json";

const license = readFileSync(
  resolve(import.meta.dirname, "../LICENSE"),
  "utf-8",
);

export const config = {
  entry: "./src/index.ts",
  external: [
    "node:fs",
    "node:path",
    "shiki",
    "@takumi-rs/core",
    "@takumi-rs/helpers",
  ],
  banner: `/**
 * ${pkg.name} v${pkg.version} ${license
   .split("\n")
   .map((line) => ` * ${line}`.trimEnd())
   .join("\n")}
 */`,
};

export default defineConfig({
  entry: [config.entry],
  format: ["es", "cjs"],
  platform: "node",
  dts: true,
  sourcemap: true,
  minify: true,
  external: config.external,
  banner: {
    js: config.banner,
  },
  clean: true,
  nodeProtocol: true,
  treeshake: true,
  target: "esnext",
});
