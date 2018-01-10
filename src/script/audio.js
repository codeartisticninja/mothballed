(function () {
  "use strict";
  let snd = "music";
  let btn;

  function init() {
    setTimeout(addAudioBtn, 1024);
  }

  function addAudioBtn() {
    let container = document.body;
    btn = document.createElement("button");
    btn.classList.add("audio");
    if (!prefs.get(`${snd}.enabled`)) btn.classList.add("muted");
    btn.setAttribute("title", "Toggle audio");
    btn.textContent = "Sound";
    btn.addEventListener("click", toggleAudio);
    container.appendChild(btn);
  }

  function toggleAudio() {
    prefs.set(`${snd}.enabled`, !prefs.get(`${snd}.enabled`));
    prefs.set(`sfx.enabled`, prefs.get(`${snd}.enabled`));
    if (prefs.get(`${snd}.enabled`)) {
      btn.classList.remove("muted");
    } else {
      btn.classList.add("muted");
    }
  }

  addEventListener("DOMContentLoaded", init);
})()