import type { PageData } from "lume/core.ts";

export interface LinksPageData extends PageData {
  links: Link[];
}

export type Link = {
  title: string;
  author: string;
  url: string;
  tags: string[];
};

export const links = [
  {
    title: "The future of work is written",
    author: "Juan Pablo Buriticá",
    url: "https://increment.com/remote/future-of-work-is-written/",
    tags: ["teams", "remote", "writing"],
  },
  {
    title: "The product-minded software engineer",
    author: "Gergely Orosz",
    url: "https://blog.pragmaticengineer.com/the-product-minded-engineer/",
    tags: ["programming", "product"],
  },
  {
    title: "Fear makes you a worse programmer",
    author: "Julia Evans",
    url: "https://jvns.ca/blog/2014/12/21/fear-makes-you-a-worse-programmer/",
    tags: ["programming"],
  },
  {
    title: "Why we prefer complex over simple",
    author: "Farnam Street",
    url: "https://fs.blog/2018/01/complexity-bias/",
    tags: ["programming", "thinking"],
  },
  {
    title: "Ten commandments of egoless programming",
    author: "Gerald M. Weinberg",
    url: "https://blog.codinghorror.com/the-ten-commandments-of-egoless-programming/",
    tags: ["programming"],
  },
  {
    title: "Tools for a culture of writing",
    url: "https://matt.blwt.io/post/tools-for-a-culture-of-writing/",
    author: "Matt Blewitt",
    tags: ["teams", "remote", "writing"],
  },
  {
    title: "An app can be a home-cooked meal",
    url: "https://www.robinsloan.com/notes/home-cooked-app/",
    author: "Robin Sloan",
    tags: ["software"],
  },
  {
    title: "Choose boring technology",
    url: "https://boringtechnology.club",
    author: "Dan McKinley",
    tags: ["software"],
  },
];
