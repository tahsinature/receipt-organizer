import { z } from "zod";
import { SaveReceiptSchema } from "@/server/schema";
import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const dbID = process.env.NOTION_DB_ID as string;

/**
 * My Notion DB schema:
 * Title: text
 * Store: text
 * Date: date
 * Amount: number
 * Category: select
 * Items: text
 * ID: unique_id
 */

export const saveReceipt = async (input: z.infer<typeof SaveReceiptSchema>) => {
  const testResp = (await notion.pages.create({
    parent: { database_id: dbID },
    properties: {
      Title: { title: [{ type: "text", text: { content: input.title } }] },
      Store: { rich_text: [{ type: "text", text: { content: input.store } }] },
      Date: { date: { start: input.date } },
      Amount: { number: input.amount },
      Category: { select: { name: input.category } },
      Items: { rich_text: [{ type: "text", text: { content: input.items.join(", ") } }] },
    },
  })) as PageObjectResponse;

  const { prefix, number } = (testResp.properties.ID as any).unique_id;

  return { url: testResp.url, id: `${prefix}-${number}` };
};
