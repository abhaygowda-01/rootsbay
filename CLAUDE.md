@AGENTS.md

# Rootsbay website — context for Claude Code

Marketing + enquiry site for **Rootsbay** (rootsbay.co), an agro-export company in Vijayanagar, Bengaluru.
Founder: Abhay S Gowda. Live lines: areca palm leaf tableware (20 SKUs, RB-AL-01 … RB-AL-20) and, under
Agriculture, rice (10 varieties, RB-RC-01 … RB-RC-10). The home page is a company overview: no product specifications there.
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
- Owner works on Windows + VS Code (PowerShell). `.vscode/`, `.editorconfig` and `.gitattributes` (LF line endings) are set up for that.

## Where things live
| What | File |
| --- | --- |
| Company details (phone, email, address, GSTIN, socials, founder, ordering terms) | `lib/site.ts` |
| Products, product lines, filters, shared range claims | `lib/products.ts` (`Product` = `TablewareProduct` \| `RiceProduct`, split on `kind`) |
| Rice varieties and "With every rice order" facts | `lib/rice.ts`; pictures in `public/images/rice/` |
| Form schema (shared client + server) | `lib/enquiry-schema.ts` |
| Enquiry API | `app/api/enquiry/route.ts` → `lib/notify.ts` (Resend / webhook / dev file) |
| Rate limiting (in-memory) | `lib/rate-limit.ts` |
| Pages | `app/page.tsx` (home), `app/about/`, `app/how-its-made/`, `app/certificates/`, `app/contact/` |
| Products hub + "Products" title bar | `app/products/page.tsx`, `app/products/layout.tsx`, `components/ProductsNav.tsx` |
| Product lines (agriculture, handicrafts, biodegradable tableware) | `categories` in `lib/products.ts`; page `app/products/[category]/page.tsx` |
| Product detail pages (static, 20) | `app/products/[category]/[slug]/page.tsx` → `/products/biodegradable-tableware/<slug>` |
| Per-page metadata, canonical, breadcrumbs | `pageMeta()` and `breadcrumbJsonLd()` in `lib/seo.ts`; `components/Breadcrumbs.tsx` |
| Certificates (GST, IEC, Udyam published) | `lib/certificates.ts` + `public/certificates/` (PDF and page-one `.webp` per certificate) |
| Buyer Q&A (SEO answer blocks) | `lib/faq.ts` |
| "Ordering at a glance" panel (hidden until filled) | `ordering` in `lib/site.ts`, `components/OrderingTerms.tsx` |
| Nav links (header + footer) | `mainNav` in `lib/site.ts` |
| Design tokens (colours, fonts) | `app/globals.css` `@theme` |
| Logo files (cut from signboard photo) | `public/brand/` ; favicon `app/icon.png` |
| Product images | `public/images/products/NN.webp` (NN = SKU number) |
| Range overview picture (home + tableware page) | `public/images/range-overview.webp`, `components/RangeOverview.tsx` |

## Design system (keep consistent)
- Colours from the signboard: forest `#1e5a3c`, canopy `#133827` (hero/footer), brass `#b8893b` (rules, outlines,
  dimension lines), rust `#c2602f` (errors only + logo tagline), sheath `#efe5cf` (natural leaf tone, image backdrops)
- Type: Bricolage Grotesque (headings), Figtree (body). Sentence case everywhere, no all-caps labels.
- Signature idea: **dimensions as decoration** — brass dimension line under hero/product images (`.dim`) and
  to-scale outlines of each product in a 12″ frame (`components/ShapeOutline.tsx`). Don't add other ornaments.
- Only motion: one hero load reveal (`.rise`). Respect reduced motion.
- Product codes (RB-AL-NN) are for Rootsbay's internal reference: never show them in visible page text. They stay in
  `?product=` links, the Product JSON-LD `sku` and the enquiry email to Rootsbay.

## Open items (confirm with Rootsbay before launch)
The README has the full handover table (what to fill, and where). In short:
1. **GSTIN** — confirmed: `29EHIPG1769R1ZE` matches the GST certificate dated 16 Sep 2026 (the signboard spelling `...RIZE` was a misread).
2. **Product photos** — SKUs 01–04 use real photos; 05–20 are small crops from the PDF collage (upscaled, soft).
   Replace with proper photos at ≥1200 px, same filenames.
