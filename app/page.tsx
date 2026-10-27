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
// Layout is built on one centre line: centred headings, equal tiles, mirrored pairs.

// Alternating tableware and rice, so the 2 × 2 grid on phones reads as a checkerboard.
const heroPhotos = [
  { src: "/images/products/01.webp", alt: "Round areca leaf plate with fresh berries" },
  { src: "/images/rice/rajamudi.webp", alt: "A bowl of Rajamudi red rice" },
  { src: "/images/products/02.webp", alt: "Square areca leaf tray holding hummus and pita bread" },
  { src: "/images/rice/basmati.webp", alt: "A bowl of Basmati rice" },
];

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

const buyers = ["Importers", "Distributors", "Wholesalers", "Retailers", "Caterers"];

const explore = [
  { href: "/about", title: "About Rootsbay", body: "An agro-export house from Bengaluru, built around Karnataka's farms." },
  { href: "/certificates", title: "Certificates", body: "Our registrations, and the documents importers ask for." },
  { href: "/contact", title: "Contact", body: "Email, phone or WhatsApp. Tell us what you need and where it is going." },
];

const sectionHeading = "text-3xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-5xl";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-canopy text-white">
        <div className="mx-auto max-w-6xl px-4 pt-14 pb-14 text-center sm:px-6 md:pt-24 md:pb-20">
          <p className="rise text-sm font-medium text-brass-300">Agro exports from Bengaluru, India</p>
          <h1 className="rise rise-1 mx-auto mt-4 max-w-4xl text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.025em] sm:text-6xl md:text-7xl">
            From India&apos;s farms to buyers around the world.
          </h1>
          <p className="rise rise-1 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            Rootsbay is an agro-export company in Bengaluru. We source products from Karnataka and across India, check every
            order, prepare the export paperwork and ship to importers, distributors and caterers abroad.
          </p>
          <div className="rise rise-2 mx-auto mt-9 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-white px-7 py-3.5 font-medium text-canopy transition-colors hover:bg-sheath"
            >
              Request a quote
            </Link>
            <Link
              href="/products"
              className="rounded-full border border-white/30 px-7 py-3.5 font-medium text-white transition-colors hover:border-white/70"
            >
              See our products
            </Link>
          </div>

          <figure className="rise rise-3 mt-12 md:mt-16">
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {heroPhotos.map((p, i) => (
                <li key={p.src} className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    priority={i < 2}
                    sizes="(min-width: 1152px) 264px, (min-width: 768px) 23vw, 46vw"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
            <figcaption className="dim mx-auto mt-5 max-w-md text-sm">
              <span className="text-brass-300">Rice and areca leaf tableware</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* What we do */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 md:py-24">
        <h2 className={sectionHeading}>What Rootsbay does</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          We are one supplier from farm to port. Rootsbay handles every step of an export order, so you deal with one
          accountable company instead of a chain of agents and traders.
        </p>

        <ol className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-line bg-white px-3 py-6 sm:px-6 sm:py-8">
              <span
                className="mx-auto flex size-10 items-center justify-center rounded-full border border-brass font-display text-lg font-semibold text-brass sm:size-11"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-ink sm:mt-4 sm:text-xl">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted sm:text-base">{s.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-12 text-sm text-muted">We supply</p>
        <ul className="mt-3 flex flex-wrap justify-center gap-2">
          {buyers.map((b) => (
            <li key={b} className="rounded-full border border-line bg-white px-4 py-1.5 text-sm text-ink">
              {b}
            </li>
          ))}
        </ul>
      </section>

      {/* Product lines */}
      <section className="bg-sheath-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="text-center">
            <h2 className={sectionHeading}>What Rootsbay exports</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Rice and biodegradable tableware are available now, and handicrafts are in preparation. Each line has its own page
              with the full range.
            </p>
          </div>

          <div className="mt-12">
            <CategoryCards variant="home" />
          </div>
        </div>
      </section>

      {/* Keep exploring */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 md:py-24">
        <h2 className="text-3xl font-semibold tracking-[-0.02em] text-forest sm:text-4xl">Learn more about Rootsbay</h2>
        <ul className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {explore.map((e) => (
            <li key={e.href}>
              <Link href={e.href} className="group block">
                <span className="mx-auto block h-0.5 w-10 bg-brass" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-semibold text-ink group-hover:text-forest">
                  {e.title} <span aria-hidden="true">→</span>
                </h3>
                <p className="mx-auto mt-2 max-w-xs leading-relaxed text-muted">{e.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand centered />
    </>
  );
}
