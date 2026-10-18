"use client";

import { useState } from "react";
import { matchesFilter, shapeFilters, type Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";

type FilterId = (typeof shapeFilters)[number]["id"];

export function ProductRange({ items }: { items: Product[] }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const shown = items.filter((p) => matchesFilter(p, filter));

  return (
    <div>
      <div role="group" aria-label="Filter by shape" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {shapeFilters.map((f) => {
          const count = items.filter((p) => matchesFilter(p, f.id)).length;
          const active = f.id === filter;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                active ? "border-forest bg-forest text-white" : "border-line bg-white text-ink hover:border-forest/50"
              }`}
            >
              {f.label} <span className={active ? "text-white/70" : "text-muted"}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <li key={p.slug}>
            <ProductCard product={p} priority={i < 3} />
          </li>
        ))}
      </ul>
    </div>
  );
}
