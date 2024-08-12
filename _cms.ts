import lumeCMS from "lume/cms/mod.ts";

const cms = lumeCMS();

cms.storage("files", "src");

cms.collection({
  name: "notes",
  store: "src:notes/*.md",
  fields: ["title: text", "content: markdown"],
  nameField: "title",
});

export default cms;
