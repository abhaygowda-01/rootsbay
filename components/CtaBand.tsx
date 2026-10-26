import Link from "next/link";

/** Closing call to action shared by the inner pages. */
export function CtaBand({
  title = "Ready to talk quantities?",
  body = "Tell us the products, quantity and destination. We'll send pricing, minimum order, samples and shipping options.",
  primary = { href: "/contact", label: "Request a quote" },
  secondary = { href: "/certificates", label: "See our certificates" },
}: {
  title?: string;
  body?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string } | null;
}) {
  return (
    <section className="bg-canopy text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr] md:py-20">
        <div>
          <h2 className="max-w-xl text-3xl leading-tight font-semibold tracking-[-0.02em] sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/75">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Link href={primary.href} className="rounded-full bg-white px-6 py-3 font-medium text-canopy transition-colors hover:bg-sheath">
            {primary.label}
          </Link>
          {secondary && (
            <a
              href={secondary.href}
              className="rounded-full border border-white/30 px-6 py-3 font-medium text-white transition-colors hover:border-white/70"
            >
              {secondary.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
