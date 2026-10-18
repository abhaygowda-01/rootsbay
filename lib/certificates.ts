import { site } from "./site";

/**
 * Documents shown on /certificates.
 *
 * Only list a document as `held` once Rootsbay actually has it. Everything else stays
 * `ask`: the page then says "Ask us" and promises nothing. To publish a certificate:
 *   1. Put the scan or PDF in `public/certificates/` (e.g. `iec.pdf`, `iec.webp`).
 *   2. Set `status: "held"`, plus `reference`, `file` (and `image` for a preview).
 *
 * Importer expectations (which test applies to which market) are general industry practice,
 * not Rootsbay claims — keep them accurate if the wording is edited.
 */
export type Credential = {
  id: string;
  name: string;
  /** What the document shows, in plain words for a buyer. */
  shows: string;
  status: "held" | "ask";
  /** held only: registration or certificate number. */
  reference?: string;
  /** held only: where a buyer can check it. */
  verify?: { href: string; label: string };
  /** held only: path under /public to the PDF, and an image preview of it. */
  file?: string;
  image?: string;
};

export const credentials: Credential[] = [
  {
    id: "gst",
    name: "GST registration",
    shows:
      "Shows Rootsbay is a registered taxpayer in India. Quote the GSTIN on supplier forms and invoices, and check it on the government GST portal.",
    status: "held",
    // TODO(verify): confirm against the GST registration certificate — see lib/site.ts.
    reference: site.gstin,
    verify: { href: "https://www.gst.gov.in/", label: "Open the GST portal (Search Taxpayer)" },
  },
  {
    id: "iec",
    name: "Import Export Code (IEC)",
    shows:
      "A code issued by India's Directorate General of Foreign Trade that identifies an Indian exporter on shipping and customs documents.",
    status: "ask",
  },
  {
    id: "food-contact",
    name: "Food-contact test report",
    shows:
      "A lab report showing the material is safe to touch food. EU and German importers usually ask for migration testing (EU Regulation 1935/2004, LFGB). US importers usually ask for a food-contact compliance statement.",
    status: "ask",
  },
  {
    id: "compostability",
    name: "Compostability certificate",
    shows:
      "Third-party certification to a compostability standard such as EN 13432 (EU) or ASTM D6400 (US). The 60–90 day home-compost figure on our product pages is a catalogue claim, not a certificate.",
    status: "ask",
  },
  {
    id: "origin",
    name: "Certificate of origin",
    shows: "Issued for each shipment. States that the goods were made in India; some importing countries use it to set import duty.",
    status: "ask",
  },
  {
    id: "phytosanitary",
    name: "Phytosanitary certificate",
    shows: "Issued by India's plant quarantine authority for plant-based goods, when the destination country requires it.",
    status: "ask",
  },
];
