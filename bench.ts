import { Bench, nToMs } from "tinybench";
import { codeToImg } from "./src/index";

const bench = new Bench({
  name: "benchmark bun",
  now: () => nToMs(Bun.nanoseconds()),
  setup: (_task, mode) => {
    if (mode === "warmup") {
      Bun.gc(true);
    }
  },
  time: 1000,
});

bench
  .add("small code (10 lines)", async () => {
    await codeToImg("const x = 1;\nconsole.log(x);".repeat(5));
  })
  .add("medium code (100 lines)", async () => {
    await codeToImg("const x = 1;\nconsole.log(x);".repeat(50));
  })
  .add("large code (1000 lines)", async () => {
    await codeToImg("const x = 1;\nconsole.log(x);".repeat(500));
  });

await bench.run();
console.table(bench.table());
