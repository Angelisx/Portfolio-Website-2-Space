function encodeForm(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

function showPage(targetId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("active", page.id === targetId);
  });
  document.querySelectorAll("nav a").forEach((link) => {
    link.classList.toggle("active", link.dataset.target === targetId);
  });

  document.dispatchEvent(new CustomEvent("pagechange", { detail: { targetId } }));
  if (targetId === "page-home") {
    document.dispatchEvent(new Event("page:home"));
  }
}

function initNavigation() {
  document.querySelectorAll("[data-target]").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      showPage(el.dataset.target);
    });
  });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-status");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    status.textContent = "Sending...";

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeForm(data),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Form submission failed");
        status.textContent = "Thanks for reaching out — I'll get back to you soon.";
        form.reset();
      })
      .catch(() => {
        status.textContent = "Something went wrong. Please email me directly instead.";
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initContactForm();
});

export { showPage };
