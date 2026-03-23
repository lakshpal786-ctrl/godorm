import { NextResponse } from "next/server";
import { getAmberPropertyById } from "@/lib/amber-client";
import { rankProperties } from "@/lib/ranking";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getAmberPropertyById(id);
  if (!property) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const enriched = rankProperties([property], {
    budgetImportance: 0.33,
    distanceImportance: 0.33,
    socialImportance: 0.34
  })[0];

  return NextResponse.json(enriched);
}
