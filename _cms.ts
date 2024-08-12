import lumeCMS from "lume/cms/mod.ts";

const cms = lumeCMS();

cms.storage("files", "src");

cms.collection({
  name: "notes",
  store: "src:notes/*.md",
  fields: [
    "title: text",
    "draft: checkbox",
    {
      name: "author",
      type: "object",
      fields: ["name: text", "uri: url"],
    },
    "tags: list",
    "content: markdown",
  ],
  nameField: "title",
});

cms.collection({
  name: "links",
  store: "src:links/*.md",
  fields: ["title: text", "link: url", "author: text", "tags: list"],
  nameField: "title",
});

export default cms;
