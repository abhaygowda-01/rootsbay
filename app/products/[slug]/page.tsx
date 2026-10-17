import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShapeOutline } from "@/components/ShapeOutline";
import { categories, getProduct, products, rangeFacts, shortName } from "@/lib/products";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProduct(slug);
  if (!p) return {};
  const title = `${p.name} (${p.sizeLabel})`;
  return {
    title,
    description: `${p.summary} Areca palm leaf, chemical-free and compostable. Bulk export from India by Rootsbay.`,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title, images: [{ url: p.image }] },
  };
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const p = getProduct(slug);
  if (!p) notFound();

  const category = categories.find((c) => c.id === p.category);
  const related = products
    .filter((x) => x.slug !== p.slug && (x.shape === p.shape || x.form === p.form))
    .slice(0, 4);

  const specs: [string, string][] = [
    ["Product code", p.code],
    ["Size", p.sizeLabel],
    ["Shape", p.profile],
    ["Best for", p.bestFor],
    ["Material", "Areca palm leaf sheath, nothing added"],
  ];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: p.code,
    description: p.description,
    image: `${site.url}${p.image}`,
    material: "Areca palm leaf",
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/#range" className="hover:text-forest">
          {category?.name ?? "Products"}
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-ink">{shortName(p)}</span>
      </nav>

      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sheath">
            <Image src={p.image} alt={`${p.name} in use`} fill priority sizes="(min-width: 768px) 540px, 92vw" className="object-cover" />
          </div>
          <figcaption className="dim mt-4 text-sm">
            <span>{p.sizeLabel}</span>
          </figcaption>
        </figure>

        <div>
          <p className="text-sm text-muted">{p.code}</p>
          <h1 className="mt-1 text-3xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-4xl">{p.name}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{p.description}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {p.highlights.map((h) => (
              <li key={h} className="rounded-full bg-forest/8 px-3 py-1 text-sm text-forest">
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-start gap-6 border-t border-line pt-6">
            <dl className="grid flex-1 grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 text-[0.95rem]">
              {specs.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <figure className="hidden w-24 shrink-0 text-center sm:block">
              <ShapeOutline product={p} className="w-24 text-brass" />
              <figcaption className="mt-1 text-xs text-muted">To scale in a 12″ square</figcaption>
            </figure>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/?product=${p.code}#enquiry`}
              className="rounded-full bg-forest px-6 py-3 font-medium text-white transition-colors hover:bg-forest-600"
            >
              Request a quote for this item
            </Link>
            <a
              href={site.contact.whatsappHref}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-forest/50"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <section className="mt-20 border-t border-line pt-12">
        <h2 className="text-2xl font-semibold text-forest">Every piece in the range</h2>
        <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {rangeFacts.map((f) => (
            <li key={f.title}>
              <h3 className="font-sans font-semibold text-ink">{f.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-forest">Similar shapes</h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/products/${r.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-sheath">
                    <Image src={r.image} alt="" fill sizes="(min-width: 1024px) 270px, 45vw" className="object-cover" />
                  </div>
                  <p className="mt-2 text-[0.95rem] font-medium group-hover:text-forest">{shortName(r)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c") }}
      />
    </article>
  );
}
