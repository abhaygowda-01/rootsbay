"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/products";

const items = [{ href: "/products", label: "All products" }, ...categories.map((c) => ({ href: `/products/${c.id}`, label: c.name }))];

/** The title bar shown on every /products page: one tab per product line. */
export function ProductsNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Product lines" className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur">
      <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const active = item.href === "/products" ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`block border-b-2 px-3 py-3.5 text-[0.95rem] transition-colors sm:px-4 ${
                  active ? "border-brass font-medium text-forest" : "border-transparent text-muted hover:text-forest"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
