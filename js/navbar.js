/*
 * Enrique Ruiz Durazo
 * 2021-2025
 */

const navbar = document.getElementById("navbar");
const menuSVG = document.getElementById("menu-svg");
const menuOverlay = document.getElementById("menu-overlay");

menuOverlay.innerHTML =
  '<div class="menu-list">' +
  '<a class="menu-list-item" href="/" tabindex="-1">Home</a>' +
  '<a class="menu-list-item" href="mailto:enrique@ruizdurazo.com" target="_blank" id="menu-list-item-email" tabindex="-1">Email</a>' +
  '<a class="menu-list-item" href="https://x.com/ruizdurazo" target="_blank" rel="noopener noreferrer" tabindex="-1">X (Twitter)</a>' +
  '<a class="menu-list-item" href="https://github.com/ruizdurazo" target="_blank" rel="noopener noreferrer" tabindex="-1">GitHub</a>' +
  '<a class="menu-list-item" href="/lol" rel="noopener noreferrer" tabindex="-1">LinkedIn</a>' +
  "</div>";

document.getElementById("menu-button").addEventListener("click", (event) => {
  if (menuSVG.alt === "Menu") {
    document.getElementById("menu-button").blur();
    // Update navbar classes
    navbar.classList.remove("menu-close");
    navbar.classList.add("menu-open");
    // Open menu tray
    menuOverlay.setAttribute("style", "max-height: 100svh;");
    menuOverlay.children[0].style.display = "flex";
    // Change menu icon
    menuSVG.src = "/assets/icons/icon-close.svg";
    menuSVG.alt = "Close";
    menuSVG.width = "60";
    menuSVG.height = "60";
    // Make menu items focusable
    menuOverlay.querySelectorAll(".menu-list-item").forEach((item) => {
      item.tabIndex = 0;
    });
  } else {
    document.getElementById("menu-button").blur();
    // Update navbar classes
    navbar.classList.remove("menu-open");
    navbar.classList.add("menu-close");
    // Close menu tray
    menuOverlay.setAttribute("style", "max-height: 0;");
    menuOverlay.children[0].style.display = "none";
    // Change menu icon
    menuSVG.src = "/assets/icons/icon-menu.svg";
    menuSVG.alt = "Menu";
    menuSVG.width = "60";
    menuSVG.height = "60";
    // Make menu items not focusable
    menuOverlay.querySelectorAll(".menu-list-item").forEach((item) => {
      item.tabIndex = -1;
    });
  }
});

// Close menu tray on escape key
document.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Escape") {
      if (document.getElementById("menu-svg").alt === "Close") {
        document.getElementById("menu-button").click();
      }
    }
  },
  true
);

// Add email bubble to email menu list item (requires handleEmailBubble function)
const menuListItemEmail = document.getElementById("menu-list-item-email");
const email = menuListItemEmail.href.replace("mailto:", "");
handleEmailBubble(menuListItemEmail, email);

// TODO / WIP
// // Dark/Light Mode Toggle Functionality
// // Available modes: "system" (default), "light", "dark"
// const modeToggleBtn = document.getElementById("mode-toggle");

// // Function to get the user's current preferred color scheme
// function getPreferredColorScheme() {
//   // Check if user has previously set a preference
//   const savedPreference = localStorage.getItem("color-theme");

//   if (savedPreference) {
//     return savedPreference;
//   }

//   // If no saved preference, check system preference
//   if (
//     window.matchMedia &&
//     window.matchMedia("(prefers-color-scheme: dark)").matches
//   ) {
//     return "system-dark";
//   } else {
//     return "system-light";
//   }
// }

// // Function to update the UI based on the current theme
// function updateThemeUI(mode) {
//   // Update button text
//   if (mode === "system-dark" || mode === "system-light") {
//     modeToggleBtn.textContent = "System";
//     // Apply theme based on system preference
//     if (mode === "system-dark") {
//       document.documentElement.setAttribute("data-theme", "dark");
//     } else {
//       document.documentElement.removeAttribute("data-theme");
//     }
//   } else if (mode === "dark") {
//     modeToggleBtn.textContent = "Dark";
//     document.documentElement.setAttribute("data-theme", "dark");
//   } else {
//     modeToggleBtn.textContent = "Light";
//     document.documentElement.removeAttribute("data-theme");
//   }
// }

// // Listen for system color scheme changes
// window
//   .matchMedia("(prefers-color-scheme: dark)")
//   .addEventListener("change", (e) => {
//     const currentMode = localStorage.getItem("color-theme");
//     // Only update if the user is using system preference
//     if (
//       currentMode === "system-dark" ||
//       currentMode === "system-light" ||
//       !currentMode
//     ) {
//       const newMode = e.matches ? "system-dark" : "system-light";
//       localStorage.setItem("color-theme", newMode);
//       updateThemeUI(newMode);
//     }
//   });

// // Initialize theme based on saved preference or system default
// document.addEventListener("DOMContentLoaded", () => {
//   const currentTheme = getPreferredColorScheme();
//   localStorage.setItem("color-theme", currentTheme);
//   updateThemeUI(currentTheme);
// });

// // Toggle between system, light, and dark mode
// modeToggleBtn.addEventListener("click", () => {
//   const currentMode = localStorage.getItem("color-theme");

//   let newMode;
//   if (currentMode === "system-dark" || currentMode === "system-light") {
//     newMode = "light";
//   } else if (currentMode === "light") {
//     newMode = "dark";
//   } else {
//     // If current mode is dark or undefined, switch to system
//     newMode = window.matchMedia("(prefers-color-scheme: dark)").matches
//       ? "system-dark"
//       : "system-light";
//   }

//   localStorage.setItem("color-theme", newMode);
//   updateThemeUI(newMode);
// });

// // Apply theme on page load without waiting for DOMContentLoaded
// // to prevent flash of incorrect theme
// (function () {
//   const currentTheme = getPreferredColorScheme();
//   updateThemeUI(currentTheme);
// })();
