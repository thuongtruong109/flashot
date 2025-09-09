import type { Command } from "commander";
import { defaultOptions } from "../../package/src/options";
import type { ThemeOptions } from "../../package/src/types";

const createFlattenedCliKeys = () => {
  const flatKeys = {
    output: null,
    format: null,
    ...Object.keys(defaultOptions).reduce(
      (acc, key) => {
        const value = defaultOptions[key as keyof ThemeOptions];
        if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          Object.keys(value).forEach((nestedKey) => {
            acc[
              `${key}${nestedKey.charAt(0).toUpperCase()}${nestedKey.slice(1)}`
            ] = null;
          });
        } else {
          acc[key] = null;
        }
        return acc;
      },
      {} as Record<string, null>,
    ),
  };

  return flatKeys;
};

const CLI_OPTIONS_CONFIG = [
  {
    shortFlag: "-o",
    argName: "<file>",
    description: "output image file path",
    getDefault: () => "tmp.webp",
  },
  {
    shortFlag: "-F",
    argName: "<format>",
    description: "output image format (png, jpeg, webp, avif)",
    getDefault: () => "webp",
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
    shortFlag: "-q",
    argName: "<percent>",
    description: "image quality (1-100) (only for Jpeg)",
    getDefault: (opts: Required<ThemeOptions>) => opts.quality.toString(),
  },
  {
    shortFlag: "-g",
    argName: "<pixels>",
    description: "gap between lines",
    getDefault: (opts: Required<ThemeOptions>) => opts.gap.toString(),
  },
  {
    shortFlag: "-p",
    argName: "<pixels>",
    description: "padding around code",
    getDefault: (opts: Required<ThemeOptions>) =>
      opts.style.padding?.toString(),
  },
  {
    shortFlag: "-r",
    argName: "<pixels>",
    description: "border radius",
    getDefault: (opts: Required<ThemeOptions>) =>
      opts.style.borderRadius?.toString(),
  },
  {
    shortFlag: "-b",
    argName: "<color>",
    description: "background color",
    getDefault: () => "not needed!",
  },
  {
    shortFlag: "-W",
    argName: "<pixels>",
    description: "image width",
    getDefault: () => "not needed!",
  },
  {
    shortFlag: "-H",
    argName: "<pixels>",
    description: "image height",
    getDefault: () => "not needed!",
  },
  {
    shortFlag: "-L",
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

export default (program: Command) => {
  const flatKeys = Object.keys(createFlattenedCliKeys());

  CLI_OPTIONS_CONFIG.forEach((config, index) => {
    const key = flatKeys[index];
    if (!key) return;

    const kebabKey = toKebabCase(key);
    const argPart = config.argName ? ` ${config.argName}` : "";
    const flags = config.shortFlag
      ? `${config.shortFlag}, --${kebabKey}${argPart}`
      : `--${kebabKey}${argPart}`;

    const defaultValue = config.getDefault(defaultOptions);
    program.option(flags, config.description, defaultValue);
  });

  return program;
};
