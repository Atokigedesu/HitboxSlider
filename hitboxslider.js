(function() {
document.addEventListener('DOMContentLoaded', function() {

var hss = document.querySelectorAll('.hitbox-slider');
for (var i=0; i<hss.length; ++i) {
  var hs = hss[i];
  var player = '<div class="hitbox-slider-container">{{video}}<div class="left-arrow"></div><div class="right-arrow"></div><div class="bar"><span class="progress">1</span>/<span class="duration">0</span> 再生速度: <span class="speed">1.0</span> <button class="speedup">+</button><button class="speeddown">-</button></div></div>'
  player = player.replace('{{video}}', hs.outerHTML);
  hs.outerHTML = player;
}
var containers = document.querySelectorAll('.hitbox-slider-container');
for (var i=0; i<containers.length; ++i) {
  var container = containers[i];
  var video = container.querySelector('video');
  var left = container.querySelector('.left-arrow');
  var right = container.querySelector('.right-arrow');
  var bar = container.querySelector('.bar');
  var seek = bar.querySelector('.seek');
  var progress = bar.querySelector('.progress');
  var duration = bar.querySelector('.duration');
  var speed = bar.querySelector('.speed');
  var speedup = bar.querySelector('.speedup');
  var speeddown = bar.querySelector('.speeddown');

  // ポーズ切り替えのイベント登録
  container.addEventListener('click', function(event) {
    video.paused ? video.play() : video.pause();
    event.stopPropagation();
  }, false);

  bar.addEventListener('click', function(event) {
    event.stopPropagation();
  }, false);

  // フレーム操作用のイベント登録
  left.addEventListener('click', function(event) {
    video.pause();
    video.currentTime -= 1/60;
    event.stopPropagation();
  }, false);
  right.addEventListener('click', function(event) {
    video.pause();
    video.currentTime += 1/60;
    event.stopPropagation();
  }, false);

  // 全体フレーム数の設定
  video.addEventListener('loadedmetadata', function() {
    duration.innerText = Math.floor(video.duration * 60);
  });

  // 現在フレーム表示用のイベント登録
  var refreshProgress = function() {
    progress.innerText = 1 + Math.floor(video.currentTime * 60);
  }
  video.addEventListener('pause', refreshProgress);
  video.addEventListener('timeupdate', refreshProgress);

  // 再生速度操作用のイベント登録
  speedup.addEventListener('click', function() {
    video.playbackRate += 0.1;
  }, false);
  speeddown.addEventListener('click', function() {
    video.playbackRate -= 0.1;
    video.playbackRate = Math.max(0.1, video.playbackRate);
  }, false);

  // 再生速度表示用のイベント登録
  video.addEventListener('ratechange', function() {
    var v = Math.round(video.playbackRate * 10) / 10;
    speed.innerText = v;
  })

}

});
})();
