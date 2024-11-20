/*
 * Enrique Ruiz Durazo
 * 2021-2025
 */

const navbar = document.getElementById("navbar");
const menuSVG = document.getElementById("menu-svg");
const menuOverlay = document.getElementById("menu-overlay");

menuOverlay.innerHTML =
  '<div class="menu-list">' +
  '<a class="menu-list-item" href="/">Home</a>' +
  '<a class="menu-list-item" href="mailto:enrique@ruizdurazo.com" target="_blank" id="menu-list-item-email">Email</a>' +
  '<a class="menu-list-item" href="https://x.com/ruizdurazo" target="_blank" rel="noopener noreferrer">X (Twitter)</a>' +
  '<a class="menu-list-item" href="https://github.com/ruizdurazo" target="_blank" rel="noopener noreferrer">GitHub</a>' +
  '<a class="menu-list-item" href="/lol" rel="noopener noreferrer">LinkedIn</a>' +
  "</div>";

document.getElementById("menu-button").addEventListener("click", (event) => {
  if (menuSVG.alt === "Menu") {
    document.getElementById("menu-button").blur();
    navbar.classList.remove("menu-close");
    navbar.classList.add("menu-open");
    menuOverlay.setAttribute("style", "max-height: 100svh;");
    menuOverlay.children[0].style.display = "flex";
    menuSVG.src = "/assets/images/icon-close.svg";
    menuSVG.alt = "Close";
    menuSVG.width = "60";
    menuSVG.height = "60";
  } else {
    document.getElementById("menu-button").blur();
    navbar.classList.remove("menu-open");
    navbar.classList.add("menu-close");
    menuOverlay.setAttribute("style", "max-height: 0;");
    menuOverlay.children[0].style.display = "none";
    menuSVG.src = "/assets/images/icon-menu.svg";
    menuSVG.alt = "Menu";
    menuSVG.width = "60";
    menuSVG.height = "60";
  }
});

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

// Apply to email menu list item (requires handleEmailBubble function)
const menuListItemEmail = document.getElementById("menu-list-item-email");
const email = menuListItemEmail.href.replace("mailto:", "");
handleEmailBubble(menuListItemEmail, email);
