import { describe, it } from "vitest";
import { codeToImage } from "../src";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const FONT_SOURCE = await fetch(
  "https://fonts.bunny.net/ubuntu-sans-mono/files/ubuntu-sans-mono-latin-400-normal.woff2"
).then((r) => r.arrayBuffer());

describe("shiki-image", () => {
  it("convert code to image", async () => {
    const start = Date.now();
    const code = await readFile(fileURLToPath(import.meta.url), "utf8");
    const img = await codeToImage(
      {
        lang: "js",
        theme: "ayu-dark",
        style: { borderRadius: 8 },
        font: FONT_SOURCE,
      },
      code
    );
    const outDir = join(process.cwd(), "test/.snapshot");
    await mkdir(outDir, { recursive: true });
    const outPath = join(outDir, "test.png");
    await writeFile(outPath, img);
    const end = Date.now();
    console.log(`Image generated in ${end - start}ms`);
  });
});
