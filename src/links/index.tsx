import { LinksPageData } from "$/links/_data.ts";

export const title = "links i've collected";
export const layout = "layout.tsx";

export default ({ links }: LinksPageData) => {
  return (
    <>
      <h1>Links I've collected</h1>
      <ul className="post-list">
        {links.map((l) => (
          <li>
            <a href={l.url} title={`${l.title} by ${l.author}`}>
              {l.title}
            </a>{" "}
            <small>
              &mdash; <em>by {l.author}</em>
            </small>
            <br />
            {l.tags.map((tag: string) => (
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
};
