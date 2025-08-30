import type { BundledLanguage, BundledTheme } from "shiki";
import type { PartialStyle } from "@takumi-rs/helpers";
import { OutputFormat } from "@takumi-rs/core";

export type ThemeOptions = {
  lang?: BundledLanguage;
  theme?: BundledTheme;
  font?: string;
  fontRatio?: number;
  width?: number;
  height?: number;
  bg?: string;
  gap?: number;
  format?: OutputFormat.WebP | OutputFormat.Png | OutputFormat.Jpeg;
  quality?: number;
  style?: PartialStyle & {
    padding?: number;
    borderRadius?: number;
  };
  lineNumbers?: PartialStyle & {
    enabled?: boolean;
    startFrom?: number;
    color?: string;
    marginRight?: number;
  };
  highlight?: PartialStyle & {
    enabled?: boolean;
    backgroundColor?: string;
    borderRadius?: number;
    at?: number;
    depth?: number;
  };
};

export type ShikiToken = {
  content: string;
  color: string;
};

export type CoreOptions = {
  highlighter: HighlighterCore;
  renderer: NativeRenderer;
};

export type TokenData = {
  tokens: ThemedToken[][];
  fg: string;
  bg: string;
};
