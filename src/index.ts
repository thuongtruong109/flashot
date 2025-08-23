import { type OutputFormat, Renderer } from "@takumi-rs/core";
import { container, em, percentage, text } from "@takumi-rs/helpers";
import { getSingletonHighlighter } from "shiki";
import type { ThemeOptions } from "./types/option";

const defaultOptions: Omit<Required<ThemeOptions>, "width" | "height"> = {
  lang: "js",
  theme: "ayu-dark",
  style: {
    borderRadius: 8,
  },
  font: "https://fonts.bunny.net/ubuntu-sans-mono/files/ubuntu-sans-mono-latin-400-normal.woff2",
};

export async function c2i(code: string, options?: ThemeOptions) {
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
      backgroundColor: bg,
      display: "flex",
      flexDirection: "column",
      width: percentage(100),
      height: percentage(100),
      padding: em(1),
      ...mergedOptions.style,
    },
    children: tokens.map((line) =>
      container({
        style: {
          display: "flex",
          minHeight: em(1),
        },
        children: line.map((token) =>
          token.content.trim() === ""
            ? container({
                style: {
                  minWidth: em(0.5 * token.content.length),
                  minHeight: em(1),
                  // backgroundColor: "gray",
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
  const lines = _lines.length;
  const columns = Math.max(..._lines.map((l) => l.length));
  const width = mergedOptions.width ?? (columns + 2) * 10;
  const height = mergedOptions.height ?? (lines + 2) * 20;

  const res = await renderer.renderAsync(root, {
    format: "Png" as OutputFormat | undefined,
    width,
    height,
  });

  return res;
}
