document.addEventListener("DOMContentLoaded", () => {
  const cart = document.querySelector(".cart");
  const cartTitle = document.querySelector(".cart__title");
  const cartProducts = document.querySelector(".cart__products");
  const products = document.querySelectorAll(".product");

  const STORAGE_KEY = "netology_cart";

  const toggleCartVisibility = () => {
    const hasItems = cartProducts.children.length > 0;
    cart.style.display = hasItems ? "" : "none";
    cartTitle.style.display = hasItems ? "" : "none";
  };

  const saveCart = () => {
    const data = [];
    cartProducts.querySelectorAll(".cart__product").forEach((item) => {
      data.push({
        id: item.dataset.id,
        src: item.querySelector(".cart__product-image").src,
        count: Number(item.querySelector(".cart__product-count").textContent),
      });
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const restoreCart = () => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    data.forEach(({ id, src, count }) => {
      const cartProduct = document.createElement("div");
      cartProduct.className = "cart__product";
      cartProduct.dataset.id = id;

      cartProduct.innerHTML = `
        <img class="cart__product-image" src="${src}">
        <div class="cart__product-count">${count}</div>
        <a href="#" class="cart__product-remove">&times;</a>
      `;

      cartProduct
        .querySelector(".cart__product-remove")
        .addEventListener("click", (e) => {
          e.preventDefault();
          cartProduct.remove();
          saveCart();
          toggleCartVisibility();
        });

      cartProducts.append(cartProduct);
    });

    toggleCartVisibility();
  };

  restoreCart();

  products.forEach((product) => {
    const dec = product.querySelector(".product__quantity-control_dec");
    const inc = product.querySelector(".product__quantity-control_inc");
    const valueEl = product.querySelector(".product__quantity-value");
    const addBtn = product.querySelector(".product__add");
    const img = product.querySelector(".product__image");

    dec.addEventListener("click", () => {
      const v = Math.max(1, Number(valueEl.textContent) - 1);
      valueEl.textContent = v;
    });

    inc.addEventListener("click", () => {
      valueEl.textContent = Number(valueEl.textContent) + 1;
    });

    addBtn.addEventListener("click", () => {
      const id = product.dataset.id;
      const count = Number(valueEl.textContent);

      let cartItem = cartProducts.querySelector(
        `.cart__product[data-id="${id}"]`,
      );

      if (cartItem) {
        const countEl = cartItem.querySelector(".cart__product-count");
        countEl.textContent = Number(countEl.textContent) + count;
      } else {
        cartItem = document.createElement("div");
        cartItem.className = "cart__product";
        cartItem.dataset.id = id;

        cartItem.innerHTML = `
          <img class="cart__product-image" src="${img.src}">
          <div class="cart__product-count">${count}</div>
          <a href="#" class="cart__product-remove">&times;</a>
        `;

        cartItem
          .querySelector(".cart__product-remove")
          .addEventListener("click", (e) => {
            e.preventDefault();
            cartItem.remove();
            saveCart();
            toggleCartVisibility();
          });

        cartProducts.append(cartItem);
      }

      saveCart();
      toggleCartVisibility();
    });
  });

  toggleCartVisibility();
});
