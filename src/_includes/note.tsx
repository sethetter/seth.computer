import { PageFn, PostLink } from "$/_types.ts";

export const layout = "layout.tsx";

const render: PageFn = ({ links, date, title, tags, children }, helpers) => {
  return (
    <>
      <h1>{title}</h1>
      <article>
        <section class="header">
          {helpers.date(date, "HUMAN_DATE")}
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

export default render;
