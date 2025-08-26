import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { OutputFormat } from "@takumi-rs/core";
import { describe, it } from "vitest";
import { codeToImg, urlToImg } from "../src";

describe("inline-test", () => {
  it("default", async () => {
    const code = await readFile(fileURLToPath(import.meta.url), "utf8");
    const img = await codeToImg(code);
    const outDir = join(process.cwd(), "test/.snapshot");
    await mkdir(outDir, { recursive: true });
    const outPath = join(outDir, "inline.webp");
    await writeFile(outPath, img);
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
    const img = await codeToImg(sampleCode, {
      lang: "html",
      format: OutputFormat.WebP,
    });
    const outDir = join(process.cwd(), "test/.snapshot");
    await mkdir(outDir, { recursive: true });
    const outPath = join(outDir, "demo.webp");
    await writeFile(outPath, img);
  });

  it("custom", async () => {
    const sampleCode = `package main
        func main() {
            fmt.Println("Hello, world!")
        }`;
    const img = await codeToImg(sampleCode, {
      lang: "go",
      bg: "transparent",
      format: OutputFormat.Png,
      gap: 2,
      style: {
        padding: 40,
        borderRadius: 16,
      },
    });
    const outDir = join(process.cwd(), "test/.snapshot");
    await mkdir(outDir, { recursive: true });
    const outPath = join(outDir, "custom.png");
    await writeFile(outPath, img);
  });

  it("single-line", async () => {
    const sampleCode = `console.log("Hello, world!");`;
    const img = await codeToImg(sampleCode, {
      format: OutputFormat.Jpeg,
      quality: 50,
    });
    const outDir = join(process.cwd(), "test/.snapshot");
    await mkdir(outDir, { recursive: true });
    const outPath = join(outDir, "single.jpeg");
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
    const outPath = join(outDir, "url.webp");
    await writeFile(outPath, img);
  });
});
