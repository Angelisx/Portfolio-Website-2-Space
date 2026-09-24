import { certificates } from "./certificates.js";

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

function initCertificates() {
  const grid = document.getElementById("certificate-grid");
  const lightbox = document.getElementById("certificate-lightbox");
  if (!grid || !lightbox) return;

  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const lightboxTitle = lightbox.querySelector("#lightbox-title");
  const lightboxMeta = lightbox.querySelector(".lightbox-meta");
  const lightboxVerify = lightbox.querySelector(".lightbox-verify");

  function openLightbox(cert) {
    lightboxImage.src = cert.image;
    lightboxImage.alt = `${cert.title} certificate`;
    lightboxTitle.textContent = cert.title;
    lightboxMeta.textContent = `${cert.issuer} · ${cert.date}`;
    lightboxVerify.hidden = !cert.verifyUrl;
    if (cert.verifyUrl) lightboxVerify.href = cert.verifyUrl;
    lightbox.showModal();
  }

  certificates.forEach((cert) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "certificate-card";
    card.setAttribute("aria-label", `View ${cert.title} certificate`);

    const img = document.createElement("img");
    img.src = cert.image;
    img.alt = "";
    img.loading = "lazy";

    const title = document.createElement("h3");
    title.textContent = cert.title;

    const meta = document.createElement("p");
    meta.textContent = `${cert.issuer} · ${cert.date}`;

    card.append(img, title, meta);
    card.addEventListener("click", () => openLightbox(cert));
    grid.append(card);
  });

  lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
  // Close when clicking the dimmed backdrop (the dialog element itself, not its contents)
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
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
  initCertificates();
  initContactForm();
});

export { showPage };
