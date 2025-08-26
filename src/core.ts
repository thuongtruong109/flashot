import type { CoreOptions, ThemeOptions } from "./types";
import { codeToContainer, renderSize } from "./utils";

export default async function core(
  code: string,
  opts: Required<ThemeOptions>,
  coreOpts: CoreOptions,
): Promise<Buffer<ArrayBufferLike>> {
  const root = await codeToContainer(code, opts, coreOpts);

  const { width, height } = renderSize(code, opts);
  return await coreOpts.renderer.renderAsync(root, {
    width,
    height,
    format: opts.format,
    quality: opts.quality,
  });
}
