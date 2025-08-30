#!/usr/bin/env bun

import { Command } from "commander";
import * as pkg from "./package.json";

const program = new Command();

program.name(pkg.name).description(pkg.description).version(pkg.version);

program
  .command("greet <name>")
  .description("Greet a person")
  .action((name) => {
    console.log(`Hello, ${name}!`);
  });

program.parse(process.argv);
