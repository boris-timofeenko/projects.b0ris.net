// One clip from the tape twice: as captured (DV, bit for bit) and through uvcdv-capture --vhs.
// The two videos play in step; the range input over them moves the divider (mouse, touch or keyboard).
(function () {
  document.querySelectorAll("[data-compare]").forEach(function (box) {
    var base = box.querySelector("video.base"), over = box.querySelector("video.over");
    var range = box.querySelector("input[type=range]");
    var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function split() { box.style.setProperty("--split", range.value + "%"); }
    range.addEventListener("input", split);
    split();
    if (still) {
      [base, over].forEach(function (v) { v.removeAttribute("autoplay"); v.pause(); v.currentTime = 1.0; });
      return;
    }
    base.addEventListener("timeupdate", function () {
      if (Math.abs(over.currentTime - base.currentTime) > 0.06) over.currentTime = base.currentTime;
    });
    base.addEventListener("play", function () { over.play(); });
    base.addEventListener("pause", function () { over.pause(); });
  });
})();
