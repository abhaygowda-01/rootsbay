import Image from "next/image";
import Link from "next/link";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ProductRange } from "@/components/ProductRange";
import { products, rangeFacts } from "@/lib/products";
import { site } from "@/lib/site";

const steps = [
  {
    title: "Collect",
    body: "Areca palms shed their leaf sheaths naturally. Farmers in Karnataka gather the fallen sheaths — nothing is cut from the tree.",
  },
  {
    title: "Clean",
    body: "Sheaths are soaked and washed in plain water, then dried in the sun.",
  },
  {
    title: "Press",
    body: "Each sheath is heat-pressed into shape in a mould. Heat and pressure alone hold the form — no glue, wax or coating.",
  },
  {
    title: "Check and pack",
    body: "Pieces are trimmed, inspected one by one and packed in cartons sized for export shipping.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-canopy text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-16 sm:px-6 md:grid-cols-[1.05fr_1fr] md:pt-20 md:pb-24">
          <div>
            <h1 className="rise text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.025em] sm:text-6xl">
              Plates pressed from fallen palm leaves, shipped to kitchens worldwide.
            </h1>
            <p className="rise rise-1 mt-6 max-w-[34rem] text-lg leading-relaxed text-white/75">
              Rootsbay exports areca leaf plates, bowls and trays from Karnataka, India — {products.length} shapes from 4 to 11
              inches, chemical-free and home compostable. Packed for importers, distributors and caterers.
            </p>
            <div className="rise rise-2 mt-9 flex flex-wrap gap-3">
              <Link
                href="#enquiry"
                className="rounded-full bg-white px-6 py-3 font-medium text-canopy transition-colors hover:bg-sheath"
              >
                Request a quote
              </Link>
              <a
                href={site.catalogPdf}
                className="rounded-full border border-white/30 px-6 py-3 font-medium text-white transition-colors hover:border-white/70"
              >
                Download catalogue (PDF)
              </a>
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

      {/* Range */}
      <section id="range" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 className="text-4xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-5xl">
              Twenty shapes, one material
            </h2>
            <p className="mt-4 max-w-[38rem] text-lg leading-relaxed text-muted">
              Every piece is the same areca leaf — choose by size and shape. The brass outline beside each product is drawn
              to scale inside a 12-inch square, so you can compare sizes at a glance.
            </p>
          </div>
          <a href={site.catalogPdf} className="text-sm font-medium text-forest underline underline-offset-4 hover:text-forest-600">
            Full catalogue (PDF, 2.5 MB)
          </a>
        </div>
        <div className="mt-10">
          <ProductRange />
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-sheath-50">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
          <div>
            <h2 className="text-4xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-5xl">
              An agro-export house from Bengaluru
            </h2>
            <div className="mt-6 max-w-[34rem] space-y-4 text-lg leading-relaxed text-muted">
              <p>
                Rootsbay takes agricultural products from Karnataka&apos;s farms to buyers abroad. We handle sourcing, quality
                checks, export paperwork and shipping, so you deal with one accountable supplier.
              </p>
              <p>
                Our first line is areca leaf tableware. The leaf sheaths are a by-product of areca nut farming, so every plate
                turns something that would go to waste into income for farming families.
              </p>
            </div>
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-xl">
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

      {/* Process */}
      <section id="process" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <h2 className="max-w-2xl text-4xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-5xl">
          From fallen leaf to finished plate
        </h2>
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="font-display text-5xl font-semibold text-brass-300" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-3 font-sans text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Enquiry + contact */}
      <section id="enquiry" className="border-t border-line bg-sheath-50">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:py-28">
          <div id="contact">
            <h2 className="text-4xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-5xl">Request a quote</h2>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted">
              Tell us the shapes, quantity and destination. We&apos;ll send pricing, minimum order, samples and shipping options.
            </p>

            <dl className="mt-10 space-y-5 text-[0.95rem]">
              <div>
                <dt className="text-sm text-muted">Email</dt>
                <dd>
                  <a href={`mailto:${site.contact.email}`} className="font-medium text-ink hover:text-forest">
                    {site.contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Phone and WhatsApp</dt>
                <dd className="flex flex-wrap gap-x-4">
                  <a href={site.contact.phoneHref} className="font-medium text-ink hover:text-forest">
                    {site.contact.phone}
                  </a>
                  <a href={site.contact.whatsappHref} target="_blank" rel="noopener" className="text-forest underline underline-offset-4">
                    Chat on WhatsApp
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Office</dt>
                <dd>
                  <address className="not-italic">
                    {site.address.line1}, {site.address.line2}
                    <br />
                    {site.address.city} {site.address.postalCode}, India
                  </address>
                  <a href={site.address.mapsHref} target="_blank" rel="noopener" className="text-sm text-forest underline underline-offset-4">
                    Open in Google Maps
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
