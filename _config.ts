import lume from "lume/mod.ts";
import feed from "lume/plugins/feed.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import { attrs } from "npm:@mdit/plugin-attrs";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";
import typography from "npm:@tailwindcss/typography";

const site = lume({ src: "./src" });

site.ignore("README.md", "netlify.toml", "netlify-build.sh");

site.use(feed());
site.use(jsx());
site.use(
  tailwindcss({
    options: {
      plugins: [typography],
    },
  }),
);
site.use(postcss());

site.hooks.addMarkdownItPlugin(attrs);

site.copy("img");
site.copy("fonts");
site.copy("css");

export default site;
