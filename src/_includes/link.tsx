import { PageFn } from "$/_types.ts";

export const layout = "layout.tsx";

const render: PageFn = ({ link, author, title, tags, children }) => {
  if (!title) throw new Error("expected title");

  const linkHost = new URL(link).host;
  const linkOrigin = new URL(link).origin;

  const postLink = (text?: string) => (
    <a href={link} title={`${title} by ${author}`}>
      {text ?? title}
    </a>
  );
  return (
    <>
      <h1>{postLink(title)}</h1>
      <article>
        <section class="header">
          By {author} &mdash;{" "}
          <a href={linkOrigin} title={linkHost}>
            {linkHost}
          </a>
          <br />
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
