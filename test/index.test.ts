import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "vitest";
import { c2i } from "../src";

describe("flashot-test", () => {
  it("convert code to image", async () => {
    const start = Date.now();
    const code = await readFile(fileURLToPath(import.meta.url), "utf8");
    const img = await c2i(code);
    const outDir = join(process.cwd(), "test/.snapshot");
    await mkdir(outDir, { recursive: true });
    const outPath = join(outDir, "test.png");
    await writeFile(outPath, img);
    const end = Date.now();
    console.log(`Image generated in ${end - start}ms`);
  });
});

describe("flashot-test-custom", () => {
  it("convert code to image", async () => {
    const sampleCode = `package main
      func main() {
          fmt.Println("Hello, world!")
      }`;
    const img = await c2i(sampleCode, {
      lang: "go",
      bg: "transparent",
      gap: 2,
      style: {
        borderRadius: 16,
        padding: 40,
      },
    });
    const outDir = join(process.cwd(), "test/.snapshot");
    await mkdir(outDir, { recursive: true });
    const outPath = join(outDir, "custom.png");
    await writeFile(outPath, img);
  });
});

describe("flashot-demo", () => {
  it("convert code to image", async () => {
    const sampleCode = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <title>Flashot</title>
      </head>
      <body>
        <h1>Hello, world!</h1>
        <p>
          Welcome to Flashot, the tool for converting code snippets into images!
        </p>
      </body>
    </html>`;
    const img = await c2i(sampleCode, {
      lang: "html",
    });
    const outDir = join(process.cwd(), "test/.snapshot");
    await mkdir(outDir, { recursive: true });
    const outPath = join(outDir, "demo.png");
    await writeFile(outPath, img);
  });
});
