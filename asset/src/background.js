const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage() {
  const image = new Image();
  image.src = "https://source.unsplash.com/1920x1080/?park";
  image.classList.add("bgImage");
  body.appendChild(image);
}

function init() {
  paintImage();
}

init();
