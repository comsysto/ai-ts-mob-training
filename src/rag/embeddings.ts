import * as lancedb from "@lancedb/lancedb";
import * as arrow from "apache-arrow";
import "@lancedb/lancedb/embedding/openai";
import { EmbeddingFunction, getRegistry, LanceSchema } from "@lancedb/lancedb/embedding";

const database = await lancedb.connect("database");

const embeddingFunction = getRegistry().get("openai")
  ?.create({ model: "text-embedding-3-small" }) as EmbeddingFunction;

const reviewSchema = LanceSchema({
  content: embeddingFunction.sourceField(new arrow.Utf8()),
  carId: new arrow.Utf8,
  vector: embeddingFunction.vectorField()
});

const table = await database.createEmptyTable("reviews", reviewSchema, {
  mode: "overwrite"
});

type ReviewEntity = {
  carId: string;
  content: string;
}

export async function embedReviews(reviews: ReviewEntity[]) {
  await table.add(reviews);
}

export async function searchReviews(searchTerm: string, limit = 2): Promise<ReviewEntity[]> {
  const result = await table.search(searchTerm).limit(limit).toArray();

  return result.map(entry => ({ content: entry.content, carId: entry.carId }));
}