import { NextResponse } from "next/server";
import { searchAmberProperties } from "@/lib/amber-client";

export async function GET() {
  const inventory = await searchAmberProperties({});

  // Example write-through to Supabase inventory table.
  // await supabase.from('properties').upsert(inventory)

  return NextResponse.json({
    synced: inventory.length,
    syncedAt: new Date().toISOString()
  });
}
