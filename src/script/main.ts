// import MyGame from "./_classes/MyGame";

/**
 * main.ts
 * Main script
 */
// var game: MyGame;

function init() {
  // game = (<any>window)["game"] = new MyGame("#game");
  // game.debug = location.search.indexOf("debug") !== -1;
  let slideshow = document.querySelector("#slideshow");
  slideshow && slideshow.addEventListener("click", () => {
    nextSlide();
  });
  nextSlide();
}

function nextSlide() {
  let show = false;
  let i = 0, dias, dia = document.querySelectorAll(".dias");
  while (dias = dia.item(i++)) {
    if (show) {
      dias.classList.add("show");
      dias.classList.remove("hide");
      show = false;
    } else {
      if (dias.classList.contains("show")) {
        show = true;
      }
      dias.classList.add("hide");
      dias.classList.remove("show");
    }
  }
  if (!document.querySelector(".show")) {
    let first = document.querySelector(".dias");
    first && first.classList.add("show");
  }
}

if (location.search === "?nojs") {
  let tags = document.getElementsByTagName("noscript");
  for (let i = 0; i < tags.length; i++) {
    let tag = document.createElement("span");
    tag.classList.add("noscript");
    tag.innerHTML = tags[i].innerHTML;
    (tags[i].parentElement || document.body).insertBefore(tag, tags[i]);
  }
} else {
  addEventListener("DOMContentLoaded", init);
}
