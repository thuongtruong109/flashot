import { Renderer } from "@takumi-rs/core";
import { createHighlighter, type HighlighterCore } from "shiki";
import { setHighlighterDisposeFunction } from "./cache";
import core from "./core";
import { defaultOptions } from "./shared";
import type { ThemeOptions } from "./types";
import { loadFont } from "./utils";

export { Font } from "./shared";

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

export async function urlToImg(
  url: string,
  options?: ThemeOptions,
): Promise<Buffer<ArrayBufferLike>> {
  try {
    const res = await fetch(url, {
      mode: "no-cors",
    });
    const data2 = await res.text();
    return codeToImg(data2, options);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

setHighlighterDisposeFunction(() => {
  for (const highlighter of highlighterCache.values()) {
    highlighter.dispose();
  }
  highlighterCache.clear();
});
