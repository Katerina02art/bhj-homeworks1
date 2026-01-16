const rotators = document.querySelectorAll(".rotator");

rotators.forEach((rotator) => {
  const cases = Array.from(rotator.querySelectorAll(".rotator__case"));
  let index = cases.findIndex((c) =>
    c.classList.contains("rotator__case_active"),
  );
  if (index === -1) index = 0;

  function rotate() {
    cases[index].classList.remove("rotator__case_active");

    index = (index + 1) % cases.length;

    const current = cases[index];
    current.classList.add("rotator__case_active");

    if (current.dataset.color) {
      current.style.color = current.dataset.color;
    }

    const speed = Number(current.dataset.speed) || 1000;
    setTimeout(rotate, speed);
  }

  const first = cases[index];
  if (first.dataset.color) first.style.color = first.dataset.color;

  const firstSpeed = Number(first.dataset.speed) || 1000;
  setTimeout(rotate, firstSpeed);
});
