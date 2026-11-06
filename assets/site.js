// Mobile navigation toggle. No other behaviour on this site.
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
})();
/* Facility carousel: cross-fade every 3s, pause on hover/focus, respect reduced motion */
(function () {
  var root = document.getElementById('hero-carousel');
  if (!root) return;
  var slides = Array.prototype.slice.call(root.querySelectorAll('.hc-slide'));
  var dots = Array.prototype.slice.call(root.querySelectorAll('.hc-dot'));
  var label = root.querySelector('.hc-label');
  var captions = slides.map(function (s) { return s.getAttribute('data-label') || ''; });
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var i = 0, timer = null;

  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
    dots.forEach(function (d, k) {
      d.classList.toggle('is-active', k === i);
      d.setAttribute('aria-selected', k === i ? 'true' : 'false');
    });
    if (label) label.textContent = captions[i];
  }
  function stop() { if (timer) clearInterval(timer); timer = null; }
  function start() { stop(); if (!reduce) timer = setInterval(function () { show(i + 1); }, 3000); }

  dots.forEach(function (d, k) {
    d.addEventListener('click', function () { show(k); start(); });
  });
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', start);
  show(0);
  start();
})();
