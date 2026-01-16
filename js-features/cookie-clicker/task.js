const cookie = document.getElementById("cookie");
const counter = document.getElementById("clicker__counter");

let clicks = 0;
let isSmall = false;

cookie.addEventListener("click", () => {
  clicks += 1;
  counter.textContent = clicks;

  if (!isSmall) {
    cookie.style.width = "180px";
    cookie.style.height = "180px";
  } else {
    cookie.style.width = "200px";
    cookie.style.height = "200px";
  }

  isSmall = !isSmall;
});
