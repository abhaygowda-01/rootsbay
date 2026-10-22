import Image from "next/image";

/** Wide picture of plates, bowls and trays side by side, with the brass dimension-line caption. */
export function RangeOverview({
  caption = "Illustrative: the range comes in round, square, rectangular and oval shapes. Exact sizes and codes are listed with each product.",
}: {
  caption?: string;
}) {
  return (
    <figure>
      <div className="relative aspect-[1408/768] overflow-hidden rounded-xl bg-sheath">
        <Image
          src="/images/range-overview.webp"
          alt="Areca leaf plates, bowls and trays in round, square, rectangular and oval shapes, shown without food on a wooden table"
          fill
          sizes="(min-width: 1152px) 1104px, 92vw"
          className="object-cover"
        />
      </div>
      <figcaption className="dim mt-4 text-sm">
        <span className="max-w-[44rem] text-center">{caption}</span>
      </figcaption>
    </figure>
  );
}
