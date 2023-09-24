import lume from "lume/mod.ts";
import feed from "lume/plugins/feed.ts";
import { attrs } from "npm:@mdit/plugin-attrs";

const site = lume();

/**
 * Ignored files.
 */
site.ignore("README.md");

/**
 * Generate an RSS feed.
 */
site.use(feed());

/**
 * Enable attributes in markdown files.
 */
site.hooks.addMarkdownItPlugin(attrs);

/**
 * Static files.
 */
site.copy("img");
site.copy("fonts");
site.copy("css");

export default site;