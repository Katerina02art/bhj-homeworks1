document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const progress = document.getElementById("progress");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        progress.value = event.loaded / event.total;
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        progress.value = 1;
      }
    };

    const formData = new FormData(form);

    xhr.send(formData);
  });
});
