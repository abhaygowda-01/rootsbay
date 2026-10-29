import type { Metadata } from "next";
import { site } from "./site";

type MetaImage = { url: string; alt: string; width?: number; height?: number };

/** Default social-share image: the square tray photo. */
export const defaultImage: MetaImage = {
  url: "/images/products/02.webp",
  width: 1200,
  height: 900,
  alt: "Square areca leaf tray holding hummus and pita bread",
};

/**
 * Metadata for one page. Every page sets its own canonical, title, description
 * and share card — pages that set `openGraph` replace the layout's, so the shared
 * fields are repeated here once instead of on every page.
 *
 * `title` gets the "| Rootsbay" suffix from the layout template; pass
 * `absolute: true` to skip it (home page).
 */
export function pageMeta({
  title,
  description,
  path,
  image = defaultImage,
  absolute = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: MetaImage;
  absolute?: boolean;
}): Metadata {
  const shareTitle = absolute ? title : `${title} | ${site.name}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
      title: shareTitle,
      description,
      url: path,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [image.url] },
  };
}

/** schema.org BreadcrumbList. `path` is site-relative, e.g. `/products`. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
