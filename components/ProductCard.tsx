import Image from "next/image";
import Link from "next/link";
import { productHref, type Product } from "@/lib/products";
import { ShapeOutline } from "./ShapeOutline";

/** Large product tile: photo, name, size, one-line summary and the to-scale outline. */
export function ProductCard({ product: p, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <Link href={productHref(p)} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sheath">
        <Image
          src={p.image}
          alt={`${p.name} in use`}
          fill
          priority={priority}
          sizes="(min-width: 1152px) 368px, (min-width: 640px) 46vw, 92vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-muted">{p.code}</p>
          <h3 className="mt-0.5 font-sans text-lg leading-snug font-semibold text-ink group-hover:text-forest">{p.name}</h3>
          <p className="mt-1 text-sm text-muted">{p.sizeLabel}</p>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{p.summary}</p>
        </div>
        <ShapeOutline product={p} className="mt-1 size-12 shrink-0 text-brass sm:size-14" />
      </div>
    </Link>
  );
}
