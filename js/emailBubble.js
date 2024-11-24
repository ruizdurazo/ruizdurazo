/*
 * Enrique Ruiz Durazo
 * 2025
 */

// Function to create and handle email bubbles
const handleEmailBubble = (element, email) => {
  let elementBubble = null;

  // Create and show bubble on hover
  element.addEventListener("mouseenter", () => {
    // If the element is an anchor, remove href
    if (element.tagName.toLowerCase() === "a") {
      element.href = "#";
    }
    elementBubble = document.createElement("div");
    elementBubble.className = "email-bubble";
    elementBubble.textContent = email;
    element.appendChild(elementBubble);
  });

  // Remove bubble when mouse leaves
  element.addEventListener("mouseleave", () => {
    if (elementBubble) {
      elementBubble.remove();
      elementBubble = null;
    }
  });

  // Copy email and update bubble text on click
  element.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      if (elementBubble) {
        elementBubble.textContent = "Copied!";
        setTimeout(() => {
          if (elementBubble) {
            elementBubble.textContent = email;
          }
        }, 1000);
      }
    } catch (err) {
      new Error("Failed to copy email:", err);
    }
  });
};
