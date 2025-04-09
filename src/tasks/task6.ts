import { type CoreMessage, generateText } from "ai";
import { HTTPException } from "hono/http-exception";
import { openai } from "@ai-sdk/openai";
import { calculateTotalPriceTool, carsInStockTool, generateCarImageTool, retrieveReviewsTool } from "../tools/tools.js";
import { baseSystemPrompt } from "../system-prompt/system-prompt.js";
import type { Context } from "hono";

const messages: CoreMessage[] = [];

export async function task6RequestHandler(c: Context) {
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
      generateCarImage: generateCarImageTool,
      retrieveReviews: retrieveReviewsTool
    },
    maxSteps: 10,
    system: `
        ${baseSystemPrompt}
        
        If you retrieved relevant reviews, include them in the output and only consider their content when providing
        suggestions and do not make up additional information.
    `,
    messages: messages
  });

  messages.push(...response.messages);

  return c.text(text);
}