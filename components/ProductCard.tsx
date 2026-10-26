import Image from "next/image";
import Link from "next/link";
import { detailLabel, imageAlt, productHref, type Product } from "@/lib/products";
import { ShapeOutline } from "./ShapeOutline";

/** Large product tile: photo, name, size or grain, one-line summary and (tableware) the to-scale outline. */
export function ProductCard({ product: p, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <Link href={productHref(p)} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sheath">
        <Image
          src={p.image}
          alt={imageAlt(p)}
          fill
          priority={priority}
          sizes="(min-width: 1152px) 368px, (min-width: 640px) 46vw, 92vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-sans text-lg leading-snug font-semibold text-ink group-hover:text-forest">{p.name}</h3>
          <p className="mt-1 text-sm text-muted">{detailLabel(p)}</p>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{p.summary}</p>
        </div>
        {p.kind === "tableware" && <ShapeOutline product={p} className="mt-1 size-12 shrink-0 text-brass sm:size-14" />}
      </div>
    </Link>
  );
}
