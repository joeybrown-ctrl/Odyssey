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
