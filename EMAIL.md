# Email setup for rootsbay.co

Three things make "contact us" reach **connect@rootsbay.co**. The website code is already done; these are
account settings, about 30 minutes in total. Do them after the site is on Cloudflare (`CLOUDFLARE.md`, steps 1 and 3).

| What | Where you paste something |
| --- | --- |
| 1. Mail sent to connect@rootsbay.co arrives in an inbox | Cloudflare → rootsbay.co → **Email Routing** (the inbox address, e.g. the owner's Gmail) |
| 2. The website's quote form emails connect@rootsbay.co | Resend (verify the domain) and Cloudflare → Worker **rootsbay** → **Variables and Secrets** (the API key) |
| 3. Reply *as* connect@rootsbay.co from Gmail (SMTP) | Gmail → **Send mail as** (Resend's SMTP details) |

**The API key never goes in the code.** The GitHub repo is public, so a key in any file can be read and used by
anyone. Cloudflare stores it encrypted and gives it to the site when it runs; it is the only setting not in the repo.
Everything else (who receives enquiries, the sender address) is already in `wrangler.jsonc`.

---

## 1. Receive mail at connect@rootsbay.co

**First check:** Cloudflare → rootsbay.co → **DNS** → Records. If there are **MX** records for a mail service
(Google Workspace, Zoho, GoDaddy, Hostinger…), connect@rootsbay.co is already a mailbox there: skip to part 2.

If there is no mailbox yet, forward it to an existing inbox for free:

1. Cloudflare → rootsbay.co → **Email** → **Email Routing** → **Get started**.
2. **Destination addresses** → add the inbox that should get the mail (for example the owner's Gmail). Cloudflare emails
   that inbox a link: open it and click **Verify**.
3. **Routing rules** → **Custom addresses** → **Create address**: `connect` → action **Send to an email** → that inbox → Save.
4. Cloudflare asks to add its MX and TXT records: click **Add records and enable**.
5. Test: send an email to connect@rootsbay.co from another account. It arrives in the inbox from step 2.

## 2. The website's quote form

1. Create a free account at <https://resend.com> (use any email; connect@rootsbay.co is a good choice).
2. Resend → **Domains** → **Add domain** → `rootsbay.co` → region closest to India (e.g. Tokyo or Singapore if offered).
   Click **Auto configure** / **Sign in to Cloudflare** so Resend adds its DNS records itself. (By hand: add every record
   Resend shows in Cloudflare DNS, with the proxy **off**, grey cloud.) Wait until the domain shows **Verified**.
3. Resend → **API Keys** → **Create API key**: name `rootsbay website`, permission **Sending access**, domain `rootsbay.co`.
   Copy the key (starts with `re_`). Resend shows it only once.
4. Cloudflare → **Workers & Pages** → **rootsbay** → **Settings** → **Variables and Secrets** → **Add**:
   - Type: **Secret**
   - Variable name: `RESEND_API_KEY`
   - Value: paste the key → **Deploy**.
5. Test: open the site's **Contact** page, send a quote request with your own email in it. It arrives at
   connect@rootsbay.co from "Rootsbay Website <website@rootsbay.co>"; pressing **Reply** answers the buyer directly.

Before the domain is verified the site still works: it sends from Resend's test address instead, which only reaches the
email the Resend account was created with. That is why step 1 suggests creating it with connect@rootsbay.co.

**Optional:** to send each buyer a short "we received your enquiry" email, set `"ENQUIRY_AUTOREPLY": "true"` in
`wrangler.jsonc`, commit and push (needs the verified domain).

## 3. Reply as connect@rootsbay.co from Gmail (SMTP)

So answers to buyers come from connect@rootsbay.co, not a personal Gmail address:

1. Resend → **API Keys** → create a second key: name `gmail smtp`, permission **Sending access**, domain `rootsbay.co`. Copy it.
2. Gmail (the inbox from part 1) → ⚙ **See all settings** → **Accounts and Import** → **Send mail as** → **Add another email address**:
   - Name: `Rootsbay`, Email: `connect@rootsbay.co`, leave **Treat as an alias** ticked → **Next step**
   - SMTP Server: `smtp.resend.com` Port: `465`
   - Username: `resend`
   - Password: the `gmail smtp` key from step 1
   - **Secured connection using SSL** → **Add account**
3. Gmail sends a code to connect@rootsbay.co; it arrives in the same inbox (part 1). Enter it.
4. Optional: in the same settings, choose **Reply from the same address the message was sent to**.

## If something doesn't work

| What you see | What to do |
| --- | --- |
| The form says "The form isn't connected yet" | The `RESEND_API_KEY` secret is missing or misspelled (part 2, step 4). |
| The form says "We couldn't send your enquiry" | The key is wrong or revoked: create a new one and replace the secret. Cloudflare → rootsbay → **Logs** shows Resend's reason. |
| Enquiries arrive only at the Resend sign-up email | rootsbay.co is not verified in Resend yet (part 2, step 2). |
| Email to connect@rootsbay.co bounces | Email Routing is off or its MX records were removed (part 1), or another mail service's MX records conflict. |
| Gmail refuses the SMTP settings | Check port 465 with SSL, username `resend`, and that the domain is verified in Resend. |
| Enquiry emails go to spam | Make sure all of Resend's DNS records (SPF, DKIM) show as verified; mark the first one "Not spam". |
