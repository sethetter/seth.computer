import { Type, type Static } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const FIRECRAWL_SCRAPE_URL = "https://api.firecrawl.dev/v0/scrape";
const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");

export class FirecrawlError extends Error {}

const ScrapeResponseSchema = Type.Object({
  success: Type.Boolean(),
  data: Type.Object({
    markdown: Type.String(),
  }),
});
type ScrapeResponse = Static<typeof ScrapeResponseSchema>;

export async function getUrlContent(url: string): Promise<ScrapeResponse> {
  const resp = await fetch(FIRECRAWL_SCRAPE_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${FIRECRAWL_API_KEY}`,
    },
    body: JSON.stringify({ url }),
  });

  if (!resp.ok) {
    throw new FirecrawlError("failed to fetch link data", {
      cause: await resp.text(),
    });
  }

  const respJson = await resp.json();

  if (!Value.Check(ScrapeResponseSchema, respJson)) {
    const errors = [...Value.Errors(ScrapeResponseSchema, respJson)];
    throw new FirecrawlError("failed to decode response from firecrawl", {
      cause: { errors },
    });
  }

  return Value.Decode(ScrapeResponseSchema, respJson);
}
