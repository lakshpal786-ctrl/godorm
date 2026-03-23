import { ChatAssistant } from "@/components/chat-assistant";

export default function HomePage() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <section>
        <p className="text-coral-600 font-medium">AI-first accommodation discovery</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Find your best student home with confidence</h1>
        <p className="mt-4 text-zinc-600">
          GoDorm translates your lifestyle and budget preferences into ranked options, clear insights,
          and a frictionless in-app application flow.
        </p>
      </section>
      <ChatAssistant />
    </div>
  );
}
