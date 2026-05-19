/* GoPotty Theme JS */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ===== Sticky header shadow ===== */
    var header = document.querySelector('[data-header]');
    if (header) {
      var onScroll = function () {
        if (window.scrollY > 10) header.classList.add('is-scrolled');
        else header.classList.remove('is-scrolled');
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* ===== Mobile drawer ===== */
    var openBtn = document.querySelector('[data-open-menu]');
    var closeBtn = document.querySelector('[data-close-menu]');
    var drawer = document.querySelector('.mobile-drawer');
    if (openBtn && drawer) {
      openBtn.addEventListener('click', function () {
        drawer.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    }
    if (closeBtn && drawer) {
      closeBtn.addEventListener('click', function () {
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    }

    /* ===== Announcement bar — rotating messages ===== */
    var rotator = document.querySelector('.announcement-bar__rotate');
    if (rotator) {
      var slides = rotator.querySelectorAll('.announcement-bar__slide');
      if (slides.length > 1) {
        var interval = parseInt(rotator.dataset.rotateInterval, 10) || 4000;
        var current = 0;
        setInterval(function () {
          slides[current].classList.remove('is-active');
          current = (current + 1) % slides.length;
          slides[current].classList.add('is-active');
        }, interval);
      }
    }

    /* ===== FAQ accordion ===== */
    document.querySelectorAll('.faq-item__question').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.faq-item');
        var isOpen = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    });

    /* ===== Variant picker ===== */
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

    /* ===== Quantity input ===== */
    document.querySelectorAll('[data-quantity]').forEach(function (wrap) {
      var input = wrap.querySelector('input');
      var minus = wrap.querySelector('[data-qty-minus]');
      var plus = wrap.querySelector('[data-qty-plus]');
      if (minus) minus.addEventListener('click', function () {
        input.value = Math.max(1, parseInt(input.value, 10) - 1);
      });
      if (plus) plus.addEventListener('click', function () {
        input.value = parseInt(input.value, 10) + 1;
      });
    });

    /* ===== Product thumbnails ===== */
    var mainImg = document.querySelector('[data-main-image]');
    document.querySelectorAll('[data-thumb]').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        document.querySelectorAll('[data-thumb]').forEach(function (t) { t.classList.remove('is-active'); });
        thumb.classList.add('is-active');
        var src = thumb.dataset.fullsrc;
        if (mainImg && src) mainImg.src = src;
      });
    });

    /* ===== Scroll reveal ===== */
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

    /* ===== Newsletter popup ===== */
    var popup = document.querySelector('[data-popup]');
    if (popup) {
      var STORAGE_KEY = 'gopotty_popup_dismissed';
      var dismissed = false;
      try { dismissed = localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) {}

      var openPopup = function () {
        if (dismissed) return;
        popup.classList.add('is-open');
        popup.setAttribute('aria-hidden', 'false');
        document.body.classList.add('popup-open');
      };

      var closePopup = function () {
        popup.classList.remove('is-open');
        popup.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('popup-open');
        dismissed = true;
        try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
      };

      // Open if form was just submitted successfully
      if (popup.querySelector('.popup__success')) {
        openPopup();
      } else {
        var trigger = popup.dataset.popupTrigger || 'delay';
        var delay = parseInt(popup.dataset.popupDelay, 10) || 8000;

        // Delay trigger
        setTimeout(openPopup, delay);

        // Exit-intent trigger
        if (trigger === 'exit') {
          var exitArmed = false;
          setTimeout(function () { exitArmed = true; }, 3000);
          document.addEventListener('mouseleave', function (e) {
            if (exitArmed && !dismissed && e.clientY < 10) {
              openPopup();
            }
          });
        }

        // Scroll trigger
        if (trigger === 'scroll') {
          var scrollHandler = function () {
            var scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            if (scrolled > 0.5 && !dismissed) {
              openPopup();
              window.removeEventListener('scroll', scrollHandler);
            }
          };
          window.addEventListener('scroll', scrollHandler, { passive: true });
        }
      }

      popup.querySelectorAll('[data-popup-close]').forEach(function (el) {
        el.addEventListener('click', closePopup);
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && popup.classList.contains('is-open')) closePopup();
      });
    }

  });
})();
