import { NextRequest, NextResponse } from "next/server";
import { submitAmberApplication } from "@/lib/amber-client";

export async function POST(req: NextRequest) {
  const payload = await req.json();

  const provider = await submitAmberApplication(payload);

  // Persist in Supabase (example, omitted for portability)
  // await supabase.from('applications').insert({ ...payload, provider_reference: provider.providerReference })

  return NextResponse.json({
    status: provider.status,
    reference: provider.providerReference
  });
}
