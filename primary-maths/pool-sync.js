/* ============================================================
   XELEDIF POOL SYNC — Firestore, saved after EVERY answer (step 3 of 4)
   Place NEXT TO index.html (primary-maths\pool-sync.js).
   Load AFTER pool-engine.js and pool-ui.js (and after the Firebase scripts).

   Writes (2 small writes per answered question, plus 1 per wrong click):
     questionHistory/<uid>_<stepKey>   what the pupil has seen + per-concept summary
     progress/<attemptId>              one record per Practice session, read LIVE by
                                       your existing dashboard (stepId ends in "-practice")
   Firestore is the source of truth. localStorage is only a cache, so wiping the
   browser loses nothing: the history is loaded back from Firestore.
   If not signed in or Firebase is missing, everything quietly stays local.
   ============================================================ */
(function () {
  'use strict';
  const PZ = window.PracticeZone, E = window.PoolEngine;
  if (!PZ || !E) { console.warn('pool-sync.js: load pool-engine.js and pool-ui.js first'); return; }

  const local = PZ.store;                       // localStorage store from pool-ui.js

  /* ---------- Firebase access (works with the compat SDK already on your pages) ---------- */
  const fb   = () => (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length) ? firebase : null;
  const user = () => { try { const f = fb(); return f ? f.auth().currentUser : null; } catch (e) { return null; } };
  const db   = () => { try { const f = fb(); return f ? f.firestore() : null; } catch (e) { return null; } };
  const stamp = () => fb().firestore.FieldValue.serverTimestamp();
  const withTimeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);
  const ready = () => (typeof waitForRole === 'function') ? withTimeout(waitForRole(), 4000).catch(() => null) : Promise.resolve();
  function pupilName() {
    try { return localStorage.getItem('xeledif.pupil') || (user() && user().email) || 'Unknown'; } catch (e) { return 'Unknown'; }
  }

  /* ---------- question-ID shortening (smaller documents; Firestore-safe keys) ---------- */
  const short = (stepKey, id) => id.indexOf(stepKey + '.') === 0 ? id.slice(stepKey.length + 1) : id;
  const full  = (stepKey, k)  => k.indexOf('.') >= 0 ? k : stepKey + '.' + k;

  function toDoc(stepKey, h, data) {
    const seen = {};
    Object.keys(h.seen || {}).forEach(id => { seen[short(stepKey, id)] = h.seen[id]; });
    const stats = data ? E.conceptStats(data, h) : {};
    const summary = Object.keys(stats).map(k => {
      const c = stats[k];
      return { c: c.concept, a: c.attempts, f: c.firstTryCorrect, w: c.wrong, d: c.distinct, s: c.status };
    });
    return {
      pupilUid: user().uid, pupil: pupilName(), stepKey,
      cycle: h.cycle || 1, sessions: h.sessions || 0,
      inCycle: (h.inCycle || []).map(id => short(stepKey, id)),
      seen, summary,
      updatedAtIso: h.updatedAt || null,
      updatedAt: stamp()
    };
  }
  function fromDoc(stepKey, d) {
    const seen = {};
    Object.keys(d.seen || {}).forEach(k => { seen[full(stepKey, k)] = d.seen[k]; });
    return {
      pupilUid: d.pupilUid, stepKey, cycle: d.cycle || 1, sessions: d.sessions || 0,
      inCycle: (d.inCycle || []).map(k => full(stepKey, k)), seen, updatedAt: d.updatedAtIso || null
    };
  }

  /* ---------- the history store used by the Practice Zone ---------- */
  PZ.store = {
    load(stepKey) {
      return ready().then(() => {
        const u = user(), d = u ? db() : null;
        if (!u || !d) return local.load(stepKey);
        return Promise.all([
          withTimeout(d.collection('questionHistory').doc(u.uid + '_' + stepKey).get(), 6000)
            .then(snap => snap.exists ? fromDoc(stepKey, snap.data()) : null).catch(() => null),
          local.load(stepKey)
        ]).then(([remote, cached]) => {
          if (remote && cached) return (cached.updatedAt || '') > (remote.updatedAt || '') ? cached : remote;  // newest wins
          return remote || cached || null;
        });
      });
    },
    save(stepKey, history, data) {
      local.save(stepKey, history).catch(() => {});               // always keep the local cache fresh
      const u = user(), d = u ? db() : null;
      if (!u || !d) return Promise.resolve();                     // local only
      return d.collection('questionHistory').doc(u.uid + '_' + stepKey).set(toDoc(stepKey, history, data));
    }
  };

  /* ---------- live session record (your dashboard already reads the "progress" collection) ---------- */
  function qNum(id) { return parseInt(id.slice(-4), 10); }

  function buildAttempt(ctx, current, completed) {
    const S = ctx.session, u = user(), meta = S.meta || {};
    const ex = {}; let correct = 0, wrong = 0, ftc = 0, answered = 0;
    S.results.forEach(r => {
      if (!r) return;
      ex[qNum(r.id)] = { correct: 1, wrong: r.wrong, firstTry: r.firstTry, timeOnTaskMs: r.ms, concept: r.concept, qid: r.id };
      correct += 1; wrong += r.wrong; answered += 1; if (r.firstTry) ftc += 1;
    });
    if (current && !S.results[S.i] && S.wrong > 0) {            // a question with wrong clicks, not solved yet
      ex[qNum(current.id)] = { correct: 0, wrong: S.wrong, firstTry: false, timeOnTaskMs: 0, concept: current.concept, qid: current.id };
      wrong += S.wrong; answered += 1;
    }
    return {
      pupil: pupilName(), pupilUid: u.uid, pupilEmail: u.email || '',
      stepId: ctx.stepId + '-practice',
      stepLabel: (meta.stepLabel || ctx.step.label || 'Step') + ' — Practice Zone',
      term: meta.term || '', topic: meta.topic || '', stepNumber: meta.stepNumber || 0,
      attemptId: S.attemptId, attemptNumber: S.sessionNo || 1,
      startedAt: S.startedAt, updatedAt: new Date().toISOString(), completed: !!completed,
      source: 'practice', stepKey: ctx.stepKey,
      exercises: ex, correct, wrong, firstTryCorrect: ftc, answered
    };
  }
  function writeAttempt(ctx, current, completed) {
    const u = user(), d = u ? db() : null;
    if (!u || !d || !ctx.session || !ctx.session.attemptId) return;
    d.collection('progress').doc(ctx.session.attemptId).set(buildAttempt(ctx, current, completed), { merge: true })
      .catch(err => console.warn('session record not saved:', err && err.message));
  }

  PZ.hooks.onSessionStart = function (info) {
    const ctx = info.ctx, S = ctx.session, u = user();
    ctx.history.sessions = (ctx.history.sessions || 0) + 1;
    S.sessionNo = ctx.history.sessions;
    S.attemptId = 'pz-' + (u ? u.uid.slice(0, 6) : 'local') + '-' + Date.now().toString(36);
    S.startedAt = new Date().toISOString();
    S.meta = Object.assign({}, window.__currentStepMeta || {});
  };
  PZ.hooks.onClick = function (info) { writeAttempt(info.ctx, info.question, false); };   // every click, right or wrong
  PZ.hooks.onSessionEnd = function (info) { writeAttempt(info.ctx, null, true); };         // mark the session completed
})();
