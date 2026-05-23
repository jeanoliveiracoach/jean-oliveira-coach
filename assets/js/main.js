/**
 * Jean Oliveira Coach — main.js
 * v2.0 — Vanilla JS, zero dependencies.
 *
 * Features:
 *  1. Scroll-aware navigation (adds .is-scrolled class)
 *  2. IntersectionObserver reveal animations
 *  3. Drag/scroll carousel with auto-advance + pause on interaction
 *  4. prefers-reduced-motion respected throughout
 */

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────────────────────────────────────────────────────────
     1. SCROLL-AWARE NAVIGATION
  ───────────────────────────────────────────────────────────── */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    let ticking = false;

    const update = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 40);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* ─────────────────────────────────────────────────────────────
     2. REVEAL ON SCROLL (IntersectionObserver)
  ───────────────────────────────────────────────────────────── */
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ─────────────────────────────────────────────────────────────
     3. CAROUSEL — drag/scroll + optional auto-advance
  ───────────────────────────────────────────────────────────── */
  function initTrack(track) {
    if (!track) return;

    let isDragging = false;
    let startX = 0;
    let startScroll = 0;
    let autoTimer = null;
    let userInteracted = false;
    const AUTO_INTERVAL = 4200;
    const AUTO_STEP = 280;

    const startAuto = () => {
      if (reduceMotion || userInteracted) return;
      stopAuto();
      autoTimer = window.setInterval(() => {
        if (userInteracted) return;
        const max = track.scrollWidth - track.clientWidth - 4;
        if (track.scrollLeft >= max) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: AUTO_STEP, behavior: 'smooth' });
        }
      }, AUTO_INTERVAL);
    };

    const stopAuto = () => {
      if (autoTimer) {
        window.clearInterval(autoTimer);
        autoTimer = null;
      }
    };

    const pauseAuto = () => {
      userInteracted = true;
      stopAuto();
    };

    // Mouse drag
    track.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
      startScroll = track.scrollLeft;
      track.classList.add('is-dragging');
      pauseAuto();
    });

    document.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('is-dragging');
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      track.scrollLeft = startScroll - (e.pageX - startX);
    });

    track.addEventListener('mouseleave', () => {
      if (isDragging) {
        isDragging = false;
        track.classList.remove('is-dragging');
      }
    });

    // Touch
    track.addEventListener('touchstart', () => { pauseAuto(); }, { passive: true });

    // Wheel / keyboard
    track.addEventListener('wheel', pauseAuto, { passive: true });
    track.addEventListener('scroll', () => {
      if (!autoTimer && !userInteracted) return;
    }, { passive: true });

    // Pause when out of viewport (performance)
    if ('IntersectionObserver' in window) {
      const visObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!userInteracted) startAuto();
            } else {
              stopAuto();
            }
          });
        },
        { threshold: 0.2 }
      );
      visObserver.observe(track);
    } else {
      startAuto();
    }
  }

  function initCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(initTrack);
  }

  /* ─────────────────────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────────────────────── */
  function init() {
    initNav();
    initReveal();
    initCarousels();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
