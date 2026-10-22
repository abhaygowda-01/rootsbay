import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { categories } from "@/lib/products";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "About us: agro exporter in Bengaluru, India",
  description:
    "Rootsbay is an agro-export company in Vijayanagar, Bengaluru. We source from Karnataka's farms, inspect, document and ship, starting with areca leaf tableware.",
  path: "/about",
  image: { url: "/images/products/04.webp", width: 1264, height: 848, alt: "Rectangular areca leaf tray with sushi rolls" },
});

const supplier = [
  { title: "Sourcing", body: "Fallen areca leaf sheaths, gathered from farms in Karnataka. Supply starts at the source." },
  { title: "Quality checks", body: "Every piece is trimmed and inspected one by one before it goes into a carton." },
  { title: "Export paperwork", body: "We prepare the documents your shipment needs. The certificates page lists what importers usually ask for." },
  { title: "Shipping", body: "Cartons are packed for export. Tell us your destination and we'll quote shipping options." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="An agro-export house from Bengaluru" crumbs={<Breadcrumbs items={[{ name: "About", path: "/about" }]} />}>
        Rootsbay takes agricultural products from Karnataka&apos;s farms to buyers abroad. We handle sourcing, quality checks, export
        paperwork and shipping, so you deal with one accountable supplier.
      </PageHero>

      {/* Who we are */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:gap-16 md:py-28">
        <div>
          <h2 className="text-3xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-4xl">Who we are</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
            <p>
              Rootsbay is an agro-export company based in Vijayanagar, Bengaluru, founded by {site.founder.name} and registered in
              September 2026. The job is simple to describe: find good products in Karnataka, check them, document them and ship
              them to importers, distributors and caterers overseas.
            </p>
            <p>
              The tagline on our signboard is &ldquo;{site.tagline}&rdquo;, and it is the brief. We want a buyer in another
              country to be able to order from a farm region they have never visited and receive exactly what they saw on the page.
            </p>
            <p>
              Our first product line is areca leaf tableware: 20 plates, bowls and trays that we can describe, photograph and
              measure precisely. Agriculture and handicraft lines are being prepared next.
            </p>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src="/images/products/04.webp"
            alt="Rectangular areca leaf tray with sushi rolls"
            fill
            priority
            sizes="(min-width: 768px) 560px, 92vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Why areca leaf */}
      <section className="bg-sheath-50">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:gap-16 md:py-28">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl md:order-first">
            <Image
              src="/images/products/01.webp"
              alt="Round areca leaf plate with fresh berries on a wooden table"
              fill
              sizes="(min-width: 768px) 560px, 92vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-4xl">
              Why we started with areca leaf
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                Areca palms are grown for their nut across Karnataka. As a palm sheds its leaves, the leaf sheaths fall to the
                ground. They are a by-product of areca nut farming, and every Rootsbay plate turns something that would go to waste
                into income for farming families.
              </p>
              <p>
                Nothing is cut from the tree and nothing is added to the leaf — no glue, wax or coating. After use, Rootsbay&apos;s
                specification puts the plates at home compostable within 60–90 days.
              </p>
            </div>
            <Link href="/how-its-made" className="mt-8 inline-block font-medium text-forest underline underline-offset-4 hover:text-forest-600">
              See how a plate is made
            </Link>
          </div>
        </div>
      </section>

      {/* One accountable supplier */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <h2 className="max-w-2xl text-3xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-4xl">
          What you get from one accountable supplier
        </h2>
        <dl className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {supplier.map((s) => (
            <div key={s.title} className="border-t-2 border-brass pt-4">
              <dt className="font-display text-xl font-semibold text-ink">{s.title}</dt>
              <dd className="mt-2 leading-relaxed text-muted">{s.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Product lines */}
      <section className="border-t border-line bg-sheath-50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-forest sm:text-4xl">Our product lines</h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/products/${c.id}`} className="group block border-t-2 border-brass pt-4">
                  <p className="text-sm text-muted">{c.status === "available" ? "Available now" : "Coming soon"}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-ink group-hover:text-forest">
                    {c.name} <span aria-hidden="true">→</span>
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted">{c.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Work with Rootsbay"
        body="Tell us what you're looking to import and where it needs to go. We'll reply with options."
        secondary={{ href: "/certificates", label: "See our certificates" }}
      />
    </>
  );
}
