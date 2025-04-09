import { HTTPException } from "hono/http-exception";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import type { Context } from "hono";

export async function task1RequestHandler(c: Context) {
  const inputPrompt = c.req.query("prompt");

  if (inputPrompt === undefined) {
    throw new HTTPException(422, { message: "Query parameter 'prompt' is required" });
  }

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt: inputPrompt
  });

  return c.text(text);
}