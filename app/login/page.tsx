"use client";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
  };

  const signInEmail = async () => {
    const email = prompt("Enter your email for magic link");
    if (!email) return;
    await supabase.auth.signInWithOtp({ email });
    alert("Check your email for login link.");
  };

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-white p-6">
      <h1 className="text-2xl font-bold">Login / Signup</h1>
      <p className="mt-2 text-sm text-zinc-600">Secure auth via Supabase.</p>
      <div className="mt-4 flex flex-col gap-3">
        <Button onClick={signInWithGoogle}>Continue with Google</Button>
        <Button variant="outline" onClick={signInEmail}>Continue with Email</Button>
      </div>
    </div>
  );
}
