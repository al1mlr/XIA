(function () {
  "use strict";

  // Menu mobile
  document.querySelectorAll(".site-header").forEach(function (header) {
    var btn = header.querySelector(".nav__toggle");
    var list = header.querySelector(".nav__list");
    if (!btn || !list) return;
    btn.addEventListener("click", function () {
      var open = list.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    list.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        list.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Changer de langue en restant sur la même rubrique (#events, #contact…)
  document.querySelectorAll("[data-lang-link]").forEach(function (a) {
    a.addEventListener("click", function () {
      var base = a.getAttribute("href").split("#")[0];
      a.setAttribute("href", base + window.location.hash);
    });
  });

  // Formulaire de contact (Netlify Forms) — envoi sans recharger la page
  document.querySelectorAll("form[data-netlify]").forEach(function (form) {
    var status = form.querySelector(".form__status");
    var button = form.querySelector("button[type=submit]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form__status";
      status.textContent = form.dataset.sending;
      button.disabled = true;
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString()
      })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.reset();
          status.classList.add("is-ok");
          status.textContent = form.dataset.success;
        })
        .catch(function () {
          status.classList.add("is-error");
          status.textContent = form.dataset.error;
        })
        .then(function () {
          button.disabled = false;
        });
    });
  });
})();
