import { OutputFormat } from "@takumi-rs/core";
import type { BundledLanguage, BundledTheme } from "shiki";
import { defaultOptions } from "../src/options";
import { ThemeOptions } from "../src/types";

export interface CliOptions {
  output: string;

  lang: BundledLanguage | string;
  theme: BundledTheme | string;
  font: string;
  fontRatio: string;
  width: string;
  height: string;
  bg: string;
  gap: string;
  format: string;
  quality: string;

  padding: string;
  borderRadius: string;

  lineNumbers: boolean;
  lineStartFrom: string;
  lineColor: string;
  lineMarginRight: string;

  highlight: boolean;
  highlightBackground: string;
  highlightBorderRadius: string;
  highlightAt: string;
  highlightDepth: string;
}

export default function (
  cliOpts: CliOptions
): Required<ThemeOptions> & { output: string } {
  return {
    output: cliOpts.output,
    lang: cliOpts.lang as BundledLanguage,
    theme: cliOpts.theme as BundledTheme,
    font: cliOpts.font,
    fontRatio: Number.parseFloat(cliOpts.fontRatio),
    width: Number.parseInt(cliOpts.width) || defaultOptions.width,
    height: Number.parseInt(cliOpts.height) || defaultOptions.height,
    quality: Number.parseInt(cliOpts.quality),
    bg: cliOpts.bg
      ? cliOpts.bg === "transparent"
        ? "transparent"
        : cliOpts.bg
      : defaultOptions.bg,
    gap: Number.parseInt(cliOpts.gap),
    format: (cliOpts.format as OutputFormat) || OutputFormat.WebP,
    style: {
      padding: Number.parseInt(cliOpts.padding),
      borderRadius: Number.parseInt(cliOpts.borderRadius),
    },
    lineNumbers: {
      enabled: cliOpts.lineNumbers,
      startFrom: Number.parseInt(cliOpts.lineStartFrom),
      color: cliOpts.lineColor,
      marginRight: defaultOptions.lineNumbers.marginRight,
    },
    highlight: {
      enabled: cliOpts.highlight,
      backgroundColor: cliOpts.highlightBackground,
      borderRadius: defaultOptions.highlight.borderRadius,
      at: Number.parseInt(cliOpts.highlightAt),
      depth: defaultOptions.highlight.depth,
    },
  };
}
