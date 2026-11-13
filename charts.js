// Starts a chart's animation when it scrolls into view. Without this file the charts are simply drawn.
(function () {
  var charts = document.querySelectorAll(".chart");
  if (!("IntersectionObserver" in window)) {
    charts.forEach(function (c) { c.classList.add("play"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("play"); io.unobserve(e.target); }
    });
  }, { threshold: 0.35 });
  charts.forEach(function (c) { io.observe(c); });
})();
