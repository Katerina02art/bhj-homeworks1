document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("subscribe-modal");
  const closeBtn = modal.querySelector(".modal__close");

  const COOKIE_NAME = "subscribeModalClosed";

  function getCookie(name) {
    const parts = document.cookie.split("; ").map((c) => c.split("="));
    const found = parts.find(([key]) => key === name);
    return found ? decodeURIComponent(found[1]) : null;
  }

  function setCookie(name, value, days = 365) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
  }

  if (getCookie(COOKIE_NAME) !== "1") {
    modal.classList.add("modal_active");
  }

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("modal_active");
    setCookie(COOKIE_NAME, "1");
  });
});
