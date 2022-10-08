let form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  let status = document.getElementById("my-form-status");
  let data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerHTML = "Gracias por contactarnos!";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerHTML = "Oops! Hubo un problema enviando tu mensaje.";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! Hubo un problema enviando tu mensaje.";
    });
}

form.addEventListener("submit", handleSubmit);