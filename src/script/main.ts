// import MyGame from "./_classes/MyGame";

/**
 * main.ts
 * Main script
 */
// var game: MyGame;

function init() {
  if (location.hash.length > 1) location.replace("./");
  // game = (<any>window)["game"] = new MyGame("#game");
  // game.debug = location.search.indexOf("debug") !== -1;
  let slideshow = document.querySelector("#slideshow");
  window.addEventListener("resize", () => {
    resize();
  });
  resize();
  window.addEventListener("hashchange", () => {
    prevSlide();
  });
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
  setTimeout(() => {
    if (!(<Element>document.querySelector(".dias")).classList.contains("show")) {
      location.assign("#~");
    }
  }, 256);
}
function prevSlide() {
  if (location.hash.length > 1) return;
  let show = false;
  let dias, dia = document.querySelectorAll(".dias"), i = dia.length;
  while (dias = dia.item(--i)) {
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
  setTimeout(() => {
    if (!(<Element>document.querySelector(".dias")).classList.contains("show")) {
      location.assign("#~");
    }
  }, 512);
}

function resize() {
  let w = window.innerWidth / 4;
  let h = window.innerHeight / 3;
  if (w > h) {
    document.body.classList.add("wide");
    document.body.classList.remove("tall");
  } else {
    document.body.classList.add("tall");
    document.body.classList.remove("wide");
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
