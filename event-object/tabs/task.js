const tabNavigations = document.querySelectorAll(".tab__navigation");

tabNavigations.forEach((nav) => {
  const tabs = Array.from(nav.querySelectorAll(".tab"));
  const contentsWrapper = nav.nextElementSibling; // .tab__contents
  const contents = Array.from(
    contentsWrapper.querySelectorAll(".tab__content"),
  );

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const index = tabs.indexOf(tab);

      tabs.forEach((t) => t.classList.remove("tab_active"));
      contents.forEach((c) => c.classList.remove("tab__content_active"));

      tabs[index].classList.add("tab_active");
      contents[index].classList.add("tab__content_active");
    });
  });
});
