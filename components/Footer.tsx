import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  const socials = Object.entries(site.social).filter(([, url]) => url);
  return (
    <footer className="bg-canopy text-white/75">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Image src="/brand/logo-full-white.png" alt="Rootsbay — Beyond Borders" width={468} height={385} className="h-28 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{site.description}</p>
        </div>

        <div className="text-sm leading-relaxed">
          <h2 className="mb-3 font-sans text-sm font-semibold text-white">Office</h2>
          <address className="not-italic">
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            {site.address.city} {site.address.postalCode}, {site.address.region}, {site.address.country}
          </address>
          <p className="mt-3">GSTIN {site.gstin}</p>
        </div>

        <div className="text-sm leading-relaxed">
          <h2 className="mb-3 font-sans text-sm font-semibold text-white">Contact</h2>
          <ul className="space-y-1.5">
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={site.contact.phoneHref} className="hover:text-white">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={site.contact.whatsappHref} className="hover:text-white" target="_blank" rel="noopener">
                WhatsApp
              </a>
            </li>
            <li>
              <Link href={site.catalogPdf} className="hover:text-white">
                Product catalogue (PDF)
              </Link>
            </li>
            {socials.map(([name, url]) => (
              <li key={name}>
                <a href={url} className="capitalize hover:text-white" target="_blank" rel="noopener">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-white/50 sm:px-6">
          © Rootsbay. Agro exports from Bengaluru, India.
        </p>
      </div>
    </footer>
  );
}
