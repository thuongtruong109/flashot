import { OutputFormat } from "@takumi-rs/core";
import type { BundledLanguage, BundledTheme } from "shiki";
import { defaultOptions } from "../options";

export interface CliOptions {
  output: string;
  lang: BundledLanguage | string;
  theme: string;
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

export default function (cliOpts: CliOptions) {
  return {
    theme: cliOpts.theme as BundledTheme,
    lang: cliOpts.lang as BundledLanguage,
    font: cliOpts.font,
    fontRatio: Number.parseFloat(cliOpts.fontRatio),
    width: Number.parseInt(cliOpts.width) || 800,
    height: Number.parseInt(cliOpts.height) || 600,
    quality: Number.parseInt(cliOpts.quality),
    bg: cliOpts.bg === "transparent" ? "transparent" : cliOpts.bg,
    gap: Number.parseInt(cliOpts.gap),
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
    output: cliOpts.output,
    format: (cliOpts.format as OutputFormat) || OutputFormat.WebP,
  };
}
