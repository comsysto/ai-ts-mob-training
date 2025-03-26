import { tool } from "ai";
import { carsInStock } from "./data/stock.js";
import { z } from "zod";

export const carsInStockTool = tool({
  description: "Returns all cars in stock.",
  parameters: z.object({}),
  execute: async () => carsInStock,
});

export const calculateTotalPriceTool = tool({
  description:
    "Calculates the total price for a car order. If two or more cars are ordered, a 15% discount is applied.",
  parameters: z.object({
    carIds: z.string().array().describe("The list of car ids in the order."),
  }),
  execute: async ({ carIds }) => {
    const cars = carsInStock.filter((car) => carIds.includes(car.id));
    if (cars.length === 0) return 0;
    return cars.length < 2 ? cars[0].price : cars.reduce((totalSum, car) => totalSum + car.price, 0) * 0.85;
  },
});
