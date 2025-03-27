import { tool, experimental_generateImage as generateImage } from "ai";
import { carsInStock } from "./data/stock.js";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { getImageURL } from "./images/images.js";
import { searchReviews } from "./rag/embeddings.js";

export const carsInStockTool = tool({
  description: "Returns all cars in stock.",
  parameters: z.object({}),
  execute: async () => carsInStock
});

export const calculateTotalPriceTool = tool({
  description:
    "Calculates the total price for a car order. If two or more cars are ordered, a 15% discount is applied.",
  parameters: z.object({
    carIds: z.string().array().describe("The list of car ids in the order.")
  }),
  execute: async ({ carIds }) => {
    const cars = carsInStock.filter((car) => carIds.includes(car.id));
    if (cars.length === 0) return 0;
    return cars.length < 2 ? cars[0].price : cars.reduce((totalSum, car) => totalSum + car.price, 0) * 0.85;
  }
});

export const generateCarImageTool = tool({
  description: "Returns an URL of a image for the provided carId",
  parameters: z.object({
    carId: z.string().describe("ID of the car the image URL should be returned")
  }),
  execute: async ({ carId }) => {
    const car = carsInStock.find((car) => carId === car.id)!;

    const { image } = await generateImage({
      model: openai.image("dall-e-3"),
      prompt: `
          Image of a car with the properties provided after [CAR_PROPERTIES].
          It has to look like a photo of this car taken in a ${car.brand} car dealership.
          
          [CAR_PROPERTIES]
          ${JSON.stringify(car)}
      `,
      size: "1024x1024"
    });

    return getImageURL(image.uint8Array);
  }
});

export const retrieveReviewsTool = tool({
  description: "Returns relevant reviews with carIds for given search term",
  parameters: z.object({
    searchTerm: z.string().describe("searchTerm for retrieving relevant reviews")
  }),
  execute: async ({ searchTerm }) => {
    return searchReviews(searchTerm, 10);
  }
});