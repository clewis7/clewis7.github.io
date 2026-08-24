/* books.js — renders shelves by year from assets/data/books.json */

(function () {
  "use strict";

  const mount = document.getElementById("shelves");
  if (!mount) return;

  const coverURL = (book) =>
    book.cover
      ? book.cover
      : `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`;

  function shelf(year, books) {
    const section = document.createElement("section");
    section.className = "shelf";

    const heading = document.createElement("h2");
    heading.className = "shelf__year";
    heading.textContent = year;
    section.append(heading);

    if (!books.length) {
      const empty = document.createElement("p");
      empty.className = "shelf__empty";
      empty.textContent = "Nothing logged yet.";
      section.append(empty);
      return section;
    }

    const track = document.createElement("ul");
    track.className = "shelf__track";
    track.setAttribute("tabindex", "0");
    track.setAttribute("role", "list");
    track.setAttribute("aria-label", `Books read in ${year}`);

    for (const book of books) {
      const item = document.createElement("li");

      const link = document.createElement("a");
      link.className = "book";
      link.href = book.goodreads;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      const img = document.createElement("img");
      img.className = "book__cover";
      img.src = coverURL(book);
      img.alt = `${book.title} by ${book.author}`;
      img.loading = "lazy";
      img.width = 200;
      img.height = 300;
      img.addEventListener("error", () => {
        img.remove();
        link.classList.add("book--nocover");

        const t = document.createElement("span");
        t.className = "book__title";
        t.textContent = book.title;

        const a = document.createElement("span");
        a.className = "book__author";
        a.textContent = book.author;

        link.append(t, a);
      });

      link.append(img);
      item.append(link);
      track.append(item);
    }

    section.append(track);
    return section;
  }

  fetch("/assets/data/books.json")
    .then((r) => {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then((data) => {
      mount.textContent = "";
      for (const { year, books } of data) {
        mount.append(shelf(year, books || []));
      }
    })
    .catch(() => {
      mount.textContent = "Couldn't load the shelves right now.";
    });
})();
