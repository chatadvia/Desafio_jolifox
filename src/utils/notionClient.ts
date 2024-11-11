import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

const notionApiKey = process.env.NOTION_API_KEY;

export const notionClient = new Client({
  auth: notionApiKey,
});
