import { z } from "zod";

/** Shared by the enquiry form (client) and /api/enquiry (server). */
// Container-based so the same list works for tableware (pieces) and rice (tonnes).
export const quantityOptions = [
  "Samples first",
  "Trial order (less than a container)",
  "One full container",
  "Several containers or regular supply",
] as const;

export const enquirySchema = z.object({
  name: z.string({ error: "Enter your name" }).trim().min(2, "Enter your name").max(100),
  company: z.string().trim().max(120).optional().default(""),
  email: z.email("Enter a valid email address").max(160),
  phone: z.string().trim().max(30).optional().default(""),
  country: z.string({ error: "Enter the country you're shipping to" }).trim().min(2, "Enter the country you're shipping to").max(80),
  products: z.array(z.string().max(20)).max(60).default([]),
  quantity: z.enum(quantityOptions, { error: "Choose an approximate quantity" }),
  message: z.string().trim().max(2000).optional().default(""),
  // Spam guards — not shown to people
  website: z.string().max(0).optional().default(""), // honeypot: must stay empty
  startedAt: z.number().int().optional(), // ms timestamp when the form was opened
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;
