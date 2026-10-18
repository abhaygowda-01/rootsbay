import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryCards } from "@/components/CategoryCards";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Products: tableware, agriculture, handicrafts",
  description:
    "Rootsbay's product lines: areca leaf tableware available now, with agriculture and handicrafts coming soon. Browse the range or request a quote.",
  path: "/products",
});

// Three of the real photographs, to give the hub a first look at the live range.
const preview = ["RB-AL-02", "RB-AL-03", "RB-AL-04"]
  .map((code) => products.find((p) => p.code === code))
  .filter((p) => p !== undefined);

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Our product lines"
        crumbs={<Breadcrumbs items={[{ name: "Products", path: "/products" }]} />}
        actions={
          <a
            href={site.catalogPdf}
            className="rounded-full border border-forest/30 px-6 py-3 font-medium text-forest transition-colors hover:border-forest"
          >
            Download catalogue (PDF)
          </a>
        }
      >
        Rootsbay exports from three product lines. Biodegradable tableware — areca leaf plates, bowls and trays — is available
        now. Agriculture and handicrafts are coming soon, and each line has its own page.
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <CategoryCards />
      </section>

      <section className="border-t border-line bg-sheath-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.02em] text-forest sm:text-4xl">A first look at the tableware</h2>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">
                Three of {products.length} areca leaf shapes. Every one is heat-pressed from the same naturally fallen leaf.
              </p>
            </div>
            <Link
              href="/products/biodegradable-tableware"
              className="font-medium text-forest underline underline-offset-4 hover:text-forest-600"
            >
              See all {products.length} products
            </Link>
          </div>
          <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {preview.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
