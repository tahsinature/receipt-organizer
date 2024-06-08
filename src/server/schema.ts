import z from "zod";

export const SaveReceiptSchema = z.object({
  title: z.string(),
  store: z.string(),
  date: z.string(),
  amount: z.number(),
  category: z.string(),
  items: z.array(z.string()),
});

export const DeleteImageSchema = z.object({
  fileKey: z.string(),
});
