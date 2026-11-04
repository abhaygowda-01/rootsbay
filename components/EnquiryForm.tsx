"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { categories, productsIn, shortName } from "@/lib/products";
import { enquirySchema, quantityOptions } from "@/lib/enquiry-schema";
import { site } from "@/lib/site";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; id: string } | { kind: "error"; message: string };

const field =
  "mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2.5 text-[0.95rem] text-ink placeholder:text-muted/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15";

/** Opening line for the message box when a page links here with ?topic=… */
const topicMessages: Record<string, string> = {
  agriculture: "I'm interested in rice from Rootsbay.",
  handicrafts: "I'm interested in handicrafts from Rootsbay. Please let me know when the range is available.",
  documents: "Please send details of the certificates and test reports available for your products.",
};

/** Products to pick from, grouped by line. */
const groups = categories
  .filter((c) => c.status === "available")
  .map((c) => ({ name: c.id === "agriculture" ? "Rice" : c.name, items: productsIn(c.id) }));
const allCodes = new Set(groups.flatMap((g) => g.items.map((p) => p.code)));

export function EnquiryForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef<number>(0);

  // Pre-fill when arriving from another page: /contact?product=RB-AL-04 or /contact?topic=agriculture
  useEffect(() => {
    startedAt.current = Date.now();
    const params = new URLSearchParams(window.location.search);
    const code = params.get("product");
    if (code && allCodes.has(code)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the URL once on mount
      setSelected([code]);
    }
    const topic = topicMessages[params.get("topic") ?? ""];
    if (topic) setMessage(topic);
  }, []);

  function toggle(code: string) {
    setSelected((s) => (s.includes(code) ? s.filter((c) => c !== code) : [...s, code]));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      country: String(fd.get("country") ?? ""),
      quantity: String(fd.get("quantity") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
      products: selected,
      startedAt: startedAt.current,
    };

    const check = enquirySchema.safeParse(payload);
    if (!check.success) {
      const fe: Record<string, string> = {};
      for (const i of check.error.issues) fe[String(i.path[0])] ??= i.message;
      setErrors(fe);
      document.getElementById(`f-${Object.keys(fe)[0]}`)?.focus();
      return;
    }

    setErrors({});
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus({ kind: "sent", id: data.id });
      } else if (data.fieldErrors) {
        setErrors(data.fieldErrors);
        setStatus({ kind: "idle" });
      } else {
        setStatus({ kind: "error", message: data.error ?? "Something went wrong." });
      }
    } catch {
      setStatus({ kind: "error", message: `Couldn't reach the server. Email us at ${site.contact.email}.` });
    }
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="rounded-xl border border-forest/20 bg-white p-8">
        <h3 className="text-2xl font-semibold text-forest">Enquiry sent</h3>
        <p className="mt-3 max-w-md text-muted">
          Thank you. We&apos;ll reply within one working day with pricing, MOQ and shipping options. Your reference is{" "}
          <span className="font-medium text-ink">{status.id}</span>.
        </p>
        <p className="mt-4 text-sm text-muted">
          Need it sooner?{" "}
          <a href={site.contact.whatsappHref} target="_blank" rel="noopener" className="font-medium text-forest underline underline-offset-4">
            Message us on WhatsApp
          </a>
        </p>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`e-${k}`} className="mt-1 text-sm text-rust">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: string) => ({
    id: `f-${k}`,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `e-${k}` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-xl border border-line bg-white p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Your name
          <input {...aria("name")} autoComplete="name" className={field} />
          {err("name")}
        </label>
        <label className="block text-sm font-medium">
          Company <span className="font-normal text-muted">(optional)</span>
          <input {...aria("company")} autoComplete="organization" className={field} />
          {err("company")}
        </label>
        <label className="block text-sm font-medium">
          Work email
          <input {...aria("email")} type="email" autoComplete="email" className={field} />
          {err("email")}
        </label>
        <label className="block text-sm font-medium">
          Phone or WhatsApp <span className="font-normal text-muted">(optional)</span>
          <input {...aria("phone")} type="tel" autoComplete="tel" className={field} />
          {err("phone")}
        </label>
        <label className="block text-sm font-medium">
          Shipping to (country)
          <input {...aria("country")} autoComplete="country-name" className={field} />
          {err("country")}
        </label>
        <label className="block text-sm font-medium">
          Approximate quantity
          <select {...aria("quantity")} defaultValue="" className={field}>
            <option value="" disabled>
              Choose one
            </option>
            {quantityOptions.map((q) => (
              <option key={q}>{q}</option>
            ))}
          </select>
          {err("quantity")}
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium">
          Products you&apos;re interested in <span className="font-normal text-muted">(optional)</span>
        </legend>
        <div className="mt-2 max-h-64 space-y-4 overflow-y-auto pr-1">
          {groups.map((g) => (
            <div key={g.name}>
              <p className="text-xs text-muted">{g.name}</p>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {g.items.map((p) => {
                  const on = selected.includes(p.code);
                  return (
                    <button
                      key={p.code}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(p.code)}
                      className={`rounded-full border px-3 py-1.5 text-left text-[0.8rem] transition-colors ${
                        on ? "border-forest bg-forest/10 text-forest" : "border-line text-muted hover:border-forest/40"
                      }`}
                    >
                      {shortName(p)}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      <label className="mt-6 block text-sm font-medium">
        Anything else? <span className="font-normal text-muted">(optional)</span>
        <textarea
          {...aria("message")}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Grade, bag size, custom sizes, branding, target port, delivery date…"
          className={field}
        />
        {err("message")}
      </label>

      {/* Honeypot: hidden from people, bots fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.kind === "error" && (
        <p role="alert" className="mt-5 rounded-md bg-rust/10 px-3 py-2 text-sm text-rust">
          {status.message}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="rounded-full bg-forest px-6 py-3 font-medium text-white transition-colors hover:bg-forest-600 disabled:opacity-60"
        >
          {status.kind === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <p className="text-sm text-muted">We reply within one working day.</p>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">
        We use these details only to reply to your enquiry. See our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-forest">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
