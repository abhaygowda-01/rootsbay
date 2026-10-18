import Image from "next/image";
import Link from "next/link";
import { CategoryCards } from "@/components/CategoryCards";
import { CtaBand } from "@/components/CtaBand";
import { categories, products, rangeFacts } from "@/lib/products";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Areca leaf plates exporter from India | Rootsbay",
  absolute: true,
  description:
    "Rootsbay exports areca leaf plates, bowls and trays from Karnataka, India: 20 shapes, chemical-free and home compostable. Request a bulk quote.",
  path: "/",
});

const explore = [
  { href: "/how-its-made", title: "How it's made", body: "Four steps from a fallen palm leaf to a finished plate." },
  { href: "/certificates", title: "Certificates", body: "Our registrations, and the documents importers ask for." },
  { href: "/about", title: "About Rootsbay", body: "An agro-export house from Bengaluru, built around Karnataka's farms." },
];

export default function Home() {
  const live = categories.find((c) => c.status === "available")!;

  return (
    <>
      {/* Hero */}
      <section className="bg-canopy text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-16 sm:px-6 md:grid-cols-[1.05fr_1fr] md:pt-20 md:pb-24">
          <div>
            <h1 className="rise text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.025em] sm:text-6xl">
              Areca leaf plates, pressed from fallen palm leaves and exported worldwide.
            </h1>
            <p className="rise rise-1 mt-6 max-w-[34rem] text-lg leading-relaxed text-white/75">
              Rootsbay exports areca leaf plates, bowls and trays from Karnataka, India — {products.length} shapes from 4 to 11
              inches, chemical-free and home compostable. Packed for importers, distributors and caterers.
            </p>
            <div className="rise rise-2 mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-full bg-white px-6 py-3 font-medium text-canopy transition-colors hover:bg-sheath">
                Request a quote
              </Link>
              <Link
                href={`/products/${live.id}`}
                className="rounded-full border border-white/30 px-6 py-3 font-medium text-white transition-colors hover:border-white/70"
              >
                Explore the range
              </Link>
            </div>
          </div>

          <figure className="rise rise-3">
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src="/images/products/02.webp"
                alt="Square areca leaf tray holding hummus and pita bread"
                fill
                priority
                sizes="(min-width: 768px) 520px, 92vw"
                className="object-cover"
              />
            </div>
            <figcaption className="dim mt-4 text-sm">
              <span className="text-brass-300">6″ × 6″ square tray, RB-AL-02</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Product lines */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <h2 className="max-w-2xl text-4xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-5xl">
          What Rootsbay exports
        </h2>
        <p className="mt-4 max-w-[38rem] text-lg leading-relaxed text-muted">
          Biodegradable tableware is available now. Agriculture and handicrafts are in preparation, and each has its own page.
        </p>

        <div className="mt-12">
          <CategoryCards />
        </div>
      </section>

      {/* Why areca leaf */}
      <section className="bg-sheath-50">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
          <div>
            <h2 className="text-4xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-5xl">
              Why caterers and retailers choose areca leaf
            </h2>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted">
              Areca leaf plates look natural because they are. Each one is a single leaf sheath, heat-pressed into shape, so your
              customers get a plate with no liner, glue or coating to ask about — and a story that is easy to tell.
            </p>
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="/images/products/04.webp"
                alt="Rectangular areca leaf tray with sushi rolls"
                fill
                sizes="(min-width: 768px) 540px, 92vw"
                className="object-cover"
              />
            </div>
          </div>

          <dl className="grid content-start gap-x-8 gap-y-10 sm:grid-cols-2 md:pt-3">
            {rangeFacts.map((f) => (
              <div key={f.title} className="border-t-2 border-brass pt-4">
                <dt className="font-display text-xl font-semibold text-ink">{f.title}</dt>
                <dd className="mt-2 leading-relaxed text-muted">{f.body}</dd>
              </div>
            ))}
          </dl>
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
