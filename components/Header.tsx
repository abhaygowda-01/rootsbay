import Image from "next/image";
import Link from "next/link";
import { DesktopNav, MobileNav } from "./Nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Rootsbay home">
          <Image src="/brand/logo-mark.png" alt="" width={268} height={200} className="h-8 w-auto" priority />
          <Image src="/brand/logo-word.png" alt="Rootsbay" width={468} height={183} className="h-8 w-auto" priority />
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-1">
          <Link
            href="/contact"
            className="hidden rounded-full bg-forest px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-forest-600 sm:inline-block"
          >
            Request a quote
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
