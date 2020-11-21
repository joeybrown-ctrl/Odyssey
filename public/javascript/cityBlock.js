function deleteFun() {
  const buttonId = $(this).attr("data-attribute-id");
  $.ajax({
    url: "/api/city/" + buttonId,
    type: "DELETE",
  }).done(() => {
    window.location.replace("/city");
    // If there's an error, log the error
  });
}

$("body").on("click", ".delete", deleteFun);

function getDetails() {
  const country = $(this).attr("data-cityName");
  fetch("https://restcountries.eu/rest/v2/name/" + country)
    .then((res) => res.json())
    .then((data) => {
      const modalBody = document.getElementById("modal-body");
      const html = `
        <ul class="list-group">
            <li class="list-group-item">${data[0].name}</li>
            <li class="list-group-item">${data[0].region}</li>
            <li class="list-group-item">${data[0].capital}</li>
            <li class="list-group-item">${data[0].currencies[0].code}</li>
            <li class="list-group-item">${data[0].languages[0].name}</li>
            <li class="list-group-item"><img src="${data[0].flag}" width="50" height="50" alt="country"/></li>
        </ul>
        `;
      $("#exampleModal").modal("show");

      // eslint-disable-next-line no-unused-vars
      $("#exampleModal").on("shown.bs.modal", (e) => {
        modalBody.innerHTML = html;
      });
    })
    .catch((err) => console.log("Error:", err));

  // If there's an error, log the error
}

$("body").on("click", ".details", getDetails);
