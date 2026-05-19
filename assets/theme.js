/* GoPotty Theme JS */
document.addEventListener('DOMContentLoaded', function () {
  /* Sticky header shadow */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 10) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Mobile drawer */
  var openBtn = document.querySelector('[data-open-menu]');
  var closeBtn = document.querySelector('[data-close-menu]');
  var drawer = document.querySelector('.mobile-drawer');
  if (openBtn && drawer) openBtn.addEventListener('click', function () { drawer.classList.add('is-open'); document.body.style.overflow = 'hidden'; });
  if (closeBtn && drawer) closeBtn.addEventListener('click', function () { drawer.classList.remove('is-open'); document.body.style.overflow = ''; });

  /* FAQ accordion */
  document.querySelectorAll('.faq-item__question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      item.classList.toggle('is-open');
    });
  });

  /* Variant picker */
  document.querySelectorAll('[data-variant-group]').forEach(function (group) {
    group.querySelectorAll('.variant-option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        group.querySelectorAll('.variant-option').forEach(function (o) { o.classList.remove('is-active'); });
        opt.classList.add('is-active');
        var variantId = opt.dataset.variantId;
        var input = document.querySelector('[data-variant-input]');
        if (input && variantId) input.value = variantId;
      });
    });
  });

  /* Quantity input */
  document.querySelectorAll('[data-quantity]').forEach(function (wrap) {
    var input = wrap.querySelector('input');
    var minus = wrap.querySelector('[data-qty-minus]');
    var plus = wrap.querySelector('[data-qty-plus]');
    if (minus) minus.addEventListener('click', function () {
      var v = Math.max(1, parseInt(input.value, 10) - 1);
      input.value = v;
    });
    if (plus) plus.addEventListener('click', function () {
      input.value = parseInt(input.value, 10) + 1;
    });
  });

  /* Product thumbnails */
  var mainImg = document.querySelector('[data-main-image]');
  document.querySelectorAll('[data-thumb]').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      document.querySelectorAll('[data-thumb]').forEach(function (t) { t.classList.remove('is-active'); });
      thumb.classList.add('is-active');
      var src = thumb.dataset.fullsrc;
      if (mainImg && src) mainImg.src = src;
    });
  });

  /* Scroll reveal */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
  }
});
