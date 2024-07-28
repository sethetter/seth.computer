import { Type } from "@sinclair/typebox";
import { useTool } from "./anthropic.ts";
import { getUrlContent } from "./firecrawl.ts";

export interface LinkData {
  title: string;
  author: string;
  slug: string;
}

/**
 * Extracts link data from a URL.
 *
 * @example
 * const linkData = await getLinkData("https://example.com");
 * console.log(`Article title: ${linkData.title}`);
 * console.log(`Article author: ${linkData.author}`);
 */
export async function getLinkData(url: string): Promise<LinkData> {
  const scrapeResp = await getUrlContent(url);
  return await extractDataFromContent(scrapeResp.data.markdown);
}

async function extractDataFromContent(content: string): Promise<LinkData> {
  /**
   * The JSON schema that the LLM will use to extract data from the URL.
   */
  const linkDataExtractionTool = {
    name: "save_data_from_article_content",
    description:
      "Saves data from the content of an article in the expected input format.",
    input_schema: Type.Object({
      article_author: Type.String(),
      article_title: Type.String(),
      article_slug: Type.String({
        description:
          "A hyphenated lowercase alphanumeric slug from the title of the article. Preferrably not too long.",
      }),
    }),
  };

  const data = await useTool(content, linkDataExtractionTool);

  return {
    title: data.article_title,
    author: data.article_author,
    slug: data.article_slug,
  };
}
