/* main.js — shell behavior shared by every page.
   Keeps the duplicated header/footer markup free of per-page edits. */

(function () {
  "use strict";

  /* ---- Active page ---------------------------------------- */
  const here = window.location.pathname
    .replace(/index\.html$/, "")
    .replace(/\/?$/, "/");

  document.querySelectorAll(".nav a").forEach(function (link) {
    const target = new URL(
      link.getAttribute("href"),
      window.location.origin,
    ).pathname
      .replace(/index\.html$/, "")
      .replace(/\/?$/, "/");

    if (target === here) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  /* ---- Footer year ---------------------------------------- */
  const year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
