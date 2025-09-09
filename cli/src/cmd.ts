import type { Command } from "commander";
import type { ThemeOptions } from "../../package/src/types";

export default function (
  program: Command,
  cmd: string,
  desc: string,
  cb: (
    arg: string,
    options: ThemeOptions & { output: string },
  ) => Promise<void>,
) {
  program
    .command(`${cmd} <${cmd}>`)
    .description(desc)
    .action(async (code, _, command) => {
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
