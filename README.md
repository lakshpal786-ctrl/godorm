# GoDorm

GoDorm is a production-grade AI-first student accommodation platform built with Next.js, TypeScript, Tailwind, ShadCN-style UI primitives, Supabase, and OpenAI.

## 1) Project folder structure

```text
app/
  api/
    ai/chat/route.ts
    bookings/apply/route.ts
    dashboard/route.ts
    properties/search/route.ts
    properties/[id]/route.ts
    properties/save/route.ts
    sync/amber/route.ts
  dashboard/page.tsx
  login/page.tsx
  property/[id]/page.tsx
  results/page.tsx
  layout.tsx
  page.tsx
components/
  ui/button.tsx
  apply-form.tsx
  chat-assistant.tsx
  property-card.tsx
db/
  schema.sql
lib/
  ai.ts
  amber-client.ts
  ranking.ts
  supabase.ts
  types.ts
  utils.ts
```

## 2) Setup instructions (step-by-step)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
3. Fill `.env.local` with Supabase, OpenAI, and Amber API credentials.
4. Initialize Supabase schema by running `db/schema.sql` in Supabase SQL editor.
5. Run development server:
   ```bash
   npm run dev
   ```
6. Open `http://localhost:3000`.

## 3) Key files and responsibilities

- **Pages**: Homepage (`app/page.tsx`), results (`app/results/page.tsx`), property detail (`app/property/[id]/page.tsx`), dashboard (`app/dashboard/page.tsx`), login/signup (`app/login/page.tsx`).
- **API routes**: AI search and ranking (`app/api/properties/search/route.ts`), AI streaming chat (`app/api/ai/chat/route.ts`), property detail enrichment (`app/api/properties/[id]/route.ts`), booking flow (`app/api/bookings/apply/route.ts`), dashboard data (`app/api/dashboard/route.ts`), save property (`app/api/properties/save/route.ts`), sync cron (`app/api/sync/amber/route.ts`).
- **Database schema**: `db/schema.sql`.

## 4) AI integration

- `lib/ai.ts`: Converts natural-language intent to normalized filters using OpenAI structured output (JSON schema), with safe fallback heuristics if no API key.
- `app/api/ai/chat/route.ts`: Chat response endpoint for assistant UX (easy to upgrade to SSE streaming).

## 5) Sample ranking function

`lib/ranking.ts` computes weighted score from:
- distance score
- budget score
- social preference score

Then generates insight labels and explanation text (“Why this property?”).

## 6) Amber API integration (mocked adapter)

- `lib/amber-client.ts` is the supply adapter.
- Current implementation uses local mock inventory for reliability and testing.
- Replace internals with real Amber API fetch logic, keeping the interface stable so frontend never receives raw provider payloads.

## 7) Deployment (Vercel + Supabase)

1. Push repository to GitHub.
2. Import project in Vercel.
3. Add all environment variables from `.env.example` to Vercel.
4. Point Supabase Auth redirect URLs to your Vercel domain.
5. Run schema SQL in Supabase production project.
6. Configure cron (Vercel Cron or Supabase scheduled function) to call `/api/sync/amber` periodically.
7. Deploy.

## Bonus features included

- Recommendation explanation string per property (`explanation` field).
- Preference weighting support in ranking inputs (basis for saved preference learning).
