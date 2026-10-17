"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { matchesFilter, products, shapeFilters } from "@/lib/products";
import { ShapeOutline } from "./ShapeOutline";

type FilterId = (typeof shapeFilters)[number]["id"];

export function ProductRange() {
  const [filter, setFilter] = useState<FilterId>("all");
  const shown = products.filter((p) => matchesFilter(p, filter));

  return (
    <div>
      <div role="group" aria-label="Filter by shape" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {shapeFilters.map((f) => {
          const count = products.filter((p) => matchesFilter(p, f.id)).length;
          const active = f.id === filter;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                active
                  ? "border-forest bg-forest text-white"
                  : "border-line bg-white text-ink hover:border-forest/50"
              }`}
            >
              {f.label} <span className={active ? "text-white/70" : "text-muted"}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-4">
        {shown.map((p) => (
          <li key={p.slug}>
            <Link href={`/products/${p.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-sheath">
                <Image
                  src={p.image}
                  alt={`${p.name} in use`}
                  fill
                  sizes="(min-width: 1024px) 270px, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-muted">{p.code}</p>
                  <h3 className="mt-0.5 font-sans text-[0.95rem] leading-snug font-semibold text-ink group-hover:text-forest">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{p.sizeLabel}</p>
                </div>
                <ShapeOutline product={p} className="mt-1 size-8 shrink-0 text-brass sm:size-11" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
