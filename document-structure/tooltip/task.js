const tooltip = document.createElement("div");
tooltip.className = "tooltip";
document.body.appendChild(tooltip);

let activeLink = null;

function setTooltipPosition(link, tip) {
  const position = link.dataset.position || "bottom";

  const linkRect = link.getBoundingClientRect();
  const tipRect = tip.getBoundingClientRect();

  let top = 0;
  let left = 0;

  if (position === "top") {
    top = linkRect.top - tipRect.height - 5;
    left = linkRect.left;
  }

  if (position === "bottom") {
    top = linkRect.bottom + 5;
    left = linkRect.left;
  }

  if (position === "left") {
    top = linkRect.top;
    left = linkRect.left - tipRect.width - 5;
  }

  if (position === "right") {
    top = linkRect.top;
    left = linkRect.right + 5;
  }

  tip.style.top = `${top + window.scrollY}px`;
  tip.style.left = `${left + window.scrollX}px`;
}

document.querySelectorAll(".has-tooltip").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const text = link.getAttribute("title");

    if (activeLink === link && tooltip.classList.contains("tooltip_active")) {
      tooltip.classList.remove("tooltip_active");
      activeLink = null;
      return;
    }

    activeLink = link;
    tooltip.textContent = text;
    tooltip.classList.add("tooltip_active");

    setTooltipPosition(link, tooltip);
  });
});
