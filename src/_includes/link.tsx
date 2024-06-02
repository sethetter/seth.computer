import { PageFn } from "$/_types.ts";

export const layout = "layout.tsx";

const render: PageFn = ({ link, author, title, tags, children }) => {
  const postLink = (text?: string) => (
    <a href={link} title={`${title} by ${author}`}>
      {text ?? title ?? "Missing title"}
    </a>
  );
  return (
    <>
      <h1>Link: {postLink(title)}</h1>
      <article>
        <section class="header">
          {tags?.map((tag) => (
            <>
              <span class="tag">
                <a href={`/tags/${tag}`} title={`Tagged posts: ${tag}`}>
                  {tag}
                </a>
              </span>
              &nbsp;
            </>
          ))}
        </section>
        <section class="body">
          {children}
          <p>Read the {postLink(`full post by ${author}`)}.</p>
        </section>
      </article>
    </>
  );
};

export default render;
