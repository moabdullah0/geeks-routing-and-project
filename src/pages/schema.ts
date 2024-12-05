import { z } from "zod";

export const schema = z.object({
  name: z.string().min(2, "Name is required").max(255, "Name is too long"),
  category: z
    .string()
    .min(2, "Category is required")
    .max(255, "Category is too long"),
  price: z.number().min(0, "Price cannot be negative"),
  image_url: z.string().url("Invalid URL"),
  description: z
    .string()
    .min(2, "Description is required")
    .max(255, "Description is too long"),
  brand: z.string().min(2, "Brand is required").max(255, "Brand is too long"),
});

export type schemaForm = z.infer<typeof schema>;
