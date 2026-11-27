/* ============================================================
   XELEDIF SUMMARIES SYNC — index-page score widget backend (M3)
   -----------------------------------------------------------------
   Maintains ONE Firestore document per pupil at summaries/{uid}
   holding:
     - cumulative: { questionsAnswered, firstTryCorrect, pct, firstAttemptAt }
     - current:    { year, month, questionsAnswered, firstTryCorrect, pct }
     - lastActiveAt, lastUpdated, schemaVersion

   Write cadence:
     - Once per Practice Zone session end (hook into pool-sync.js).
     - Once per exercise finish (hook into MCQTracker's requestFinish).
     - Debounced: no write within 30 seconds of the previous one.
     - Skipped if the numbers haven't changed since the last write.

   Read cadence:
     - Once on index.html load. 1 Firestore read.
     - Result cached in localStorage so a refresh within 5 minutes
       shows the cached value instantly while the live fetch runs.

   Cost: ~1 extra write per session, 1 extra read per page load.
   Net saving vs. the old "pull all attempts" approach: substantial.

   Zero changes to pool-sync.js, pool-engine.js, pool-ui.js, or the
   answer-by-answer write path. This file only observes completed
   sessions/exercises and updates the summary document.
   ============================================================ */
(function () {
  'use strict';

  if (window.__xeledifSummariesSyncLoaded) return;
  window.__xeledifSummariesSyncLoaded = true;

  const SUMMARY_COLLECTION = 'summaries';
  const CACHE_KEY = 'xeledif.summary.cache';
  const CACHE_TTL_MS = 5 * 60 * 1000;     // 5 minutes
  const DEBOUNCE_MS = 30 * 1000;           // 30 seconds between writes
  const SCHEMA_VERSION = 1;

  let lastWriteAt = 0;
  let lastWrittenSignature = null;
  let writeScheduled = null;

  // ── Helpers ────────────────────────────────────────────────
  function fb() {
    try {
      return (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length)
        ? firebase : null;
    } catch (e) { return null; }
  }
  function db() { const f = fb(); return f ? f.firestore() : null; }
  function user() { const f = fb(); return f ? f.auth().currentUser : null; }

  function monthKeyOf(iso) {
    if (!iso) return null;
    const d = new Date(iso);
    if (isNaN(d)) return null;
    return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0');
  }

  // ── Compute the two aggregate numbers from LOCAL attempt cache ──
  // We only read from the local cache (already populated by
  // cloudSubscribeMy / cloudWriteAttempt). No extra Firestore reads.
  function computeSummary(uid, email) {
    let all = {};
    try { all = JSON.parse(localStorage.getItem('xeledif.progress.v2') || '{}'); }
    catch (e) { all = {}; }

    let totalQ = 0, totalFT = 0;
    let firstAttemptAt = null;
    let latestAttemptAt = null;
    let currentMonth = null;

    Object.values(all).forEach(rec => {
      if (!rec || !rec.pupilUid || rec.pupilUid !== uid) return;
      const ex = Object.values(rec.exercises || {});
      totalQ  += ex.length;
      totalFT += ex.filter(e => e.firstTry === true).length;
      const ts = rec.startedAt || rec.updatedAt;
      if (ts) {
        if (!firstAttemptAt || ts < firstAttemptAt) firstAttemptAt = ts;
        if (!latestAttemptAt || ts > latestAttemptAt) latestAttemptAt = ts;
        const mk = monthKeyOf(ts);
        if (mk && (!currentMonth || ts > currentMonth.ts)) {
          currentMonth = { key: mk, ts };
        }
      }
    });

    // Current period totals = all attempts whose month matches the latest.
    let curQ = 0, curFT = 0;
    if (currentMonth) {
      Object.values(all).forEach(rec => {
        if (!rec || !rec.pupilUid || rec.pupilUid !== uid) return;
        const ts = rec.startedAt || rec.updatedAt;
        if (!ts) return;
        if (monthKeyOf(ts) !== currentMonth.key) return;
        const ex = Object.values(rec.exercises || {});
        curQ  += ex.length;
        curFT += ex.filter(e => e.firstTry === true).length;
      });
    }

    return {
      uid,
      email: email || '',
      cumulative: {
        questionsAnswered: totalQ,
        firstTryCorrect:   totalFT,
        pct:               totalQ ? Math.round(100 * totalFT / totalQ) : 0,
        firstAttemptAt:    firstAttemptAt || null
      },
      current: currentMonth ? {
        year:  Number(currentMonth.key.slice(0, 4)),
        month: Number(currentMonth.key.slice(5, 7)),
        questionsAnswered: curQ,
        firstTryCorrect:   curFT,
        pct:               curQ ? Math.round(100 * curFT / curQ) : 0
      } : null,
      lastActiveAt: latestAttemptAt || null,
      lastUpdated:  new Date().toISOString(),
      schemaVersion: SCHEMA_VERSION
    };
  }

  // ── Signature for debounce: skip write if nothing meaningful changed ──
  function signature(summary) {
    return [
      summary.cumulative.questionsAnswered,
      summary.cumulative.firstTryCorrect,
      summary.current ? summary.current.questionsAnswered : 0,
      summary.current ? summary.current.firstTryCorrect : 0
    ].join('|');
  }

  // ── Write (debounced) ──────────────────────────────────────
  function scheduleWrite() {
    const u = user();
    const d = db();
    if (!u || !d) return;
    if (writeScheduled) return;                       // already queued
    const now = Date.now();
    const wait = Math.max(0, DEBOUNCE_MS - (now - lastWriteAt));
    writeScheduled = setTimeout(() => {
      writeScheduled = null;
      const summary = computeSummary(u.uid, u.email);
      const sig = signature(summary);
      if (sig === lastWrittenSignature) return;       // no change
      lastWrittenSignature = sig;
      lastWriteAt = Date.now();
      d.collection(SUMMARY_COLLECTION).doc(u.uid).set(summary, { merge: true })
        .then(() => {
          try { localStorage.setItem(CACHE_KEY, JSON.stringify({
            at: Date.now(), summary
          })); } catch (e) {}
        })
        .catch(err => console.warn('[summaries-sync] write failed:', err && err.message));
    }, wait);
  }

  // ── Force a synchronous write (bypasses debounce) ──────────
  // Used when the pupil finishes an exercise (MCQTracker.requestFinish)
  // or completes a Practice Zone session. We want the widget to
  // reflect the new numbers next time the page loads.
  function forceWrite() {
    const u = user();
    const d = db();
    if (!u || !d) return;
    if (writeScheduled) { clearTimeout(writeScheduled); writeScheduled = null; }
    const summary = computeSummary(u.uid, u.email);
    const sig = signature(summary);
    if (sig === lastWrittenSignature) return;         // no change
    lastWrittenSignature = sig;
    lastWriteAt = Date.now();
    d.collection(SUMMARY_COLLECTION).doc(u.uid).set(summary, { merge: true })
      .then(() => {
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({
          at: Date.now(), summary
        })); } catch (e) {}
      })
      .catch(err => console.warn('[summaries-sync] forceWrite failed:', err && err.message));
  }

  // ── Hook into pool-sync.js's onSessionEnd (no edits to that file) ──
  // pool-sync.js does `PZ.hooks.onSessionEnd = function (info) { … }`
  // — a direct assignment. We wrap it so our hook runs first, then
  // theirs. Same for onAnswer (for live feedback during a session,
  // but debounced — so no extra writes mid-session).
  function wrapHooks() {
    if (!window.PracticeZone || !window.PracticeZone.hooks) return false;
    const H = window.PracticeZone.hooks;

    // Wrap onSessionEnd: run ours first, then the existing one.
    const prevEnd = H.onSessionEnd;
    H.onSessionEnd = function (info) {
      try { forceWrite(); } catch (e) { console.warn('[summaries-sync] onSessionEnd:', e); }
      if (typeof prevEnd === 'function') return prevEnd.apply(this, arguments);
    };

    // Also wrap MCQTracker.requestFinish (exercise finished).
    if (window.MCQTracker && typeof window.MCQTracker.requestFinish === 'function') {
      const prevFinish = window.MCQTracker.requestFinish;
      window.MCQTracker.requestFinish = function () {
        // Run the original first (so completeAttempt persists), then write.
        let result;
        try { result = prevFinish.apply(this, arguments); }
        finally { setTimeout(forceWrite, 200); }   // small delay so completeAttempt lands
        return result;
      };
    }
    return true;
  }

  // Retry wrapHooks until pool-ui.js has exposed PracticeZone.
  // (Timing varies depending on script load order.)
  let wrapAttempts = 0;
  (function tryWrap() {
    if (wrapHooks()) return;
    if (++wrapAttempts > 20) { console.warn('[summaries-sync] gave up waiting for PracticeZone'); return; }
    setTimeout(tryWrap, 250);
  })();

  // ── Public API for the widget ──────────────────────────────
  window.XeledifSummary = {
    // Returns { at, summary } from cache, or null if no cache.
    cached() {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const c = JSON.parse(raw);
        if (!c || !c.summary) return null;
        return c;
      } catch (e) { return null; }
    },

    // Fetch fresh from Firestore (1 read). Resolves with { summary } or null.
    fetch() {
      const u = user();
      const d = db();
      if (!u || !d) return Promise.resolve(null);
      return d.collection(SUMMARY_COLLECTION).doc(u.uid).get()
        .then(snap => {
          if (!snap.exists) return null;
          const summary = snap.data();
          try { localStorage.setItem(CACHE_KEY, JSON.stringify({
            at: Date.now(), summary
          })); } catch (e) {}
          return { at: Date.now(), summary };
        })
        .catch(err => {
          console.warn('[summaries-sync] fetch failed:', err && err.message);
          return null;
        });
    },

    // Force a recompute + write (used by the widget's refresh button, if any).
    refresh() { forceWrite(); return Promise.resolve(); },

    // Exposed for debugging.
    _compute: () => { const u = user(); return u ? computeSummary(u.uid, u.email) : null; }
  };

  console.log('[summaries-sync] loaded');
})();