import { container, em, percentage, text } from "@takumi-rs/helpers";
import type { ThemedToken } from "shiki";
import { defaultAutoOptions } from "./shared";
import type { CoreOptions, ThemeOptions } from "./types";

export async function renderContainer(
  code: string,
  opts: Required<ThemeOptions>,
  coreOpts: CoreOptions,
) {
  const { tokens, fg, bg } = await coreOpts.highlighter.codeToTokens(code, {
    theme: opts.theme,
    lang: opts.lang,
  });

  const lineNumberWidth = Math.max(2, tokens.length.toString().length + 0.5);

  return container({
    style: {
      color: fg,
      backgroundColor: opts.bg === defaultAutoOptions.bg ? bg : opts.bg,
      display: "flex",
      flexDirection: "column",
      width: percentage(100),
      height: percentage(100),
      ...opts.style,
    },
    children: tokens.map((group: ThemedToken[], index: number) => {
      const children: ReturnType<typeof text | typeof container>[] = [];

      if (opts.lineNumbers.enabled || defaultAutoOptions.lineNumbers.enabled) {
        children.push(
          text(
            `${
              index +
              (opts.lineNumbers.startFrom ||
                defaultAutoOptions.lineNumbers.startFrom)
            }`,
            {
              color: opts.lineNumbers.color,
              marginRight: em(
                opts.lineNumbers.marginRight ||
                  defaultAutoOptions.lineNumbers.marginRight,
              ),
              minWidth: em(lineNumberWidth),
              width: em(lineNumberWidth),
            },
          ),
        );
      }

      children.push(
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
      );

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
    opts.width === defaultAutoOptions.width ? (columns + 20) * 10 : opts.width;
  const height =
    (opts.height === defaultAutoOptions.height
      ? (lines + 2) * 23.7
      : opts.height) +
    (Number(opts.style.padding) - 25) * 15;

  return { width, height };
}
