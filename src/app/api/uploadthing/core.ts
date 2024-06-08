import { extractReceiptInfo } from "@/server/ai";
import { saveReceipt } from "@/server/notion";
import { SaveReceiptSchema } from "@/server/schema";
import { validateWithZod } from "@/server/validation";
import { ReceiptDataFromAI } from "@/types";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "16MB" } }).onUploadComplete(async ({ metadata, file }) => {
    let error = null;
    let data: { notionURL: string; notionID: string; imageURL: string; fileKey: string; receiptData: ReceiptDataFromAI } | null = null;

    try {
      const imageURL = file.url;
      const fileKey = file.key;

      const receiptData = await extractReceiptInfo(imageURL);

      const dataForNotion = {
        amount: receiptData.amount_spend,
        date: receiptData.date,
        category: receiptData.category,
        items: receiptData.items,
        store: receiptData.store_name,
        title: receiptData.title,
      };

      const { error: zodError, parsedData } = validateWithZod(dataForNotion, SaveReceiptSchema);
      if (zodError) throw zodError;

      const { url: notionURL, id: notionID } = await saveReceipt(parsedData);

      data = { notionURL, notionID, imageURL, fileKey, receiptData: { ...receiptData } };
    } catch (e) {
      error = e instanceof Error ? e.message : "An error occurred";
    }

    return { error, data };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
