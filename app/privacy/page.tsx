import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Privacy policy",
  description:
    "How Rootsbay handles the details you send through the website: what we collect, why, who processes it, how long we keep it and how to reach us.",
  path: "/privacy",
});

// Written for India's Digital Personal Data Protection Act 2023 and the GDPR, in plain language.
// Update `updated` whenever this text changes. The wording is a sensible default for Rootsbay to confirm.
const updated = "4 November 2026";

const a = site.address;
const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Who we are",
    body: (
      <p>
        This website is run by {site.tradeName}, a proprietorship of {site.legalName}, at {a.line1}, {a.line2}, {a.city}{" "}
        {a.postalCode}, {a.region}, {a.country} (GSTIN {site.gstin}). For anything about your data, write to{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>
    ),
  },
  {
    title: "What we collect",
    body: (
      <>
        <p>
          Only what you choose to send us. When you use the quote form we receive your name, email, the country you ship to,
          the quantity and products you ask about, and anything else you fill in: company, phone number and your message. If you
          email, call or message us, we receive what you send that way.
        </p>
        <p>
          Your IP address is used for a few minutes to stop the form being flooded with spam. It is not stored or passed on with
          your enquiry. The website sets no cookies and uses no analytics or advertising trackers. Our hosting provider keeps
          short-lived technical logs (such as IP address and pages requested) to run the site securely.
        </p>
      </>
    ),
  },
  {
    title: "Why we use it",
    body: (
      <p>
        To answer your enquiry: to send prices, samples and shipping options, and, if you order, to prepare and ship that order.
        You give us these details so that we can do this, which is the basis on which we use them. We do not use them for
        unrelated marketing, and we never sell them.
      </p>
    ),
  },
  {
    title: "Who else handles it",
    body: (
      <>
        <p>We use a small number of service providers, only to run the website and deliver your message:</p>
        <ul>
          <li>Cloudflare, which hosts the website.</li>
          <li>Resend, which delivers the quote form to our inbox.</li>
          <li>Our email provider, which stores the messages we receive.</li>
        </ul>
        <p>
          These providers may process data outside India, including in the United States, under their own security and data
          protection commitments. If you place an order, we share what is needed with shipping and customs partners to deliver
          it.
        </p>
      </>
    ),
  },
  {
    title: "How long we keep it",
    body: (
      <p>
        We keep an enquiry while we are talking to you and for up to two years after our last contact, so we can follow up on
        quotes and repeat orders. Records linked to an order are kept for as long as Indian tax and export law requires. After
        that we delete them.
      </p>
    ),
  },
  {
    title: "Your rights",
    body: (
      <p>
        You can ask us what we hold about you, ask us to correct or delete it, or withdraw your consent at any time by writing to{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. We reply within 30 days. If you are not satisfied with our
        answer, you can complain to the Data Protection Board of India or, if you are in the European Union or the United Kingdom,
        to your local data protection authority.
      </p>
    ),
  },
  {
    title: "Contact for privacy questions",
    body: (
      <p>
        {site.founder.name}, {site.founder.role}, {site.tradeName}: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>,{" "}
        <a href={site.contact.phoneHref}>{site.contact.phone}</a>.
      </p>
    ),
  },
  {
    title: "Changes",
    body: <p>If we change how we handle your data, we will update this page and the date below.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy policy" crumbs={<Breadcrumbs items={[{ name: "Privacy policy", path: "/privacy" }]} />}>
        We collect only what you send us, use it to answer your enquiry, and keep it no longer than we need to.
      </PageHero>

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
        {sections.map((s) => (
          <section key={s.title} className="mt-10 first:mt-0">
            <h2 className="text-2xl font-semibold text-forest">{s.title}</h2>
            <div className="mt-3 space-y-4 text-lg leading-relaxed text-muted [&_a]:text-forest [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
              {s.body}
            </div>
          </section>
        ))}
        <p className="mt-12 text-sm text-muted">Last updated {updated}.</p>
      </article>
    </>
  );
}
