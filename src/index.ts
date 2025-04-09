import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { logger } from "hono/logger";
import { getImage } from "./images/images.js";
import { embedReviews } from "./rag/embeddings.js";
import { reviews } from "./data/reviews.js";
import { task1RequestHandler } from "./tasks/task1.js";
import { task2RequestHandler } from "./tasks/task2.js";
import { task3RequestHandler } from "./tasks/task3.js";
import { task4RequestHandler } from "./tasks/task4.js";
import { task5RequestHandler } from "./tasks/task5.js";
import { task6RequestHandler } from "./tasks/task6.js";

const app = new Hono();
app.use(logger());

app.get("/", (c) => {
  return c.text("Hello World!");
});

app.get("/images/:id", (c) => {
  const id = c.req.param("id");
  const image = getImage(id);

  c.header("Content-Type", "image/png");
  return c.body(image);
});

app.get("/task1", task1RequestHandler);

app.get("/task2", task2RequestHandler);

app.get("/task3", task3RequestHandler);

app.get("/task4", task4RequestHandler);

app.get("/task5", task5RequestHandler);

app.get("/task6", task6RequestHandler);

const allReviews = Object.entries(reviews).flatMap(([carId, r]) => r.map(review => ({
  carId,
  content: review
})));
await embedReviews(allReviews);

serve(
  {
    fetch: app.fetch,
    port: 3000
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
