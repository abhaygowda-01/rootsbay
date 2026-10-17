/**
 * Single source of truth for company details.
 * Everything on the site (header, footer, contact block, JSON-LD, emails)
 * reads from here — edit once, it updates everywhere.
 */
export const site = {
  name: "Rootsbay",
  legalName: "Rootsbay",
  tagline: "Beyond Borders",
  description:
    "Rootsbay is an agro-export company in Bengaluru, India, supplying areca palm leaf plates, bowls and trays to importers, distributors and caterers worldwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rootsbay.co",

  contact: {
    email: "connect@rootsbay.co",
    phone: "+91 98443 64352",
    phoneHref: "tel:+919844364352",
    // WhatsApp click-to-chat. Confirm this number is on WhatsApp Business.
    whatsappHref:
      "https://wa.me/919844364352?text=" +
      encodeURIComponent("Hello Rootsbay, I'd like a quote for areca leaf tableware."),
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

  // TODO(verify): signboard reads "29EHIPG1769RIZE". GSTIN format is
  // 2-digit state + 10-char PAN + entity digit + "Z" + checksum, so the 13th
  // character should be the digit 1 → "29EHIPG1769R1ZE". Confirm with the GST certificate.
  gstin: "29EHIPG1769R1ZE",

  // Add profile URLs when available; empty entries are hidden.
  social: {
    linkedin: "",
    instagram: "",
  },

  catalogPdf: "/rootsbay-areca-catalog.pdf",
} as const;

export type Site = typeof site;
