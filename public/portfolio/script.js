/* =========================================================
   Sumaiya Rajpar — Portfolio JavaScript
   1. Mobile navigation      2. Dark / light mode
   3. Typing animation       4. Skill bar animation
   5. Scroll reveal          6. Sticky navbar + active link
   7. Back-to-top            8. Contact form validation
   ========================================================= */

/* ---------- 1. MOBILE NAVIGATION (hamburger menu) ---------- */
const menuToggle = document.getElementById("menuToggle");
const navLinksBox = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinksBox.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close the menu after clicking any link (useful on phones)
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinksBox.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* ---------- 2. DARK / LIGHT MODE (saved in localStorage) ---------- */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Apply a theme and remember the choice
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeIcon.textContent = theme === "dark" ? "🌙" : "☀️";
  localStorage.setItem("theme", theme);
}

// Dark mode is the default unless the user saved "light"
setTheme(localStorage.getItem("theme") || "dark");

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

/* ---------- 3. TYPING ANIMATION IN THE HERO ---------- */
const words = ["Web Developer", "Computer Science Student", "Creative Learner"];
const typingEl = document.getElementById("typing");
let wordIndex = 0;   // which word we are showing
let charIndex = 0;   // how many letters are visible
let deleting = false;

function typeEffect() {
  const word = words[wordIndex];
  charIndex = deleting ? charIndex - 1 : charIndex + 1;
  typingEl.textContent = word.substring(0, charIndex);

  let delay = deleting ? 55 : 110;

  if (!deleting && charIndex === word.length) {
    delay = 1600;         // pause when the word is complete
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length; // move to next word
    delay = 350;
  }
  setTimeout(typeEffect, delay);
}
typeEffect();

/* ---------- 4. SKILL BAR ANIMATION (on scroll into view) ---------- */
const skillsSection = document.getElementById("skills");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      // Fill every bar to its data-percent value
      document.querySelectorAll(".bar-fill").forEach((bar) => {
        bar.style.width = bar.dataset.percent + "%";
      });

      // Count the number up from 0% to the real percentage
      document.querySelectorAll(".skill-value").forEach((label) => {
        const target = Number(label.dataset.percent);
        let value = 0;
        const timer = setInterval(() => {
          value++;
          label.textContent = value + "%";
          if (value >= target) clearInterval(timer);
        }, 1400 / target);
      });

      skillObserver.unobserve(entry.target); // animate only once
    });
  },
  { threshold: 0.35 }
);
skillObserver.observe(skillsSection);

/* ---------- 5. SCROLL REVEAL FOR SECTIONS ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ---------- 6. STICKY NAVBAR + ACTIVE LINK + 7. BACK TO TOP ---------- */
const header = document.getElementById("header");
const backToTop = document.getElementById("backToTop");
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  const y = window.scrollY;

  // Navbar becomes more solid after scrolling
  header.classList.toggle("scrolled", y > 40);

  // Back-to-top button appears after 400px
  backToTop.classList.toggle("show", y > 400);

  // Highlight the navigation link of the section on screen
  let currentId = "home";
  sections.forEach((section) => {
    if (y >= section.offsetTop - 120) currentId = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
  });
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------- 8. CONTACT FORM VALIDATION ---------- */
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("formSuccess");

// Simple helper: show or clear an error message under a field
function showError(id, message) {
  document.getElementById(id).textContent = message;
  return message === "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // the form is not sent to a server
  successMsg.textContent = "";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Pattern that checks for a valid email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const okName = showError("nameError", name === "" ? "Please enter your full name." : "");
  const okEmail = showError(
    "emailError",
    email === "" ? "Please enter your email." : !emailPattern.test(email) ? "Please enter a valid email address." : ""
  );
  const okSubject = showError("subjectError", subject === "" ? "Please enter a subject." : "");
  const okMessage = showError("messageError", message === "" ? "Please write a message." : "");

  if (okName && okEmail && okSubject && okMessage) {
    successMsg.textContent = "Thank you! Your message has been validated successfully.";
    form.reset();
  }
});
