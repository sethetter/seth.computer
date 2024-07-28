#!/usr/bin/env -S deno run --allow-net --allow-env --allow-write

import { getLinkData, LinkData } from "./utils/link_data.ts";

const linkFileContent = (url: string, linkData: LinkData) =>
  `
---
title: ${linkData.title}
link: ${url}
author: ${linkData.author}
tags: []
layout: "link.tsx"
---
`.trim();

const today = Temporal.Now.plainDateISO().toString();
const url = Deno.args[0];

const linkData = await getLinkData(url);

Deno.writeTextFileSync(
  `src/links/${today}_${linkData.slug}.md`,
  linkFileContent(url, linkData)
);
