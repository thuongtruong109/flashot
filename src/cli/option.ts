import type { BundledLanguage, BundledTheme } from "shiki";
import { defaultOptions } from "../shared";

export interface CliOptions {
  output: string;
  theme: string;
  lang: BundledLanguage | string;
  font: string;
  fontRatio: string;
  width: string;
  height: string;
  quality: string;
  background: string;
  padding: string;
  borderRadius: string;
  gap: string;
  lineNumbers: boolean;
  lineStart: string;
  lineColor: string;
  highlight: boolean;
  highlightBg: string;
  highlightAt: string;
  verbose?: boolean;
}

export default function (globalOpts: CliOptions) {
  return {
    theme: globalOpts.theme as BundledTheme,
    lang: globalOpts.lang as BundledLanguage,
    font: globalOpts.font,
    fontRatio: Number.parseFloat(globalOpts.fontRatio),
    width: Number.parseInt(globalOpts.width) || 800,
    height: Number.parseInt(globalOpts.height) || 600,
    quality: Number.parseInt(globalOpts.quality),
    bg: globalOpts.background === "null" ? undefined : globalOpts.background,
    gap: Number.parseInt(globalOpts.gap),
    style: {
      padding: Number.parseInt(globalOpts.padding),
      borderRadius: Number.parseInt(globalOpts.borderRadius),
    },
    lineNumbers: {
      enabled: globalOpts.lineNumbers,
      startFrom: Number.parseInt(globalOpts.lineStart),
      color: globalOpts.lineColor,
      marginRight: defaultOptions.lineNumbers.marginRight,
    },
    highlight: {
      enabled: globalOpts.highlight,
      backgroundColor: globalOpts.highlightBg,
      borderRadius: defaultOptions.highlight.borderRadius,
      at: Number.parseInt(globalOpts.highlightAt),
      depth: defaultOptions.highlight.depth,
    },
  };
}
