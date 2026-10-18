import { site } from "@/lib/site";

const labels = {
  moq: "Minimum order",
  priceBasis: "Pricing basis",
  leadTime: "Lead time",
  packing: "Packing",
  samples: "Samples",
  markets: "Markets we ship to",
} as const;

/**
 * "Ordering at a glance" — fed by `site.ordering` in lib/site.ts.
 * Renders nothing until at least one field is filled in, so the page never shows an empty box.
 */
export function OrderingTerms() {
  const rows = (Object.keys(labels) as (keyof typeof labels)[]).filter((k) => site.ordering[k].trim() !== "");
  if (rows.length === 0) return null;

  return (
    <>
      <h2 className="mt-12 text-2xl font-semibold tracking-[-0.01em] text-forest">Ordering at a glance</h2>
      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 text-[0.95rem]">
        {rows.map((k) => (
          <div key={k} className="contents">
            <dt className="text-muted">{labels[k]}</dt>
            <dd className="text-ink">{site.ordering[k]}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
