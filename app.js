// Dark mode toggle
const darkModeToggle = document.getElementById("darkModeToggle");
const mobileDarkModeToggle = document.getElementById("mobileDarkModeToggle");

document.addEventListener("DOMContentLoaded", function () {
  updateCopyright();

  function setDarkMode(isDark) {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "disabled");
    }
    // Sync both toggles
    if (darkModeToggle) darkModeToggle.checked = isDark;
    if (mobileDarkModeToggle) mobileDarkModeToggle.checked = isDark;
  }

  // Check for saved user preference or system preference
  function checkDarkModePreference() {
    const savedPreference = localStorage.getItem("darkMode");
    const systemPreference =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (
      savedPreference === "enabled" ||
      (!savedPreference && systemPreference)
    ) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }

  // Initialize
  checkDarkModePreference();

  // Desktop toggle event
  if (darkModeToggle) {
    darkModeToggle.addEventListener("change", () => {
      setDarkMode(darkModeToggle.checked);
    });
  }

  // Mobile toggle event
  if (mobileDarkModeToggle) {
    mobileDarkModeToggle.addEventListener("change", () => {
      setDarkMode(mobileDarkModeToggle.checked);
    });
  }

  // Watch for system preference changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("darkMode")) {
        setDarkMode(e.matches);
      }
    });
});

const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Close mobile menu when clicking on a link
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// Back to top button
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove("opacity-0", "invisible");
    backToTopButton.classList.add("opacity-100", "visible");
  } else {
    backToTopButton.classList.remove("opacity-100", "visible");
    backToTopButton.classList.add("opacity-0", "invisible");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll(".skill-bar");

const animateSkillBars = () => {
  skillBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";

    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelector("#skills").style.opacity = "0";
setTimeout(() => {
  document.querySelector("#skills").style.opacity = "1";
  observer.observe(document.querySelector("#skills"));
}, 300);

function updateCopyright() {
  const copyElement = document.querySelector(".year");
  if (copyElement) {
    copyElement.textContent = `${new Date().getFullYear()}`;
  }
}
