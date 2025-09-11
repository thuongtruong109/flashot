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
  teardown: async () => {
    // Force cleanup after each benchmark
    Bun.gc(true);
  },
  time: 1000,
});

function addBenchmarks() {
  const msg = "const x = 'Hello world from Flashot';\nconsole.log(x);";
  for (let i = 1; i <= 100; i *= 10) {
    bench.add(`${i} lines`, async () => {
      try {
        await codeToImg(msg.repeat(i));
      } catch (error) {
        console.error(`Benchmark failed for ${i} lines:`, error);
        throw error;
      }
    });
  }
}

addBenchmarks();

try {
  await bench.run();
  console.table(bench.table());
} catch (error) {
  console.error("Benchmark failed:", error);
} finally {
  // Force exit if hanging
  setTimeout(() => {
    console.log("Forcing exit...");
    process.exit(0);
  }, 5000);
}
