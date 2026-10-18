import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { credentials } from "@/lib/certificates";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Certificates and compliance for areca leaf plates",
  description:
    "Rootsbay's GST registration and the documents importers ask an areca leaf plate supplier for: food-contact tests, compostability and export papers.",
  path: "/certificates",
});

export default function CertificatesPage() {
  const held = credentials.filter((c) => c.status === "held");

  return (
    <>
      <PageHero title="Certificates and compliance" crumbs={<Breadcrumbs items={[{ name: "Certificates", path: "/certificates" }]} />}>
        Rootsbay is a GST-registered company in Bengaluru, India. This page lists the registrations you can check today and the
        documents importers usually ask an areca leaf plate supplier for. For test reports and export documents, ask us and we
        will tell you what is available for your market.
      </PageHero>

      {/* Held documents */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="text-3xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-4xl">
          Registrations you can verify
        </h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {held.map((c) => (
            <li key={c.id} className="rounded-2xl border border-line border-t-2 border-t-brass bg-white p-6 sm:p-8">
              <h3 className="font-display text-2xl font-semibold text-ink">{c.name}</h3>
              <p className="mt-1 text-sm text-muted">
                Registered to {site.legalName}, {site.address.city}, {site.address.region}
              </p>
              {c.reference && (
                <p className="mt-5 font-display text-2xl tracking-wide text-forest tabular-nums">{c.reference}</p>
              )}
              <p className="mt-4 leading-relaxed text-muted">{c.shows}</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
                {c.verify && (
                  <a href={c.verify.href} target="_blank" rel="noopener" className="text-forest underline underline-offset-4">
                    {c.verify.label}
                  </a>
                )}
                {c.file && (
                  <a href={c.file} target="_blank" rel="noopener" className="text-forest underline underline-offset-4">
                    View document
                  </a>
                )}
              </div>
              {c.image && (
                <div className="relative mt-6 aspect-[3/4] max-w-xs overflow-hidden rounded-lg border border-line bg-sheath-50">
                  <Image src={c.image} alt={`${c.name} for ${site.legalName}`} fill sizes="320px" className="object-contain" />
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* What importers ask for */}
      <section className="border-t border-line bg-sheath-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <h2 className="max-w-2xl text-3xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-4xl">
            Which documents do importers usually ask for?
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Importers of areca leaf plates usually ask for a registration to check the supplier, a food-contact test report and,
            for some markets, a compostability certificate. Shipments also need origin and, where required, plant-health papers.
          </p>

          <div className="mt-10 overflow-x-auto rounded-xl border border-line bg-white">
            <table className="w-full min-w-[40rem] text-left text-[0.95rem]">
              <caption className="sr-only">Documents importers ask for and their status at Rootsbay</caption>
              <thead className="border-b border-line bg-sheath-50 text-sm text-muted">
                <tr>
                  <th scope="col" className="px-5 py-3 font-medium">
                    Document
                  </th>
                  <th scope="col" className="px-5 py-3 font-medium">
                    What it shows
                  </th>
                  <th scope="col" className="px-5 py-3 font-medium">
                    From Rootsbay
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {credentials.map((c) => (
                  <tr key={c.id} className="align-top">
                    <th scope="row" className="w-56 px-5 py-4 font-semibold text-ink">
                      {c.name}
                    </th>
                    <td className="px-5 py-4 leading-relaxed text-muted">{c.shows}</td>
                    <td className="w-40 px-5 py-4">
                      {c.status === "held" ? (
                        <span className="font-medium text-forest">Registered</span>
                      ) : (
                        <span className="text-muted">Ask us</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBand
        title="Need documents for your market?"
        body="Tell us where you are shipping and which documents your importer or customs broker needs. We'll tell you what we can provide."
        primary={{ href: "/contact?topic=documents", label: "Ask for documents" }}
        secondary={{ href: "/products/biodegradable-tableware", label: "Browse the range" }}
      />
    </>
  );
}
