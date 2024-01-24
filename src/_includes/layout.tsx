import { PageData } from "lume/core.ts";

type NavLink = {
  url: string;
  label: string;
  title: string;
};
const navLinks: NavLink[] = [
  { url: "/posts", label: "posts", title: "Things I've written" },
  { url: "/links", label: "links", title: "Links I've collected" },
  {
    url: "https://github.com/sethetter",
    label: "code",
    title: "Seth Etter on GitHub",
  },
  {
    url: "https://mastodon.social/@sethetter",
    label: "social",
    title: "Seth Etter on Mastodon",
  },
];

export default ({ title, children }: PageData) => (
  <html lang="en">
    <head>
      <title>Seth Etter &mdash; {title}</title>

      <link rel="shortcut icon" href="/img/favicon.ico" />

      <link rel="stylesheet" href="/css/style.css" />
    </head>
    <body>
      <div id="header">
        <div id="logo">
          <a href="/">
            <strong>seth etter</strong>&nbsp;
            <small>
              <em>dot</em>
            </small>
            &nbsp;&nbsp;<strong>com</strong>
          </a>
        </div>
        <div id="navigation">
          <ul>
            {navLinks.map((l) => (
              <li>
                <a href={l.url} title={l.title}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <main className="container">
        <div id="content prose">{children}</div>
      </main>

      <footer id="footer">
        <p style="float: right; justify-text: right;">
          <a
            href="https://github.com/sethetter/sethetter.com"
            title="sethetter.com source on GitHub"
            target="_blank"
          >
            Source on GitHub
          </a>
          .
        </p>
        <p>
          Created and maintained by <a href="https://sethetter.com">Seth</a>.
        </p>
      </footer>

      <script
        src="https://cdn.usefathom.com/script.js"
        data-site="HRUUKZPR"
        defer
      ></script>
    </body>
  </html>
);
