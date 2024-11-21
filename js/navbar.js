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
    menuSVG.src = "/assets/images/icon-close.svg";
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
    menuSVG.src = "/assets/images/icon-menu.svg";
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
