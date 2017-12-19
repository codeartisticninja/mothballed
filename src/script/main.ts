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
  window.addEventListener("hashchange", (e) => {
    if (location.hash.length > 1) return;
    changeSlide(e, true);
  });
  document.body.addEventListener("keypress", (e: Event) => {
    changeSlide(e);
  });
  document.body.addEventListener("click", (e: Event) => {
    changeSlide(e);
  });
  changeSlide();
  document.body.addEventListener("mousemove", () => {
    flash();
  });
}

function changeSlide(e?: Event, reverse = false) {
  flash();
  if (e && (<HTMLElement>e.target).tagName.toLowerCase() === "a") return;
  let vignette = <HTMLElement>document.querySelector(".vignette");
  let show = false;
  let i = -1, di = 1, dias, dia = document.querySelectorAll(".dias");
  if (reverse) {
    i = dia.length;
    di = -1;
  }
  while (dias = dia.item(i += di)) {
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
    first && first.classList.remove("hide");
  }
  setTimeout(() => {
    vignette.removeAttribute("style");
    setTimeout(() => {
      vignette.classList.remove("bright");
    }, 32);
  }, 32);
  setTimeout(() => {
    if (!(<Element>document.querySelector(".dias")).classList.contains("show")) {
      location.assign("#~");
    }
  }, 256);
}

function flash() {
  let vignette = <HTMLElement>document.querySelector(".vignette");
  vignette.style.display = "none";
  vignette.classList.add("bright");
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
