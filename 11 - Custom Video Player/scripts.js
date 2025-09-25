//get elements
const player = document.querySelector(".player");
const video = player.querySelector(".player__video");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const playerButton = player.querySelector(".player__button");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreenButton = player.querySelector(".fullscreen");

//play/pause function
function toggleVideo() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  playerButton.textContent = icon;
}

//progress tracker function
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

//range slider function
function handleRangeUpdate() {
  video[this.name] = this.value;
}

//data skip function
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

//fullscreen funciton
function handleFullScreen() {
  video.requestFullscreen();
}

//play/pause event listeners
video.addEventListener("click", toggleVideo);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
playerButton.addEventListener("click", toggleVideo);

//progress tracker event listener
video.addEventListener("timeupdate", handleProgress);
progress.addEventListener("click", scrub);
let mousedown = false;
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

//range event listener
ranges.forEach((range) => {
  range.addEventListener("change", handleRangeUpdate);
});

//skip event listener
skipButtons.forEach((button) => {
  button.addEventListener("click", skip);
});

//fullscreen event listener
fullscreenButton.addEventListener("click", handleFullScreen);
