import { PropertyCard } from "@/components/property-card";
import { RankedProperty } from "@/lib/types";

export default async function ResultsPage({
  searchParams
}: {
  searchParams: Promise<{ data?: string }>;
}) {
  const params = await searchParams;
  const properties: RankedProperty[] = params.data
    ? JSON.parse(decodeURIComponent(params.data))
    : [];

  return (
    <div>
      <h1 className="text-2xl font-bold">Recommended properties</h1>
      <div className="mt-6 grid gap-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      {!properties.length && <p className="mt-4 text-zinc-600">Use AI search from homepage to get ranked results.</p>}
    </div>
  );
}
