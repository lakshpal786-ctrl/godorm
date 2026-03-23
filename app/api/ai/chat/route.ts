import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { messages } = await req.json();

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OpenAI key missing" }, { status: 500 });
  }

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: messages
  });

  return NextResponse.json({ reply: response.output_text });
}
