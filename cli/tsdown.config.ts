import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "tsdown";
import pkg from "./package.json";

const license = readFileSync(
  resolve(import.meta.dirname, "../LICENSE"),
  "utf-8",
);

const banner = `/**
 * ${pkg.name} v${pkg.version} ${license
   .split("\n")
   .map((line) => ` * ${line}`.trimEnd())
   .join("\n")}
 */`;

export default defineConfig({
  entry: ["./src/index.ts"],
  format: ["esm", "cjs"],
  platform: "node",
  dts: true,
  sourcemap: true,
  minify: true,
  external: ["node:fs", "commander"],
  banner: {
    js: banner,
  },
  clean: true,
  nodeProtocol: true,
  treeshake: true,
  target: "esnext",
});
