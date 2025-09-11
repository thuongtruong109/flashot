import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import router from "./router";

const app = new Hono();

app.use("/*", cors());

app.route("/", router);

const server = serve({
  fetch: app.fetch,
  port: 8080,
});

process.on("SIGINT", () => {
  server.close();
  process.exit(0);
});
process.on("SIGTERM", () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
