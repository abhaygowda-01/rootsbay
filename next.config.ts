import type { NextConfig } from "next";
import { products } from "./lib/products";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Product pages moved from /products/<slug> to /products/<category>/<slug>.
  async redirects() {
    return products.map((p) => ({
      source: `/products/${p.slug}`,
      destination: `/products/${p.category}/${p.slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
