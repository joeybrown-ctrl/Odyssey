$(document).ready(() => {
  $(".slick").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: "<button class='btn btn-primary carousel-btn'>Next</button>",
    prevArrow: "<button class='btn btn-primary carousel-btn'>Previous</button>",
  });
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
      $.ajax({
        url: "/api/details/",
        type: "POST",
        data: data,
      }).then(() => {
        location.reload();
        return false;
      });
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

// function getImages() {
//   const id = window.location.pathname.split("/")[2];
//   $.ajax({
//     url: "/api/details/" + id,
//     method: "GET",
//   }).then((res) => {
//     res.Images.forEach((imageUrl) => {
//       const newDiv = $("<div>");
//       const newImg = $("<img>");
//       newImg.addClass("userImages");
//       newImg.attr("src", imageUrl.image);
//       newDiv.append(newImg);
//       $("#images").append(newDiv);
//     });
//   });
// }
