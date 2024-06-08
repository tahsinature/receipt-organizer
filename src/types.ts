import { SaveReceiptSchema } from "@/server/schema";
import { z } from "zod";

export type ReceiptDataFromAI = {
  title: string;
  store_name: string;
  category: string;
  amount_spend: number;
  location: string;
  items: string[];
  date: string;
  error: null | string;
};

export type ReceiptDataForNotion = z.infer<typeof SaveReceiptSchema>;
