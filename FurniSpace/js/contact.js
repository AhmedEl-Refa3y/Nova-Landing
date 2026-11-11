/* ============================================================
   CONTACT FORM — Validation + WhatsApp submission
   ============================================================ */
(function () {
  "use strict";

  // ⚠️ Replace with your business WhatsApp number (no +, no spaces)
  const WHATSAPP_NUMBER = "201234567890";

  const form = document.getElementById("contactForm");
  if (!form) return;

  const fields = {
    name: document.getElementById("name"),
    phone: document.getElementById("phone"),
    message: document.getElementById("message"),
    serviceType: document.getElementById("serviceType"),
  };

  const errors = {
    name: document.getElementById("nameError"),
    phone: document.getElementById("phoneError"),
    message: document.getElementById("messageError"),
  };

  // --- Helpers ---
  function showError(field, errorEl) {
    errorEl.style.display = "block";
    field.style.borderColor = "#c0392b";
  }

  function clearError(field, errorEl) {
    errorEl.style.display = "none";
    field.style.borderColor = "#e2e2e2";
  }

  function resetAllErrors() {
    clearError(fields.name, errors.name);
    clearError(fields.phone, errors.phone);
    clearError(fields.message, errors.message);
  }

  // --- Live validation on input ---
  ["name", "phone", "message"].forEach(function (key) {
    fields[key].addEventListener("input", function () {
      clearError(fields[key], errors[key]);
    });
  });

  // --- Submit handler ---
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    resetAllErrors();

    let isValid = true;

    if (!fields.name.value.trim()) {
      showError(fields.name, errors.name);
      isValid = false;
    }

    if (!fields.phone.value.trim() || fields.phone.value.trim().length < 6) {
      showError(fields.phone, errors.phone);
      isValid = false;
    }

    if (!fields.message.value.trim()) {
      showError(fields.message, errors.message);
      isValid = false;
    }

    if (!isValid) {
      // Focus first invalid field
      if (errors.name.style.display === "block") fields.name.focus();
      else if (errors.phone.style.display === "block") fields.phone.focus();
      else if (errors.message.style.display === "block") fields.message.focus();
      return;
    }

    // Build WhatsApp message
    const messageText =
      "*New inquiry from FurniSpace website*\n\n" +
      "*Name:* " +
      fields.name.value.trim() +
      "\n" +
      "*Phone:* " +
      fields.phone.value.trim() +
      "\n" +
      "*Service:* " +
      fields.serviceType.value +
      "\n" +
      "*Message:* " +
      fields.message.value.trim();

    const encoded = encodeURIComponent(messageText);
    const waUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encoded;

    window.open(waUrl, "_blank");

    // Optional: reset form after sending
    // form.reset();
  });
})();
