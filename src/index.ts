import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { HTTPException } from "hono/http-exception";
import { type CoreMessage, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { calculateTotalPriceTool, carsInStockTool } from "./tools.js";
import { logger } from "hono/logger";

const app = new Hono();
app.use(logger());

app.get("/", (c) => {
  return c.text("Hello World!");
});

app.get("/task1", async (c) => {
  const inputPrompt = c.req.query("prompt");

  if (inputPrompt === undefined) {
    throw new HTTPException(422, { message: "Query parameter 'prompt' is required" });
  }

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt: inputPrompt,
  });

  return c.text(text);
});

app.get("/task2", async (c) => {
  const inputPrompt = c.req.query("prompt");

  if (inputPrompt === undefined) {
    throw new HTTPException(422, { message: "Query parameter 'prompt' is required" });
  }

  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: `
        You are a car dealership sales agent.
        Do not answer any unrelated questions.
        You can do some smalltalk, but always try to lead the conversation back to selling cars.
    `,
    prompt: inputPrompt,
  });

  return c.text(text);
});

const messages: CoreMessage[] = [];

app.get("/task3", async (c) => {
  const inputPrompt = c.req.query("prompt");

  if (inputPrompt === undefined) {
    throw new HTTPException(422, { message: "Query parameter 'prompt' is required" });
  }

  messages.push({ role: "user", content: inputPrompt });

  const { text, response } = await generateText({
    model: openai("gpt-4o"),
    system: `
        You are a car dealership sales agent.
        Do not answer any unrelated questions.
        You can do some smalltalk, but always try to lead the conversation back to selling cars.
    `,
    messages: messages,
  });

  messages.push(...response.messages);

  return c.text(text);
});

app.get("/task4", async (c) => {
  const inputPrompt = c.req.query("prompt");

  if (inputPrompt === undefined) {
    throw new HTTPException(422, { message: "Query parameter 'prompt' is required" });
  }

  messages.push({ role: "user", content: inputPrompt });

  const { text, response } = await generateText({
    model: openai("gpt-4o"),
    tools: {
      carsInStock: carsInStockTool,
      calculateTotalPrice: calculateTotalPriceTool,
    },
    maxSteps: 2,
    system: `
        You are a car dealership sales agent.
        Do not answer any unrelated questions.
        You can do some smalltalk, but always try to lead the conversation back to selling cars.
    `,
    messages: messages,
  });

  messages.push(...response.messages);

  return c.text(text);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
