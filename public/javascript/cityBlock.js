function deleteFun() {
  const buttonId = $(this).attr("data-attribute-id");
  const modalBody = document.getElementById("modal-body");
  const html = `
<h1>Are you sure you want to delete this country?</h1>
<p>All data will be lost</p>
<button type="button" class="btn btn-primary" id="sure">I'm sure</button>
`;
  $("#exampleModal").modal("show");
  // eslint-disable-next-line no-unused-vars
  $("#exampleModal").on("shown.bs.modal", (e) => {
    modalBody.innerHTML = html;
  });
  $(document).on("click", "#sure", () => {
    $.ajax({
      url: "/api/city/" + buttonId,
      type: "DELETE",
    }).done(() => {
      window.location.replace("/city");
      // If there's an error, log the error
    });
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
      <li class="list-group-item"><h6>Country:</h6> ${data[0].name}</li>
      <li class="list-group-item"><h6>Region:</h6> ${data[0].region}</li>
      <li class="list-group-item"><h6>Capital:</h6> ${data[0].capital}</li>
      <li class="list-group-item"><h6>Currency:</h6> ${data[0].currencies[0].code}</li>
      <li class="list-group-item"><h6>Main Language:</h6> ${data[0].languages[0].name}</li>
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
