import Link from "next/link";
import { RankedProperty } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function PropertyCard({ property }: { property: RankedProperty }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{property.name}</h3>
        <p className="text-coral-600 font-semibold">£{property.pricePerWeek}/wk</p>
      </div>
      <p className="mt-1 text-sm text-zinc-600">{property.city} • {property.distanceKm}km to campus</p>
      <p className="mt-2 text-sm">{property.explanation}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {property.insights.map((tag) => (
          <span key={tag} className="rounded-full bg-zinc-100 px-3 py-1 text-xs">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <Link href={`/property/${property.id}`}>
          <Button>View details</Button>
        </Link>
      </div>
    </div>
  );
}
