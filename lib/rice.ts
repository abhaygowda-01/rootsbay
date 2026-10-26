import type { RiceProduct } from "./products";

/**
 * Rice varieties, shown under the agriculture line.
 *
 * Source: the variety list and short labels Rootsbay supplied (two collage images). The descriptions
 * are general, widely published facts about each variety, written for buyers — not a Rootsbay
 * specification. No grain sizes, moisture or broken percentages here until Rootsbay supplies them.
 *
 * Pictures are crops of those collages (AI-generated, ~350 px wide, soft when enlarged).
 * Replace them with real photos at 1200 px or wider, same file names in public/images/rice/.
 */
const varieties: Omit<RiceProduct, "kind" | "category" | "photo">[] = [
  {
    slug: "basmati-rice",
    code: "RB-RC-01",
    variety: "Basmati",
    name: "Basmati rice",
    colour: "white",
    grain: "Long, slender grain",
    bestFor: "Biryani, pulao, restaurant menus",
    summary: "Aromatic long-grain rice that cooks up separate and fluffy.",
    description:
      "Basmati is India's best-known aromatic rice. Its long, slender grains stay separate when cooked and carry the fragrance that biryani and pulao are known for.",
    pitch:
      "The rice importers ask for by name. Restaurants, caterers and grocers use it as their premium line for biryani, pulao and other South Asian dishes.",
    highlights: ["Aromatic", "Long grain"],
    image: "/images/rice/basmati.webp",
  },
  {
    slug: "sona-masuri-rice",
    code: "RB-RC-02",
    variety: "Sona Masuri",
    name: "Sona Masuri rice",
    colour: "white",
    grain: "Medium-slender grain",
    bestFor: "Everyday meals, South Indian dishes",
    summary: "Lightweight, medium-slender white rice for everyday meals.",
    description:
      "Sona Masuri is a lightweight, medium-slender rice eaten every day across South India. It cooks soft and light, which suits home kitchens and restaurants alike.",
    pitch:
      "A dependable everyday rice for South Indian restaurants, grocers serving Indian communities abroad and caterers who cook rice in volume.",
    highlights: ["Lightweight", "Medium-slender grain"],
    image: "/images/rice/sona-masuri.webp",
  },
  {
    slug: "gangavathi-sona-rice",
    code: "RB-RC-03",
    variety: "Gangavathi Sona",
    name: "Gangavathi Sona rice",
    colour: "white",
    grain: "Medium-slender grain",
    origin: "Gangavathi, Karnataka",
    bestFor: "Premium everyday rice",
    summary: "Sona Masuri from Gangavathi in north Karnataka, sold as a premium grade.",
    description:
      "Gangavathi Sona is Sona Masuri grown around Gangavathi in Karnataka's Koppal district, an area known for rice growing and milling. Buyers choose it as a premium grade of Sona Masuri.",
    pitch:
      "For buyers who want Sona Masuri with a named origin: premium grocery shelves, and restaurants that serve it every day.",
    highlights: ["Premium quality", "Named origin"],
    image: "/images/rice/gangavathi-sona.webp",
  },
  {
    slug: "rasi-rice",
    code: "RB-RC-04",
    variety: "Rasi",
    name: "Rasi rice",
    colour: "white",
    bestFor: "Everyday meals, food service",
    summary: "White rice from a medium-duration, semi-dwarf variety.",
    description: "Rasi is a white rice from a medium-duration, semi-dwarf variety grown in South India.",
    pitch: "A practical everyday rice for food-service and bulk buyers who cook rice in volume.",
    highlights: ["Medium-duration variety", "Semi-dwarf"],
    image: "/images/rice/rasi.webp",
  },
  {
    slug: "ir-20-rice",
    code: "RB-RC-05",
    variety: "IR-20",
    name: "IR-20 rice",
    colour: "white",
    grain: "Medium-slender grain",
    bestFor: "Everyday meals, food service",
    summary: "A popular high-yielding, medium-slender white rice.",
    description:
      "IR-20 is a high-yielding, medium-slender white rice. It is a long-established variety that is still widely grown and eaten in South India.",
    pitch: "A familiar rice for wholesalers and food-service buyers who want a medium-slender grain in volume.",
    highlights: ["High-yielding", "Medium-slender grain"],
    image: "/images/rice/ir-20.webp",
  },
  {
    slug: "jyothi-rice",
    code: "RB-RC-06",
    variety: "Jyothi",
    name: "Jyothi rice",
    colour: "red",
    bestFor: "Everyday meals, South Indian dishes",
    summary: "A Green Revolution variety with a reddish-brown grain.",
    description:
      "Jyothi is a high-yielding variety from India's Green Revolution years. Its grain has a reddish-brown tone, and it is popular in Kerala and Karnataka.",
    pitch: "For grocers and restaurants serving customers from Kerala and Karnataka, who know Jyothi by name.",
    highlights: ["Green Revolution variety", "Reddish-brown grain"],
    image: "/images/rice/jyothi.webp",
  },
  {
    slug: "jaya-rice",
    code: "RB-RC-07",
    variety: "Jaya",
    name: "Jaya rice",
    colour: "white",
    bestFor: "Everyday meals, food service",
    summary: "A high-yielding white rice grown in southern Karnataka.",
    description: "Jaya is one of India's early high-yielding rice varieties and is widely grown in southern Karnataka.",
    pitch: "An everyday white rice for wholesalers and food-service buyers who cook in volume.",
    highlights: ["High-yielding", "Southern Karnataka"],
    image: "/images/rice/jaya.webp",
  },
  {
    slug: "pragathi-rice",
    code: "RB-RC-08",
    variety: "Pragathi",
    name: "Pragathi rice",
    colour: "white",
    grain: "Medium-slender grain",
    bestFor: "Everyday meals, food service",
    summary: "High-yielding, medium-slender white rice.",
    description: "Pragathi is a high-yielding white rice with a medium-slender grain.",
    pitch: "A medium-slender everyday rice for grocers, wholesalers and caterers.",
    highlights: ["High-yielding", "Medium-slender grain"],
    image: "/images/rice/pragathi.webp",
  },
  {
    slug: "rajamudi-red-rice",
    code: "RB-RC-09",
    variety: "Rajamudi",
    name: "Rajamudi red rice",
    colour: "red",
    origin: "Karnataka",
    bestFor: "Speciality shelves, regional Indian menus",
    summary: "Heritage red rice from Karnataka, with a story behind its name.",
    description:
      "Rajamudi is a heritage red rice from Karnataka. Its name is said to come from the old Mysore kingdom, where farmers set this rice aside for the royal household.",
    pitch:
      "A rice with a story buyers can tell: a named heritage grain from Karnataka for speciality grocers and restaurants that feature regional Indian food.",
    highlights: ["Heritage variety", "Speciality grain"],
    image: "/images/rice/rajamudi.webp",
  },
  {
    slug: "kempu-akki-red-rice",
    code: "RB-RC-10",
    variety: "Kempu Akki",
    name: "Kempu Akki red rice",
    colour: "red",
    origin: "Karnataka",
    bestFor: "Everyday meals, traditional Karnataka dishes",
    summary: "Karnataka's traditional red rice, known locally as kempu akki.",
    description:
      "Kempu Akki is the Kannada name for Karnataka's traditional red rice. Its colour comes from the red bran layer on the outside of the grain.",
    pitch:
      "For grocers and restaurants serving South Indian customers who grew up eating red rice, and for buyers adding a traditional grain to their range.",
    highlights: ["Traditional variety", "Everyday red rice"],
    image: "/images/rice/kempu-akki.webp",
  },
];

export const rice: RiceProduct[] = varieties.map((v) => ({ ...v, kind: "rice", category: "agriculture", photo: false }));

/** What comes with every rice order. Commitments written for Rootsbay to confirm, not supplied facts. */
export const riceFacts = [
  {
    title: "Sold by variety",
    body: "Every lot is a named variety, so you get the same rice your customers ask for.",
  },
  {
    title: "Specification on every quote",
    body: "Each quote states the grain length, moisture, broken percentage and crop year of the lot on offer.",
  },
  {
    title: "Samples first",
    body: "Ask for a sample of any variety and check it before you commit to an order.",
  },
  {
    title: "Packed for your market",
    body: "Tell us the bag size and markings your buyers expect, and we pack the order to match.",
  },
] as const;
