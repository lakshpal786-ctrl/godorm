import OpenAI from "openai";
import { SearchFilters } from "@/lib/types";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function intentToFilters(userPrompt: string): Promise<SearchFilters> {
  if (!process.env.OPENAI_API_KEY) {
    return {
      maxPrice: /affordable|budget|cheap/i.test(userPrompt) ? 240 : undefined,
      maxDistanceKm: /near|close/i.test(userPrompt) ? 2 : undefined,
      socialImportance: /social|friends|community/i.test(userPrompt) ? 0.45 : 0.25,
      budgetImportance: 0.3,
      distanceImportance: 0.25
    };
  }

  const completion = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content:
          "Extract student housing search filters. Return JSON with city, university, maxPrice, maxDistanceKm, roomType, socialImportance, budgetImportance, distanceImportance."
      },
      { role: "user", content: userPrompt }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "search_filters",
        strict: true,
        schema: {
          type: "object",
          properties: {
            city: { type: ["string", "null"] },
            university: { type: ["string", "null"] },
            maxPrice: { type: ["number", "null"] },
            maxDistanceKm: { type: ["number", "null"] },
            roomType: { type: ["string", "null"] },
            socialImportance: { type: ["number", "null"] },
            budgetImportance: { type: ["number", "null"] },
            distanceImportance: { type: ["number", "null"] }
          },
          additionalProperties: false,
          required: [
            "city",
            "university",
            "maxPrice",
            "maxDistanceKm",
            "roomType",
            "socialImportance",
            "budgetImportance",
            "distanceImportance"
          ]
        }
      }
    }
  });

  const payload = JSON.parse(completion.output_text) as SearchFilters;
  return payload;
}
