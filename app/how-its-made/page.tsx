import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "How areca leaf plates are made",
  description:
    "How areca leaf plates are made: fallen palm leaf sheaths collected in Karnataka, washed, sun-dried and heat-pressed with no glue or coating.",
  path: "/how-its-made",
  image: { url: "/images/products/03.webp", width: 1408, height: 768, alt: "Round areca leaf plate holding a quinoa salad with grilled chicken" },
});

const steps = [
  {
    title: "Collect",
    body: "Areca palms shed their leaf sheaths on their own. Farmers in Karnataka gather the sheaths from the ground once they have fallen. Nothing is cut from the tree, and no tree is felled for your order.",
    benefit: "A plate that needs no explaining: no trees cut, and a by-product of areca nut farming turned into income for the farm.",
  },
  {
    title: "Clean",
    body: "The collected sheaths are soaked and washed in plain water, then dried in the sun until they are ready to press. Nothing is added to the leaf at this stage, or at any later one.",
    benefit: "A plain, natural surface. What you see on the plate is the leaf itself.",
  },
  {
    title: "Press",
    body: "Each sheath is heat-pressed into shape in a mould. Heat and pressure alone hold the form — no glue, wax or coating. The pressed leaf is heat resistant up to 100 °C and resists light sauces and oil.",
    benefit: "Plates that stay rigid under a full meal, in 20 shapes from 4-inch dessert plates to 11-inch meze platters.",
  },
  {
    title: "Check and pack",
    body: "Pieces are trimmed, inspected one by one and packed in cartons sized for export shipping.",
    benefit: "Every piece has been looked at before it is packed, so you are not sorting stock when the carton arrives.",
  },
];

export default function HowItsMadePage() {
  return (
    <>
      <PageHero title="How areca leaf plates are made" crumbs={<Breadcrumbs items={[{ name: "How it's made", path: "/how-its-made" }]} />}>
        Areca leaf plates are made from areca palm leaf sheaths that have fallen naturally. Farmers in Karnataka collect the
        sheaths, which are washed in plain water and dried in the sun. Each sheath is then heat-pressed in a mould, trimmed,
        inspected and packed for export. No glue, wax or coating is added at any step.
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 md:pt-20">
        <div className="relative aspect-[16/8] overflow-hidden rounded-xl">
          <Image
            src="/images/products/03.webp"
            alt="Round areca leaf plate holding a quinoa salad with grilled chicken"
            fill
            priority
            sizes="(min-width: 1152px) 1104px, 92vw"
            className="object-cover"
          />
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <ol className="divide-y divide-line">
          {steps.map((s, i) => (
            <li key={s.title} className="grid gap-6 py-12 md:grid-cols-[0.55fr_1.45fr] md:gap-14 md:py-16">
              <div>
                <span className="font-display text-7xl font-semibold text-brass-300" aria-hidden="true">
                  {i + 1}
                </span>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-forest">{s.title}</h2>
              </div>
              <div>
                <p className="text-xl leading-relaxed text-ink/90">{s.body}</p>
                <p className="mt-6 border-l-2 border-brass pl-4 leading-relaxed text-muted">
                  <span className="font-medium text-ink">For you: </span>
                  {s.benefit}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-line bg-sheath-50">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <h2 className="text-3xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-4xl">
              Why is every areca leaf plate slightly different?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Each plate is pressed from a real leaf sheath, so grain and shade vary from piece to piece. That is the leaf, not a
              flaw, and it is why a table of areca plates looks natural rather than uniform.
            </p>
          </div>
          <div>
            <h2 className="text-3xl leading-tight font-semibold tracking-[-0.02em] text-forest sm:text-4xl">
              What happens after the meal?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Because the plate is a single natural material, it can go to a compost heap whole. Our product catalogue states
              areca leaf tableware is home compostable within 60–90 days after use.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="See what we make"
        body="Twenty shapes, all from the same areca leaf. Browse the range, then tell us what you need."
        secondary={{ href: "/products/biodegradable-tableware", label: "Browse the range" }}
      />
    </>
  );
}
