import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { credentials } from "@/lib/certificates";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Certificates and export documents",
  description:
    "Rootsbay's GST, IEC and Udyam (MSME) registrations, and the documents importers of rice and areca leaf tableware ask for: test reports and export papers.",
  path: "/certificates",
});

export default function CertificatesPage() {
  const held = credentials.filter((c) => c.status === "held");

  return (
    <>
      <PageHero title="Certificates and compliance" crumbs={<Breadcrumbs items={[{ name: "Certificates", path: "/certificates" }]} />}>
        Rootsbay is a registered business in Bengaluru, India, with GST, Importer-Exporter Code (IEC) and Udyam (MSME)
        registrations. This page publishes those certificates and lists the other documents importers usually ask an agro
        exporter for. For test reports and export documents, ask us and we will tell you what is available for your market.
      </PageHero>

      {/* Held documents */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="text-3xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-4xl">
          Registrations you can verify
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Each certificate is shown as issued. Open the PDF for the full document, or check the number with the issuing authority.
        </p>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {held.map((c) => (
            <li key={c.id} className="flex flex-col">
              {c.image && c.file && (
                <a
                  href={c.file}
                  target="_blank"
                  rel="noopener"
                  className="group relative block aspect-[3/4] overflow-hidden rounded-xl border border-line bg-white"
                  aria-label={`Open the ${c.name} certificate (PDF)`}
                >
                  <Image
                    src={c.image}
                    alt={`${c.name} certificate, page one`}
                    fill
                    sizes="(min-width: 1152px) 368px, (min-width: 768px) 30vw, 92vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </a>
              )}
              <div className="mt-5 border-t-2 border-brass pt-4">
                <h3 className="font-display text-2xl font-semibold text-ink">{c.name}</h3>
                {c.reference && <p className="mt-2 font-display text-xl tracking-wide text-forest tabular-nums">{c.reference}</p>}
                <dl className="mt-3 space-y-1 text-sm text-muted">
                  {c.holder && (
                    <div>
                      <dt className="inline">Issued to </dt>
                      <dd className="inline text-ink">{c.holder}</dd>
                    </div>
                  )}
                  {c.issuer && (
                    <div>
                      <dt className="inline">Issued by </dt>
                      <dd className="inline text-ink">{c.issuer}</dd>
                    </div>
                  )}
                  {c.issuedOn && (
                    <div>
                      <dt className="inline">Date </dt>
                      <dd className="inline text-ink">{c.issuedOn}</dd>
                    </div>
                  )}
                </dl>
                <p className="mt-4 leading-relaxed text-muted">{c.shows}</p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
                  {c.file && (
                    <a href={c.file} target="_blank" rel="noopener" className="text-forest underline underline-offset-4">
                      View certificate (PDF)
                    </a>
                  )}
                  {c.verify && (
                    <a href={c.verify.href} target="_blank" rel="noopener" className="text-forest underline underline-offset-4">
                      {c.verify.label}
                    </a>
                  )}
                </div>
              </div>
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
            Importers of areca leaf plates usually ask for registrations to check the supplier, a food-contact test report and,
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
                        <span className="font-medium text-forest">Published above</span>
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
