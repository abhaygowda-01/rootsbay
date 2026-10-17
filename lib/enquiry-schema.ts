import { z } from "zod";

/** Shared by the enquiry form (client) and /api/enquiry (server). */
export const quantityOptions = [
  "Sample order",
  "Under 10,000 pieces",
  "10,000 – 50,000 pieces",
  "50,000 – 200,000 pieces",
  "Over 200,000 pieces (full container)",
] as const;

export const enquirySchema = z.object({
  name: z.string({ error: "Enter your name" }).trim().min(2, "Enter your name").max(100),
  company: z.string().trim().max(120).optional().default(""),
  email: z.email("Enter a valid email address").max(160),
  phone: z.string().trim().max(30).optional().default(""),
  country: z.string({ error: "Enter the country you're shipping to" }).trim().min(2, "Enter the country you're shipping to").max(80),
  products: z.array(z.string().max(20)).max(30).default([]),
  quantity: z.enum(quantityOptions, { error: "Choose an approximate quantity" }),
  message: z.string().trim().max(2000).optional().default(""),
  // Spam guards — not shown to people
  website: z.string().max(0).optional().default(""), // honeypot: must stay empty
  startedAt: z.number().int().optional(), // ms timestamp when the form was opened
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;
