import { PageFn, PostLink } from "$/_types.ts";

export const layout = "layout.tsx";

const render: PageFn = (
  { links, date, title, tags, children, author },
  helpers
) => {
  return (
    <>
      <h1>{title}</h1>
      <article>
        <section class="header">
          {helpers.date(date, "HUMAN_DATE")}
          {", "}
          {author && <Author {...author} />}
          {(links ?? []).map((link: PostLink) => (
            <>
              &nbsp; | &nbsp;
              <a href={link.url} title={link.name}>
                {link.name}
              </a>
            </>
          ))}
          <br />
          {tags?.map((tag) => (
            <>
              <span class="tag">
                <a href={`/tags/${tag}`} title={`Tagged notes: ${tag}`}>
                  {tag}
                </a>
              </span>
              &nbsp;
            </>
          ))}
        </section>
        <section class="body">{children}</section>
      </article>
    </>
  );
};

interface Author {
  name: string;
  uri?: string;
}
function Author(author: Author) {
  if (author.uri) {
    return (
      <a href={author.uri} title={`More by ${author.name}`}>
        {author.name}
      </a>
    );
  } else {
    return <>{author.name}</>;
  }
}

export default render;
