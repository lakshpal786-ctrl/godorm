import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { propertyId } = await req.json();

  // Example Supabase persistence
  // await supabase.from('saved_properties').insert({ property_id: propertyId, user_id })

  return NextResponse.json({ ok: true, propertyId });
}
