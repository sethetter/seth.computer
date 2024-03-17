import { preact } from "lume/deps/preact.ts";

export type PageFn = (data: Lume.Data, helpers: Lume.Helpers) => preact.VNode;

export type PostLink = {
  name: string;
  url: string;
};
