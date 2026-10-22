import type { CategoryId } from "./products";

export type Faq = { q: string; a: string };

/**
 * Buyer questions, answered first-sentence-first so each answer stands alone.
 * Every figure comes from Rootsbay's product specification (see lib/products.ts) — keep them in sync.
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
      a: "Yes. Rootsbay's areca leaf plates and bowls are heat resistant up to 100 °C and leak-resistant with light sauces, according to Rootsbay's specification. For gravies, curries and soups, choose a deep-sided piece such as the 9-inch deep rim plate (RB-AL-06) or the 5-inch soup bowl (RB-AL-07).",
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
};
