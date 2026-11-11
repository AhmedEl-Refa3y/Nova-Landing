/* ============================================================
   NAVIGATION — Mobile menu toggle & active-link highlighting
   ============================================================ */
(function () {
  "use strict";

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  // --- Mobile menu toggle ---
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("show");
      const icon = menuToggle.querySelector("i");
      if (navLinks.classList.contains("show")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    // Close menu when a link is clicked (mobile)
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("show");
        const icon = menuToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      });
    });
  }

  // --- Highlight the current page in the nav ---
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    const href = link.getAttribute("href").split("/").pop();
    if (href === currentPath) {
      link.classList.add("active-nav");
    }
  });
})();
