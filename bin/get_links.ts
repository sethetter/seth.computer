import { DOMParser } from "jsr:@b-fuze/deno-dom";

if (import.meta.main) {
  const links = await crawlForInternalLinks("https://seth.computer");
  console.log(links.join("\n"));
}

async function crawlForInternalLinks(
  origin: string,
  startPage: string = "/"
): Promise<string[]> {
  const allLinks = new Set([startPage]);
  const toVisit = new Set([startPage]);

  while (toVisit.size > 0) {
    const page = toVisit.values().next().value;
    toVisit.delete(page);

    const resp = await fetch(new URL(page, origin));
    if (!resp.ok) {
      console.error(`failed to fetch ${page}: ${resp.status}`);
      continue;
    }

    const html = await resp.text();
    const doc = new DOMParser().parseFromString(
      html,
      "text/html"
    ) as unknown as Document; // Force it to the Deno internal types

    for (const a of doc.querySelectorAll("a[href]")) {
      const href = a.getAttribute("href");
      if (href?.startsWith(origin) || href?.startsWith("/")) {
        if (!allLinks.has(href)) {
          allLinks.add(href);
          toVisit.add(href);
        }
      }
    }
  }

  return Array.from(allLinks);
}
