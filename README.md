# Rootsbay website

Website for [Rootsbay](https://www.rootsbay.co) — agro exports from Bengaluru, starting with areca palm leaf tableware.

- Separate pages: home, `/products` (hub), `/about`, `/how-its-made`, `/certificates`, `/contact`
- Product lines as their own pages under `/products/<line>`: biodegradable tableware (live, 20 items with a shape filter), agriculture and handicrafts (coming soon)
- 20 static product pages at `/products/biodegradable-tableware/<slug>` with specs and a "request a quote for this item" link
- A "Products" title bar on every `/products` page with one tab per line
- Working enquiry backend at `POST /api/enquiry` (validation, honeypot + timing spam guard, rate limit, email/webhook delivery)
- SEO: per-page title, description, canonical and share card, `sitemap.xml`, `robots.txt`, Organization, Breadcrumb, Product and ItemList JSON-LD

## Run it

```bash
npm install
cp .env.example .env.local   # optional for local testing
npm run dev                  # http://localhost:3000
```

Without email settings, test enquiries are written to `.data/enquiries.jsonl` in dev.

## Make the form send email

1. Sign up at resend.com, create an API key.
2. Add and verify the `rootsbay.co` domain (Resend shows the DNS records to add).
3. Set `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` (see `.env.example`).

Prefer a spreadsheet? Set `ENQUIRY_WEBHOOK_URL` to a Google Apps Script web app that appends rows to a Sheet — both can run together.

## Deploy (Vercel)

1. Push this folder to a GitHub repo.
2. Import it in Vercel (framework auto-detected).
3. Add the environment variables.
4. Add `rootsbay.co` and `www.rootsbay.co` under Domains and update DNS at the registrar.

## Editing content

| Change | File |
| --- | --- |
| Phone, email, address, GSTIN, social links | `lib/site.ts` |
| Products (names, sizes, text, images) and product lines | `lib/products.ts` + `public/images/products/` |
| Certificates and export documents | `lib/certificates.ts` + `public/certificates/` |
| Buyer Q&A on the tableware page | `lib/faq.ts` |
| Page text | `app/page.tsx`, `app/about/`, `app/how-its-made/`, `app/contact/`, `app/products/` |
| Colours and fonts | `app/globals.css` |

See `CLAUDE.md` for the full map, design rules and the list of things to confirm with Rootsbay before launch.
