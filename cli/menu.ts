import type { Command } from "commander";
import * as pkg from "../package.json";
import type { ThemeOptions } from "../src/types";
import type { CliOptions } from "./option";

// Create a dummy object with the same keys as CliOptions to extract keys at runtime
const createCliKeysHelper = (): Record<keyof CliOptions, null> => ({
  output: null,
  lang: null,
  theme: null,
  font: null,
  fontRatio: null,
  width: null,
  height: null,
  bg: null,
  gap: null,
  format: null,
  quality: null,
  padding: null,
  borderRadius: null,
  lineNumbers: null,
  lineStartFrom: null,
  lineColor: null,
  lineMarginRight: null,
  highlight: null,
  highlightBackground: null,
  highlightBorderRadius: null,
  highlightAt: null,
  highlightDepth: null,
});

const CLI_OPTIONS_CONFIG = [
  {
    shortFlag: "-o",
    argName: "<file>",
    description: "output image file path",
    getDefault: () => "output.png",
  },
  {
    shortFlag: "-l",
    argName: "<language>",
    description: "programming language",
    getDefault: (opts: Required<ThemeOptions>) => opts.lang,
  },
  {
    shortFlag: "-t",
    argName: "<theme>",
    description: "syntax highlighting theme",
    getDefault: (opts: Required<ThemeOptions>) => opts.theme,
  },
  {
    shortFlag: "-f",
    argName: "<font>",
    description: "font family to use",
    getDefault: (opts: Required<ThemeOptions>) =>
      typeof opts.font === "string" ? opts.font : undefined,
  },
  {
    argName: "<ratio>",
    description: "font ratio",
    getDefault: (opts: Required<ThemeOptions>) => opts.fontRatio?.toString(),
  },
  {
    shortFlag: "-w",
    argName: "<pixels>",
    description: "image width",
    getDefault: (opts: Required<ThemeOptions>) => opts.width.toString(),
  },
  {
    shortFlag: "-h",
    argName: "<pixels>",
    description: "image height",
    getDefault: (opts: Required<ThemeOptions>) => opts.height.toString(),
  },
  {
    shortFlag: "-b",
    argName: "<color>",
    description: "background color",
    getDefault: (opts: Required<ThemeOptions>) => opts.bg,
  },
  {
    shortFlag: "-g",
    argName: "<pixels>",
    description: "gap between lines",
    getDefault: (opts: Required<ThemeOptions>) => opts.gap.toString(),
  },
  {
    argName: "<format>",
    description: "output image format (Png, Jpeg, WebP)",
    getDefault: () => "WebP",
  },
  {
    shortFlag: "-q",
    argName: "<percent>",
    description: "image quality (1-100) (only for Jpeg)",
    getDefault: (opts: Required<ThemeOptions>) => opts.quality.toString(),
  },
  {
    shortFlag: "-p",
    argName: "<pixels>",
    description: "padding around code",
    getDefault: (opts: Required<ThemeOptions>) =>
      opts.style.padding?.toString(),
  },
  {
    argName: "<pixels>",
    description: "border radius",
    getDefault: (opts: Required<ThemeOptions>) =>
      opts.style.borderRadius?.toString(),
  },
  {
    description: "enable line numbers",
    getDefault: (opts: Required<ThemeOptions>) => opts.lineNumbers.enabled,
  },
  {
    argName: "<number>",
    description: "line number start",
    getDefault: (opts: Required<ThemeOptions>) =>
      opts.lineNumbers.startFrom?.toString(),
  },
  {
    argName: "<color>",
    description: "line number color",
    getDefault: (opts: Required<ThemeOptions>) => opts.lineNumbers.color,
  },
  {
    argName: "<pixels>",
    description: "line number margin right",
    getDefault: (opts: Required<ThemeOptions>) =>
      opts.lineNumbers.marginRight?.toString(),
  },
  {
    description: "enable line highlighting",
    getDefault: (opts: Required<ThemeOptions>) => opts.highlight.enabled,
  },
  {
    argName: "<color>",
    description: "highlight background color",
    getDefault: (opts: Required<ThemeOptions>) =>
      opts.highlight.backgroundColor,
  },
  {
    argName: "<pixels>",
    description: "highlight border radius",
    getDefault: (opts: Required<ThemeOptions>) =>
      opts.highlight.borderRadius?.toString(),
  },
  {
    argName: "<line>",
    description: "highlight line number",
    getDefault: (opts: Required<ThemeOptions>) => opts.highlight.at?.toString(),
  },
  {
    argName: "<number>",
    description: "highlight depth (shadow effect)",
    getDefault: (opts: Required<ThemeOptions>) =>
      opts.highlight.depth?.toString(),
  },
];

const toKebabCase = (str: string): string => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
};

export default (program: Command, defaultOptions: Required<ThemeOptions>) => {
  const cliKeys = Object.keys(createCliKeysHelper()) as Array<keyof CliOptions>;

  CLI_OPTIONS_CONFIG.forEach((config, index) => {
    const key = cliKeys[index];
    const kebabKey = toKebabCase(key ?? "");
    const flags = config.shortFlag
      ? `${config.shortFlag}, --${kebabKey}${config.argName || ""}`
      : `--${kebabKey}${config.argName || ""}`;

    const defaultValue = config.getDefault(defaultOptions);
    program.option(flags, config.description, defaultValue);
  });

  program.option("-v, --verbose", "enable verbose output", pkg.version);

  return program;
};
