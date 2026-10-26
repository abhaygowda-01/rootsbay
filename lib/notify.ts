import "server-only";
import { detailLabel, products } from "./products";
import { site } from "./site";
import type { Enquiry } from "./enquiry-schema";

/**
 * Where enquiries go. Each channel is optional and switched on by env vars:
 *
 *   RESEND_API_KEY + ENQUIRY_TO_EMAIL  → email to the Rootsbay team (recommended)
 *   ENQUIRY_FROM_EMAIL                 → verified sender, e.g. "Rootsbay <enquiries@rootsbay.co>"
 *   ENQUIRY_AUTOREPLY=true             → also send the buyer a short acknowledgement
 *   ENQUIRY_WEBHOOK_URL                → POST the JSON to a webhook (Google Apps Script
 *                                         → Sheet, Zapier, Make, n8n, a CRM…)
 *
 * In development with nothing configured, enquiries are appended to
 * .data/enquiries.jsonl so you can test the form end to end.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stripSpamFields = ({ website, startedAt, ...rest }: Enquiry) => rest;

type Result = { channel: string; ok: boolean; error?: string };

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function productNames(codes: string[]) {
  return codes.map((code) => {
    const p = products.find((x) => x.code === code);
    return p ? `${p.code} — ${p.name} (${detailLabel(p)})` : code;
  });
}

function teamEmail(e: Enquiry, meta: { id: string; ip: string; receivedAt: string }) {
  const items = productNames(e.products);
  const rows: [string, string][] = [
    ["Name", e.name],
    ["Company", e.company || "—"],
    ["Email", e.email],
    ["Phone / WhatsApp", e.phone || "—"],
    ["Ship to", e.country],
    ["Quantity", e.quantity],
    ["Products", items.length ? items.join("\n") : "Not specified"],
    ["Message", e.message || "—"],
  ];
  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nRef ${meta.id} · received ${meta.receivedAt} · IP ${meta.ip}`;
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#1b2420">
      <h2 style="color:#1e5a3c;margin:0 0 12px">New quote request</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="color:#5b6b63;vertical-align:top;white-space:nowrap">${k}</td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="color:#8a958f;font-size:12px">Ref ${meta.id} · ${meta.receivedAt}</p>
    </div>`;
  return { subject: `Quote request: ${e.company || e.name} (${e.country})`, text, html };
}

function buyerEmail(e: Enquiry) {
  const text = `Hi ${e.name},

Thank you for your enquiry (${e.quantity.toLowerCase()}). We'll reply within one working day with pricing, MOQ and shipping options to ${e.country}.

For anything urgent, call or WhatsApp us on ${site.contact.phone}.

Rootsbay
${site.address.line1}, ${site.address.line2}, ${site.address.city} ${site.address.postalCode}, India
${site.url}`;
  return { subject: "We've received your enquiry — Rootsbay", text };
}

async function sendResend(payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

export async function deliverEnquiry(
  e: Enquiry,
  meta: { id: string; ip: string; receivedAt: string },
): Promise<Result[]> {
  const results: Result[] = [];
  const from = process.env.ENQUIRY_FROM_EMAIL ?? "Rootsbay Website <onboarding@resend.dev>";

  if (process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL) {
    try {
      const m = teamEmail(e, meta);
      await sendResend({
        from,
        to: process.env.ENQUIRY_TO_EMAIL.split(",").map((s) => s.trim()),
        reply_to: e.email,
        subject: m.subject,
        text: m.text,
        html: m.html,
      });
      results.push({ channel: "email", ok: true });
    } catch (err) {
      results.push({ channel: "email", ok: false, error: String(err) });
    }

    if (process.env.ENQUIRY_AUTOREPLY === "true") {
      try {
        const m = buyerEmail(e);
        await sendResend({ from, to: [e.email], reply_to: site.contact.email, subject: m.subject, text: m.text });
        results.push({ channel: "autoreply", ok: true });
      } catch (err) {
        // An auto-reply failure shouldn't fail the enquiry
        results.push({ channel: "autoreply", ok: true, error: String(err) });
      }
    }
  }

  if (process.env.ENQUIRY_WEBHOOK_URL) {
    try {
      const res = await fetch(process.env.ENQUIRY_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...meta, ...stripSpamFields(e), productNames: productNames(e.products) }),
      });
      results.push({ channel: "webhook", ok: res.ok, error: res.ok ? undefined : `HTTP ${res.status}` });
    } catch (err) {
      results.push({ channel: "webhook", ok: false, error: String(err) });
    }
  }

  if (results.length === 0 && process.env.NODE_ENV !== "production") {
    const { appendFile, mkdir } = await import("node:fs/promises");
    await mkdir(".data", { recursive: true });
    await appendFile(".data/enquiries.jsonl", JSON.stringify({ ...meta, ...stripSpamFields(e) }) + "\n");
    results.push({ channel: "local-file", ok: true });
  }

  return results;
}
