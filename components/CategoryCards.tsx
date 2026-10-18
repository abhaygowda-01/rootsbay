import Image from "next/image";
import Link from "next/link";
import { categories, productsIn } from "@/lib/products";

/** The product lines as cards: the available line large, the others beside it. */
export function CategoryCards() {
  const live = categories.filter((c) => c.status === "available");
  const soon = categories.filter((c) => c.status === "coming-soon");

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
      {live.map((c) => (
        <Link
          key={c.id}
          href={`/products/${c.id}`}
          className="group block rounded-2xl border border-line bg-white p-3 transition-colors hover:border-forest/40 lg:row-span-2"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sheath">
            {c.image && (
              <Image
                src={c.image.src}
                alt={c.image.alt}
                fill
                sizes="(min-width: 1024px) 600px, 92vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            )}
          </div>
          <div className="px-3 pt-6 pb-4 sm:px-5">
            <p className="text-sm font-medium text-forest">Available now</p>
            <h3 className="mt-1 text-3xl font-semibold tracking-[-0.015em] text-ink group-hover:text-forest">{c.name}</h3>
            <p className="mt-3 max-w-lg text-lg leading-relaxed text-muted">{c.blurb}</p>
            <p className="mt-5 font-medium text-forest">
              See all {productsIn(c.id).length} products <span aria-hidden="true">→</span>
            </p>
          </div>
        </Link>
      ))}

      {soon.map((c) => (
        <Link
          key={c.id}
          href={`/products/${c.id}`}
          className="group flex flex-col justify-between rounded-2xl border border-line bg-sheath-50 p-7 transition-colors hover:border-forest/40 sm:p-9"
        >
          <div>
            <p className="inline-block rounded-full border border-brass/60 px-3 py-0.5 text-sm text-brass">Coming soon</p>
            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.015em] text-ink group-hover:text-forest">{c.name}</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">{c.blurb}</p>
          </div>
          <p className="mt-8 font-medium text-forest">
            Tell us what you need <span aria-hidden="true">→</span>
          </p>
        </Link>
      ))}
    </div>
  );
}
