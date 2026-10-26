import type { CategoryId } from "./products";

export type Faq = { q: string; a: string };

/**
 * Buyer questions, answered first-sentence-first so each answer stands alone.
 * Tableware figures come from Rootsbay's product specification (see lib/products.ts) — keep them in sync.
 * Rice answers are general and carry no figures; Rootsbay should confirm them (see lib/rice.ts).
 * Shown on the category page. Do not mark these up as FAQPage schema: Google no longer
 * shows FAQ rich results for commercial sites, so the visible text is all that matters.
 */
export const faqByCategory: Partial<Record<CategoryId, Faq[]>> = {
  "biodegradable-tableware": [
    {
      q: "What are areca leaf plates made from?",
      a: "Areca leaf plates are made from the leaf sheaths of the areca palm, which fall from the tree naturally. Rootsbay collects the fallen sheaths in Karnataka, India, washes and dries them, then heat-presses each one into shape. Nothing is added: there is no glue, wax or coating.",
    },
    {
      q: "Are areca leaf plates compostable?",
      a: "Yes. Rootsbay's areca leaf plates are a single natural material with no coating or glue, and Rootsbay's specification puts them at home compostable within 60–90 days after use. That figure is our own specification rather than a third-party certificate; ask us which test reports and certificates are available.",
    },
    {
      q: "Can areca leaf plates hold hot food?",
      a: "Yes. Rootsbay's areca leaf plates and bowls are heat resistant up to 100 °C and leak-resistant with light sauces, according to Rootsbay's specification. For gravies, curries and soups, choose a deep-sided piece such as the 9-inch deep rim plate or the 5-inch soup bowl.",
    },
    {
      q: "Are areca leaf plates microwave safe?",
      a: "Short reheats are fine: our specification allows microwaving for up to 2 minutes. For anything longer, move the food to a microwave-safe dish. If your customers will reheat food in the plates regularly, ask us about the specific shape before you order.",
    },
    {
      q: "What sizes and shapes do you export?",
      a: "Rootsbay's range has 20 shapes: round plates from 4 to 11 inches, square plates from 5 to 10 inches, rectangular and oval trays up to 11 × 7 inches, and bowls from 4.5 to 8.5 inches. Each is shown beside a to-scale outline in a 12-inch square, so you can compare sizes at a glance.",
    },
    {
      q: "How do I order areca leaf plates in bulk?",
      a: "Send an enquiry with the shapes you want, an approximate quantity and your destination. Rootsbay replies with pricing, minimum order, samples and shipping options, usually within one working day. You can also email us or message us on WhatsApp; the contact page has both.",
    },
  ],
  agriculture: [
    {
      q: "Which rice varieties does Rootsbay export?",
      a: "Rootsbay exports white rice — Sona Masuri, Gangavathi Sona, Rasi, IR-20, Jaya and Pragathi — along with aromatic Basmati and three red rices: Jyothi, Rajamudi and Kempu Akki. Each variety has its own page with its grain and typical uses.",
    },
    {
      q: "What is the difference between Sona Masuri and Gangavathi Sona?",
      a: "They are the same lightweight, medium-slender rice. Gangavathi Sona is Sona Masuri grown around Gangavathi in Karnataka's Koppal district, and buyers choose it as a premium grade with a named origin.",
    },
    {
      q: "What is red rice?",
      a: "Red rice keeps a red bran layer on the outside of the grain, which gives it its colour and a firmer bite than white rice. Rajamudi is a heritage red rice from the old Mysore region, and Kempu Akki is the Kannada name for Karnataka's traditional red rice.",
    },
    {
      q: "Do you export Basmati rice?",
      a: "Yes. Rootsbay supplies Basmati, India's aromatic long-grain rice, alongside the South Indian varieties. Tell us the grade and grain length you need when you ask for a quote.",
    },
    {
      q: "What details come with a rice quote?",
      a: "Each quote states the variety, grain length, moisture, broken percentage, crop year, packing and price basis. Ask for a sample if you want to check the rice before you order.",
    },
    {
      q: "How do I order rice in bulk?",
      a: "Send an enquiry with the varieties you want, an approximate quantity and your destination port. Rootsbay replies with pricing, minimum order, samples and shipping options, usually within one working day. You can also email us or message us on WhatsApp; the contact page has both.",
    },
  ],
};
