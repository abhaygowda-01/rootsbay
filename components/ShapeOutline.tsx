import type { TablewareProduct } from "@/lib/products";

/**
 * Draws a product's outline at true relative scale inside a 12-inch frame,
 * so a 4" plate genuinely looks a third the size of an 11" platter.
 */
export function ShapeOutline({
  product,
  className = "",
  frame = 12,
}: {
  product: Pick<TablewareProduct, "shape" | "form" | "size">;
  className?: string;
  frame?: number;
}) {
  const { width: w, height: h } = product.size;
  const cx = frame / 2;
  const cy = frame / 2;
  const stroke = "currentColor";
  const sw = 0.18;

  let shape: React.ReactNode;
  if (product.shape === "round") {
    shape = <circle cx={cx} cy={cy} r={w / 2} />;
  } else if (product.shape === "oval") {
    shape = <ellipse cx={cx} cy={cy} rx={w / 2} ry={h / 2} />;
  } else {
    const r = Math.min(w, h) * 0.08;
    shape = <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={r} />;
  }

  return (
    <svg
      viewBox={`0 0 ${frame} ${frame}`}
      className={className}
      role="img"
      aria-label={`Outline to scale: ${w}″ × ${h}″`}
    >
      <g fill="none" stroke={stroke} strokeWidth={sw}>
        {shape}
        {product.form === "bowl" && (
          <circle cx={cx} cy={cy} r={(w / 2) * 0.62} strokeDasharray="0.35 0.35" opacity={0.7} />
        )}
      </g>
    </svg>
  );
}
