import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "vitest";
import { c2i, urlToImg } from "../src";

describe("inline-test", () => {
  it("default", async () => {
    const start = Date.now();
    const code = await readFile(fileURLToPath(import.meta.url), "utf8");
    const img = await c2i(code);
    const outDir = join(process.cwd(), "test/.snapshot");
    await mkdir(outDir, { recursive: true });
    const outPath = join(outDir, "inline.png");
    await writeFile(outPath, img);
    const end = Date.now();
    console.log(`Image generated in ${end - start}ms`);
  });

  it("demo", async () => {
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

  it("custom", async () => {
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

  it("single line code", async () => {
    const sampleCode = `console.log("Hello, world!");`;
    const img = await c2i(sampleCode);
    const outDir = join(process.cwd(), "test/.snapshot");
    await mkdir(outDir, { recursive: true });
    const outPath = join(outDir, "single.png");
    await writeFile(outPath, img);
  });
});

describe("url-test", () => {
  it("default", async () => {
    const img = await urlToImg(
      "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
    );
    const outDir = join(process.cwd(), "test/.snapshot");
    await mkdir(outDir, { recursive: true });
    const outPath = join(outDir, "url.png");
    await writeFile(outPath, img);
  });
});
