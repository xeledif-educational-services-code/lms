/* ============================================================
   XELEDIF SUMMARIES SYNC — index-page score widget backend (M3)
   SOURCE OF TRUTH: Firestore. The summary is always rebuilt from the
   pupil's documents in `progress`; localStorage only caches the result
   for instant display.
   Writes one document per pupil: summaries/{uid}.
   ============================================================ */
(function () {
  'use strict';

  // WHY: stops a double load from wrapping the hooks twice.
  if (window.__xeledifSummariesSyncLoaded) return;
  window.__xeledifSummariesSyncLoaded = true;

  const SUMMARY_COLLECTION  = 'summaries';
  const PROGRESS_COLLECTION = 'progress';
  const CACHE_PREFIX   = 'xeledif.summary.cache.';  // + uid, so pupils never share a cache
  const CACHE_TTL_MS   = 5 * 60 * 1000;             // display cache freshness
  const MIN_GAP_MS     = 30 * 1000;                 // at most one rebuild per 30 s (protects the free quota)
  const SETTLE_MS      = 800;                       // let the attempt's own cloud write land first
  const SCHEMA_VERSION = 1;                         // must match the Firestore rules' field list

  let timer = null;            // pending debounced rebuild
  let inFlight = null;         // promise of the rebuild currently running
  let dirty = false;           // a rebuild was requested while one was running
  let lastRebuildAt = 0;
  let lastSignature = null;    // fingerprint of the last summary written

  /* ---------- Firebase helpers (return null instead of throwing) ---------- */
  function fb() {
    try {
      return (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length) ? firebase : null;
    } catch (e) { return null; }
  }
  function db()   { const f = fb(); return f ? f.firestore() : null; }
  function user() { const f = fb(); return f ? f.auth().currentUser : null; }

  // Teachers have no pupil data; without this guard the teacher's login
  // would create an empty summary document.
  function isTeacher() {
    return typeof getFirebaseRole === 'function' && getFirebaseRole() === 'teacher';
  }

  /* ---------- Per-user display cache ---------- */
  function writeCache(uid, summary) {
    try { localStorage.setItem(CACHE_PREFIX + uid, JSON.stringify({ at: Date.now(), summary })); }
    catch (e) { /* cache is optional */ }
  }
  function readCache(uid) {
    try {
      const c = JSON.parse(localStorage.getItem(CACHE_PREFIX + uid) || 'null');
      // WHY the uid check: never show another pupil's numbers on a shared device.
      return (c && c.summary && c.summary.uid === uid) ? c : null;
    } catch (e) { return null; }
  }

  /* ---------- Pure calculation (no I/O) ---------- */
  // Same rules as dashboard-consolidate.js so widget and report always agree.
  const isTest = rec => rec.stepId === 'test-step' || String(rec.attemptId || '').startsWith('smoke-test-');
  const tsOf = rec => String(rec.updatedAt || rec.startedAt || '');   // last activity dates the attempt

  function monthKeyOf(iso) {
    if (!iso) return null;
    const d = new Date(iso);
    if (isNaN(d)) return null;
    // UTC keeps the month stable on every device (same as the report).
    return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0');
  }

  function buildSummary(uid, email, recs) {
    const mine = recs.filter(r => r && !isTest(r));

    // Cumulative: every question ever answered.
    let totalQ = 0, totalFT = 0, firstAttemptAt = null;
    // Current: the calendar month of the pupil's LATEST attempt.
    let latestTs = '', currentKey = null;

    mine.forEach(r => {
      const ex = Object.values(r.exercises || {});
      totalQ  += ex.length;
      totalFT += ex.filter(e => e.firstTry === true).length;

      const started = r.startedAt || null;
      if (started && (!firstAttemptAt || started < firstAttemptAt)) firstAttemptAt = started;

      const ts = tsOf(r), mk = monthKeyOf(ts);
      if (mk && ts > latestTs) { latestTs = ts; currentKey = mk; }
    });

    let curQ = 0, curFT = 0;
    if (currentKey) {
      mine.forEach(r => {
        if (monthKeyOf(tsOf(r)) !== currentKey) return;
        const ex = Object.values(r.exercises || {});
        curQ  += ex.length;
        curFT += ex.filter(e => e.firstTry === true).length;
      });
    }

    // WHY exactly these keys: the Firestore rules use keys().hasOnly([...]);
    // any extra field would make the write be rejected.
    return {
      uid,
      email: email || '',
      cumulative: {
        questionsAnswered: totalQ,
        firstTryCorrect:   totalFT,
        pct:               totalQ ? Math.round(100 * totalFT / totalQ) : 0,
        firstAttemptAt
      },
      current: currentKey ? {
        year:  Number(currentKey.slice(0, 4)),
        month: Number(currentKey.slice(5, 7)),
        questionsAnswered: curQ,
        firstTryCorrect:   curFT,
        pct:               curQ ? Math.round(100 * curFT / curQ) : 0
      } : null,
      lastActiveAt: latestTs || null,
      lastUpdated:  new Date().toISOString(),
      schemaVersion: SCHEMA_VERSION
    };
  }

  // Fingerprint of the numbers: identical fingerprint = nothing to write.
  function signature(s) {
    const c = s.current;
    return [s.cumulative.questionsAnswered, s.cumulative.firstTryCorrect,
            c ? c.year + '-' + c.month : '', c ? c.questionsAnswered : 0, c ? c.firstTryCorrect : 0].join('|');
  }

  // Tells the page "fresh numbers are ready", so the widget can redraw without a reload.
  function announce(summary) {
    try { window.dispatchEvent(new CustomEvent('xeledif:summary-updated', { detail: summary })); }
    catch (e) { /* non-fatal */ }
  }

  /* ---------- Rebuild from Firestore, then save ---------- */
  function rebuild() {
    const u = user(), d = db();
    if (!u || !d || isTeacher()) return Promise.resolve(null);

    // WHY: a second request during a running rebuild is remembered, not run
    // in parallel, so two reads never race to write different results.
    if (inFlight) { dirty = true; return inFlight; }

    lastRebuildAt = Date.now();
    inFlight = d.collection(PROGRESS_COLLECTION).where('pupilUid', '==', u.uid).get()
      .then(snap => {
        const recs = [];
        snap.forEach(doc => recs.push(doc.data()));
        return buildSummary(u.uid, u.email, recs);
      })
      .then(summary => {
        const sig = signature(summary);
        if (sig === lastSignature) { writeCache(u.uid, summary); announce(summary); return summary; }
        // set() WITHOUT merge: the document always equals the freshly computed
        // truth, so no stale field can survive.
        return d.collection(SUMMARY_COLLECTION).doc(u.uid).set(summary).then(() => {
          lastSignature = sig;
          writeCache(u.uid, summary);
          announce(summary);
          return summary;
        });
      })
      .catch(err => { console.warn('[summaries-sync] rebuild failed:', err && err.message); return null; })
      .finally(() => {
        inFlight = null;
        if (dirty) { dirty = false; queueRebuild(); }
      });
    return inFlight;
  }

  // Debounced trigger used by the hooks below.
  function queueRebuild(delay) {
    if (timer || isTeacher()) return;
    const wait = Math.max(delay == null ? SETTLE_MS : delay, MIN_GAP_MS - (Date.now() - lastRebuildAt));
    timer = setTimeout(() => { timer = null; rebuild(); }, wait);
  }

  /* ---------- Hooks (installed after the page has fully loaded) ---------- */
  // WHY on "load": PracticeZone and ProgressStore are created by other scripts.
  // ProgressStore is a top-level `const`, so it is not on window; after load
  // the bare name works.
  function installHooks() {
    if (window.PracticeZone && PracticeZone.hooks && !PracticeZone.hooks.__summaryWrapped) {
      const H = PracticeZone.hooks, prev = H.onSessionEnd;
      H.__summaryWrapped = true;
      H.onSessionEnd = function () {
        try { queueRebuild(); } catch (e) { console.warn('[summaries-sync]', e); }
        if (typeof prev === 'function') return prev.apply(this, arguments);   // keep existing behaviour
      };

      // WHY: the 10th solved question completes the session. Don't wait for the
      // pupil to click "See my score"; rebuild as soon as the last answer is in.
      const prevClick = H.onClick;
      H.onClick = function (info) {
        try {
          const S = info.ctx.session;
          if (info.correct && S && S.results.filter(Boolean).length === S.qs.length) queueRebuild();
        } catch (e) { console.warn('[summaries-sync]', e); }
        if (typeof prevClick === 'function') return prevClick.apply(this, arguments);
      };
    } else if (!window.PracticeZone) {
      console.warn('[summaries-sync] PracticeZone not found; practice sessions will not refresh the summary');
    }

    // WHY completeAttempt and not requestFinish: it runs only when an
    // exercise attempt is really finished, not when the pupil cancels the confirm box.
    if (typeof ProgressStore !== 'undefined' && !ProgressStore.__summaryWrapped) {
      ProgressStore.__summaryWrapped = true;
      const prev = ProgressStore.completeAttempt;
      ProgressStore.completeAttempt = function () {
        const result = prev.apply(this, arguments);
        queueRebuild();
        return result;
      };
    }
  }
  window.addEventListener('load', installHooks);

  /* ---------- Public API used by the widget ---------- */
  window.XeledifSummary = {
    // Instant, no network. Only ever returns the signed-in pupil's own cache.
    cached() {
      const u = user();
      return u ? readCache(u.uid) : null;
    },

    // Is the cache fresh enough to skip Firestore?
    isFresh(c) { return !!c && (Date.now() - c.at) < CACHE_TTL_MS; },

    // 1 read of summaries/{uid}; if it doesn't exist yet, build it from
    // `progress` and save it. Resolves to a summary or null.
    load() {
      const u = user(), d = db();
      if (!u || !d || isTeacher()) return Promise.resolve(null);
      return d.collection(SUMMARY_COLLECTION).doc(u.uid).get()
        .then(snap => {
          if (snap.exists) {
            const s = snap.data();
            writeCache(u.uid, s);
            return s;
          }
          return rebuild();
        })
        .catch(err => { console.warn('[summaries-sync] load failed:', err && err.message); return null; });
    },

    // Force a rebuild from Firestore now (useful for testing).
    refresh() { return rebuild(); }
  };

  console.log('[summaries-sync] loaded');
})();