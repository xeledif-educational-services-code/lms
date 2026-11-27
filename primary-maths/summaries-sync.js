/* ============================================================
   XELEDIF SUMMARIES SYNC — index-page score widget backend (M3)
   Maintains ONE Firestore document per pupil at summaries/{uid}
   with cumulative + current aggregates. Debounced writes.
   ============================================================ */
(function () {
  'use strict';

  if (window.__xeledifSummariesSyncLoaded) return;
  window.__xeledifSummariesSyncLoaded = true;

  const SUMMARY_COLLECTION = 'summaries';
  const CACHE_KEY = 'xeledif.summary.cache';
  const CACHE_TTL_MS = 5 * 60 * 1000;
  const DEBOUNCE_MS = 30 * 1000;
  const SCHEMA_VERSION = 1;

  let lastWriteAt = 0;
  let lastWrittenSignature = null;
  let writeScheduled = null;

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

  function signature(summary) {
    return [
      summary.cumulative.questionsAnswered,
      summary.cumulative.firstTryCorrect,
      summary.current ? summary.current.questionsAnswered : 0,
      summary.current ? summary.current.firstTryCorrect : 0
    ].join('|');
  }

  function scheduleWrite() {
    const u = user();
    const d = db();
    if (!u || !d) return;
    if (writeScheduled) return;
    const now = Date.now();
    const wait = Math.max(0, DEBOUNCE_MS - (now - lastWriteAt));
    writeScheduled = setTimeout(() => {
      writeScheduled = null;
      const summary = computeSummary(u.uid, u.email);
      const sig = signature(summary);
      if (sig === lastWrittenSignature) return;
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

  function forceWrite() {
    const u = user();
    const d = db();
    if (!u || !d) return;
    if (writeScheduled) { clearTimeout(writeScheduled); writeScheduled = null; }
    const summary = computeSummary(u.uid, u.email);
    const sig = signature(summary);
    if (sig === lastWrittenSignature) return;
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

  function wrapHooks() {
    if (!window.PracticeZone || !window.PracticeZone.hooks) return false;
    const H = window.PracticeZone.hooks;

    const prevEnd = H.onSessionEnd;
    H.onSessionEnd = function (info) {
      try { forceWrite(); } catch (e) { console.warn('[summaries-sync] onSessionEnd:', e); }
      if (typeof prevEnd === 'function') return prevEnd.apply(this, arguments);
    };

    if (window.MCQTracker && typeof window.MCQTracker.requestFinish === 'function') {
      const prevFinish = window.MCQTracker.requestFinish;
      window.MCQTracker.requestFinish = function () {
        let result;
        try { result = prevFinish.apply(this, arguments); }
        finally { setTimeout(forceWrite, 200); }
        return result;
      };
    }
    return true;
  }

  let wrapAttempts = 0;
  (function tryWrap() {
    if (wrapHooks()) return;
    if (++wrapAttempts > 20) { console.warn('[summaries-sync] gave up waiting for PracticeZone'); return; }
    setTimeout(tryWrap, 250);
  })();

  window.XeledifSummary = {
    cached() {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const c = JSON.parse(raw);
        if (!c || !c.summary) return null;
        return c;
      } catch (e) { return null; }
    },

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

    refresh() { forceWrite(); return Promise.resolve(); },

    _compute: () => { const u = user(); return u ? computeSummary(u.uid, u.email) : null; }
  };

  console.log('[summaries-sync] loaded');
})();