3. **Copy to verify**: the "we reply within one working day" promise (form + auto-reply), process steps (soak, sun-dry, inspect,
   export cartons), About text (sourcing, QC, paperwork, shipping), SKU pitch lines (`lib/products.ts`) and buyer Q&A (`lib/faq.ts`)
   are reasonable defaults, not supplied facts. Specification claims (100 °C, microwave 2 min, compostable 60–90 days, 350 ml) come
   from the spec sheet Rootsbay supplied. The brochure PDF was removed from the site (its pictures duplicated the product photos).
4. **Ordering terms** (MOQ, pricing basis, lead time, packing, samples, markets) — none supplied. Fill `ordering` in `lib/site.ts`;
   the panel on `/contact` stays hidden until at least one field has text.
5. **Certificates** — `/certificates` publishes the GST, IEC and Udyam certificates (PDFs + page-one previews in
   `public/certificates/`). Food-contact test report, compostability certificate, certificate of origin and phytosanitary
   certificate read "Ask us" until the real file is added and its entry in `lib/certificates.ts` is set to `status: "held"`.
   Never mark a document held, or write "FDA approved" / "certified compostable", without the paper.
6. **Public contact details** (`lib/site.ts` → `contact`): email is `connect@rootsbay.co`; phone is `+91 83103 05693`, supplied by
   Rootsbay in October 2026. WhatsApp is assumed to be that same number. The Udyam PDF and preview still print Abhay's personal
   mobile and Gmail; Rootsbay confirmed that is fine to publish.
7. **"Coming soon" lines** (handicrafts) are `noindex` and left out of the sitemap until their `status` in
   `lib/products.ts` becomes `"available"`. Their intro copy names no specific products — add real ones then.
   **Rice** (agriculture): descriptions are general variety facts, not a Rootsbay spec; "With every rice order" promises,
   Jyothi as red rice, and the rice Q&A need Rootsbay's confirmation. Rice pictures are AI-generated stand-ins
   (Canva, 1200 × 900; originals in the Canva design "Rice Photo Board"), to be replaced by photos of Rootsbay's own rice.
8. Logo is cut from a phone photo of the signboard — swap in the original vector/PNG from the designer.
9. Email delivery: set `RESEND_API_KEY` (and verify rootsbay.co in Resend for a branded sender), or set `ENQUIRY_WEBHOOK_URL`.
10. **No personal details of whoever built the site** belong in the repo, on the site, or in git author fields. Only Rootsbay and
    Abhay S Gowda details taken from the certificates. Keep it that way when editing.

## Commands (Windows / PowerShell / VS Code)
- `npm run dev` — local dev at http://localhost:3000 (enquiries saved to `.data/enquiries.jsonl` when no channel is configured)
- `npm run verify` — lint + type check + production build; then `npm start` to serve the build
- `npm run lint`, `npm run typecheck`, `npm run clean` (deletes `.next`)
- New PC: `npm install`, then `Copy-Item .env.example .env.local`. VS Code tasks and debug config are in `.vscode/`.
- Deploy: commit, then `npm run deploy` (`scripts/deploy.mjs`: `git archive HEAD` to a temp folder, then `vercel deploy --prod`
  into project `rootsbay-exports`, live at https://rootsbay-exports.vercel.app). Vercel is NOT connected to GitHub on purpose:
  the Hobby plan blocks deploys whose commit author isn't the account owner, and commits stay authored "Rootsbay Website"
  (open item 10). Pushing to GitHub is backup only. New PC: `npx vercel login`, `npx vercel link --project rootsbay-exports`.

## Natural next steps
- Fill the ordering terms (open item 4) and add more buyer Q&A once MOQ, samples, lead time and Incoterms are known
- Real product photography; maybe a 2-up gallery per product
- Swap in-memory rate limit for Upstash if spam appears; add Cloudflare Turnstile if needed
- Add products to a new line by setting its `categories` entry to `status: "available"` and adding items with that `category`
  (the category page, products bar, hub cards, sitemap and product URLs all follow). Add a `faqByCategory` entry in `lib/faq.ts` for its buyer Q&A.
- Real photography for the coming-soon lines, then an `image` on their `categories` entry for the hub and home cards
- Analytics (Vercel Analytics or GA4) and Google Search Console + sitemap submission
