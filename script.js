const inputs = document.querySelectorAll('.controls input');
const player = document.querySelector(".player")[0];
const video = player.querySelector(".viewer")[0];
const progress = player.querySelector(".progress")[0];
const progressBar = player.querySelector(".progress__filled")[0];
const toggle = player.querySelector(".toggle")[0];
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }
toggle.addEventListener("click", togglePlay);

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
video.addEventListener("timeupdate", handlerProgress);

for (let skip of skipButtons) {
  skip.addEventListener("click", forwardOrBackward);
}

for (let range of ranges) {
  range.addEventListener("change", handleRangeUpdate);
}

function togglePlay() {
  if (video.paused) {
    video.play();
    toggle.innerText = "❚ ❚";
  } else {
    video.pause();
    toggle.innerText = "►";
  }
}

function handlerProgress() {
  const currentProgress = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${currentProgress}%`;
}

function forwardOrBackward(event) {
  let element = event.target;
  video.currentTime += parseFloat(element.attributes["data-skip"].value);
}

function handleRangeUpdate(event) {
  let element = event.target;
  video[element.name] = element.value;
}