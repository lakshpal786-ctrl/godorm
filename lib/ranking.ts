import { Property, RankedProperty, SearchFilters } from "@/lib/types";

function normalize(value: number, min: number, max: number) {
  if (max === min) return 1;
  return (value - min) / (max - min);
}

export function rankProperties(properties: Property[], filters: SearchFilters): RankedProperty[] {
  const prices = properties.map((p) => p.pricePerWeek);
  const distances = properties.map((p) => p.distanceKm);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const minDistance = Math.min(...distances);
  const maxDistance = Math.max(...distances);

  const budgetWeight = filters.budgetImportance ?? 0.35;
  const distanceWeight = filters.distanceImportance ?? 0.4;
  const socialWeight = filters.socialImportance ?? 0.25;

  return properties
    .map((property) => {
      const budgetScore = 1 - normalize(property.pricePerWeek, minPrice, maxPrice);
      const distanceScore = 1 - normalize(property.distanceKm, minDistance, maxDistance);
      const socialScore = property.socialScore / 100;

      const score =
        budgetWeight * budgetScore + distanceWeight * distanceScore + socialWeight * socialScore;

      const insights = [
        property.distanceKm < 1.5 ? "Close to campus" : "Reasonable commute",
        property.pricePerWeek < 230 ? "Budget friendly" : "Premium student experience",
        property.socialScore > 75 ? "Best for students who want social life" : "Balanced study-focused vibe"
      ];

      const explanation = `Scored ${(score * 100).toFixed(1)} based on distance (${(
        distanceScore * 100
      ).toFixed(0)}), price (${(budgetScore * 100).toFixed(0)}), and social fit (${(
        socialScore * 100
      ).toFixed(0)}).`;

      return {
        ...property,
        score,
        insights,
        explanation
      };
    })
    .sort((a, b) => b.score - a.score);
}
