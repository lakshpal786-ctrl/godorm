import { notFound } from "next/navigation";
import { ApplyForm } from "@/components/apply-form";

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/properties/${id}`, {
    cache: "no-store"
  });

  if (!res.ok) return notFound();
  const property = await res.json();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section>
        <h1 className="text-3xl font-bold">{property.name}</h1>
        <p className="mt-2 text-zinc-600">{property.description}</p>
        <div className="mt-4 space-y-1 text-sm">
          <p><strong>Price:</strong> £{property.pricePerWeek}/week</p>
          <p><strong>Distance:</strong> {property.distanceKm} km to campus</p>
          <p><strong>Room type:</strong> {property.roomType}</p>
          <p><strong>Map:</strong> {property.lat}, {property.lng}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {property.insights.map((i: string) => (
            <span key={i} className="rounded-full bg-zinc-100 px-3 py-1 text-xs">{i}</span>
          ))}
        </div>
      </section>
      <ApplyForm propertyId={property.id} />
    </div>
  );
}
