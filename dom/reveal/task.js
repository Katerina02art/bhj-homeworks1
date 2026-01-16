const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();

    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      el.classList.add("reveal_active");
    } else {
      el.classList.remove("reveal_active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();
