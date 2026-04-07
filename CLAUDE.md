# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Build & Dev

```bash
npm run dev          # Next.js dev server on http://localhost:3000
npm run build        # Production build
npm run lint         # ESLint
npx vercel --prod --yes  # Deploy to Vercel
```

## Architecture

**Framework:** Next.js 16 (App Router) with TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion.

**Design System:** "Island Industrial" — dark theme, premium trade company aesthetic.
- Brand colors: `brand-dark` (#0F0F0E), `brand-cream` (#F5F2EE), `brand-amber` (#D4850A), `brand-amber-light` (#FDF3E3)
- Fonts: Space Grotesk (headings via `font-heading`), Inter (body via `font-sans`)
- Tokens defined in `src/app/globals.css` via Tailwind v4 `@theme` block

**Key directories:**
- `src/app/` — Pages and API routes (App Router)
- `src/components/` — Layout components (Header, Footer, StickyMobileCTA)
- `src/components/home/` — Homepage section components
- `src/components/ui/` — shadcn/ui components
- `src/lib/` — Utilities, schema helpers, neighborhood data
- `public/images/` — Optimized site photography
- `supabase/migrations/` — Database schema

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Homepage — hero, trust bar, stats, how it works, services, reviews, eco, FAQ |
| `/junk-removal` | Service page with item matrix, gallery, pricing |
| `/dumpster-rental` | Size selector, material types, fees, booking links |
| `/pricing` | Full pricing tables, fee schedule |
| `/estimate` | AI Estimator (iframe of kanai-estimator-tool.vercel.app) |
| `/estimate/field` | On-site estimate form (iframe) |
| `/quote` | Quick quote widget — item picker, volume calc, lead capture |
| `/book` | Multi-step booking — JR requires estimate first, DR has size/duration picker |
| `/about` | Founders, team photos, trust badges |
| `/contact` | Contact form, Google Map, hours |
| `/service-area` | Oahu coverage map + neighborhood grid |
| `/service-area/[neighborhood]` | 20 ISR neighborhood pages for local SEO |
| `/portal` | Customer portal — phone verification login |
| `/portal/dashboard` | Job status, reschedule, cancel, review link |

## API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/book` | POST | Booking → GHL contact with tags + notes |
| `/api/ghl-lead` | POST | Lead capture → GHL contact |
| `/api/reviews` | GET | Google Places reviews (cached 1hr) |
| `/api/stats` | GET | Live job count + tons from Supabase |
| `/api/workiz-webhook` | POST | Workiz status webhook receiver |
| `/api/portal/verify` | POST | SMS verification via GHL |
| `/api/portal/jobs` | GET | Fetch customer jobs from Workiz by phone |
| `/api/portal/action` | POST | Reschedule/cancel → GHL note + SMS |

## Key Patterns

**Pricing language:** Always use "estimated starting price" for online tools. Never "quote" or "Not-to-Exceed." The firm price is given on-site by the team lead. Customer owes nothing if they decline.

**Booking flow:** JR requires an estimated price first (redirects to /estimate or /quote). DR goes straight to size/duration selection. Both create GHL contacts with service-specific tags. CSRs handle actual booking in Workiz (JR) or Docket (DR).

**Dumpster rules:** Each dumpster must contain one material type only. Mixing = $150 surcharge. Concrete/aggregate/stone/dirt = 7-yard dumpster ONLY.

**Phone number:** (808) 201-2668 is the base number. CallRail swap.js dynamically replaces it with tracking numbers per visitor source.

## Integrations

- **GHL** — Lead capture, contact creation, SMS sending, notes
- **Workiz** — Job lookup for customer portal
- **Supabase** — Stats (job counts, tonnage from EOD reports)
- **CallRail** — Call tracking script (swap.js)
- **Google Maps** — Embedded maps on contact and service area pages
- **Google Places** — Review wall (needs GOOGLE_PLACES_API_KEY)

## Environment Variables (Vercel)

- `GHL_API_KEY` — GoHighLevel API key
- `GHL_LOCATION_ID` — GHL location
- `WORKIZ_API_TOKEN` — Workiz API token
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key
- `GOOGLE_PLACES_API_KEY` — For live reviews (optional, falls back to placeholders)
- `MANAGER_PHONE_NUMBER` — For portal reschedule/cancel alerts

## Company Info

- **Company:** Kana'i's Roll Off & Junk Removal
- **Address:** 99-1295 Waiua Pl, Aiea, HI 96701
- **Phone:** (808) 201-2668
- **Hours:** Mon-Sat 8:00 AM - 6:00 PM
- **Service area:** All of Oahu
