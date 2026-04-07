# Kana'i's Roll Off & Junk Removal — Website

Production website for Kana'i's Roll Off & Junk Removal, a junk removal and dumpster rental company serving all of Oahu, Hawaii.

**Live:** [kanai-website.vercel.app](https://kanai-website.vercel.app)

## Tech Stack

- **Next.js 16** — App Router, Server Components, ISR
- **TypeScript** — Full type safety
- **Tailwind CSS v4** — Utility-first with custom design tokens
- **shadcn/ui** — Component library (Accordion, Button)
- **Framer Motion** — Scroll animations, stat counters
- **Supabase** — Database for stats, quotes, portal sessions
- **Vercel** — Hosting, Edge CDN, serverless API routes

## Design System — "Island Industrial"

Premium trade-company aesthetic. Dark theme, warm amber accents, Space Grotesk headings.

| Token | Value |
|-------|-------|
| `brand-dark` | #0F0F0E |
| `brand-cream` | #F5F2EE |
| `brand-amber` | #D4850A |
| `brand-amber-light` | #FDF3E3 |
| `font-heading` | Space Grotesk |
| `font-sans` | Inter |

## Features

### Customer-Facing
- **AI Junk Estimator** — Photo-based instant estimates (embedded from kanai-estimator-tool)
- **Quick Quote Widget** — Item picker with live volume/price calculator
- **Online Booking** — Multi-step flow for JR (requires estimate first) and DR (size/duration picker)
- **Customer Portal** — Phone-verified login, real job status from Workiz, reschedule/cancel
- **20 Neighborhood SEO Pages** — ISR-generated local pages for Oahu coverage
- **Live Stats** — Real job counts and tonnage from Supabase EOD data
- **Google Reviews** — Live review wall from Places API with fallback

### Integrations
- **GoHighLevel** — Lead capture, SMS verification, contact notes
- **Workiz** — Customer job lookup for portal
- **CallRail** — Dynamic phone number swap for call attribution
- **Google Maps** — Embedded maps on contact and service area pages
- **Supabase** — Shared database with EOD reporting systems

### SEO
- JSON-LD structured data (LocalBusiness, Service, FAQPage, BreadcrumbList)
- Auto-generated sitemap.xml with 30+ URLs
- robots.txt blocking /portal and /api/*
- Open Graph + Twitter Card meta
- ISR neighborhood pages with 24hr revalidation

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with 8 sections |
| `/junk-removal` | JR service page, item matrix, photo gallery |
| `/dumpster-rental` | DR sizes (7-30yd), material types, fee schedule |
| `/pricing` | Full pricing tables for JR and DR |
| `/estimate` | AI Estimator embed |
| `/quote` | Quick quote item picker |
| `/book` | Online booking flow |
| `/about` | Founders, team, trust badges |
| `/contact` | Form, Google Map, hours |
| `/service-area` | Oahu map + 20 neighborhood pages |
| `/portal` | Customer self-serve portal |

## Development

```bash
npm install
npm run dev
```

## Deployment

```bash
npm run build
npx vercel --prod --yes
```

## Environment Variables

Set in Vercel project settings:

| Variable | Required | Purpose |
|----------|----------|---------|
| `GHL_API_KEY` | Yes | GHL API for leads + SMS |
| `GHL_LOCATION_ID` | Yes | GHL location ID |
| `WORKIZ_API_TOKEN` | Yes | Workiz job lookup |
| `SUPABASE_URL` | Yes | Database connection |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Database auth |
| `GOOGLE_PLACES_API_KEY` | No | Live Google reviews |
| `MANAGER_PHONE_NUMBER` | No | Portal action alerts |

## Company

- **Kana'i's Roll Off & Junk Removal**
- 99-1295 Waiua Pl, Aiea, HI 96701
- (808) 201-2668
- Mon-Sat 8:00 AM - 6:00 PM
- Service area: All of Oahu
