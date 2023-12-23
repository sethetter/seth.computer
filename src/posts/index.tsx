import { type PreactJsxEngine } from "lume/plugins/jsx_preact.ts";
import { PageData } from "lume/core.ts";

export const title = "things i've written";
export const layout = "layout.tsx";

export default function (
  { search }: PageData,
  helpers: PreactJsxEngine["helpers"],
) {
  // Get all pages under /posts/, except for the index page itself.
  const posts = search.pages("url^=/posts/ url!=/posts/", "date=desc");

  return (
    <>
      <h1 class="title">Things I've written</h1>
      <ul class="post-list">
        {posts.map((post) => (
          <li>
            <a href={post?.data.url} title={post?.data.title}>
              {post?.data.title}
            </a>{" "}
            <small>
              <em>
                &mdash;&nbsp;
                <span>{helpers.date(post?.data.date, "DATE")}</span>
              </em>
            </small>
            <br />
            {post?.data.tags.map((tag: string) => (
              <>
                <span class="tag">
                  <a href={`/tags/${tag}`} title={`Tagged posts: ${tag}`}>
                    {tag}
                  </a>
                </span>
                &nbsp;
              </>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
}

// TODO: add a /posts/rss.xml file! then do the same for links, and one for all of it at /rss.xml
