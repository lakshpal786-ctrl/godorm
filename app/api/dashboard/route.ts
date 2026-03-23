import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    applications: [
      { id: "a1", property_name: "Coral Court Residences", status: "submitted" },
      { id: "a2", property_name: "Union Yard Student Living", status: "under_review" }
    ],
    saved: [
      { id: "s1", property_name: "North Park Rooms" }
    ]
  });
}
