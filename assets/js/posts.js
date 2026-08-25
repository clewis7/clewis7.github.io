/* posts.js — renders research post cards from assets/data/posts.json */

(function () {
  "use strict";

  const mount = document.getElementById("posts");
  if (!mount) return;

  const fmt = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

  function card(post) {
    const link = document.createElement("a");
    link.className = "post-card";
    link.href = `/research/${post.slug}/`;

    const time = document.createElement("time");
    time.className = "post-card__date";
    time.dateTime = post.date;
    time.textContent = fmt.format(new Date(`${post.date}T00:00:00Z`));

    const title = document.createElement("h2");
    title.className = "post-card__title";
    title.textContent = post.title;

    const desc = document.createElement("p");
    desc.className = "post-card__desc";
    desc.textContent = post.description;

    link.append(time, title, desc);
    return link;
  }

  fetch("/assets/data/posts.json")
    .then((r) => {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then((data) => {
      mount.textContent = "";
      data
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date))
        .forEach((p) => mount.append(card(p)));
    })
    .catch((err) => {
      console.error("posts.js:", err);
      mount.textContent = "Couldn't load posts right now.";
    });
})();
