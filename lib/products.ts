/**
 * Product catalogue.
 *
 * Source: "Areca Leaf Eco-Tableware Catalog" (20 options) supplied by Rootsbay.
 * Descriptions and claims are taken from that catalogue — keep them in sync
 * if the catalogue changes. Add new agro product lines by adding a category
 * to `categories` and items with that `category` id.
 */

export type Shape = "round" | "square" | "rectangle" | "oval";
export type Form = "plate" | "bowl" | "tray";

export type Product = {
  slug: string;
  code: string; // internal SKU-style code used in enquiries
  category: string;
  name: string;
  shape: Shape;
  form: Form;
  /** Outer dimensions in inches. For round items width = height = diameter. */
  size: { width: number; height: number; depth?: number };
  sizeLabel: string;
  profile: string;
  bestFor: string;
  summary: string;
  description: string;
  highlights: string[];
  image: string;
  /** true = real product photograph; false = small crop from the PDF catalogue collage */
  photo: boolean;
};

export const categories = [
  {
    id: "areca-leaf-tableware",
    name: "Areca leaf tableware",
    blurb:
      "Plates, bowls and trays heat-pressed from naturally fallen areca palm leaf sheaths.",
  },
] as const;

export const shapeFilters: { id: "all" | Shape | "bowl"; label: string }[] = [
  { id: "all", label: "All shapes" },
  { id: "round", label: "Round plates" },
  { id: "square", label: "Square plates" },
  { id: "rectangle", label: "Trays and boats" },
  { id: "bowl", label: "Bowls" },
];

const C = "areca-leaf-tableware";

