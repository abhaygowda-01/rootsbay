@AGENTS.md

# Rootsbay website — context for Claude Code

Marketing + enquiry site for **Rootsbay** (rootsbay.co), an agro-export company in Vijayanagar, Bengaluru.
Founder: Abhay S Gowda. First product line: areca palm leaf tableware (20 SKUs, RB-AL-01 … RB-AL-20).
Audience: international B2B buyers — importers, distributors, caterers, eco retailers. The site's one job
is to show the range clearly and turn visitors into quote requests.

The brief: simple, attractive, professional, not too many elements. Keep it that way — resist adding
sections, carousels, popups or animations unless asked.

## Stack
- Next.js 16 (App Router, Turbopack, `cacheComponents: true`), React 19, TypeScript, Tailwind CSS v4
- Read `node_modules/next/dist/docs/` before using unfamiliar APIs — this Next version differs from older training data
  (e.g. `params` is a Promise, `PageProps<'/route'>` is a global type, `dynamicParams` is not allowed with cacheComponents,
  `middleware` is now `proxy`, `next/image` `qualities` defaults to [75])
- zod v4 for validation, fonts self-hosted via @fontsource (no Google Fonts call at build)
- No database. Enquiries go out by email (Resend) and/or a webhook. See `.env.example`.

## Where things live
| What | File |
| --- | --- |
| Company details (phone, email, address, GSTIN, socials) | `lib/site.ts` |
| Products, filters, shared range claims | `lib/products.ts` |
| Form schema (shared client + server) | `lib/enquiry-schema.ts` |
| Enquiry API | `app/api/enquiry/route.ts` → `lib/notify.ts` (Resend / webhook / dev file) |
| Rate limiting (in-memory) | `lib/rate-limit.ts` |
| Home page sections | `app/page.tsx` |
| Product detail pages (static, 20) | `app/products/[slug]/page.tsx` |
| Design tokens (colours, fonts) | `app/globals.css` `@theme` |
| Logo files (cut from signboard photo) | `public/brand/` ; favicon `app/icon.png` |
| Product images | `public/images/products/NN.webp` (NN = SKU number) |
| Catalogue PDF | `public/rootsbay-areca-catalog.pdf` |

## Design system (keep consistent)
- Colours from the signboard: forest `#1e5a3c`, canopy `#133827` (hero/footer), brass `#b8893b` (rules, outlines,
  dimension lines), rust `#c2602f` (errors only + logo tagline), sheath `#efe5cf` (natural leaf tone, image backdrops)
- Type: Bricolage Grotesque (headings), Figtree (body). Sentence case everywhere, no all-caps labels.
- Signature idea: **dimensions as decoration** — brass dimension line under hero/product images (`.dim`) and
  to-scale outlines of each product in a 12″ frame (`components/ShapeOutline.tsx`). Don't add other ornaments.
- Only motion: one hero load reveal (`.rise`). Respect reduced motion.

## Open items (confirm with Rootsbay before launch)
1. **GSTIN** — signboard reads `29EHIPG1769RIZE`; site uses `29EHIPG1769R1ZE` (correct format). Confirm.
2. **Product photos** — SKUs 01–04 use real photos; 05–20 are small crops from the PDF collage (upscaled, soft).
   Replace with proper photos at ≥1200 px, same filenames.
3. **Copy to verify**: "we reply within one working day" promise (form + auto-reply), process steps (soak, sun-dry, inspect, export cartons) and About text (sourcing, QC,
   paperwork, shipping) are reasonable defaults, not supplied facts. Catalogue claims (100 °C, microwave 2 min,
   compostable 60–90 days, 350 ml) come from the supplied PDF.
4. MOQ, pricing basis (FOB/CIF), certifications (FSSAI, IEC, APEDA, FDA/LFGB tests), packing (pcs/carton),
   lead time, export markets — none supplied. Add a short "Ordering" block or FAQ once known.
5. WhatsApp number assumed same as phone.
6. Logo is cut from a phone photo of the signboard — swap in the original vector/PNG from the designer.
7. Email delivery: set `RESEND_API_KEY` + verify rootsbay.co in Resend, or set `ENQUIRY_WEBHOOK_URL`.

## Commands
- `npm run dev` — local dev (enquiries saved to `.data/enquiries.jsonl` when no channel is configured)
- `npm run build && npm start` — production check
- `npm run lint`
- Deploy: push to GitHub → import in Vercel → add env vars → point rootsbay.co DNS to Vercel.

## Natural next steps
- Ordering / FAQ block (MOQ, samples, lead time, Incoterms, certifications)
- Real product photography; maybe a 2-up gallery per product
- Swap in-memory rate limit for Upstash if spam appears; add Cloudflare Turnstile if needed
- Add new agro product lines via `categories` in `lib/products.ts` (grid and pages are category-ready)
- Analytics (Vercel Analytics or GA4) and Google Search Console + sitemap submission
