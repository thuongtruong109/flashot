import { container, em, percentage, text } from "@takumi-rs/helpers";
import type { ThemedToken } from "shiki";
import { defaultAutoOptions } from "./shared";
import type { CoreOptions, ThemeOptions, TokenData } from "./types";

const lineNumberWidthCache = new Map<number, number>();
const tokenCache = new Map<string, TokenData>();
const fontCache = new Map<string, Promise<ArrayBuffer>>();
const sizeCache = new Map<
  string,
  { width: number; height: number; timestamp: number }
>();
const CACHE_TTL = 5 * 60 * 1000;
const MAX_CACHE_SIZE = 100;

export async function renderContainer(
  code: string,
  opts: Required<ThemeOptions>,
  coreOpts: CoreOptions,
) {
  const cacheKey = `${code}-${opts.theme}-${opts.lang}`;
  let tokenData = tokenCache.get(cacheKey);

  if (!tokenData) {
    const highlighterResult = await coreOpts.highlighter.codeToTokens(code, {
      theme: opts.theme,
      lang: opts.lang,
    });

    tokenData = {
      tokens: highlighterResult.tokens,
      fg: highlighterResult.fg,
      bg: highlighterResult.bg,
    } as TokenData;

    if (tokenCache.size > 50) {
      const firstKey = tokenCache.keys().next().value;
      if (firstKey) tokenCache.delete(firstKey);
    }
    tokenCache.set(cacheKey, tokenData);
  }

  const { tokens, fg, bg } = tokenData;

  let lineNumberWidth = lineNumberWidthCache.get(tokens.length);
  if (!lineNumberWidth) {
    lineNumberWidth = Math.max(2, tokens.length.toString().length + 0.5);
    lineNumberWidthCache.set(tokens.length, lineNumberWidth);
  }

  const showLineNumbers =
    opts.lineNumbers.enabled === true ||
    defaultAutoOptions.lineNumbers.enabled === true;
  const startFrom =
    opts.lineNumbers.startFrom || defaultAutoOptions.lineNumbers.startFrom;
  const marginRight =
    opts.lineNumbers.marginRight || defaultAutoOptions.lineNumbers.marginRight;
  const backgroundColor = opts.bg === defaultAutoOptions.bg ? bg : opts.bg;

  return container({
    style: {
      color: fg,
      backgroundColor,
      display: "flex",
      flexDirection: "column",
      width: percentage(100),
      height: percentage(100),
      ...opts.style,
    },
    children: tokens.map((group: ThemedToken[], index: number) => {
      const children: ReturnType<typeof text | typeof container>[] = [];

      if (showLineNumbers) {
        children.push(
          text(`${index + startFrom}`, {
            color: opts.lineNumbers.color,
            marginRight: em(marginRight),
            minWidth: em(lineNumberWidth),
            width: em(lineNumberWidth),
          }),
        );
      }

      for (const token of group) {
        if (token.content.trim() === "") {
          children.push(
            container({
              style: {
                minWidth: em(0.5 * token.content.length),
                minHeight: 0,
                padding: 0,
              },
            }),
          );
        } else {
          children.push(text(token.content, { color: token.color }));
        }
      }

      return container({
        style: {
          display: "flex",
          minHeight: em(opts.gap + 0.5),
          alignItems: "baseline",
        },
        children,
      });
    }),
  });
}

export const loadFont = async (font: string): Promise<ArrayBuffer> => {
  const cachedFont = fontCache.get(font);
  if (cachedFont) {
    return cachedFont;
  }

  const fontPromise = (async () => {
    try {
      const response = await fetch(font, {
        mode: "no-cors",
        cache: "force-cache",
      } as RequestInit);

      if (!response.ok) {
        throw new Error(
          `Failed to load font: ${response.status} ${response.statusText}`,
        );
      }

      return response.arrayBuffer();
    } catch (error) {
      fontCache.delete(font);
      throw error;
    }
  })();

  fontCache.set(font, fontPromise);
  return fontPromise;
};

export function renderSize(
  code: string,
  opts: Required<ThemeOptions>,
): { width: number; height: number } {
  const cacheKey = JSON.stringify({
    codeLength: code.length,
    lineCount: code.split("\n").length,
    width: opts.width,
    height: opts.height,
    padding: opts.style.padding,
  });

  const cached = sizeCache.get(cacheKey);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_TTL) {
    return { width: cached.width, height: cached.height };
  }

  const lines = code.split("\n");
  const columns = Math.max(...lines.map((l) => l.length));
  const lineCount = lines.length;

  const width =
    opts.width === defaultAutoOptions.width ? (columns + 20) * 10 : opts.width;

  const height =
    (opts.height === defaultAutoOptions.height
      ? (lineCount + 2) * 23.7
      : opts.height) +
    (Number(opts.style.padding) - 25) * 15;

  const result = { width, height, timestamp: now };

  if (sizeCache.size >= MAX_CACHE_SIZE) {
    const entries = Array.from(sizeCache.entries());
    const validEntries = entries.filter(
      ([, value]) => now - value.timestamp < CACHE_TTL,
    );

    sizeCache.clear();
    validEntries.slice(-MAX_CACHE_SIZE + 1).forEach(([key, value]) => {
      sizeCache.set(key, value);
    });
  }

  sizeCache.set(cacheKey, result);
  return { width, height };
}

export function clearCaches(): void {
  lineNumberWidthCache.clear();
  tokenCache.clear();
  fontCache.clear();
  sizeCache.clear();
}

export function getCacheSizes() {
  return {
    lineNumberWidthCache: lineNumberWidthCache.size,
    tokenCache: tokenCache.size,
    fontCache: fontCache.size,
    sizeCache: sizeCache.size,
  };
}