export const products: Product[] = [
  {
    slug: "4-inch-round-dessert-plate",
    code: "RB-AL-01",
    category: C,
    name: "4-inch round fruit and dessert plate",
    shape: "round",
    form: "plate",
    size: { width: 4, height: 4 },
    sizeLabel: '4" diameter',
    profile: "Shallow round",
    bestFor: "Berries, desserts, appetisers",
    summary: "Compact round plate for quick bites, appetisers and small desserts.",
    description:
      "Crafted from naturally fallen raw palm leaves, this 4-inch round plate is a fully biodegradable option for single-portion appetisers, cocktail nibbles, fresh berries or tapas.",
    highlights: ["Heat resistant", "Leak-proof against light sauces"],
    image: "/images/products/01.webp",
    photo: true,
  },
  {
    slug: "6-inch-square-dip-tray",
    code: "RB-AL-02",
    category: C,
    name: "6-inch square appetiser and dip tray",
    shape: "square",
    form: "tray",
    size: { width: 6, height: 6 },
    sizeLabel: '6" × 6"',
    profile: "Flat, raised edge",
    bestFor: "Dips, pita, finger food",
    summary: "Flat square plate for finger food, hummus spreads and bread.",
    description:
      "Structured right-angle rims and good rigidity keep oil from seeping and give clean separation between snacks and dipping sauces. Suited to cocktail parties and catering setups.",
    highlights: ["Resists oil seepage", "Rigid right-angle rim"],
    image: "/images/products/02.webp",
    photo: true,
  },
  {
    slug: "10-inch-round-salad-plate",
    code: "RB-AL-03",
    category: C,
    name: "10-inch round salad and grain bowl plate",
    shape: "round",
    form: "plate",
    size: { width: 10, height: 10 },
    sizeLabel: '10" diameter',
    profile: "Wide rim round",
    bestFor: "Salads, grain bowls, grilled protein",
    summary: "Spacious, gently sloped round plate for full-meal salads and grain bowls.",
    description:
      "Made to carry full-sized meals without bending under weight. The natural leaf grain gives grain salads, quinoa bowls and grilled dishes a clean, natural backdrop.",
    highlights: ["Holds full meals without bending", "Natural leaf grain finish"],
    image: "/images/products/03.webp",
    photo: true,
  },
  {
    slug: "9x6-inch-rectangular-sushi-plate",
    code: "RB-AL-04",
    category: C,
    name: "9 × 6-inch rectangular bento and sushi plate",
    shape: "rectangle",
    form: "tray",
    size: { width: 9, height: 6 },
    sizeLabel: '9" × 6"',
    profile: "Low boundary tray",
    bestFor: "Sushi, dim sum, bento",
    summary: "Elongated rectangular tray for precise presentation and multi-item sushi rolls.",
    description:
      "Clean rectangular geometry for Asian fusion cuisine, sushi rolls and dim sum platters. Naturally cut and heat-pressed for smooth edges and durability.",
    highlights: ["Heat-pressed smooth edges", "Low rim for neat plating"],
    image: "/images/products/04.webp",
    photo: true,
  },
  {
    slug: "8-inch-square-dinner-plate",
    code: "RB-AL-05",
    category: C,
    name: "8-inch square dinner plate",
    shape: "square",
    form: "plate",
    size: { width: 8, height: 8 },
    sizeLabel: '8" × 8"',
    profile: "Slight curved rim",
    bestFor: "Main meals, BBQ",
    summary: "Sturdy medium square plate for individual entrées, steaks and sides.",
    description:
      "Built to hold heavy mains without bowing. Its rigid structure carries barbecued meats, roasted vegetables and hearty sides at outdoor catered dinners.",
    highlights: ["Holds heavy mains without bowing", "Rigid structure"],
    image: "/images/products/05.webp",
    photo: false,
  },
  {
    slug: "9-inch-round-deep-rim-plate",
    code: "RB-AL-06",
    category: C,
    name: "9-inch round deep rim dinner plate",
    shape: "round",
    form: "plate",
    size: { width: 9, height: 9 },
    sizeLabel: '9" diameter',
    profile: "Deep wall round",
    bestFor: "Rice dishes, curries",
    summary: "Versatile round plate with raised sidewalls for gravies and saucy mains.",
    description:
      "High structural walls hold meals with light gravies or rice bases. Non-toxic and chemical-free.",
    highlights: ["Microwavable up to 2 minutes", "Non-toxic, chemical-free"],
    image: "/images/products/06.webp",
    photo: false,
  },
  {
    slug: "5-inch-deep-soup-bowl",
    code: "RB-AL-07",
    category: C,
    name: "5-inch deep soup bowl",
    shape: "round",
    form: "bowl",
    size: { width: 5, height: 5, depth: 2.5 },
    sizeLabel: '5" diameter, 2.5" deep',
    profile: "Deep round bowl",
    bestFor: "Soups, broths, cereals",
    summary: "Compact high-capacity bowl for hot soups, stews and breakfast cereals.",
    description:
      "Moulded under high heat for thermal stability and liquid retention. Holds hot soups, chilli or broth without softening or passing excess heat to the hands.",
    highlights: ["Holds up to 350 ml", "Stays cool to hold"],
    image: "/images/products/07.webp",
    photo: false,
  },
  {
    slug: "8-5-inch-shallow-pasta-bowl",
    code: "RB-AL-08",
    category: C,
    name: "8.5-inch round shallow pasta bowl",
    shape: "round",
    form: "bowl",
    size: { width: 8.5, height: 8.5 },
    sizeLabel: '8.5" diameter',
    profile: "Shallow bowl",
    bestFor: "Pasta, noodles, risotto",
    summary: "Wide shallow bowl for pasta, noodles and risotto.",
    description:
      "Combines the surface area of a plate with the liquid retention of a bowl. Good for saucy pasta, Italian dishes and curried rice without spills.",
    highlights: ["Plate surface, bowl retention", "Spill-resistant rim"],
    image: "/images/products/08.webp",
    photo: false,
  },
  {
    slug: "10-inch-square-buffet-platter",
    code: "RB-AL-09",
    category: C,
    name: "10-inch large square buffet platter",
    shape: "square",
    form: "plate",
    size: { width: 10, height: 10 },
    sizeLabel: '10" × 10"',
    profile: "Heavy-duty flat",
    bestFor: "Buffets, curry platters, weddings",
    summary: "Generous square platter for full multi-course meals.",
    description:
      "Made for heavy-duty catering and wedding buffets. Holds several food items — breads, rice and sides — at once without sagging or leaking oil.",
    highlights: ["No sagging under full meals", "No oil leakage"],
    image: "/images/products/09.webp",
    photo: false,
  },
  {
    slug: "5-inch-square-pastry-plate",
    code: "RB-AL-10",
    category: C,
    name: "5-inch compact square pastry plate",
    shape: "square",
    form: "plate",
    size: { width: 5, height: 5 },
    sizeLabel: '5" × 5"',
    profile: "Flat profile",
    bestFor: "Cakes, pastries, petit fours",
    summary: "Small square plate for cakes, pastries, cut fruit and petit fours.",
    description:
      "An artisan touch for bakery displays, wedding dessert stations and high-tea events. Light, yet sturdy enough that cutlery won't puncture the base.",
    highlights: ["Cutlery won't puncture the base", "Lightweight"],
    image: "/images/products/10.webp",
    photo: false,
  },
  {
    slug: "6-inch-round-snack-bowl-plate",
    code: "RB-AL-11",
    category: C,
    name: "6-inch round snack and nut bowl plate",
    shape: "round",
    form: "bowl",
    size: { width: 6, height: 6 },
    sizeLabel: '6" diameter',
    profile: "Deep concave",
    bestFor: "Nuts, olives, bar snacks",
    summary: "Slightly recessed small round plate for bar snacks, dry fruit and nuts.",
    description:
      "Holds dry snacks, roasted nuts or small finger food. Stacks compactly for storage and easy distribution at gatherings.",
    highlights: ["Stackable", "Recessed centre"],
    image: "/images/products/11.webp",
    photo: false,
  },
  {
    slug: "9-inch-round-burger-plate",
    code: "RB-AL-12",
    category: C,
    name: "9-inch round burger and fries plate",
    shape: "round",
    form: "plate",
    size: { width: 9, height: 9 },
    sizeLabel: '9" diameter',
    profile: "Flat centre, wide edge",
    bestFor: "Burgers, sandwiches, fries",
    summary: "Sturdy medium plate sized for burgers, sandwiches and fries.",
    description:
      "Resists grease from fried food and warm sandwiches. Suited to food trucks and casual outdoor barbecues.",
    highlights: ["Grease resistant", "Wide flat centre"],
    image: "/images/products/12.webp",
    photo: false,
  },
  {
    slug: "11x7-inch-rectangular-serving-tray",
    code: "RB-AL-13",
    category: C,
    name: "11 × 7-inch rectangular serving tray",
    shape: "rectangle",
    form: "tray",
    size: { width: 11, height: 7 },
    sizeLabel: '11" × 7"',
    profile: "Flared rim tray",
    bestFor: "Roasted vegetables, meats, sharing",
    summary: "Large rectangular tray for family-style sides and grilled platters.",
    description:
      "Maximum surface area for family-style service or shared appetiser spreads. Serve oven-roasted dishes straight onto it.",
    highlights: ["Heat resistant up to 100 °C", "Largest serving surface"],
    image: "/images/products/13.webp",
    photo: false,
  },
  {
    slug: "7-inch-round-noodle-bowl",
    code: "RB-AL-14",
    category: C,
    name: "7-inch round noodle and rice bowl",
    shape: "round",
    form: "bowl",
    size: { width: 7, height: 7, depth: 2 },
    sizeLabel: '7" diameter, 2" deep',
    profile: "Round deep bowl",
    bestFor: "Ramen, noodles, stir-fries",
    summary: "All-purpose medium bowl for noodle soups, stir-fries and ramen.",
    description:
      "Holds individual portions of broth-heavy dishes without leaking or bending. The natural grain makes every bowl unique.",
    highlights: ["No leaking or bending", "Every bowl's grain is unique"],
    image: "/images/products/14.webp",
    photo: false,
  },
  {
    slug: "8-5-inch-round-cheese-plate",
    code: "RB-AL-15",
    category: C,
    name: "8.5-inch round charcuterie and cheese plate",
    shape: "round",
    form: "plate",
    size: { width: 8.5, height: 8.5 },
    sizeLabel: '8.5" diameter',
    profile: "Flat cutting surface",
    bestFor: "Charcuterie, cheese, crackers",
    summary: "Classic round plate for cheese assortments, crackers and condiments.",
    description:
      "A common choice for caterers and eco-conscious events. Firm density gives a stable surface for slicing soft cheese and displaying artisanal items.",
    highlights: ["Firm enough to slice on", "Flat surface"],
    image: "/images/products/15.webp",
    photo: false,
  },
  {
    slug: "8-inch-deep-fruit-bowl",
    code: "RB-AL-16",
    category: C,
    name: "8-inch deep round fruit bowl",
    shape: "round",
    form: "bowl",
    size: { width: 8, height: 8 },
    sizeLabel: '8" diameter',
    profile: "Curved basin",
    bestFor: "Fruit salads, shared sides",
    summary: "High-capacity round dish for fruit salads, snacks and shared sides.",
    description:
      "Shows off the colour of fresh fruit while keeping juices from dripping onto surfaces.",
    highlights: ["Home compostable within 60–90 days", "Keeps juices contained"],
    image: "/images/products/16.webp",
    photo: false,
  },
  {
    slug: "4-5-inch-dessert-bowl",
    code: "RB-AL-17",
    category: C,
    name: "4.5-inch small round ice cream and dessert bowl",
    shape: "round",
    form: "bowl",
    size: { width: 4.5, height: 4.5 },
    sizeLabel: '4.5" diameter',
    profile: "Mini bowl",
    bestFor: "Ice cream, sorbet, dips",
    summary: "Petite deep dish for ice cream scoops, pudding or individual dips.",
    description:
      "Naturally insulating, so cold desserts stay cool longer. Natural leak resistance handles gelato and sorbet.",
    highlights: ["Naturally insulating", "Leak resistant"],
    image: "/images/products/17.webp",
    photo: false,
  },
  {
    slug: "10x5-5-inch-oval-taco-boat",
    code: "RB-AL-18",
    category: C,
    name: "10 × 5.5-inch oval taco and wrap boat",
    shape: "oval",
    form: "tray",
    size: { width: 10, height: 5.5 },
    sizeLabel: '10" × 5.5" oval',
    profile: "Elongated boat",
    bestFor: "Tacos, wraps, street food",
    summary: "Oval boat for tacos, hot dogs and wraps.",
    description:
      "The curved oval contour supports layered tacos and burritos and keeps toppings from spilling over the sides.",
    highlights: ["Contains toppings", "Curved boat profile"],
    image: "/images/products/18.webp",
    photo: false,
  },
  {
    slug: "7-inch-square-breakfast-plate",
    code: "RB-AL-19",
    category: C,
    name: "7-inch square croissant and breakfast plate",
    shape: "square",
    form: "plate",
    size: { width: 7, height: 7 },
    sizeLabel: '7" × 7"',
    profile: "Flat base",
    bestFor: "Pastries, croissants, breakfast",
    summary: "Medium square plate for morning pastries, toast and breakfast items.",
    description:
      "Presents bakery goods with an eco-conscious, premium feel. The rigid surface keeps buttery pastries firm without oil bleed.",
    highlights: ["No oil bleed", "Rigid flat base"],
    image: "/images/products/19.webp",
    photo: false,
  },
  {
    slug: "11-inch-round-meze-platter",
    code: "RB-AL-20",
    category: C,
    name: "11-inch round compartment and meze platter",
    shape: "round",
    form: "plate",
    size: { width: 11, height: 11 },
    sizeLabel: '11" diameter',
    profile: "Multi-dip platter",
    bestFor: "Meze, tapas, sharing",
    summary: "Large round platter for Mediterranean meze, hummus and dips.",
    description:
      "Rootsbay's flagship serving plate for communal dining. Holds multi-dish samplers, dips, pita and appetisers together.",
    highlights: ["Largest round in the range", "Made for sharing"],
    image: "/images/products/20.webp",
    photo: false,
  },
];

