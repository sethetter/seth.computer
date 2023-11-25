import { type Data, type Helper } from "lume/core.ts";
import { preact } from "lume/deps/preact.ts";

export type PageFn = (
  data: Data & { children: preact.ComponentChildren },
  helpers: Record<string, Helper>,
) => preact.VNode;

export type PostLink = {
  name: string;
  url: string;
};
