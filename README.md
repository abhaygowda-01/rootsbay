# Rootsbay website

Website for [Rootsbay](https://www.rootsbay.co), the agro-export company run by Abhay S Gowda in Vijayanagar, Bengaluru. It shows the range, publishes the company's registrations, and turns visitors into quote requests.

Built with Next.js 16, React 19, TypeScript and Tailwind CSS 4. There is no database: enquiries go out by email and/or a webhook.

This guide is written for a Windows PC with VS Code. Every command is for **PowerShell** (the default terminal in VS Code on Windows).

## What is on the site

| Page | Address | Content lives in |
| --- | --- | --- |
| Home | `/` | `app/page.tsx` |
| Products hub (with the title bar of product lines) | `/products` | `app/products/page.tsx` |
| Biodegradable tableware (live, 20 products, shape filter, buyer Q&A) | `/products/biodegradable-tableware` | `lib/products.ts`, `lib/faq.ts` |
| Agriculture: rice (live, 10 varieties, white/red filter, buyer Q&A) | `/products/agriculture` | `lib/rice.ts`, `lib/faq.ts` |
| Handicrafts (coming soon) | `/products/handicrafts` | `categories` in `lib/products.ts` |
| 20 product pages | `/products/biodegradable-tableware/<name>` | `lib/products.ts` |
| 10 rice pages | `/products/agriculture/<name>` | `lib/rice.ts` |
| About | `/about` | `app/about/page.tsx` |
| How it's made | `/how-its-made` | `app/how-its-made/page.tsx` |
| Certificates (GST, IEC, Udyam published) | `/certificates` | `lib/certificates.ts`, `public/certificates/` |
| Contact and quote form | `/contact` | `app/contact/page.tsx`, `components/EnquiryForm.tsx` |
| Enquiry endpoint | `POST /api/enquiry` | `app/api/enquiry/route.ts`, `lib/notify.ts` |

Search engine setup is automatic: each page has its own title, description, address (canonical) and share image, plus `sitemap.xml`, `robots.txt` and structured data. The "coming soon" product lines are hidden from search engines until they are switched to available.

## Run it on your PC (Windows + VS Code)

### 1. Install once

- **Node.js** LTS, version 20.9 or newer (22 LTS is fine): <https://nodejs.org>. Reopen VS Code after installing.
- **Git for Windows**: <https://git-scm.com/download/win>
- **VS Code**: <https://code.visualstudio.com>

### 2. Open the project

In VS Code choose **File → Open Folder** and pick the `rootsbay-website` folder. Accept the prompt to install the recommended extensions (ESLint, Tailwind CSS IntelliSense, EditorConfig). The `.vscode` folder already holds the settings, tasks and debug setup.

### 3. Start the site

Open the terminal with **Ctrl+`** and run:

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Then open <http://localhost:3000>. Stop the server with **Ctrl+C**.

Shortcuts in VS Code:

- **Ctrl+Shift+B** starts the site (task "Start site on localhost:3000").
- **F5** starts it with the debugger attached (choose "Next.js: server + browser (Edge)").
- **Ctrl+Shift+P → Tasks: Run Task** offers Lint, Type check and a full pre-publish check.

## Check everything on localhost

Open each address below and tick it off.

| Address | What to look for |
| --- | --- |
| `/` | Company overview: what Rootsbay does, the four steps of an order, product-line cards, links to other pages. No product specifications. |
| `/products` | Title bar with All products / Biodegradable tableware / Agriculture / Handicrafts; the active tab is underlined |
| `/products/biodegradable-tableware` | 20 product cards, shape filter chips, facts, buyer Q&A |
| `/products/biodegradable-tableware/9-inch-round-deep-rim-plate` | Large photo, description, specs, to-scale outline, "Request a quote for this item" |
| `/products/agriculture` | 10 rice cards, White rice / Red rice filter, "With every rice order", buyer Q&A |
| `/products/agriculture/rajamudi-red-rice` | Photo, description, rice type and origin, "Request a quote for this item" |
| `/products/handicrafts` | "Coming soon" page with a "Tell us what you need" button |
| `/about` | Founder name, story, product lines |
| `/how-its-made` | Four steps with a "For you" line under each |
| `/certificates` | GST, IEC and Udyam cards with previews and PDF links; table of other documents ("Ask us") |
| `/contact` | Contact details, quote form |
| `/contact?product=RB-AL-04` | The 9 × 6" tray is already ticked in the form |
| `/contact?topic=documents` | The message box is already filled in |
| `/products/4-inch-round-dessert-plate` | Redirects to `/products/biodegradable-tableware/4-inch-round-dessert-plate` |
| `/anything-else` | The "Page not found" page |

Also check:

- **Phone view.** Press **F12** in Edge or Chrome, then **Ctrl+Shift+M**. The menu button (three lines) should open the page list.
- **The quote form.** Fill it in, wait about three seconds after the page loads (faster submissions are treated as spam), and send. With no email set up, the enquiry is saved to `.data\enquiries.jsonl`. Open that file in VS Code to see it. It is not committed to git.
- **Production mode.** Run `npm run verify` (lint, type check, build) and then `npm start`. The site is served from the real production build at <http://localhost:3000>.

## What to fill in, and where

Everything the site still needs from Rootsbay. Items 1 to 4 matter before launch.

| # | What | Where | Today | What to do |
| --- | --- | --- | --- | --- |
| 1 | Public email, phone and WhatsApp | `lib/site.ts` → `contact` | Email `connect@rootsbay.co`; mobile as printed on the Udyam certificate | Confirm the `connect@rootsbay.co` mailbox exists and is read. Keep the mobile or replace it with a sales number. WhatsApp is assumed to be the same mobile: confirm. |
| 2 | Where enquiries are emailed | `.env.local` (local) and Vercel settings (live): `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` | API key empty, so nothing is emailed | Sign up at <https://resend.com>, create a key, paste it. See "Make the form send email" below. |
| 3 | Final website address | `NEXT_PUBLIC_SITE_URL` in `.env.local` and Vercel | `https://www.rootsbay.co` | Confirm the domain. It feeds canonical links and the sitemap. |
| 4 | Business facts buyers ask for | `lib/site.ts` → `ordering` (minimum order, pricing basis, lead time, packing, samples, markets) | Blank, so the panel is hidden | Fill any of them; an "Ordering at a glance" panel appears on `/contact`. Blank fields stay hidden. |
| 5 | Social links | `lib/site.ts` → `social` | Blank, so hidden from the footer | Add the LinkedIn and Instagram page URLs. |
| 6 | Other certificates and test reports | `lib/certificates.ts` and `public/certificates/` | Four rows read "Ask us": food-contact test report, compostability certificate, certificate of origin, phytosanitary certificate | When a document exists, add the PDF and a page-one image, then set its entry to `status: "held"` (steps are at the top of the file). Add any other registration (for example FSSAI or APEDA) as a new entry. Do not write "FDA approved" or "certified compostable" without the paper. |
| 7 | Product photos 05 to 20, and the range picture | `public/images/products/05.webp` to `20.webp`, `public/images/range-overview.webp` | 05 to 20 are small crops, soft when enlarged. The range picture is an illustration showing more shapes than the 20 listed. | Replace with real photos at 1200 px or wider, same file names. Photos 01 to 04 are good. |
| 7b | Rice pictures | `public/images/rice/*.webp` (one per variety, plus `rice-range.webp`) | AI-generated stand-ins made in Canva, 1200 × 900 (originals in the Canva design "Rice Photo Board") | Replace with real photos of Rootsbay's own rice at 1200 px or wider, same file names. |
| 7c | Rice facts and grades | `lib/rice.ts`, rice answers in `lib/faq.ts` | General descriptions of each variety; no grain length, moisture, broken % or crop year. "With every rice order" promises (specification on every quote, samples, packing) are written for Rootsbay to confirm. Jyothi is listed as red rice: confirm. | Correct anything that is not how Rootsbay sells rice, and add grades or specifications when known. |
| 8 | Logo | `public/brand/`, `app/icon.png`, `app/apple-icon.png` | Cut from a photo of the signboard | Replace with the original logo files from the designer, same names. |
| 10 | Copy to read once for accuracy | `app/how-its-made/page.tsx`, `app/about/page.tsx`, `lib/faq.ts`, the `pitches` list in `lib/products.ts`, "we reply within one working day" in `components/EnquiryForm.tsx` and `lib/notify.ts` | Written from Rootsbay's product specification and standard process wording | Correct anything that is not how Rootsbay works. |
| 11 | Handicrafts | `categories` in `lib/products.ts` | Coming soon | When products are ready, set `status: "available"`, fill its `range` copy and add items with that `category`. The page, title bar, sitemap and search visibility all follow. |
| 12 | Founder name on the site | `lib/site.ts` → `founder`, `legalName`, `tradeName` | Abhay S Gowda, trading as Rootsbay (as on the GST certificate) | Change if the legal structure changes. |

Everything in `lib/site.ts` is shown across the whole site (header, footer, contact page, search data, emails), so edit it once and it updates everywhere.

### Make the form send email

1. Sign up at <https://resend.com> and create an API key.
2. Put it in `.env.local` as `RESEND_API_KEY=re_...` and set `ENQUIRY_TO_EMAIL` to the inbox that should receive enquiries.
3. Restart `npm run dev` and send a test enquiry. While `ENQUIRY_FROM_EMAIL` is `onboarding@resend.dev`, Resend only delivers to the address you signed up with.
4. For real use, verify `rootsbay.co` in Resend (it shows DNS records to add at the domain registrar), then set `ENQUIRY_FROM_EMAIL="Rootsbay Website <enquiries@rootsbay.co>"`.

Prefer a spreadsheet? Set `ENQUIRY_WEBHOOK_URL` to a Google Apps Script web app that appends rows to a Sheet. Email and webhook can run together.

## Publish it (Vercel)

A preview of the site is already live at <https://rootsbay.vercel.app>. It is hosted under the builder's Vercel account, so to own it, import the GitHub repository into your own Vercel account (steps below), add your domain, and then the preview can be deleted.

1. Put the project in a **private** GitHub repository.
2. Import it at <https://vercel.com/new>. The framework is detected automatically.
3. Under Settings → Environment Variables add the same names as in `.env.local`: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` (and `ENQUIRY_WEBHOOK_URL` if used).
4. Under Domains add `rootsbay.co` and `www.rootsbay.co`, and update DNS at the registrar as Vercel shows.
5. After the first deploy, open Google Search Console, add the site and submit `https://www.rootsbay.co/sitemap.xml`.

## Day-to-day editing

| Change | File |
| --- | --- |
| Phone, email, address, GSTIN, social links, ordering terms | `lib/site.ts` |
| Product names, sizes, descriptions, images, product lines | `lib/products.ts` and `public/images/products/` |
| Rice varieties, descriptions, images | `lib/rice.ts` and `public/images/rice/` |
| Certificates and documents | `lib/certificates.ts` and `public/certificates/` |
| Buyer questions and answers | `lib/faq.ts` |
| Page text | `app/page.tsx`, `app/about/`, `app/how-its-made/`, `app/contact/`, `app/products/` |
| Menu links | `mainNav` in `lib/site.ts` |
| Colours and fonts | `app/globals.css` |

After editing, the browser updates by itself while `npm run dev` is running. Before publishing, run `npm run verify`.

Commands:

| Command | Does |
| --- | --- |
| `npm run dev` | Local site at <http://localhost:3000> |
| `npm run lint` | Code checks |
| `npm run typecheck` | Type checks |
| `npm run verify` | Lint, type check and a production build |
| `npm start` | Serve the production build (run `npm run build` first) |
| `npm run clean` | Delete the `.next` build folder if something looks stuck |

Developers: this is Next.js 16, which differs from older versions. Read the guides in `node_modules/next/dist/docs/` before changing framework code. `CLAUDE.md` holds the design rules and the project map.

## Handing the folder to someone else

- Share it through a private GitHub repository, or zip the folder **without** `node_modules`, `.next`, `.data`, `.vercel` and `.env.local`. The new owner runs `npm install` and `Copy-Item .env.example .env.local`.
- Never share `.env.local` (it holds the API key). `.env.example` is the safe template.
- Set your own git name and email before your first commit:

```powershell
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## Windows troubleshooting

| Problem | Fix |
| --- | --- |
| `npm : File ...npm.ps1 cannot be loaded because running scripts is disabled` | Run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`, then reopen the terminal. |
| `'node' is not recognized` | Install Node.js, then close and reopen VS Code. |
| Port 3000 is already in use | Run `npm run dev -- -p 3001` and open <http://localhost:3001>. |
| Odd build errors after switching files or branches | Stop the server, run `npm run clean`, then `npm run dev`. |
| VS Code shows CRLF in the status bar | Click it and choose LF. The project settings already prefer LF. |
| No Tailwind class suggestions | Install the recommended Tailwind CSS IntelliSense extension. |
