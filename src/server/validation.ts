import { z } from "zod";

const generateZodError = (error: z.ZodError) => {
  const fullErrorMessage = error.errors.map((e: any) => {
    const path = e.path.join(".");
    const message = e.message;
    const code = e.code;
    return `${path} (${code}): ${message}`;
  });

  return fullErrorMessage.join(", ");
};

export const validateWithZod = <T extends z.ZodType<any, any>>(data: any, schema: T) => {
  let parsedData: z.infer<typeof schema> = {};
  let error: Error | null = null;

  try {
    parsedData = schema.parse(data);
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      error = new Error(generateZodError(e));
    } else {
      error = e;
    }
  }

  return { parsedData, error };
};

export const validateRequest = async <T extends z.ZodType<any, any>>(schema: T, req: Request) => {
  const body = await req.json();
  const { error, parsedData } = validateWithZod(body, schema);
  if (error) throw error;
  return parsedData;
};
