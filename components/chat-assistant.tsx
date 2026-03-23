"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ChatAssistant() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const runSearch = async () => {
    setLoading(true);
    const res = await fetch("/api/properties/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    const encoded = encodeURIComponent(JSON.stringify(data));
    router.push(`/results?data=${encoded}`);
    setLoading(false);
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Tell GoDorm what you need</h2>
      <p className="mt-2 text-sm text-zinc-600">Example: Affordable near KCL with a social vibe.</p>
      <textarea
        className="mt-4 h-28 w-full rounded-md border border-zinc-300 p-3"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your ideal student housing"
      />
      <Button className="mt-4" onClick={runSearch} disabled={loading || !prompt.trim()}>
        {loading ? "Finding best matches..." : "Search with AI"}
      </Button>
    </div>
  );
}
