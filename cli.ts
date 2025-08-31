#!/usr/bin/env bun

import { writeFileSync } from "node:fs";
import { Command } from "commander";
import type { BundledLanguage, BundledTheme } from "shiki";
import * as pkg from "./package.json";
import { bufferToImg, codeToImg, pathToImg, urlToImg } from "./src/index";
import { defaultOptions } from "./src/shared";

const program = new Command();

program.name(pkg.name).description(pkg.description).version(pkg.version);

// Global options
program
  .option("-o, --output <file>", "output image file path", "output.png")
  .option(
    "-t, --theme <theme>",
    "syntax highlighting theme",
    defaultOptions.theme,
  )
  .option("-l, --lang <language>", "programming language", defaultOptions.lang)
  .option("--font <font>", "font family to use", defaultOptions.font)
  .option(
    "--font-ratio <ratio>",
    "font size ratio",
    defaultOptions.fontRatio.toString(),
  )
  .option("--width <pixels>", "image width", defaultOptions.width.toString())
  .option("--height <pixels>", "image height", defaultOptions.height.toString())
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

interface CliOptions {
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

function buildOptions(globalOpts: CliOptions) {
  return {
    theme: globalOpts.theme as BundledTheme, // ensure correct type
    lang: globalOpts.lang as BundledLanguage, // ensure correct type
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

// Convert code string to image
program
  .command("code <code>")
  .description("Convert code string to image")
  .action(async (code, options, command) => {
    const globalOpts = command.parent.opts();

    try {
      const imageBuffer = await codeToImg(code, buildOptions(globalOpts));

      writeFileSync(globalOpts.output, imageBuffer);

      if (globalOpts.verbose) {
        console.log(`Image saved to: ${globalOpts.output}`);
        console.log(`Theme: ${globalOpts.theme}, Language: ${globalOpts.lang}`);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      process.exit(0);
    }
  });

// Convert file to image
program
  .command("file <path>")
  .description("Convert code file to image")
  .action(async (path, options, command) => {
    const globalOpts = command.parent.opts();

    try {
      const imageBuffer = await pathToImg(path, buildOptions(globalOpts));

      writeFileSync(globalOpts.output, imageBuffer);

      if (globalOpts.verbose) {
        console.log(`File ${path} converted to image: ${globalOpts.output}`);
      }
    } catch (error) {
      console.error("Error converting file:", error);
      process.exit(0);
    }
  });

// Convert URL to image
program
  .command("url <url>")
  .description("Convert code from URL to image")
  .action(async (url, options, command) => {
    const globalOpts = command.parent.opts();

    try {
      const imageBuffer = await urlToImg(url, buildOptions(globalOpts));

      writeFileSync(globalOpts.output, imageBuffer);

      if (globalOpts.verbose) {
        console.log(`URL ${url} converted to image: ${globalOpts.output}`);
      }
    } catch (error) {
      console.error("Error converting URL:", error);
      process.exit(0);
    }
  });

// Convert hex buffer to image
program
  .command("buffer <hexstring>")
  .description("Convert hex buffer string to image")
  .action(async (hexstring, options, command) => {
    const globalOpts = command.parent.opts();

    try {
      const imageBuffer = await bufferToImg(
        hexstring,
        buildOptions(globalOpts),
      );

      writeFileSync(globalOpts.output, imageBuffer);

      if (globalOpts.verbose) {
        console.log(`Buffer converted to image: ${globalOpts.output}`);
      }
    } catch (error) {
      console.error("Error converting buffer:", error);
      process.exit(0);
    }
  });

program.parse(process.argv);
