import { certificates, achievements } from "./certificates.js";
import { projects } from "./projects.js";

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

function initProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const status = document.createElement("span");
    status.className = `project-status ${project.status.toLowerCase()}`;
    status.textContent = project.status;

    const title = document.createElement("h3");
    title.textContent = project.title;

    const blurb = document.createElement("p");
    blurb.textContent = project.blurb;

    const tags = document.createElement("ul");
    tags.className = "project-tags";
    project.tags.forEach((tag) => {
      const item = document.createElement("li");
      item.textContent = tag;
      tags.append(item);
    });

    card.append(status, title, blurb, tags);

    if (project.links && project.links.length) {
      const links = document.createElement("div");
      links.className = "project-links";
      project.links.forEach(({ label, url }) => {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = `${label} ↗`;
        links.append(link);
      });
      card.append(links);
    }

    grid.append(card);
  });
}

function initAchievementStats() {
  const strip = document.getElementById("achievement-stats");
  if (!strip || !achievements || !achievements.length) return;

  achievements.forEach((stat) => {
    const item = document.createElement("div");
    item.className = "achievement-stat";

    const value = document.createElement("span");
    value.className = "achievement-value";
    value.textContent = stat.value;

    const label = document.createElement("span");
    label.className = "achievement-label";
    label.textContent = stat.label;

    item.append(value, label);
    strip.append(item);
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
    const isUpcoming = cert.upcoming || !cert.image;

    const card = document.createElement("button");
    card.type = "button";
    card.className = isUpcoming ? "certificate-card certificate-card--upcoming" : "certificate-card";
    card.setAttribute(
      "aria-label",
      isUpcoming ? `${cert.title} — upcoming` : `View ${cert.title} certificate`
    );

    if (isUpcoming) {
      const placeholder = document.createElement("div");
      placeholder.className = "certificate-placeholder";
      placeholder.textContent = "In progress";

      const badge = document.createElement("span");
      badge.className = "certificate-badge";
      badge.textContent = "Upcoming";
      placeholder.append(badge);

      const title = document.createElement("h3");
      title.textContent = cert.title;

      const meta = document.createElement("p");
      meta.textContent = `${cert.issuer} · ${cert.date}`;

      card.append(placeholder, title, meta);
      card.disabled = true;
    } else {
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
    }

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
  initProjects();
  initCertificates();
  initAchievementStats();
  initContactForm();
});

export { showPage };
