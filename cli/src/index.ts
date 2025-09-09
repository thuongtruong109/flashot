#!/usr/bin/env bun

import { writeFileSync } from "node:fs";
import { Command } from "commander";
import { bufferToImg, codeToImg, pathToImg, urlToImg } from "../../package/src";
import type { ThemeOptions } from "../../package/src/types";
import * as pkg from "../package.json";
import runCmd from "./cmd";
import menu from "./menu";
import getOptions from "./option";

const program = new Command();

program.name(pkg.name).description(pkg.description).version(pkg.version);

menu(program);

runCmd(
  program,
  "code",
  "Convert code string to image",
  async (code: string, option: ThemeOptions & { output: string }) => {
    const imageBuffer = await codeToImg(code, getOptions(option));
    writeFileSync(option.output, imageBuffer);
  },
);

runCmd(
  program,
  "file",
  "Convert code file to image",
  async (path: string, option: ThemeOptions & { output: string }) => {
    const imageBuffer = await pathToImg(path, getOptions(option));
    writeFileSync(option.output, imageBuffer);
  },
);

runCmd(
  program,
  "url",
  "Convert code from URL to image",
  async (url: string, option: ThemeOptions & { output: string }) => {
    const imageBuffer = await urlToImg(url, getOptions(option));
    writeFileSync(option.output, imageBuffer);
  },
);

runCmd(
  program,
  "buffer",
  "Convert hex buffer string to image",
  async (hexstring: string, option: ThemeOptions & { output: string }) => {
    const imageBuffer = await bufferToImg(hexstring, getOptions(option));
    writeFileSync(option.output, imageBuffer);
  },
);

program.parse(process.argv);
