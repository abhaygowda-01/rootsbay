# Hosting the Rootsbay site on Cloudflare

The site is a Next.js app. On Cloudflare it runs as a **Worker** (built with the official adapter,
`@opennextjs/cloudflare`), not as a Pages project. Everything Cloudflare needs is already in the repo:

| File | What it does |
| --- | --- |
| `wrangler.jsonc` | Worker name (`rootsbay`), runtime flags, static files, image resizing, the non-secret email settings |
| `open-next.config.ts` | Tells the adapter every page is prebuilt (no extra storage to set up) |
| `public/_headers` | Security and caching headers for pictures, PDFs and build files |
| `next.config.ts` | Security headers for pages (HTTPS-only, no framing, content policy), `rootsbay.co` → `www.rootsbay.co` redirect |
| `.nvmrc` | Node 22 for the build |

The only thing that is **not** in the repo is the email API key. It is a secret and goes in the Cloudflare
dashboard (step 2). Never put it in a file you commit: the GitHub repo is public.

Checked on 4 November 2026: the Cloudflare build succeeds, every page returns 200 in Cloudflare's local
runtime, pictures are resized by Cloudflare Images, and the Worker is 1.3 MB compressed (the free plan allows 3 MB).

---

## 1. Create the Worker from GitHub (recommended)

Cloudflare builds and deploys the site every time `main` changes in the GitHub repo.

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Workers** tab → **Import a repository**.
   (Not "Pages". Choosing Pages is what causes errors like "output directory not found" or "build output is empty".)
2. Connect GitHub and pick **abhaygowda-01/rootsbay**.
3. Fill in:

   | Setting | Value |
   | --- | --- |
   | Project name | `rootsbay` (must match `name` in `wrangler.jsonc`) |
   | Production branch | `main` |
   | Build command | `npx opennextjs-cloudflare build` |
   | Deploy command | `npx opennextjs-cloudflare deploy` |
   | Non-production branch deploy command | `npx opennextjs-cloudflare upload` |
   | Path / root directory | `/` (leave empty) |
   | Build variables | none needed |

4. **Save and deploy.** The first build takes a few minutes. The site then answers at
   `https://rootsbay.<your-subdomain>.workers.dev`.

<details>
<summary>Alternative: deploy from a computer instead of GitHub</summary>

```bash
npm ci
npx wrangler login
npm run cf:deploy
```

Linux or macOS is best; on Windows it works but prints a warning (use WSL if anything odd happens).
</details>

## 2. Add the email secret (the quote form)

Worker **rootsbay** → **Settings** → **Variables and Secrets** → **Add**:

- Type: **Secret**
- Name: `RESEND_API_KEY`
- Value: the Resend API key (starts with `re_`)

Save. The next request uses it; if the form still says "isn't connected", trigger a new deployment
(**Deployments** → retry) once.

Everything else for email is already set in `wrangler.jsonc` → `vars`:

- `ENQUIRY_TO_EMAIL` = `connect@rootsbay.co` (who receives quote requests; comma-separate for several)
- `ENQUIRY_FROM_EMAIL` = `Rootsbay Website <website@rootsbay.co>` (needs rootsbay.co verified in Resend, step 5)
- `ENQUIRY_AUTOREPLY` = `false`

Until rootsbay.co is verified in Resend, the site automatically sends from Resend's test address instead, which only
reaches the email the Resend account was created with. **All email steps, including receiving mail at
connect@rootsbay.co and replying from it in Gmail, are in [`EMAIL.md`](EMAIL.md).**

## 3. Connect the domain (rootsbay.co)

1. Cloudflare dashboard → **Add a domain** → `rootsbay.co` → Free plan. Cloudflare copies the existing DNS records.
2. **Before** switching nameservers, check the DNS list contains the **MX and TXT records for email**
   (the ones that make `connect@rootsbay.co` work). If they are missing, add them, or email will stop.
3. At the domain registrar, change the nameservers to the two Cloudflare gives you. Wait until the domain shows "Active".
4. Worker **rootsbay** → **Settings** → **Domains & Routes** → **Add** → **Custom domain**:
   add `www.rootsbay.co`, then add `rootsbay.co`. Cloudflare creates the DNS records and the HTTPS certificates itself.
   The site sends `rootsbay.co` visitors to `www.rootsbay.co` on its own.

## 4. HTTPS and security settings (domain → SSL/TLS and other menus)

| Where | Setting |
| --- | --- |
| SSL/TLS → Overview | **Full (strict)** |
| SSL/TLS → Edge Certificates | **Always Use HTTPS: On**, **Automatic HTTPS Rewrites: On**, **Minimum TLS: 1.2** |
| Scrape Shield | **Email Address Obfuscation: Off** (it rewrites the page and breaks the site's scripts) |
| Speed → Optimization | **Rocket Loader: Off** (breaks Next.js) |

The site itself already sends HSTS (HTTPS only, 2 years), blocks being shown inside other sites' frames,
and has a content security policy. Do not turn on HSTS "preload" unless you are sure every subdomain will always have HTTPS.

## 5. Email (receive at connect@rootsbay.co, the form, replying from Gmail)

Follow [`EMAIL.md`](EMAIL.md). No code changes are needed: the site already sends quote requests to
connect@rootsbay.co from `website@rootsbay.co` as soon as rootsbay.co is verified in Resend.

## 6. Optional extras

- **Spam protection:** Security → WAF → **Rate limiting rules** → match URI path `/api/enquiry`, a few requests per
  period per IP, action Block. The form also has a hidden spam trap and a per-visitor limit built in.
- **Visitor statistics:** Cloudflare **Web Analytics** works without cookies and is already allowed by the site's
  content policy. If it is turned on, the privacy policy (`app/privacy/page.tsx`) should mention it.

## Troubleshooting

| What you see | Cause and fix |
| --- | --- |
| "Output directory not found", "build output is empty", `.vercel/output` missing | The project was created as **Pages**. Create a **Worker** instead (step 1). |
| Build fails at `npm install` / `npm ci` | Make sure the build uses Node 22 (`.nvmrc`); set a `NODE_VERSION=22` build variable if needed. |
| Form says "The form isn't connected yet" | The `RESEND_API_KEY` secret is missing (step 2). |
| Form says "We couldn't send your enquiry" | Resend rejected the email: check the key and that rootsbay.co is verified in Resend (`EMAIL.md`). Worker → **Logs** shows the reason. |
| Pictures don't show | Cloudflare Images is not available on the account. Add build variable `NEXT_IMAGE_UNOPTIMIZED=true` and redeploy (pictures are then served full size). |
| "Worker exceeded size limit" | Free plan allows 3 MB compressed; the site is about 1.3 MB. If it grows past 3 MB, use the Workers Paid plan. |
| Deploy error about `WORKER_SELF_REFERENCE` | The Worker name in the dashboard must be `rootsbay`, same as `wrangler.jsonc`. |
| Pages show the wrong domain in links or the sitemap | The site's address is `https://www.rootsbay.co` by default. For another address, set build variable `NEXT_PUBLIC_SITE_URL`. |

## Testing locally in Cloudflare's runtime

```bash
npm run cf:preview
```

Opens the site at http://127.0.0.1:8787 exactly as Cloudflare runs it. To test the form there, create a file
`.dev.vars` (git-ignored) with one line `RESEND_API_KEY=re_...`, and delete it afterwards.
