import OpenAI from "openai";
import { safeParse } from "@/app/common/utils/json";
import { wait } from "@/app/common/utils/system";
import { ReceiptDataFromAI } from "@/types";

const openai = new OpenAI({ apiKey: process.env["OPENAI_API_KEY"] });
const assistantName = "receipt_organizer_app";
const instructions = `I will give you a receipt. You will return JSON String with the following fields:

- title: string (you decide based on the other fields)
- store_name: string
- category: string [Utilities, Style, Groceries]
- amount_spend: number
- location: string
- items: string[]
- date: string (iso date)
- error: string (if any)

If some values are unclear or missing, put null for those fields.
Remember: you will send me raw json. So that I can directly parse it. Don't send me markdown snippets or anything else. Just raw json.
`;

const model = "gpt-4o";

const waitForCompletion = async (threadId: string, runId: string) => {
  return new Promise<void>(async (resolve) => {
    while (true) {
      const res = await openai.beta.threads.runs.retrieve(threadId, runId).withResponse();

      if (res.data.status === "completed") {
        resolve();
        break;
      }

      await wait(1000);
    }
  });
};

export const findOrCreateAssistant = async () => {
  const assistants = await openai.beta.assistants.list();
  const assistant = assistants.data.find((ele) => ele.name === assistantName);

  if (assistant) {
    if (assistant.instructions !== instructions) await openai.beta.assistants.update(assistant.id, { instructions });
    return assistant.id;
  }

  const newAssistant = await openai.beta.assistants.create({ model, name: assistantName, instructions });
  return newAssistant.id;
};

export const extractReceiptInfo = async (imgURL: string): Promise<ReceiptDataFromAI> => {
  const startTime = Date.now();
  console.log("extracting receipt info...");

  const assistantId = await findOrCreateAssistant();
  const { id: threadId } = await openai.beta.threads.create({});

  await openai.beta.threads.messages.create(threadId, { role: "user", content: [{ type: "image_url", image_url: { url: imgURL } }] });

  const runner = await openai.beta.threads.runs.create(threadId, { assistant_id: assistantId }).withResponse();

  await waitForCompletion(threadId, runner.data.id);

  const messages = await openai.beta.threads.messages.list(threadId);
  const justMessages = messages.data.map((ele) => ele.content.map((c: any) => c.text)[0]);
  const output = justMessages[0].value;
  await openai.beta.threads.del(threadId);

  console.log(`done extracting receipt info... took ${Date.now() - startTime}ms`);
  return safeParse(output);
};
