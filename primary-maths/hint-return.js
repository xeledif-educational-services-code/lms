/* ============================================================
   XELEDIF HINT RETURN — "Back to question" button (M4)
   Single owner of the #back-to-practice button's behaviour.
   ============================================================ */
(function () {
  'use strict';

  // Guard: if this file somehow loads twice, don't attach listeners twice.
  if (window.__xeledifHintReturnLoaded) return;
  window.__xeledifHintReturnLoaded = true;

  const BTN_ID = 'back-to-practice';
  const PZ_CARD_SELECTOR = '#pz-root .pz-card';
  const AUTO_HIDE_MS = 60000;   // safety net: pill disappears after 60 s

  let autoHideTimer = null;

  // WHY "armed": right after the Hint click the question card is STILL on
  // screen, so a naive "card visible → hide" check kills the pill instantly.
  // We only start watching for the pupil's return once the card has first
  // left the screen.
  let armed = false;

  // Returns the pill, creating it if the HTML doesn't already contain one.
  function getBtn() {
    let btn = document.getElementById(BTN_ID);
    if (btn) return btn;
    btn = document.createElement('button');
    btn.id = BTN_ID;
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Back to the practice question');
    btn.textContent = '↓ Back to question';
    document.body.appendChild(btn);
    return btn;
  }

  function showBtn() {
    const btn = getBtn();
    btn.classList.add('show');
    armed = false;                              // restart the "card has left?" check
    if (autoHideTimer) clearTimeout(autoHideTimer);
    autoHideTimer = setTimeout(hideBtn, AUTO_HIDE_MS);
  }

  function hideBtn() {
    const btn = document.getElementById(BTN_ID);
    if (btn) btn.classList.remove('show');
    armed = false;
    if (autoHideTimer) { clearTimeout(autoHideTimer); autoHideTimer = null; }
  }

  // Smoothly scroll back to the question, flash a highlight, hide the pill.
  function scrollBackToQuestion() {
    const card = document.querySelector(PZ_CARD_SELECTOR);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.style.transition = 'box-shadow .6s';
      card.style.boxShadow = '0 0 0 3px #FCD34D';
      setTimeout(() => { card.style.boxShadow = ''; }, 1400);
    } else {
      const root = document.querySelector('#pz-root');   // fallback if no card
      if (root) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    hideBtn();
  }

  // Two-phase auto-hide (test steps 4 and 5).
  function onScroll() {
    const btn = document.getElementById(BTN_ID);
    if (!btn || !btn.classList.contains('show')) return;   // nothing to manage
    const card = document.querySelector(PZ_CARD_SELECTOR);
    if (!card) return;

    // "Out of view" = the card's top edge is below the screen bottom
    // (minus a 120px margin).
    const cardOutOfView =
      card.getBoundingClientRect().top >= window.innerHeight - 120;

    if (!armed) {
      if (cardOutOfView) armed = true;   // phase 1: wait for the card to leave
      return;
    }
    if (!cardOutOfView) hideBtn();       // phase 2: pupil is back at the card
  }

  // Hint link clicked → show the pill. Capture phase so it fires first.
  document.addEventListener('click', function (e) {
    const t = e.target;
    if (!t || !t.closest) return;
    if (t.closest('.pz-hint-jump')) showBtn();
  }, true);

  // Pill clicked → go back to the question.
  document.addEventListener('click', function (e) {
    const t = e.target;
    if (!t || !t.closest) return;
    if (t.closest('#' + BTN_ID)) {
      e.preventDefault();
      scrollBackToQuestion();
    }
  });

  // passive:true tells the browser we never call preventDefault() here,
  // so scrolling stays smooth.
  window.addEventListener('scroll', onScroll, { passive: true });

  // Step tab clicked or hash changed → new content, so hide the pill (step 6).
  window.addEventListener('hashchange', hideBtn);
  document.addEventListener('click', function (e) {
    const t = e.target;
    if (t && t.closest && t.closest('.step-tab')) hideBtn();
  }, true);
})();