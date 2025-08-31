import type { Command } from "commander";
import type { CliOptions } from "./option";

export default function (
  program: Command,
  cmd: string,
  desc: string,
  cb: (arg: string, options: CliOptions) => Promise<void>,
) {
  program
    .command(`${cmd} <${cmd}>`)
    .description(desc)
    .action(async (code, options, command) => {
      const globalOpts = command.parent.opts();

      try {
        await cb(code, globalOpts);

        if (globalOpts.verbose) {
          console.log(`Image saved to: ${globalOpts.output}`);
        }
        process.exit(0);
      } catch (error) {
        console.error("Error generating image:", error);
        process.exit(1);
      }
    });
}
