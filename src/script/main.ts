import Sound from "./_classes/utils/Sound";
import MediaPlayer from "./_classes/utils/MediaPlayer";
import StorageFile from "./_classes/utils/StorageFile";

// import MyGame from "./_classes/MyGame";

/**
 * main.ts
 * Main script
 */
// var game: MyGame;
let slideSnd = new Sound("./sound/agfa.wav");
let music = new MediaPlayer();
let prefs = new StorageFile("/prefs.json");
let ttm = 2;

function init() {
  if (location.hash.length > 1) location.replace("./");
  // game = (<any>window)["game"] = new MyGame("#game");
  // game.debug = location.search.indexOf("debug") !== -1;
  _initAudio();
  slideSnd.oneInstance = true;
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
  slideSnd.play();
  if (!ttm--) setTimeout(() => {
    music.play("./music/Thinking Music.mp3", true);
  }, 1024);
  if (e && (<HTMLElement>e.target).tagName === "A") return;
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
  }, 512);
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

function _initAudio() {
  var vol = 2;
  for (var channel of ["sfx", "music", "ambiance"]) {
    prefs.set(channel + ".enabled", true, true);
    prefs.set(channel + ".volume", vol /= 2, true);
    prefs.onSet(channel, applySoundPrefs);
  }
  applySoundPrefs();
}
function applySoundPrefs() {
  music.enabled = prefs.get("music.enabled");
  music.volume = prefs.get("music.volume");
  Sound.enabled = prefs.get("sfx.enabled");
  Sound.volume = prefs.get("sfx.volume");
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
