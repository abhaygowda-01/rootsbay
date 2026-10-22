/**
 * Single source of truth for company details.
 * Everything on the site (header, footer, contact page, JSON-LD, emails)
 * reads from here — edit once, it updates everywhere.
 *
 * Lines marked PLACEHOLDER are waiting for a real value from Rootsbay.
 * The README lists every placeholder in the project and where to fill it.
 */

/**
 * PLACEHOLDER — ordering terms. Fill in any of these and an "Ordering at a glance" panel
 * appears on the contact page; fields left as "" are hidden, so nothing half-empty shows.
 * Example values: moq "10,000 pieces per shape", priceBasis "FOB Bengaluru / Chennai / Mundra",
 * leadTime "3 to 4 weeks after order confirmation".
 */
const ordering: Record<"moq" | "priceBasis" | "leadTime" | "packing" | "samples" | "markets", string> = {
  moq: "",
  priceBasis: "",
  leadTime: "",
  packing: "",
  samples: "",
  markets: "",
};

export const site = {
  name: "Rootsbay",
  // Legal name and trade name as printed on the GST and IEC certificates (a proprietorship).
  legalName: "Abhay S Gowda",
  tradeName: "Rootsbay",
  founder: { name: "Abhay S Gowda", role: "Founder" },
  tagline: "Beyond Borders",
  description:
    "Rootsbay is an agro-export company in Bengaluru, India, supplying areca palm leaf plates, bowls and trays to importers, distributors and caterers worldwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rootsbay.co",

  contact: {
    // Email is the company address. The mobile is the one printed on Rootsbay's Udyam registration
    // certificate (Abhay S Gowda). PLACEHOLDER — swap the mobile for a dedicated sales number if one
    // exists. Changing these lines updates the whole site.
    email: "connect@rootsbay.co",
    phone: "+91 98443 64352",
    phoneHref: "tel:+919844364352",
    // WhatsApp click-to-chat. PLACEHOLDER — assumes the mobile above is on WhatsApp; confirm.
    whatsappHref:
      "https://wa.me/919844364352?text=" + encodeURIComponent("Hello Rootsbay, I'd like a quote for areca leaf tableware."),
  },

  address: {
    line1: "#1488, Krishnadevaraya Road",
    line2: "Opp. JP Park, Vijayanagar",
    city: "Bengaluru",
    region: "Karnataka",
    postalCode: "560040",
    country: "India",
    countryCode: "IN",
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("1488 Krishnadevaraya Road, Vijayanagar, Bengaluru 560040"),
  },

  // Confirmed against the GST registration certificate dated 16 September 2026.
  gstin: "29EHIPG1769R1ZE",

  // PLACEHOLDER — add profile URLs when they exist (e.g. "https://www.linkedin.com/company/rootsbay").
  // Empty entries are hidden from the footer.
  social: {
    linkedin: "",
    instagram: "",
  },

  ordering,
} as const;

/** Top-level pages, in header order. The footer reads the same list. */
export const mainNav = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/how-its-made", label: "How it's made" },
  { href: "/certificates", label: "Certificates" },
  { href: "/contact", label: "Contact" },
] as const;

export type Site = typeof site;
