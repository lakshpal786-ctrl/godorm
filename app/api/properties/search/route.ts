import { NextRequest, NextResponse } from "next/server";
import { intentToFilters } from "@/lib/ai";
import { searchAmberProperties } from "@/lib/amber-client";
import { rankProperties } from "@/lib/ranking";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const prompt = body.prompt as string;

  const filters = await intentToFilters(prompt);
  const raw = await searchAmberProperties(filters);
  const ranked = rankProperties(raw, filters);

  return NextResponse.json(ranked);
}
