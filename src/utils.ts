import { container, em, percentage, text } from "@takumi-rs/helpers";
import type { ThemedToken } from "shiki";
import { defaultOmitOptions } from "./shared";
import type { CoreOptions, ThemeOptions } from "./types";

export async function renderContainer(
  code: string,
  opts: Required<ThemeOptions>,
  coreOpts: CoreOptions,
) {
  const { tokens, fg, bg } = coreOpts.highlighter.codeToTokens(code, {
    theme: opts.theme,
    lang: opts.lang,
  });

  return container({
    style: {
      color: fg,
      backgroundColor: opts.bg === defaultOmitOptions.bg ? bg : opts.bg,
      display: "flex",
      flexDirection: "column",
      width: percentage(100),
      height: percentage(100),
      ...opts.style,
    },
    children: tokens.map((group: ThemedToken[], index: number) =>
      container({
        style: {
          display: "flex",
          minHeight: em(opts.gap + 0.5),
        },
        children: [
          text(`${index + 1}`, {
            color: "#7b7f8b",
            marginRight: opts.lineNumbers.enabled ? em(1) : 0,
            minWidth: opts.lineNumbers.enabled ? em(1) : 0,
            width: opts.lineNumbers.enabled ? em(1) : 0,
          }),
          ...group.map((token: ThemedToken) =>
            token.content.trim() === ""
              ? container({
                  style: {
                    minWidth: em(0.5 * token.content.length),
                    minHeight: 0,
                    padding: 0,
                  },
                })
              : text(token.content, { color: token.color }),
          ),
        ],
      }),
    ),
  });
}

export async function loadFont(font: string): Promise<ArrayBuffer> {
  return await fetch(font, {
    mode: "no-cors",
  }).then((r) => r.arrayBuffer());
}

export function renderSize(code: string, opts: Required<ThemeOptions>) {
  const _lines = code.split("\n");
  const columns = Math.max(..._lines.map((l) => l.length));
  const lines = _lines.length;

  const width =
    opts.width === defaultOmitOptions.width ? (columns + 20) * 10 : opts.width;
  const height =
    (opts.height === defaultOmitOptions.height
      ? (lines + 2) * 23.7
      : opts.height) +
    (Number(opts.style.padding) - 25) * 15;

  return { width, height };
}
