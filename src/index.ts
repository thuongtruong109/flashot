import { type OutputFormat, Renderer } from "@takumi-rs/core";
import { container, em, percentage, text } from "@takumi-rs/helpers";
import { getSingletonHighlighter } from "shiki";
import type { ThemeOptions } from "./types/option";

const defaultOptions: Omit<
  Required<ThemeOptions>,
  "width" | "height" | "bg"
> = {
  lang: "js",
  theme: "dracula",
  font: "https://fonts.bunny.net/ubuntu-sans-mono/files/ubuntu-sans-mono-latin-400-normal.woff2",
  gap: 1,
  style: {
    borderRadius: 8,
    padding: 25,
  },
};

export async function c2i(
  code: string,
  options?: ThemeOptions,
): Promise<Buffer<ArrayBufferLike>> {
  const mergedOptions = Object.assign({}, defaultOptions, options);

  const hl = await getSingletonHighlighter({
    themes: [mergedOptions.theme],
    langs: [mergedOptions.lang],
  });

  const { tokens, fg, bg } = hl.codeToTokens(code, {
    theme: mergedOptions.theme,
    lang: mergedOptions.lang,
  });

  // console.log(tokens);

  const root = container({
    style: {
      color: fg,
      backgroundColor: mergedOptions.bg || bg,
      display: "flex",
      flexDirection: "column",
      width: percentage(100),
      height: percentage(100),
      padding: em(Number(defaultOptions.style.padding)),
      ...mergedOptions.style,
    },
    children: tokens.map((line) =>
      container({
        style: {
          display: "flex",
          minHeight: em(mergedOptions.gap + 0.5),
        },
        children: line.map((token) =>
          token.content.trim() === ""
            ? container({
                style: {
                  minWidth: em(0.5 * token.content.length),
                  minHeight: 0,
                  // backgroundColor: "transparent",
                  padding: 0,
                },
              })
            : text(token.content, { color: token.color }),
        ),
      }),
    ),
  });

  const font =
    typeof mergedOptions.font === "string"
      ? await fetch(mergedOptions.font).then((r) => r.arrayBuffer())
      : mergedOptions.font;

  const renderer = new Renderer({ fonts: [font] });

  const _lines = code.split("\n");
  const columns = Math.max(..._lines.map((l) => l.length));
  const lines = _lines.length;

  const res = await renderer.renderAsync(root, {
    format: "Png" as OutputFormat | undefined,
    width: mergedOptions.width || (columns + 4) * 10,
    height:
      (mergedOptions.height || (lines + 2) * 23.7) +
      (Number(mergedOptions.style.padding) - 25) * 15,
  });

  return res;
}

export async function urlToImg(url: string): Promise<Buffer<ArrayBufferLike>> {
  try {
    const res = await fetch(url);
    const data2 = await res.text();
    return c2i(data2);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
