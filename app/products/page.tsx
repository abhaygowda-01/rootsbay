import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryCards } from "@/components/CategoryCards";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { categories, productsIn } from "@/lib/products";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Products: rice, areca leaf tableware, handicrafts",
  description:
    "Rootsbay's product lines: rice and areca leaf tableware available now, with handicrafts coming soon. Browse the range or request a quote.",
  path: "/products",
});

/** A first look at each open line: three items, real photographs first. */
const previews = categories
  .filter((c) => c.status === "available")
  .map((c) => {
    const items = productsIn(c.id);
    const photos = items.filter((p) => p.photo);
    return { category: c, count: items.length, items: (photos.length >= 3 ? photos : items).slice(0, 3) };
  });

export default function ProductsPage() {
  return (
    <>
      <PageHero title="Our product lines" crumbs={<Breadcrumbs items={[{ name: "Products", path: "/products" }]} />}>
        Rootsbay exports from three product lines. Biodegradable tableware — areca leaf plates, bowls and trays — and
        agriculture, starting with rice, are available now. Handicrafts are coming soon, and each line has its own page.
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <CategoryCards />
      </section>

      <section className="border-t border-line bg-sheath-50">
        <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 sm:px-6 md:py-24">
          {previews.map(({ category: c, count, items }) => (
            <div key={c.id}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-semibold tracking-[-0.02em] text-forest sm:text-4xl">A first look: {c.name.toLowerCase()}</h2>
                  <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">{c.blurb}</p>
                </div>
                <Link href={`/products/${c.id}`} className="font-medium text-forest underline underline-offset-4 hover:text-forest-600">
                  See all {count} products
                </Link>
              </div>
              <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <li key={p.slug}>
                    <ProductCard product={p} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
