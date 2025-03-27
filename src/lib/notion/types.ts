import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionBlock } from "@9gustin/react-notion-render";

export interface NotionPost {
  id: string;
  title: string;
  tags: NotionTag[];
  description: string;
  date: string;
  slug: string;
  wordCount: number;
  cover?: string;
}

export interface NotionTag {
  name: string;
  color: string;
}

export interface NotionPostWithContent extends NotionPost {
  content: NotionBlock[];
}

export type NotionPage = PageObjectResponse; 