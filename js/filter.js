/* ============================================================
   PROJECT FILTER — Filters gallery items by design style
   ============================================================ */
(function () {
  "use strict";

  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!filterButtons.length || !galleryItems.length) return;

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      // Active state
      filterButtons.forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      this.classList.add("active");
      this.setAttribute("aria-selected", "true");

      const filter = this.dataset.filter;

      galleryItems.forEach(function (item) {
        const match = filter === "all" || item.dataset.category === filter;
        if (match) {
          item.style.display = "block";
          // Re-trigger fade-in animation
          item.style.animation = "none";
          // Force reflow
          void item.offsetWidth;
          item.style.animation = "fadeIn 0.4s ease";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
})();
