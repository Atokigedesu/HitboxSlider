function increment() {
  var video = document.querySelector("#v");
  video.currentTime += 1/60;
}

function decrement() {
  var video = document.querySelector("#v");
  video.pause();
  video.currentTime -= 1/60;
}

document.addEventListener("DOMContentLoaded", function() {
  var video = document.querySelector("#v");
  var frame = document.querySelector("#f");
  var frameUpdate = function() {
    frame.innerHTML = Math.floor(video.currentTime * 60) + 1;
  }
  video.addEventListener("pause", frameUpdate);
  video.addEventListener("timeupdate", frameUpdate);
});
