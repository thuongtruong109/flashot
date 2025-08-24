import type { BundledLanguage, BundledTheme } from "shiki";
import type { PartialStyle } from "@takumi-rs/helpers";

export interface ThemeOptions {
  lang?: BundledLanguage;
  theme?: BundledTheme;
  font?: ArrayBuffer | string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  padding?: number;
  gap?: number;
  style?: PartialStyle;
}
