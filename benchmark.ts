import { Bench, nToMs } from "tinybench";
import { codeToImg } from "./src/index";

const bench = new Bench({
  name: "benchmark test",
  now: () => nToMs(Bun.nanoseconds()),
  setup: (_task, mode) => {
    if (mode === "warmup") {
      Bun.gc(true);
    }
  },
  time: 1000,
});

function addBenchmarks() {
  const msg = "const x = 'Hello world from Flashot';\nconsole.log(x);";
  for (let i = 1; i <= 1000; i *= 10) {
    bench.add(`${i} lines`, async () => {
      await codeToImg(msg.repeat(i));
    });
  }
}

addBenchmarks();

await bench.run();
console.table(bench.table());
