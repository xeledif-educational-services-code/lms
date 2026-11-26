/* ============================================================
   XELEDIF HINT RETURN — "Back to question" button (M4)
   -----------------------------------------------------------------
   When a pupil clicks the "Go to example ↓" link in the Practice
   Zone Hint, pool-ui.js scrolls the page up to the lesson example.
   The pupil reads it, then needs to get back to the practice
   question they were on. This script adds a "↓ Back to question"
   button that appears ONLY after a Hint click, and takes them
   straight back to the current .pz-card.

   Design notes
   - The button is Hint-triggered (Option 2): it never appears
     from a manual scroll.
   - The detection is done by event delegation on document, so
     pool-ui.js is not modified. The Hint keeps working exactly
     as it does today.
   - The existing "↑ Top" button is untouched; they coexist.
   - If the pupil scrolls back to the Practice Zone on their own,
     the button hides automatically (it has served its purpose).
   - Zero Firestore reads/writes.
   ============================================================ */
(function () {
  'use strict';

  // Guard against double-injection if the script is loaded twice.
  if (window.__xeledifHintReturnLoaded) return;
  window.__xeledifHintReturnLoaded = true;

  const BTN_ID = 'back-to-practice';
  const HINT_LINK_SELECTOR = '.pz-hint-jump';       // from pool-ui.js
  const PZ_ROOT_SELECTOR   = '#pz-root';
  const PZ_CARD_SELECTOR   = '#pz-root .pz-card';
  const AUTO_HIDE_MS       = 60000;                  // hide after 60s of inactivity

  let autoHideTimer = null;

  function getBtn() {
    let btn = document.getElementById(BTN_ID);
    if (btn) return btn;

    // Fallback: create it if the HTML tag hasn't been added yet.
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
    if (autoHideTimer) clearTimeout(autoHideTimer);
    autoHideTimer = setTimeout(hideBtn, AUTO_HIDE_MS);
  }

  function hideBtn() {
    const btn = getBtn();
    btn.classList.remove('show');
    if (autoHideTimer) { clearTimeout(autoHideTimer); autoHideTimer = null; }
  }

  /* Scroll to the current Practice Zone question card (the one the
     pupil was on when they clicked the Hint). Smooth scroll with a
     brief flash so the eye lands on it. */
  function scrollBackToQuestion() {
    const card = document.querySelector(PZ_CARD_SELECTOR);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.style.transition = 'box-shadow .6s';
      card.style.boxShadow = '0 0 0 3px #FCD34D';
      setTimeout(() => { card.style.boxShadow = ''; }, 1400);
    } else {
      // Fallback: at least go to the Practice Zone panel.
      const root = document.querySelector(PZ_ROOT_SELECTOR);
      if (root) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    hideBtn();
  }

  /* Auto-hide when the pupil gets back to the Practice Zone on
     their own (e.g. by scrolling down). We define "back" as the
     top of the Practice Zone card being within 120px of the
     viewport's bottom edge — i.e. the card is visible. */
  function onScroll() {
    const btn = document.getElementById(BTN_ID);
    if (!btn || !btn.classList.contains('show')) return;

    const card = document.querySelector(PZ_CARD_SELECTOR);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const visible = rect.top < window.innerHeight - 120;
    if (visible) hideBtn();
  }

  // Event delegation: catches the Hint click regardless of when
  // the Practice Zone is mounted or re-mounted.
  document.addEventListener('click', function (e) {
    const t = e.target;
    if (!t || !t.closest) return;
    if (t.closest(HINT_LINK_SELECTOR)) {
      // Small delay so pool-ui.js's own smooth scroll starts first,
      // then we show the return button.
      setTimeout(showBtn, 60);
    }
  }, true);   // capture phase, so we run even if the link's own handler stops propagation

  // Reveal / hide on scroll.
  window.addEventListener('scroll', onScroll, { passive: true });

  // Click handler for the button itself.
  document.addEventListener('click', function (e) {
    const t = e.target;
    if (!t || !t.closest) return;
    if (t.closest('#' + BTN_ID)) {
      e.preventDefault();
      scrollBackToQuestion();
    }
  });

  // If the pupil changes step / starts a new question while the
  // button is showing, hide it — the destination has changed.
  window.addEventListener('hashchange', hideBtn);
  document.addEventListener('click', function (e) {
    const t = e.target;
    if (!t || !t.closest) return;
    // A step-tab click means a new question set — hide the button.
    if (t.closest('.step-tab')) hideBtn();
  }, true);
})();