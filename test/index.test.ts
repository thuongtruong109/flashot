import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "vitest";
import { bufferToImg, codeToImg, Font, pathToImg, urlToImg } from "../src";
import { CacheManager } from "../src/cache";

const exportImg = async (name: string, file: Buffer<ArrayBufferLike>) => {
  const outDir = join(process.cwd(), "test/.snapshot");
  await mkdir(outDir, { recursive: true });
  const outPath = join(outDir, name);
  await writeFile(outPath, file);
};

describe("main-test", () => {
  it("default", async () => {
    const code = await readFile(fileURLToPath(import.meta.url), "utf8");
    const img = await codeToImg(code);
    await exportImg("inline.webp", img);
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
      lineNumbers: {
        enabled: true,
      },
      highlight: {
        enabled: true,
        at: 10,
        depth: 4,
      },
    });
    await exportImg("demo.webp", img);
  });

  it("custom", async () => {
    const sampleCode = `package main
        func main() {
            fmt.Println("Hello, world!")
        }`;
    const img = await codeToImg(sampleCode, {
      lang: "go",
      bg: "transparent",
      format: "png",
      gap: 2,
      style: {
        padding: 40,
        borderRadius: 16,
      },
      lineNumbers: {
        enabled: true,
        startFrom: 2,
        color: "#67CEDC",
        marginRight: 2,
      },
      highlight: {
        enabled: true,
        backgroundColor: "#15ff0dff",
        at: 2,
        depth: 3,
      },
    });
    await exportImg("custom.png", img);
  });

  it("url", async () => {
    const img = await urlToImg("https://randomfox.ca/floof/", {
      font: Font.Abeezee,
    });
    await exportImg("url.webp", img);
  });

  it("buffer", async () => {
    const img = await bufferToImg(
      "<Buffer 54 68 69 73 20 69 73 20 61 20 62 75 66 66 65 72 20 65 78 61 6d 70 6c 65 2e>",
    );
    await exportImg("buffer.webp", img);
  });

  it("path", async () => {
    const img = await pathToImg("../src/index.ts");
    await exportImg("path.webp", img);
  });

  it("cache", async () => {
    const cache = CacheManager.getInstance();
    console.log("Cache stats (before):", cache.stats());

    const img = await codeToImg(`console.log("Hello, world!");`, {
      format: "jpeg",
      quality: 50,
    });
    await exportImg("cache.jpeg", img);

    console.log("Cache stats (present):", cache.stats());

    cache.clear();
    console.log("Cache stats (after):", cache.stats());
  });
});
