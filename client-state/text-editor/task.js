document.addEventListener("DOMContentLoaded", () => {
  const editor = document.getElementById("editor");
  const KEY = "editor_text";

  const saved = localStorage.getItem(KEY);
  if (saved !== null) {
    editor.value = saved;
  }

  editor.addEventListener("input", () => {
    localStorage.setItem(KEY, editor.value);
  });

  let clearBtn = document.getElementById("editor-clear");

  if (!clearBtn) {
    clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.id = "editor-clear";
    clearBtn.textContent = "Очистить содержимое";
    editor.insertAdjacentElement("afterend", clearBtn);
  }

  clearBtn.addEventListener("click", () => {
    editor.value = "";
    localStorage.removeItem(KEY);
  });
});
