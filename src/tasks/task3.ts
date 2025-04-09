import { type CoreMessage, generateText } from "ai";
import { HTTPException } from "hono/http-exception";
import { openai } from "@ai-sdk/openai";
import { baseSystemPrompt } from "../system-prompt/system-prompt.js";
import type { Context } from "hono";

const messages: CoreMessage[] = [];

export async function task3RequestHandler(c: Context) {
  const inputPrompt = c.req.query("prompt");

  if (inputPrompt === undefined) {
    throw new HTTPException(422, { message: "Query parameter 'prompt' is required" });
  }

  messages.push({ role: "user", content: inputPrompt });

  const { text, response } = await generateText({
    model: openai("gpt-4o"),
    system: baseSystemPrompt,
    messages: messages
  });

  messages.push(...response.messages);

  return c.text(text);
}