import Image from "next/image";
import Link from "next/link";

const nav = [
  { href: "/#range", label: "Products" },
  { href: "/#about", label: "About" },
  { href: "/#process", label: "How it's made" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Rootsbay home">
          <Image src="/brand/logo-mark.png" alt="" width={268} height={200} className="h-8 w-auto" priority />
          <Image src="/brand/logo-word.png" alt="Rootsbay" width={468} height={183} className="h-8 w-auto" priority />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 text-[0.95rem] text-muted md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="transition-colors hover:text-forest">
              {n.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#enquiry"
          className="rounded-full bg-forest px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-forest-600"
        >
          Request a quote
        </Link>
      </div>
    </header>
  );
}
