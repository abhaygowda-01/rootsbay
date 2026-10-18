import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EnquiryForm } from "@/components/EnquiryForm";
import { OrderingTerms } from "@/components/OrderingTerms";
import { PageHero } from "@/components/PageHero";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Request a quote for areca leaf plates",
  description:
    "Send Rootsbay your shapes, quantity and destination. We reply with pricing, minimum order, samples and shipping options for areca leaf plates, bowls and trays.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero title="Request a quote" crumbs={<Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />}>
        Tell us the shapes, quantity and destination. We&apos;ll send pricing, minimum order, samples and shipping options.
      </PageHero>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:py-24">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.01em] text-forest">Talk to us directly</h2>
          <dl className="mt-8 space-y-5 text-[0.95rem]">
            <div>
              <dt className="text-sm text-muted">{site.founder.role}</dt>
              <dd className="font-medium text-ink">{site.founder.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Email</dt>
              <dd>
                <a href={`mailto:${site.contact.email}`} className="font-medium text-ink hover:text-forest">
                  {site.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Phone and WhatsApp</dt>
              <dd className="flex flex-wrap gap-x-4">
                <a href={site.contact.phoneHref} className="font-medium text-ink hover:text-forest">
                  {site.contact.phone}
                </a>
                <a href={site.contact.whatsappHref} target="_blank" rel="noopener" className="text-forest underline underline-offset-4">
                  Chat on WhatsApp
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Office</dt>
              <dd>
                <address className="not-italic">
                  {site.address.line1}, {site.address.line2}
                  <br />
                  {site.address.city} {site.address.postalCode}, India
                </address>
                <a href={site.address.mapsHref} target="_blank" rel="noopener" className="text-sm text-forest underline underline-offset-4">
                  Open in Google Maps
                </a>
              </dd>
            </div>
          </dl>

          <OrderingTerms />

          <h2 className="mt-12 text-2xl font-semibold tracking-[-0.01em] text-forest">What to include</h2>
          <ul className="mt-4 space-y-2 leading-relaxed text-muted">
            <li>The shapes you want. Product codes such as RB-AL-04 help, but you can describe them too.</li>
            <li>Roughly how many pieces, or whether you want samples first.</li>
            <li>The country or port you are shipping to.</li>
            <li>Any custom size, packaging or branding you need.</li>
          </ul>
        </div>

        <EnquiryForm />
      </section>
    </>
  );
}
