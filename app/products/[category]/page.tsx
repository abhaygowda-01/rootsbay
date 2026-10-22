import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProductRange } from "@/components/ProductRange";
import { RangeOverview } from "@/components/RangeOverview";
import { faqByCategory } from "@/lib/faq";
import { categories, getCategory, productHref, productsIn, rangeFacts } from "@/lib/products";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

// Every category is prerendered by generateStaticParams, so navigations are served from the static cache.
// Dev-only "instant navigation" validation still flags `await params` at the top of the page; opt out.
export const instant = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata(props: PageProps<"/products/[category]">): Promise<Metadata> {
  const { category: id } = await props.params;
  const c = getCategory(id);
  if (!c) return {};
  const meta = pageMeta({
    title: c.seoTitle,
    description: c.seoDescription,
    path: `/products/${c.id}`,
    image: c.image && { url: c.image.src, alt: c.image.alt },
  });
  // A "coming soon" page has nothing for a search engine to rank. It becomes indexable
  // (and appears in the sitemap) the moment its status is set to "available".
  return c.status === "available" ? meta : { ...meta, robots: { index: false, follow: true } };
}

export default async function CategoryPage(props: PageProps<"/products/[category]">) {
  const { category: id } = await props.params;
  const category = getCategory(id);
  if (!category) notFound();

  const crumbs = [
    { name: "Products", path: "/products" },
    { name: category.name, path: `/products/${category.id}` },
  ];

  if (category.status === "coming-soon") {
    const live = categories.find((c) => c.status === "available");
    return (
      <>
        <PageHero
          title={category.name}
          crumbs={<Breadcrumbs items={crumbs} />}
          actions={
            <Link
              href={`/contact?topic=${category.id}`}
              className="rounded-full bg-forest px-6 py-3 font-medium text-white transition-colors hover:bg-forest-600"
            >
              Tell us what you need
            </Link>
          }
        >
          {category.intro}
        </PageHero>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <p className="inline-block rounded-full border border-brass/60 px-3 py-0.5 text-sm text-brass">Coming soon</p>
          <h2 className="mt-5 max-w-2xl text-3xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-4xl">
            This range is being prepared
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            We would rather open it with products we can describe, measure and ship properly than rush a page. If you already know
            what you would like to import, send us a line and we will get back to you.
          </p>
        </section>

        {live && (
          <section className="border-t border-line bg-sheath-50">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:gap-14 md:py-24">
              {live.image && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={live.image.src} alt={live.image.alt} fill sizes="(min-width: 768px) 540px, 92vw" className="object-cover" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-forest">Available now</p>
                <h2 className="mt-1 text-3xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-4xl">{live.name}</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">{live.blurb}</p>
                <Link
                  href={`/products/${live.id}`}
                  className="mt-7 inline-block rounded-full bg-forest px-6 py-3 font-medium text-white transition-colors hover:bg-forest-600"
                >
                  See the range
                </Link>
              </div>
            </div>
          </section>
        )}
      </>
    );
  }

  const items = productsIn(category.id);
  const faqs = faqByCategory[category.id] ?? [];

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.seoDescription,
    url: `${site.url}/products/${category.id}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: `${site.url}${productHref(p)}`,
      })),
    },
  };

  return (
    <>
      <PageHero
        title={category.name}
        crumbs={<Breadcrumbs items={crumbs} />}
        actions={
          <Link href="/contact" className="rounded-full bg-forest px-6 py-3 font-medium text-white transition-colors hover:bg-forest-600">
            Request a quote
          </Link>
        }
      >
        {category.intro}
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 md:pt-20">
        <RangeOverview />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="text-3xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-4xl">
          {items.length} shapes, one material
        </h2>
        <p className="mt-4 max-w-[40rem] text-lg leading-relaxed text-muted">
          Every piece is the same areca leaf — choose by size and shape. The brass outline beside each product is drawn to scale
          inside a 12-inch square, so you can compare sizes at a glance.
        </p>
        <div className="mt-10">
          <ProductRange items={items} />
        </div>
      </section>

      <section className="border-t border-line bg-sheath-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <h2 className="text-3xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-4xl">
            What every piece has in common
          </h2>
          <dl className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {rangeFacts.map((f) => (
              <div key={f.title} className="border-t-2 border-brass pt-4">
                <dt className="font-display text-xl font-semibold text-ink">{f.title}</dt>
                <dd className="mt-2 leading-relaxed text-muted">{f.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <h2 className="max-w-2xl text-3xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-4xl">
            Questions buyers ask about areca leaf plates
          </h2>
          <div className="mt-12 grid gap-x-14 gap-y-10 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-sans text-xl font-semibold text-ink">{f.q}</h3>
                <p className="mt-2 leading-relaxed text-muted">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-muted">
            Looking for test reports or export documents?{" "}
            <Link href="/certificates" className="font-medium text-forest underline underline-offset-4">
              See what importers usually ask for
            </Link>
            .
          </p>
        </section>
      )}

      <CtaBand />
      <JsonLd data={collectionJsonLd} />
    </>
  );
}
