"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/lib/site";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="hidden items-center gap-8 text-[0.95rem] md:flex">
      {mainNav.map((n) => {
        const active = isActive(pathname, n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`transition-colors hover:text-forest ${
              active ? "font-medium text-forest underline decoration-brass decoration-2 underline-offset-[10px]" : "text-muted"
            }`}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  // Remember which page the menu was opened on: navigating elsewhere closes it without an effect.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenAt(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpenAt(open ? null : pathname)}
        className="grid size-10 place-items-center rounded-md text-ink hover:bg-sheath-50"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M5 5l12 12M17 5L5 17" /> : <path d="M3 6h16M3 11h16M3 16h16" />}
        </svg>
      </button>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="absolute inset-x-0 top-full border-b border-line bg-paper px-4 pt-1 pb-5 shadow-sm sm:px-6">
          <ul>
            {mainNav.map((n) => {
              const active = isActive(pathname, n.href);
              return (
                <li key={n.href} className="border-b border-line/70">
                  <Link
                    href={n.href}
                    aria-current={active ? "page" : undefined}
                    className={`block py-3.5 text-lg ${active ? "font-medium text-forest" : "text-ink"}`}
                  >
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/contact" className="mt-5 block rounded-full bg-forest px-5 py-3 text-center font-medium text-white hover:bg-forest-600">
            Request a quote
          </Link>
        </nav>
      )}
    </div>
  );
}
