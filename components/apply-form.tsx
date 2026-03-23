"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ApplyForm({ propertyId }: { propertyId: string }) {
  const [state, setState] = useState({
    fullName: "",
    email: "",
    phone: "",
    moveInDate: ""
  });
  const [result, setResult] = useState<string | null>(null);

  const apply = async () => {
    const res = await fetch("/api/bookings/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ propertyId, ...state })
    });
    const data = await res.json();
    setResult(data.status === "submitted" ? "Application sent successfully." : "Could not submit.");
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4">
      <h3 className="text-lg font-semibold">Apply in GoDorm</h3>
      <div className="mt-3 grid gap-2">
        <input className="rounded border p-2" placeholder="Full name" onChange={(e) => setState((s) => ({ ...s, fullName: e.target.value }))} />
        <input className="rounded border p-2" placeholder="Email" onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))} />
        <input className="rounded border p-2" placeholder="Phone" onChange={(e) => setState((s) => ({ ...s, phone: e.target.value }))} />
        <input className="rounded border p-2" type="date" onChange={(e) => setState((s) => ({ ...s, moveInDate: e.target.value }))} />
      </div>
      <Button className="mt-3" onClick={apply}>Submit application</Button>
      {result && <p className="mt-2 text-sm text-zinc-700">{result}</p>}
    </div>
  );
}
