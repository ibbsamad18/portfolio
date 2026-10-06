// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Nav shadow on scroll
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Highlight the active nav link for the section in view
const links = [...document.querySelectorAll(".nav__links a")];
const sections = links
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => spy.observe(s));

// Fade-in on scroll
const reveal = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        reveal.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));

// Mobile / tablet menu
const toggle = document.getElementById("navToggle");
const menu = document.getElementById("navLinks");

const closeMenu = () => {
  menu.classList.remove("open");
  toggle.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
};

toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
});

// Close the menu after choosing a link, pressing Escape, or resizing to desktop
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => e.key === "Escape" && closeMenu());
window.addEventListener("resize", () => window.innerWidth > 900 && closeMenu());
