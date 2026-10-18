import type { MetadataRoute } from "next";
import { categories, productHref, products } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "monthly") => ({
    url: `${site.url}${path}`,
    changeFrequency,
    priority,
  });

  return [
    page("", 1),
    page("/products", 0.9),
    // "Coming soon" lines are noindex (see the category page), so they stay out of the sitemap until they open.
    ...categories.filter((c) => c.status === "available").map((c) => page(`/products/${c.id}`, 0.9)),
    ...products.map((p) => page(productHref(p), 0.7)),
    page("/about", 0.6),
    page("/how-its-made", 0.6),
    page("/certificates", 0.6),
    page("/contact", 0.6),
  ];
}
