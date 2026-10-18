import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry-schema";
import { deliverEnquiry } from "@/lib/notify";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

/**
 * POST /api/enquiry
 * Body: JSON matching `enquirySchema`.
 * 200 { ok: true, id }            — enquiry delivered on at least one channel
 * 400 { ok: false, fieldErrors }  — validation failed
 * 429 { ok: false, error }        — too many submissions from this IP
 * 502/503 { ok: false, error }    — delivery failed / not configured
 */
export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!rateLimit(`enquiry:${ip}`).ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a few minutes or email us directly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    // A filled honeypot is a bot: pretend success so it doesn't retry.
    if (fieldErrors.website) return NextResponse.json({ ok: true, id: "ignored" });
    return NextResponse.json({ ok: false, fieldErrors }, { status: 400 });
  }

  const data = parsed.data;

  // Submitted faster than a person could fill the form → treat as a bot.
  if (data.startedAt && Date.now() - data.startedAt < 2500) {
    return NextResponse.json({ ok: true, id: "ignored" });
  }

  const meta = {
    id: `RB-${Date.now().toString(36).toUpperCase()}`,
    ip,
    receivedAt: new Date().toISOString(),
  };

  const results = await deliverEnquiry(data, meta);

  if (results.length === 0) {
    console.error("[enquiry] No delivery channel configured. Set RESEND_API_KEY/ENQUIRY_TO_EMAIL or ENQUIRY_WEBHOOK_URL.");
    return NextResponse.json(
      { ok: false, error: `The form isn't connected yet. Please email ${site.contact.email}.` },
      { status: 503 },
    );
  }

  const delivered = results.some((r) => r.ok && r.channel !== "autoreply");
  if (!delivered) {
    console.error("[enquiry] delivery failed", results);
    return NextResponse.json(
      { ok: false, error: `We couldn't send your enquiry. Please email ${site.contact.email}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: meta.id });
}
