import Image from "next/image";
import Link from "next/link";
import { CategoryCards } from "@/components/CategoryCards";
import { CtaBand } from "@/components/CtaBand";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Rootsbay | Agro exporter from India: rice and areca leaf tableware",
  absolute: true,
  description:
    "Rootsbay is an agro-export company in Bengaluru, India. We source, check, document and ship rice and areca leaf tableware for importers and distributors worldwide.",
  path: "/",
});

// The home page says what the company does. Product specifications live on the product pages.
const steps = [
  {
    title: "Source",
    body: "We find good products at the source, with farmers and producers in Karnataka and across India.",
  },
  {
    title: "Check",
    body: "Every order is checked against the specification you agreed before it is packed.",
  },
  {
    title: "Document",
    body: "We prepare the export paperwork your shipment needs, and the registrations importers ask for.",
  },
  {
    title: "Ship",
    body: "Orders are packed for export and shipped to your port. Tell us the destination and we'll quote the options.",
  },
];

const explore = [
  { href: "/about", title: "About Rootsbay", body: "An agro-export house from Bengaluru, built around Karnataka's farms." },
  { href: "/certificates", title: "Certificates", body: "Our registrations, and the documents importers ask for." },
  { href: "/contact", title: "Contact", body: "Email, phone or WhatsApp. Tell us what you need and where it is going." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-canopy text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-16 sm:px-6 md:grid-cols-[1.05fr_1fr] md:pt-20 md:pb-24">
          <div>
            <h1 className="rise text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.025em] sm:text-6xl">
              From India&apos;s farms to buyers around the world.
            </h1>
            <p className="rise rise-1 mt-6 max-w-[34rem] text-lg leading-relaxed text-white/75">
              Rootsbay is an agro-export company in Bengaluru. We source products from Karnataka and across India, check every
              order, prepare the export paperwork and ship to importers, distributors and caterers abroad.
            </p>
            <div className="rise rise-2 mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-full bg-white px-6 py-3 font-medium text-canopy transition-colors hover:bg-sheath">
                Request a quote
              </Link>
              <Link
                href="/products"
                className="rounded-full border border-white/30 px-6 py-3 font-medium text-white transition-colors hover:border-white/70"
              >
                See our products
              </Link>
            </div>
          </div>

          <figure className="rise rise-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src="/images/rice/rajamudi.webp"
                  alt="A bowl of Rajamudi red rice"
                  fill
                  priority
                  sizes="(min-width: 768px) 260px, 46vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src="/images/products/02.webp"
                  alt="Square areca leaf tray holding hummus and pita bread"
                  fill
                  priority
                  sizes="(min-width: 768px) 260px, 46vw"
                  className="object-cover"
                />
              </div>
            </div>
            <figcaption className="dim mt-4 text-sm">
              <span className="text-brass-300">Rice and areca leaf tableware</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* What we do */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-4xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-5xl">What Rootsbay does</h2>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted">
              We are one supplier from farm to port. Rootsbay handles every step of an export order, so you deal with one
              accountable company instead of a chain of agents and traders.
            </p>
            <p className="mt-4 max-w-[34rem] text-lg leading-relaxed text-muted">
              We supply importers, distributors, wholesalers, retailers and caterers in markets abroad.
            </p>
          </div>

          <ol className="grid content-start gap-x-8 gap-y-10 sm:grid-cols-2 md:pt-3">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t-2 border-brass pt-4">
                <h3 className="font-display text-xl font-semibold text-ink">
                  <span className="text-brass" aria-hidden="true">
                    {i + 1}{" "}
                  </span>
                  {s.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Product lines */}
      <section className="bg-sheath-50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <h2 className="max-w-2xl text-4xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-5xl">
            What Rootsbay exports
          </h2>
          <p className="mt-4 max-w-[38rem] text-lg leading-relaxed text-muted">
            Rice and biodegradable tableware are available now, and handicrafts are in preparation. Each line has its own page
            with the full range.
          </p>

          <div className="mt-12">
            <CategoryCards />
          </div>
        </div>
      </section>

      {/* Keep exploring */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <h2 className="text-3xl font-semibold tracking-[-0.02em] text-forest sm:text-4xl">Learn more about Rootsbay</h2>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {explore.map((e) => (
            <li key={e.href}>
              <Link href={e.href} className="group block border-t-2 border-brass pt-4">
                <h3 className="font-display text-xl font-semibold text-ink group-hover:text-forest">
                  {e.title} <span aria-hidden="true">→</span>
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{e.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
