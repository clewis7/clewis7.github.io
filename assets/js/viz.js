/* viz.js — renders the visualization grid from assets/data/visualizations.json */

(function () {
  "use strict";

  const mount = document.getElementById("viz-grid");
  if (!mount) return;

  function card(v) {
    const link = document.createElement("a");
    link.className = "viz-card";
    link.href = `/visualization/${v.slug}/`;

    const frame = document.createElement("div");
    frame.className = "viz-card__frame";

    const img = document.createElement("img");
    img.className = "viz-card__img";
    img.alt = v.title;
    img.loading = "lazy";
    img.src = v.image;
    frame.append(img);

    const overlay = document.createElement("div");
    overlay.className = "viz-card__overlay";

    const blurb = document.createElement("p");
    blurb.className = "viz-card__blurb";
    blurb.textContent = v.blurb;
    overlay.append(blurb);

    if (v.tags && v.tags.length) {
      const tags = document.createElement("ul");
      tags.className = "viz-card__tags";
      for (const t of v.tags) {
        const li = document.createElement("li");
        li.textContent = t;
        tags.append(li);
      }
      overlay.append(tags);
    }

    frame.append(overlay);

    const title = document.createElement("h2");
    title.className = "viz-card__title";
    title.textContent = v.title;

    link.append(frame, title);
    return link;
  }

  fetch("/assets/data/visualizations.json")
    .then((r) => {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then((data) => {
      mount.textContent = "";
      for (const v of data) mount.append(card(v));
    })
    .catch((err) => {
      console.error("viz.js:", err);
      mount.textContent = "Couldn't load the visualizations right now.";
    });
})();
