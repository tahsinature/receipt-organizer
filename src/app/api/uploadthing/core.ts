import { extractReceiptInfo } from "@/server/ai";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "16MB" } }).onUploadComplete(async ({ metadata, file }) => {
    // This code RUNS ON YOUR SERVER after upload
    const fileURL = file.url;

    const aiData = await extractReceiptInfo(fileURL);

    return aiData;
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
