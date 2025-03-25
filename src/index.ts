import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello World!");
});

serve({
  fetch: app.fetch,
  port: 8080
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
