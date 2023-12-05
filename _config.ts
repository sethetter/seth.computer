import lume from "lume/mod.ts";
import feed from "lume/plugins/feed.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import date from "lume/plugins/date.ts";
import prism from "lume/plugins/prism.ts";
import { attrs } from "npm:@mdit/plugin-attrs";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";
import typography from "npm:@tailwindcss/typography";

import "npm:prismjs@1.29.0/components/prism-yaml.js";
import "npm:prismjs@1.29.0/components/prism-bash.js";
import "npm:prismjs@1.29.0/components/prism-nix.js";
import "npm:prismjs@1.29.0/components/prism-haskell.js";
import "npm:prismjs@1.29.0/components/prism-typescript.js";
import "npm:prismjs@1.29.0/components/prism-rust.js";

const site = lume({ src: "./src" });

site.ignore("README.md", "netlify.toml", "netlify-build.sh");

site.use(feed());

site.use(date());

site.use(
  tailwindcss({
    options: {
      plugins: [typography],
    },
  }),
);
site.use(postcss());

site.use(prism({ extensions: [".md", ".html", ".tsx"] }));

site.hooks.addMarkdownItPlugin(attrs);

site.use(jsx());

site.copy("img");
site.copy("fonts");
site.copy("css");

export default site;
