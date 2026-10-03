const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

// Mobile menu
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  menuToggle.textContent = open ? "×" : "☰";
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
  });
});

// Dark / light theme
function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  themeToggle.textContent = dark ? "☀" : "☾";
  themeToggle.setAttribute(
    "aria-label",
    dark ? "Switch to light mode" : "Switch to dark mode"
  );
  themeToggle.title = dark ? "Switch to light mode" : "Switch to dark mode";
  localStorage.setItem("portfolioTheme", dark ? "dark" : "light");
}

themeToggle.addEventListener("click", () => {
  applyTheme(!document.body.classList.contains("dark"));
});

if (localStorage.getItem("portfolioTheme") === "dark") {
  applyTheme(true);
}

// Highlight navigation section
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((item) => item.classList.remove("active"));
        const current = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (current) current.classList.add("active");
      }
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

// Reveal elements on scroll
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// Demo contact form
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();

  formStatus.textContent =
    `Thanks, ${name}! Your message has been received. This is a portfolio demo form.`;

  contactForm.reset();
});

// Current year
document.getElementById("year").textContent = new Date().getFullYear();
