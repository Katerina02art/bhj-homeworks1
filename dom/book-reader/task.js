const book = document.getElementById("book");
const fontSizes = document.querySelectorAll(".font-size");

fontSizes.forEach((size) => {
  size.addEventListener("click", (event) => {
    event.preventDefault();

    fontSizes.forEach((s) => s.classList.remove("font-size_active"));

    size.classList.add("font-size_active");

    book.classList.remove("book_fs-big", "book_fs-small");

    const fontSize = size.dataset.size;

    if (fontSize === "big") {
      book.classList.add("book_fs-big");
    } else if (fontSize === "small") {
      book.classList.add("book_fs-small");
    }
  });
});
