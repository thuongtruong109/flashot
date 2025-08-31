#!/usr/bin/env bun

import { writeFileSync } from "node:fs";
import { Command } from "commander";
import * as pkg from "../../package.json";
import { bufferToImg, codeToImg, pathToImg, urlToImg } from "../index";
import { defaultOptions } from "../shared";
import runCmd from "./cmd";
import menu from "./menu";
import getOptions, { type CliOptions } from "./option";

const program = new Command();

program.name(pkg.name).description(pkg.description).version(pkg.version);

menu(program, defaultOptions);

runCmd(
  program,
  "code",
  "Convert code string to image",
  async (code: string, option: CliOptions) => {
    const imageBuffer = await codeToImg(code, getOptions(option));
    writeFileSync(option.output, imageBuffer);
  },
);

runCmd(
  program,
  "file",
  "Convert code file to image",
  async (path: string, option: CliOptions) => {
    const imageBuffer = await pathToImg(path, getOptions(option));
    writeFileSync(option.output, imageBuffer);
  },
);

runCmd(
  program,
  "url",
  "Convert code from URL to image",
  async (url: string, option: CliOptions) => {
    const imageBuffer = await urlToImg(url, getOptions(option));
    writeFileSync(option.output, imageBuffer);
  },
);

runCmd(
  program,
  "buffer",
  "Convert hex buffer string to image",
  async (hexstring: string, option: CliOptions) => {
    const imageBuffer = await bufferToImg(hexstring, getOptions(option));
    writeFileSync(option.output, imageBuffer);
  },
);

program.parse(process.argv);
