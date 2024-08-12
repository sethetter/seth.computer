import lumeCMS from "lume/cms/mod.ts";
import GitHub from "lume/cms/storage/github.ts";
import { Octokit } from "npm:octokit";

const ADMIN_USER = {
  username: Deno.env.get("LUME_CMS_ADMIN_USER") ?? "admin",
  password: Deno.env.get("LUME_CMS_ADMIN_PASS"),
};

if (!ADMIN_USER.password) {
  throw new Error("Must set LUME_CMS_ADMIN_PASS");
}

const cms = lumeCMS({
  auth: {
    method: "basic",
    users: {
      [ADMIN_USER.username]: ADMIN_USER.password,
    },
  },
});

cms.storage(
  "src",
  new GitHub({
    client: new Octokit({
      auth: Deno.env.get("LUME_CMS_GITHUB_TOKEN"),
    }),
    owner: "sethetter",
    repo: "seth.computer",
    path: "src",
  })
);

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
  fields: [
    "title: text",
    "link: url",
    "author: text",
    "tags: list",
    "content: markdown",
  ],
  nameField: "title",
});

export default cms;
