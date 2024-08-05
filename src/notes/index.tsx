export const title = "things i've written";
export const layout = "layout.tsx";

export default function ({ search }: Lume.Data, helpers: Lume.Helpers) {
  // Get all pages under /notes/, except for the index page itself.
  const notes = search.pages("url^=/notes/ url!=/notes/", "date=desc");

  return (
    <>
      <h1 class="title">Things I've written</h1>
      <ul class="post-list">
        {notes.map((data) => (
          <li>
            <a href={data.url} title={data.title}>
              {data.title}
            </a>{" "}
            <span class="subtext">
              <small>
                <em>
                  <span>{helpers.date(data.date, "DATE")}</span>
                </em>
              </small>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
