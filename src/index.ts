import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Renderer } from "@takumi-rs/core";
import { createHighlighter, type HighlighterCore } from "shiki";
import { setHighlighterDisposeFunction } from "./cache";
import core from "./core";
import { defaultOptions } from "./options";
import type { ThemeOptions } from "./types";
import { loadFont } from "./utils";

export { Font } from "./options";

const highlighterCache = new Map<string, HighlighterCore>();
const MAX_HIGHLIGHTERS = 5;

async function getHighlighter(
  theme: string,
  lang: string,
): Promise<HighlighterCore> {
  const cacheKey = `${theme}-${lang}`;

  const cachedHighlighter = highlighterCache.get(cacheKey);
  if (cachedHighlighter) {
    return cachedHighlighter;
  }
  if (highlighterCache.size >= MAX_HIGHLIGHTERS) {
    const firstKey = highlighterCache.keys().next().value;
    if (firstKey) {
      const oldHighlighter = highlighterCache.get(firstKey);
      if (oldHighlighter) {
        oldHighlighter.dispose();
        highlighterCache.delete(firstKey);
      }
    }
  }

  const highlighter = await createHighlighter({
    themes: [theme],
    langs: [lang],
  });

  highlighterCache.set(cacheKey, highlighter);
  return highlighter;
}

/**
 * Converts code string to an image buffer with syntax highlighting.
 *
 * @param code - The source code string to convert to image
 * @param options - Optional theme and rendering options
 * @returns Promise that resolves to a buffer containing the rendered image
 *
 * @example
 * ```typescript
 * const code = "console.log('Hello, World!')";
 * const imageBuffer = await codeToImg(code, {
 *   theme: 'github-dark',
 *   lang: 'typescript'
 * });
 * ```
 */
export async function codeToImg(
  code: string,
  options?: ThemeOptions,
): Promise<Buffer<ArrayBufferLike>> {
  const mergedOptions = Object.assign({}, defaultOptions, options);

  const highlighter = await getHighlighter(
    mergedOptions.theme,
    mergedOptions.lang,
  );
  const font = await loadFont(mergedOptions.font);
  const renderer = new Renderer({ fonts: [font] });

  return await core(code, mergedOptions, { highlighter, renderer });
}

/**
 * Fetches code from a URL and converts it to an image buffer with syntax highlighting.
 *
 * @param url - The URL to fetch the code from
 * @param options - Optional theme and rendering options
 * @returns Promise that resolves to a buffer containing the rendered image
 * @throws Error if the URL cannot be fetched or processed
 *
 * @example
 * ```typescript
 * const imageBuffer = await urlToImg('https://example.com/code.js', {
 *   theme: 'monokai',
 *   lang: 'javascript'
 * });
 * ```
 */
export async function urlToImg(
  url: string,
  options?: ThemeOptions,
): Promise<Buffer<ArrayBufferLike>> {
  try {
    const res = await fetch(url, {
      mode: "no-cors",
    });
    const contentType = res.headers.get("content-type") || "";

    let data2: string;

    if (contentType.includes("application/json")) {
      const jsonData = await res.json();
      data2 = JSON.stringify(jsonData, null, 2);
    } else {
      data2 = await res.text();
    }
    return codeToImg(data2, options);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/**
 * Converts a hex buffer string to code and then to an image buffer with syntax highlighting.
 *
 * @param buffer - A hex-encoded string containing code data
 * @param options - Optional theme and rendering options
 * @returns Promise that resolves to a buffer containing the rendered image
 *
 * @example
 * ```typescript
 * const hexBuffer = "636f6e736f6c652e6c6f672827SGVsbG8n293b";
 * const imageBuffer = await bufferToImg(hexBuffer, {
 *   theme: 'github-light',
 *   lang: 'javascript'
 * });
 * ```
 */
export function bufferToImg(
  buffer: string,
  options?: ThemeOptions,
): Promise<Buffer<ArrayBufferLike>> {
  const data = Buffer.from(
    buffer
      .replace(/[<>]/g, "")
      .split(" ")
      .slice(1)
      .reduce((acc: number[], val) => {
        acc.push(Number.parseInt(val, 16));
        return acc;
      }, []),
  );

  return codeToImg(data.toString("utf-8"), options);
}

/**
 * Reads code from a file path and converts it to an image buffer with syntax highlighting.
 *
 * @param path - The file path to read code from
 * @param options - Optional theme and rendering options
 * @returns Promise that resolves to a buffer containing the rendered image
 * @throws Error if the file cannot be read
 *
 * @example
 * ```typescript
 * const imageBuffer = await pathToImg('../package.json', {
 *   theme: 'dracula',
 *   lang: 'typescript'
 * });
 * ```
 */
export function pathToImg(
  path: string,
  options?: ThemeOptions,
): Promise<Buffer<ArrayBufferLike>> {
  const data = readFileSync(resolve(__dirname, path), "utf-8");
  return codeToImg(data, options);
}

setHighlighterDisposeFunction(() => {
  for (const highlighter of highlighterCache.values()) {
    highlighter.dispose();
  }
  highlighterCache.clear();
});
