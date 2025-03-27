import { Client } from "@notionhq/client";
import { NotionPost, NotionPostWithContent, NotionPage } from "./types";
import { NotionBlock } from "@9gustin/react-notion-render";

if (!process.env.NOTION_TOKEN) {
  throw new Error("Missing NOTION_TOKEN environment variable");
}

if (!process.env.DATABASE_ID) {
  throw new Error("Missing DATABASE_ID environment variable");
}

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const getTags = (tags: any[]): { name: string; color: string }[] => {
  return tags.map((tag) => ({
    name: tag.name,
    color: tag.color,
  }));
};

const formatDate = (datestring: string | null): string => {
  if (!datestring) return "";

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const date = new Date(datestring);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};

const getPageMetaData = (post: NotionPage): NotionPost => {
  const properties = post.properties as any;
  
  return {
    id: post.id,
    title: properties.Name.title[0]?.plain_text || "",
    tags: getTags(properties.Tags.multi_select || []),
    description: properties.Description.rich_text[0]?.plain_text || "",
    date: formatDate(properties.Date.date?.start || null),
    slug: properties.Slug.rich_text[0]?.plain_text || "",
    wordCount: properties.WordCount.number || 0,
    cover: post.cover?.type === "external" ? post.cover.external.url || "" : "",
  };
};

export const getAllPublished = async (): Promise<NotionPost[]> => {
  const posts = await notion.databases.query({
    database_id: process.env.DATABASE_ID!,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  return posts.results.map((post) => getPageMetaData(post as NotionPage));
};

export const getSingleBlogPostBySlug = async (slug: string): Promise<NotionPostWithContent> => {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_ID!,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const page = response.results[0] as NotionPage;
  if (!page) {
    throw new Error(`Post with slug ${slug} not found`);
  }

  const metadata = getPageMetaData(page);
  const blocks = await notion.blocks.children.list({
    block_id: page.id,
  });

  return {
    ...metadata,
    content: blocks.results as NotionBlock[],
  };
};

export const getAllSlugs = async (): Promise<string[]> => {
  const posts = await getAllPublished();
  return posts.map((post) => post.slug);
}; 