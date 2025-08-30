import { OutputFormat } from "@takumi-rs/core";
import type { ThemeOptions } from "./types";

export const Font = {
  JetBrainsMono:
    "https://fonts.bunny.net/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2",
  UbuntuSansMono:
    "https://fonts.bunny.net/ubuntu-sans-mono/files/ubuntu-sans-mono-latin-400-normal.woff2",
};

export const defaultAutoOptions = {
  bg: "null",
  width: 0,
  height: 0,
  lineNumbers: {
    enabled: false,
    startFrom: 1,
    color: "#7b7f8b",
    marginRight: 0,
  },
} as const;

export const defaultOptions: Required<ThemeOptions> = {
  lang: "js",
  theme: "dracula",
  font: Font.JetBrainsMono,
  fontRatio: 0.63,
  format: OutputFormat.WebP,
  quality: 100,
  gap: 1,
  style: {
    padding: 25,
    borderRadius: 8,
  },
  ...defaultAutoOptions,
};

Object.freeze(defaultOptions);
Object.freeze(defaultOptions.style);
Object.freeze(defaultAutoOptions);
Object.freeze(defaultAutoOptions.lineNumbers);
