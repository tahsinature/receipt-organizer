import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";
import { UTApi } from "uploadthing/server";
import { wrapHandler } from "@/server/req-res";
import { validateRequest } from "@/server/validation";
import { DeleteImageSchema } from "@/server/schema";

const utapi = new UTApi();

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: { logLevel: "error" },
});

const deleteImage = async (req: Request) => {
  const { fileKey } = await validateRequest(DeleteImageSchema, req);

  let error = null;

  const data = await utapi.deleteFiles(fileKey).catch((err) => {
    error = err instanceof Error ? err.message : "An error occurred";
  });

  return { data, error };
};

export const DELETE = wrapHandler(deleteImage);
