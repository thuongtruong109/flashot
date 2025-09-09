import type { BundledLanguage, BundledTheme, HighlighterCore } from "shiki";
import type { PartialStyle } from "@takumi-rs/helpers";
import type { Renderer as NativeRenderer } from "@takumi-rs/core";
import type { OutputFormat } from "@takumi-rs/core";

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

type ThemeLineNumbers = {
  enabled?: boolean;
  startFrom?: number;
  color?: string;
  marginRight?: number;
};

type ThemeHighlight = {
  enabled?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
  at?: number;
  depth?: number;
};

export type ThemeOptions = {
  lang?: BundledLanguage;
  theme?: BundledTheme;
  font?: ArrayBuffer | string;
  width?: number;
  height?: number;
  bg?: string;
  gap?: number;
  format?: OutputFormat;
  quality?: number;
  style?: PartialStyle & {
    padding?: number;
    borderRadius?: number;
  };
  lineNumbers?: PartialStyle & ThemeLineNumbers;
  highlight?: PartialStyle & ThemeHighlight;
};
