import type { NextConfig } from "next";
import { products } from "./lib/products";

// The site's canonical host. The bare domain redirects here (see redirects below).
const canonicalHost = "www.rootsbay.co";

// Sent with every page. Next.js inlines small scripts and styles, so they need 'unsafe-inline';
// Cloudflare Web Analytics is allowed in case it is switched on in the dashboard.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://cloudflareinsights.com",
  "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  // Development needs eval for fast refresh, so the policy only applies to production builds.
  ...(process.env.NODE_ENV === "production" ? [{ key: "Content-Security-Policy", value: csp }] : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Cloudflare resizes images through the IMAGES binding in wrangler.jsonc. If Cloudflare Images is not
  // available on the account, build with NEXT_IMAGE_UNOPTIMIZED=true to serve the WebP files as they are.
  images: { unoptimized: process.env.NEXT_IMAGE_UNOPTIMIZED === "true" },
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
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // rootsbay.co → www.rootsbay.co, so every page has one address.
      {
        source: "/:path*",
        has: [{ type: "host", value: canonicalHost.replace(/^www\./, "") }],
        destination: `https://${canonicalHost}/:path*`,
        permanent: true,
      },
      // Product pages moved from /products/<slug> to /products/<category>/<slug>.
      ...products.map((p) => ({
        source: `/products/${p.slug}`,
        destination: `/products/${p.category}/${p.slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
