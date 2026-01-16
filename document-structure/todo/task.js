document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("tasks__form");
  const input = document.getElementById("task__input");
  const list = document.getElementById("tasks__list");

  function createTask(title) {
    const task = document.createElement("div");
    task.className = "task";

    const taskTitle = document.createElement("div");
    taskTitle.className = "task__title";
    taskTitle.textContent = title;

    const remove = document.createElement("a");
    remove.href = "#";
    remove.className = "task__remove";
    remove.innerHTML = "&times;";

    remove.addEventListener("click", (e) => {
      e.preventDefault();
      task.remove();
    });

    task.append(taskTitle, remove);
    return task;
  }

  function addTaskFromInput() {
    const value = input.value.trim();
    if (value === "") return;

    list.appendChild(createTask(value));
    input.value = "";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTaskFromInput();
  });
});
