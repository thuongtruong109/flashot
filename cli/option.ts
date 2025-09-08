import type { BundledLanguage, BundledTheme } from "shiki";
import { defaultOptions } from "../src/options";
import { ThemeOptions } from "../src/types";

export default function (
  opts: ThemeOptions & { output: string }
): Required<ThemeOptions> & { output: string } {
  return {
    output: opts.output,
    lang: opts.lang as BundledLanguage,
    theme: opts.theme as BundledTheme,
    font: opts.font ?? defaultOptions.font,
    width: Number.parseInt(String(opts.width)) || defaultOptions.width,
    height: Number.parseInt(String(opts.height)) || defaultOptions.height,
    quality: Number.parseInt(String(opts.quality)) || defaultOptions.quality,
    bg: opts.bg
      ? opts.bg === "transparent"
        ? "transparent"
        : opts.bg
      : defaultOptions.bg,
    gap: Number.parseInt(String(opts.gap)) || defaultOptions.gap,
    format: opts.format || defaultOptions.format,
    style: {
      padding:
        Number.parseInt(String(opts.style?.padding)) ||
        defaultOptions.style.padding,
      borderRadius:
        Number.parseInt(String(opts.style?.borderRadius)) ||
        defaultOptions.style.borderRadius,
    },
    lineNumbers: {
      enabled: opts.lineNumbers?.enabled ?? defaultOptions.lineNumbers.enabled,
      startFrom:
        Number.parseInt(String(opts.lineNumbers?.startFrom)) ||
        defaultOptions.lineNumbers.startFrom,
      color: opts.lineNumbers?.color || defaultOptions.lineNumbers.color,
      marginRight:
        opts.lineNumbers?.marginRight || defaultOptions.lineNumbers.marginRight,
    },
    highlight: {
      enabled: opts.highlight?.enabled ?? defaultOptions.highlight.enabled,
      backgroundColor:
        opts.highlight?.backgroundColor ||
        defaultOptions.highlight.backgroundColor,
      borderRadius:
        Number.parseInt(String(opts.highlight?.borderRadius)) ||
        defaultOptions.highlight.borderRadius,
      at:
        Number.parseInt(String(opts.highlight?.at)) ||
        defaultOptions.highlight.at,
      depth: opts.highlight?.depth || defaultOptions.highlight.depth,
    },
  };
}
