import type { BundledLanguage, BundledTheme } from "shiki";
import { defaultOptions } from "../../package/src/options";
import type { ThemeOptions } from "../../package/src/types";

export default function (
  opts: ThemeOptions & { output: string },
): Required<ThemeOptions> & { output: string } {
  return {
    output: opts.output,
    lang: opts.lang as BundledLanguage,
    theme: opts.theme as BundledTheme,
    font: opts.font ?? defaultOptions.font,
    width: Number.parseInt(String(opts.width), 10) || defaultOptions.width,
    height: Number.parseInt(String(opts.height), 10) || defaultOptions.height,
    quality:
      Number.parseInt(String(opts.quality), 10) || defaultOptions.quality,
    bg: opts.bg
      ? opts.bg === "transparent"
        ? "transparent"
        : opts.bg
      : defaultOptions.bg,
    gap: Number.parseInt(String(opts.gap), 10) || defaultOptions.gap,
    format: opts.format || defaultOptions.format,
    style: {
      padding:
        Number.parseInt(String(opts.style?.padding), 10) ||
        defaultOptions.style.padding,
      borderRadius:
        Number.parseInt(String(opts.style?.borderRadius), 10) ||
        defaultOptions.style.borderRadius,
    },
    lineNumbers: {
      enabled: opts.lineNumbers?.enabled ?? defaultOptions.lineNumbers.enabled,
      startFrom:
        Number.parseInt(String(opts.lineNumbers?.startFrom), 10) ||
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
        Number.parseInt(String(opts.highlight?.borderRadius), 10) ||
        defaultOptions.highlight.borderRadius,
      at:
        Number.parseInt(String(opts.highlight?.at), 10) ||
        defaultOptions.highlight.at,
      depth: opts.highlight?.depth || defaultOptions.highlight.depth,
    },
  };
}
