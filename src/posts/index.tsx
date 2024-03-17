export const title = "things i've written";
export const layout = "layout.tsx";

export default function ({ search }: Lume.Data, helpers: Lume.Helpers) {
  // Get all pages under /posts/, except for the index page itself.
  const posts = search.pages("url^=/posts/ url!=/posts/", "date=desc");

  return (
    <>
      <h1 class="title">Things I've written</h1>
      <ul class="post-list">
        {posts.map((data) => (
          <li>
            <a href={data.url} title={data.title}>
              {data.title}
            </a>{" "}
            <small>
              <em>
                &mdash;&nbsp;
                <span>{helpers.date(data.date, "DATE")}</span>
              </em>
            </small>
          </li>
        ))}
      </ul>
    </>
  );
}

// TODO: add a /posts/rss.xml file! then do the same for links, and one for all of it at /rss.xml
