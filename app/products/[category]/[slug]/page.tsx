import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { ShapeOutline } from "@/components/ShapeOutline";
import { getCategory, getProduct, productHref, products, rangeFacts, seoTitle, shortName } from "@/lib/products";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

// Every product is prerendered by generateStaticParams, so navigations are served from the static cache.
// Dev-only "instant navigation" validation still flags `await params` at the top of the page; opt out.
export const instant = false;

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, slug: p.slug }));
}

function find(categoryId: string, slug: string) {
  const p = getProduct(slug);
  return p && p.category === categoryId ? p : undefined;
}

export async function generateMetadata(props: PageProps<"/products/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await props.params;
  const p = find(category, slug);
  if (!p) return {};
  return pageMeta({
    title: seoTitle(p),
    description: `${p.summary} Areca leaf, chemical-free and home compostable. Bulk export from India.`,
    path: productHref(p),
    image: { url: p.image, alt: `${p.name} in use` },
  });
}

export default async function ProductPage(props: PageProps<"/products/[category]/[slug]">) {
  const { category: categoryId, slug } = await props.params;
  const p = find(categoryId, slug);
  const category = getCategory(categoryId);
  if (!p || !category) notFound();

  const related = products
    .filter((x) => x.slug !== p.slug && (x.shape === p.shape || x.form === p.form))
    .slice(0, 3);

  const specs: [string, string][] = [
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
    url: `${site.url}${productHref(p)}`,
    category: category.name,
    description: `${p.description} ${p.pitch}`,
    image: `${site.url}${p.image}`,
    material: "Areca palm leaf",
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16">
      <Breadcrumbs
        items={[
          { name: "Products", path: "/products" },
          { name: category.name, path: `/products/${category.id}` },
          { name: shortName(p), path: productHref(p) },
        ]}
      />

      <div className="mt-8 grid gap-10 md:grid-cols-[1.15fr_1fr] md:gap-14">
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sheath">
            <Image src={p.image} alt={`${p.name} in use`} fill priority sizes="(min-width: 768px) 620px, 92vw" className="object-cover" />
          </div>
          <figcaption className="dim mt-4 text-sm">
            <span>{p.sizeLabel}</span>
          </figcaption>
        </figure>

        <div>
          <h1 className="text-3xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-4xl">{p.name}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/90">{p.description}</p>
          <p className="mt-4 text-lg leading-relaxed text-muted">{p.pitch}</p>

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
              href={`/contact?product=${p.code}`}
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
        <p className="mt-8 text-muted">
          Want to know how it is made?{" "}
          <Link href="/how-its-made" className="font-medium text-forest underline underline-offset-4">
            See the four steps
          </Link>
          .
        </p>
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-forest">Similar shapes</h2>
          <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <ProductCard product={r} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <JsonLd data={productJsonLd} />
    </article>
  );
}
