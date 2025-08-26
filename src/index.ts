import { Renderer } from "@takumi-rs/core";
import { createHighlighter } from "shiki";
import core from "./core";
import { defaultOptions } from "./shared";
import type { ThemeOptions } from "./types";
import { loadFont } from "./utils";

export { Font } from "./shared";

export async function codeToImg(
  code: string,
  options?: ThemeOptions,
): Promise<Buffer<ArrayBufferLike>> {
  const mergedOptions = Object.assign({}, defaultOptions, options);

  const highlighter = await createHighlighter({
    themes: [mergedOptions.theme],
    langs: [mergedOptions.lang],
  });
  const font = await loadFont(mergedOptions.font);
  const renderer = new Renderer({ fonts: [font] });

  return await core(code, mergedOptions, { highlighter, renderer });
}

export async function urlToImg(
  url: string,
  options?: ThemeOptions,
): Promise<Buffer<ArrayBufferLike>> {
  try {
    const res = await fetch(url);
    const data2 = await res.text();
    return codeToImg(data2, options);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
