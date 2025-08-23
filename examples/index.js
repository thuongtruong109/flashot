import { writeFile } from "node:fs/promises";
import { c2i } from "flashot";

const buffer = await c2i('console.log("hello, world!");');
await writeFile("image.png", buffer);