/** Compact label for chips and lists, e.g. `9″ deep rim plate`. */
export function shortName(p: Product) {
  const special: Record<string, string> = {
    "RB-AL-06": '9" deep rim plate',
    "RB-AL-12": '9" burger plate',
    "RB-AL-15": '8.5" cheese plate',
    "RB-AL-11": '6" snack bowl',
  };
  if (special[p.code]) return special[p.code];
  const { width: w, height: h } = p.size;
  if (p.shape === "round") return `${w}" round ${p.form}`;
  if (p.shape === "square") return `${w}" square ${p.form}`;
  if (p.shape === "oval") return `${w} × ${h}" oval boat`;
  return `${w} × ${h}" tray`;
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function matchesFilter(p: Product, filter: (typeof shapeFilters)[number]["id"]) {
  if (filter === "all") return true;
  if (filter === "bowl") return p.form === "bowl";
  if (p.form === "bowl") return false;
  if (filter === "rectangle") return p.shape === "rectangle" || p.shape === "oval";
  return p.shape === filter;
}

/** Facts shared by the whole areca range, as stated in the supplied catalogue. */
export const rangeFacts = [
  {
    title: "Naturally fallen leaves",
    body: "Made from areca palm leaf sheaths that drop from the tree on their own. No tree is cut.",
  },
  {
    title: "Nothing added",
    body: "Heat-pressed from the leaf alone. Non-toxic and chemical-free, with no coating or glue.",
  },
  {
    title: "Holds hot food",
    body: "Heat resistant up to 100 °C, leak-resistant with light sauces, and microwavable for short reheats.",
  },
  {
    title: "Back to the soil",
    body: "Home compostable within 60–90 days after use.",
  },
] as const;
