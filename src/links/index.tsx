export const title = "links i've collected";
export const layout = "layout.tsx";

export default function ({ search }: Lume.Data) {
  const links = search.pages("url^=/links/ url!=/links/", "date=desc");

  return (
    <>
      <h1>Links I've collected</h1>
      <ul className="post-list">
        {links.map((l) => (
          <li>
            <a href={l.url} title={`${l.title} by ${l.author}`}>
              {l.title}
            </a>{" "}
            <span class="subtext">
              <small>
                <em>by {l.author}</em>
              </small>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
