# Handover: where the Rootsbay site stands

Last updated 29 October 2026. For the next working session: read this file, then `CLAUDE.md` (project rules and map)
and the README (owner's handover table). This file covers the current state, how this PC is set up, and what is still open.

## Current state

- **Live site:** <https://rootsbay-exports.vercel.app> (Vercel project `rootsbay-exports`, Rootsbay's own Vercel account).
  It runs the newest commit in the table below (ChatGPT pictures, linked home photos). GitHub may be behind: push for backup.
- **Old preview:** `rootsbay.vercel.app` lives in a different Vercel account, shows an older version and no longer updates.
  Its owner should delete it or transfer the project.
- **Nothing uncommitted.**

### Changes made in the last sessions (newest first)

| Commit | What |
| --- | --- |
| next after `44b916b` | All 40 tableware pictures redone in ChatGPT (no watermark); home hero photos link to their product pages, caption line removed |
| `b9e1170` | Gemini pictures for all 20 tableware SKUs: new in-use photos and an empty-piece photo shown beside each on its product page; this file |
| `30eb114` | Deploy script tolerates a locked temp folder on Windows |
| `d6c2830` | `npm run deploy` (`scripts/deploy.mjs`); Vercel CLI added as a dev dependency; Vercel disconnected from GitHub |
| `8dc718b` | Phone and WhatsApp → `+91 83103 05693`; home page redesigned (centred, symmetric, phone-first); rice photo strip on the home Agriculture card |
| `a968960` | Rice pictures replaced with 1200 × 900 AI-generated photos made in Canva |
| `0beaa71` | Rice added under Agriculture (10 varieties, own pages, white/red filter, Q&A); home page became a company overview with no product specs |
| `c59287f` | Product codes (RB-AL-NN) removed from visible page text |

## How to work on this PC

- **npm in PowerShell:** Windows blocks `npm.ps1`, so use `npm.cmd` (`npm.cmd run dev`, `npm.cmd run deploy`). The owner can fix
  it for good with `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` (a security setting: the owner runs it, not Claude).
- **Claude's own shell is sandboxed** (Claude desktop app). Installs into `%APPDATA%` from it (e.g. `npm -g`) land in a private copy the
  owner's terminal cannot see. Install tools into the project instead, as with `vercel`.
- **Commands that need the owner's logins** (anything `vercel`) must run in the owner's Terminal panel (Claude's `run_in_terminal`),
  where the Vercel CLI login lives. The sandbox shell is fine for git, `gh`, lint, build.
- **Tool paths** if not on `PATH` in the sandbox shell: `C:\Program Files\nodejs`, `C:\Program Files\Git\cmd\git.exe`,
  `C:\Program Files\GitHub CLI\gh.exe`. `gh` is signed in to the repo owner's account; `git push` works.
- **Commit identity:** repo-local `user.name "Rootsbay Website"`, `user.email noreply@rootsbay.co`. Keep it (CLAUDE.md item 10).
  End commit messages with the `Co-Authored-By` line Claude Code asks for.
- **Commit messages with quotes:** Windows PowerShell 5.1 breaks quoted arguments to `git`. Write the message to a file and use `git commit -F <file>`.
- **Owner's workflow:** make the change, show it on localhost, commit locally when asked, then deploy / push when asked.

### Local preview

- `.claude/launch.json` (git-ignored, already on this PC) defines `rootsbay-dev`: `node node_modules/next/dist/bin/next dev` on port 3000.
  Start it with the Browser pane's `preview_start`, or the owner runs `npm.cmd run dev`. Only one dev server can use port 3000.
- **Screenshot gotchas in the Browser pane:** when the pane is hidden the hero's `.rise` fade-in stalls and the hero looks blank (inject
  `.rise{animation:none!important;opacity:1!important}` just for the screenshot). At wide widths screenshots crop the right edge;
  check desktop layout by measuring elements (`getBoundingClientRect`) instead.

### Deploying

1. Commit the change.
2. In the owner's terminal: `npm.cmd run deploy`. About a minute; ends with `✓ Ready` and `Aliased https://rootsbay-exports.vercel.app`.
3. Optionally `git push` for backup. Pushing does **not** deploy.

Why it works this way: Vercel's free Hobby plan blocks any deployment whose git commit author is not the account owner, including
CLI deploys that carry git details. `scripts/deploy.mjs` exports the last commit with `git archive` into a temp folder (no git history)
and deploys that. Do not reconnect Vercel to GitHub and do not change the commit author to make pushes deploy; the owner chose this setup.
New PC: `npm install`, `npx vercel login`, `npx vercel link --project rootsbay-exports`.

## Images

- **Canva connector can generate images** (`generate-image`) but only returns a 200 px preview. Getting full-size files:
  create a design, add pages sized to the image (`edit-design` → `add_page` 1456 × 1088), `insert_fill` each media ID at
  0,0,1456,1088, commit the edit (ask the owner first), `export-design` as PNG, download the URLs, then convert with `sharp`
  (in `node_modules`) to 1200 × 900 WebP under the same file names.
- **Canva design "Rice Photo Board"** (`DAHZOi_3VsM`) holds the rice originals on pages 2–12 in this order: basmati, sona-masuri,
  gangavathi-sona, rasi, ir-20, jyothi, jaya, pragathi, rajamudi, kempu-akki, rice-range. Page 1 is an unused auto-generated cover.
- AI-generated media is not listed in Canva's Uploads or AI history, so it can't be downloaded from canva.com by hand.
- **ElevenLabs connector** image tools fail with "requires additional permissions" until it is reconnected in Settings → Connectors.
- **ChatGPT in the owner's Chrome** (Claude in Chrome extension, a paid ChatGPT account) made the current tableware pictures,
  one chat per SKU: upload the original pre-AI picture (`git show 30eb114:public/images/products/NN.webp`, copied into the
  git-ignored `.data/refs/` because uploads must come from the project folder) as reference, ask for the in-use photo
  (4:3, rustic table) and then the empty piece (square, plain cream `#efe5cf` backdrop), open each picture and use the viewer's
  Download (1448 × 1086 and 1254 × 1254 PNG), then `sharp` to `NN.webp` (1200 × 900) and `NN-empty.webp` (1200 × 1200).
  No visible watermark. A free ChatGPT account stops after about 5 images a day.
- **Gemini** made an earlier set (commit `b9e1170`); free-tier Gemini images carry a visible ✦ mark, which is why they were replaced.

## Still open

Highest value first. The README table has the full list and file locations.

1. **Quote form email:** add `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` (and `NEXT_PUBLIC_SITE_URL`) in Vercel →
   Settings → Environment Variables, then `npm.cmd run deploy`. Until then the live form says it isn't connected.
2. **Domain:** add `rootsbay.co` / `www.rootsbay.co` to the `rootsbay-exports` project and update DNS; then Search Console + sitemap.
3. **Confirm with Rootsbay:** WhatsApp is the same number as the phone; rice copy (descriptions, Jyothi listed as red rice, Jaya,
   "With every rice order" promises, rice Q&A); ordering terms (MOQ, lead time, samples, packing).
4. **Photos:** tableware (in use and empty, all 20) and rice pictures are AI stand-ins until real photos exist; logo is cut from a photo.
5. **Small polish:** the products hub heading reads "A first look: agriculture"; it might read better as rice.
