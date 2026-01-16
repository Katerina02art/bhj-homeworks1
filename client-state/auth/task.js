document.addEventListener("DOMContentLoaded", () => {
  const signin = document.getElementById("signin");
  const signinForm = document.getElementById("signin__form");
  const welcome = document.getElementById("welcome");
  const userIdSpan = document.getElementById("user_id");

  const KEY = "user_id";

  function showWelcome(userId) {
    userIdSpan.textContent = userId;
    welcome.classList.add("welcome_active");
    signin.classList.remove("signin_active");
  }

  function showSignin() {
    welcome.classList.remove("welcome_active");
    signin.classList.add("signin_active");
  }

  let logoutBtn = document.getElementById("logout_btn");
  if (!logoutBtn) {
    logoutBtn = document.createElement("button");
    logoutBtn.type = "button";
    logoutBtn.id = "logout_btn";
    logoutBtn.className = "btn";
    logoutBtn.textContent = "Выйти";
    welcome.appendChild(document.createTextNode(" "));
    welcome.appendChild(logoutBtn);
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem(KEY);
    userIdSpan.textContent = "";
    showSignin();
  });

  const savedId = localStorage.getItem(KEY);
  if (savedId) {
    showWelcome(savedId);
  } else {
    showSignin();
  }

  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(signinForm);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/auth");
    xhr.responseType = "json";

    xhr.onload = () => {
      const result = xhr.response;

      signinForm.reset();

      if (!result || result.success !== true) {
        alert("Неверный логин/пароль");
        showSignin();
        return;
      }

      const userId = result.user_id;
      localStorage.setItem(KEY, String(userId));
      showWelcome(userId);
    };

    xhr.onerror = () => {
      signinForm.reset();
      alert("Ошибка сети. Попробуйте ещё раз.");
    };

    xhr.send(formData);
  });
});
