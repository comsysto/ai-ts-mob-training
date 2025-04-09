import { HTTPException } from "hono/http-exception";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { baseSystemPrompt } from "../system-prompt/system-prompt.js";
import type { Context } from "hono";

export async function task2RequestHandler(c: Context) {
  const inputPrompt = c.req.query("prompt");

  if (inputPrompt === undefined) {
    throw new HTTPException(422, { message: "Query parameter 'prompt' is required" });
  }

  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: baseSystemPrompt,
    prompt: inputPrompt
  });

  return c.text(text);
}