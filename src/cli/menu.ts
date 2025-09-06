import type { Command } from "commander";
import * as pkg from "../../package.json";
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
    .option("-f, --font <font>", "font family to use", defaultOptions.font)
    .option(
      "-w, --width <pixels>",
      "image width",
      defaultOptions.width.toString(),
    )
    .option(
      "-h, --height <pixels>",
      "image height",
      defaultOptions.height.toString(),
    )
    // .option(
    //   "-q, --quality <percent>",
    //   "image quality (1-100) (only for Jpeg)",
    //   defaultOptions.quality.toString()
    // )
    .option("-b, --background <color>", "background color", defaultOptions.bg)
    .option(
      "-g, --gap <pixels>",
      "gap between lines",
      defaultOptions.gap.toString(),
    )
    // .option(
    //   "--format <format>",
    //   "output image format (Png, Jpeg, WebP)",
    //   "WebP"
    // )
    .option(
      "-p, --padding <pixels>",
      "padding around code",
      defaultOptions.style.padding?.toString(),
    )
    .option(
      "-r, --border-radius <pixels>",
      "border radius",
      defaultOptions.style.borderRadius?.toString(),
    )
    .option(
      "--line-numbers",
      "enable line numbers",
      defaultOptions.lineNumbers.enabled,
    )
    .option(
      "--line-start <number>",
      "line number start",
      defaultOptions.lineNumbers.startFrom?.toString(),
    )
    .option(
      "--line-color <color>",
      "line number color",
      defaultOptions.lineNumbers.color,
    )
    .option(
      "--line-margin <pixels>",
      "line number margin right",
      defaultOptions.lineNumbers.marginRight?.toString(),
    )
    .option(
      "--highlight",
      "enable line highlighting",
      defaultOptions.highlight.enabled,
    )
    .option(
      "--highlight-background <color>",
      "highlight background color",
      defaultOptions.highlight.backgroundColor,
    )
    .option(
      "--highlight-border-radius <pixels>",
      "highlight border radius",
      defaultOptions.highlight.borderRadius?.toString(),
    )
    .option(
      "--highlight-at <line>",
      "highlight line number",
      defaultOptions.highlight.at?.toString(),
    )
    .option(
      "--highlight-depth <number>",
      "highlight depth (shadow effect)",
      defaultOptions.highlight.depth?.toString(),
    )
    .option("-v, --verbose", "enable verbose output", pkg.version);
