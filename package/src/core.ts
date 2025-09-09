import type { CoreOptions, ThemeOptions } from "./types";
import { renderContainer, renderSize } from "./utils";

export default async function core(
  code: string,
  opts: Required<ThemeOptions>,
  coreOpts: CoreOptions,
): Promise<Buffer<ArrayBufferLike>> {
  const root = await renderContainer(code, opts, coreOpts);

  const { width, height } = renderSize(code, opts);
  return await coreOpts.renderer.renderAsync(root, {
    width,
    height,
    format: opts.format,
    quality: opts.quality,
  });
}
