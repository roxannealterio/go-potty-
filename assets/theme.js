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


    /* ===== Cart upsell ajax add ===== */
    document.querySelectorAll('.cart-upsell__add-form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('button');
        var originalText = btn.innerHTML;
        btn.innerHTML = 'ADDING…';
        btn.disabled = true;

        var formData = new FormData(form);
        fetch('/cart/add.js', {
          method: 'POST',
          body: formData
        })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          btn.innerHTML = '✓ ADDED';
          setTimeout(function () { window.location.reload(); }, 600);
        })
        .catch(function () {
          btn.innerHTML = originalText;
          btn.disabled = false;
          alert('Sorry, we couldn\'t add that to your cart. Please try again.');
        });
      });
    });


    /* ===== Social proof / live purchase notifications ===== */
    var socialProofEl = document.querySelector('[data-social-proof]');
    var config = window.GoPottySocialProof;
    if (socialProofEl && config && config.enabled && config.names && config.names.length > 0) {
      var nameEl = socialProofEl.querySelector('[data-sp-name]');
      var actionEl = socialProofEl.querySelector('[data-sp-action]');
      var productEl = socialProofEl.querySelector('[data-sp-product]');
      var timeEl = socialProofEl.querySelector('[data-sp-time]');
      var avatarEl = socialProofEl.querySelector('[data-sp-avatar]');
      var closeBtn = socialProofEl.querySelector('[data-sp-close]');

      var actions = ['just purchased', 'from', 'just ordered'];
      var dismissed = false;
      var currentTimer = null;
      var orderIdx = Math.floor(Math.random() * config.names.length);

      function getInitials(name) {
        return name.split(' ').map(function(p){ return p.charAt(0); }).join('').toUpperCase().substring(0, 2);
      }

      function showOne() {
        if (dismissed) return;
        var person = config.names[orderIdx % config.names.length];
        orderIdx++;

        nameEl.textContent = person.name + ' from ' + person.city;
        actionEl.textContent = 'just purchased';
        productEl.textContent = person.product;
        timeEl.textContent = person.time;
        avatarEl.textContent = getInitials(person.name);
        avatarEl.className = 'social-proof__avatar color-' + (person.color || 'teal');

        socialProofEl.classList.remove('is-hiding');
        socialProofEl.classList.add('is-visible');

        currentTimer = setTimeout(function () {
          socialProofEl.classList.add('is-hiding');
          socialProofEl.classList.remove('is-visible');
        }, config.duration * 1000);
      }

      function scheduleNext() {
        if (dismissed) return;
        setTimeout(function () {
          showOne();
          setTimeout(scheduleNext, (config.duration + 1) * 1000);
        }, (config.interval - config.duration) * 1000);
      }

      closeBtn.addEventListener('click', function () {
        dismissed = true;
        socialProofEl.classList.add('is-hiding');
        socialProofEl.classList.remove('is-visible');
        if (currentTimer) clearTimeout(currentTimer);
      });

      // Initial delay before first notification
      setTimeout(function () {
        if (dismissed) return;
        // Shuffle the array so each visit feels different
        for (var i = config.names.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = config.names[i]; config.names[i] = config.names[j]; config.names[j] = tmp;
        }
        showOne();
        setTimeout(scheduleNext, (config.duration + 1) * 1000);
      }, config.initialDelay * 1000);
    }


    /* ===== Live viewer counter fluctuation ===== */
    var liveBar = document.querySelector('[data-live-bar]');
    if (liveBar) {
      var viewerEl = liveBar.querySelector('[data-viewer-count]');
      var stockEl = liveBar.querySelector('[data-stock-count]');

      // Start with a believable random value between 18-34
      var viewers = 18 + Math.floor(Math.random() * 17);
      viewerEl.textContent = viewers;

      // Sold count starts random between 12-24
      var sold = 12 + Math.floor(Math.random() * 13);
      stockEl.textContent = sold;

      // Fluctuate viewers every 8-15s by ±1 to ±3
      function fluctuate() {
        var change = Math.floor(Math.random() * 3) + 1;
        var direction = Math.random() > 0.5 ? 1 : -1;
        viewers = Math.max(15, Math.min(42, viewers + (change * direction)));
        viewerEl.style.transition = 'opacity .3s';
        viewerEl.style.opacity = '0.4';
        setTimeout(function () {
          viewerEl.textContent = viewers;
          viewerEl.style.opacity = '1';
        }, 300);

        // Occasionally bump the sold count (1 in 4 fluctuations)
        if (Math.random() < 0.25) {
          sold += 1;
          stockEl.textContent = sold;
        }

        setTimeout(fluctuate, 8000 + Math.random() * 7000);
      }
      setTimeout(fluctuate, 8000 + Math.random() * 4000);
    }

  });
})();
