import type { Command } from "commander";
import type { ThemeOptions } from "../types";

export default (program: Command, defaultOptions: Required<ThemeOptions>) =>
  program
    .option("-o, --output <file>", "output image file path", "output.png")
    .option(
      "-t, --theme <theme>",
      "syntax highlighting theme",
      defaultOptions.theme,
    )
    .option(
      "-l, --lang <language>",
      "programming language",
      defaultOptions.lang,
    )
    .option("--font <font>", "font family to use", defaultOptions.font)
    .option(
      "--font-ratio <ratio>",
      "font size ratio",
      defaultOptions.fontRatio.toString(),
    )
    .option("--width <pixels>", "image width", defaultOptions.width.toString())
    .option(
      "--height <pixels>",
      "image height",
      defaultOptions.height.toString(),
    )
    .option(
      "-q, --quality <percent>",
      "image quality (1-100)",
      defaultOptions.quality.toString(),
    )
    .option("--background <color>", "background color", defaultOptions.bg)
    .option(
      "--padding <pixels>",
      "padding around code",
      defaultOptions.style?.padding !== undefined
        ? defaultOptions.style.padding.toString()
        : "0",
    )
    .option(
      "--border-radius <pixels>",
      "border radius",
      defaultOptions.style?.borderRadius !== undefined
        ? defaultOptions.style.borderRadius.toString()
        : "0",
    )
    .option("--gap <pixels>", "line gap", defaultOptions.gap.toString())
    .option(
      "--line-numbers",
      "enable line numbers",
      defaultOptions.lineNumbers.enabled,
    )
    .option(
      "--line-start <number>",
      "line number start",
      defaultOptions.lineNumbers.startFrom !== undefined
        ? defaultOptions.lineNumbers.startFrom.toString()
        : "1",
    )
    .option(
      "--line-color <color>",
      "line number color",
      defaultOptions.lineNumbers.color,
    )
    .option(
      "--highlight",
      "enable line highlighting",
      defaultOptions.highlight.enabled,
    )
    .option(
      "--highlight-bg <color>",
      "highlight background color",
      defaultOptions.highlight.backgroundColor,
    )
    .option(
      "--highlight-at <line>",
      "highlight line number",
      defaultOptions.highlight.at !== undefined
        ? defaultOptions.highlight.at.toString()
        : "0",
    )
    .option("-v, --verbose", "enable verbose output");
