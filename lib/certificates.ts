import { site } from "./site";

/**
 * Documents shown on /certificates.
 *
 * Only list a document as `held` once Rootsbay actually has it. Everything else stays
 * `ask`: the page then says "Ask us" and promises nothing. To publish another certificate:
 *   1. Put the PDF in `public/certificates/` and a page-one image of it next to it
 *      (e.g. `food-contact-test-report.pdf` and `food-contact-test-report.webp`, about 1000 px wide).
 *   2. Change its entry below to `status: "held"` and fill the fields marked held-only.
 *
 * The three registrations below were copied from the certificates Abhay S Gowda supplied
 * (GST dated 16 Sep 2026, IEC 17 Sep 2026, Udyam 19 Sep 2026). Importer expectations for the
 * other documents (which test applies to which market) are general industry practice,
 * not Rootsbay claims — keep them accurate if the wording is edited.
 */
export type Credential = {
  id: string;
  name: string;
  /** What the document shows, in plain words for a buyer. */
  shows: string;
  status: "held" | "ask";
  /** held only: who the certificate is issued to, as printed on it. */
  holder?: string;
  /** held only: the issuing body. */
  issuer?: string;
  /** held only: registration or certificate number. */
  reference?: string;
  /** held only: date of issue, written out. */
  issuedOn?: string;
  /** held only: where a buyer can check it. */
  verify?: { href: string; label: string };
  /** held only: path under /public to the PDF, and a page-one image of it. */
  file?: string;
  image?: string;
};

export const credentials: Credential[] = [
  {
    id: "gst",
    name: "GST registration",
    shows:
      "Registers Rootsbay as a regular taxpayer in India. Quote the GSTIN on supplier forms and invoices, and check it on the government GST portal under Search Taxpayer.",
    status: "held",
    holder: `${site.legalName}, trading as ${site.tradeName} (proprietorship)`,
    issuer: "Government of India, Goods and Services Tax",
    reference: site.gstin,
    issuedOn: "16 September 2026",
    verify: { href: "https://www.gst.gov.in/", label: "Open the GST portal" },
    file: "/certificates/gst-registration-certificate.pdf",
    image: "/certificates/gst-registration-certificate.webp",
  },
  {
    id: "iec",
    name: "Import Export Code (IEC)",
    shows:
      "The code customs and shipping lines use to identify an Indian exporter. Check it on the DGFT website under Services, View Any IEC Details, with the IEC and firm name.",
    status: "held",
    holder: `${site.legalName} (proprietorship)`,
    issuer: "Directorate General of Foreign Trade, Ministry of Commerce and Industry",
    reference: "EHIPG1769R",
    issuedOn: "17 September 2026",
    verify: { href: "https://www.dgft.gov.in/", label: "Open the DGFT website" },
    file: "/certificates/iec-certificate.pdf",
    image: "/certificates/iec-certificate.webp",
  },
  {
    id: "udyam",
    name: "Udyam (MSME) registration",
    shows:
      "Registers Rootsbay as a Micro enterprise (classification year 2026-27) with India's Ministry of Micro, Small and Medium Enterprises.",
    status: "held",
    holder: `${site.tradeName} (Micro enterprise)`,
    issuer: "Ministry of Micro, Small and Medium Enterprises, Government of India",
    reference: "UDYAM-KR-03-0760777",
    issuedOn: "19 September 2026",
    verify: { href: "https://udyamregistration.gov.in/", label: "Open the Udyam portal" },
    file: "/certificates/udyam-registration-certificate.pdf",
    image: "/certificates/udyam-registration-certificate.webp",
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
