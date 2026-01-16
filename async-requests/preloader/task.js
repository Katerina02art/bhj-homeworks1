document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const items = document.getElementById("items");

  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://students.netoservices.ru/nestjs-backend/slow-get-courses",
  );

  xhr.onload = () => {
    loader.classList.remove("loader_active");

    if (xhr.status !== 200) return;

    const data = JSON.parse(xhr.responseText);
    const valute = data.response.Valute;

    items.innerHTML = "";

    Object.keys(valute).forEach((code) => {
      const currency = valute[code];

      const item = document.createElement("div");
      item.className = "item";

      item.innerHTML = `
        <div class="item__code">${currency.CharCode}</div>
        <div class="item__value">${currency.Value}</div>
        <div class="item__currency">руб.</div>
      `;

      items.appendChild(item);
    });
  };

  xhr.onerror = () => {
    loader.classList.remove("loader_active");
  };

  xhr.send();
});
