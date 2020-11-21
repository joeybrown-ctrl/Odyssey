$(document).ready(() => {
  getImages();
  $(".slick").slick({});
});

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "odysseyuserimages",
    uploadPreset: "ml_default",
  },
  (error, result) => {
    if (error) {
      throw error;
    }
    if (!error && result && result.event === "success") {
      // result.info.url will return the url of the uploaded photo
      // TODO: Supply to imageUrl of Image
      const data = {
        image: result.info.url,
        CityId: window.location.pathname.split("/")[2],
      };
      $.ajax(
        {
          url: "/api/details/",
          type: "POST",
          data: data,
        },
        (result) => {
          console.log(result);
        }
      );
    }
  }
);

document.getElementById("upload_widget").addEventListener(
  "click",
  () => {
    myWidget.open();
  },
  false
);

function getImages() {
  $.ajax({
    url: "/api/details/",
    method: "GET",
  }).then((res) => {
    res.forEach((imageUrl) => {
      const newDiv = $("<div>");
      const newImg = $("<img>");
      newImg.addClass("userImages");
      newImg.attr("src", imageUrl.image);
      newDiv.append(newImg);
      $("#images").append(newDiv);
    });
  });
}
