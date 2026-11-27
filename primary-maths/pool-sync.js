/* ============================================================
   XELEDIF POOL SYNC — Firestore, saved after EVERY answer
   Firestore is the source of truth. localStorage is only a cache.
   Load AFTER pool-engine.js and pool-ui.js (and the Firebase scripts).
   ============================================================ */
(function () {
  'use strict';
  const PZ = window.PracticeZone, E = window.PoolEngine;
  if (!PZ || !E) { console.warn('pool-sync.js: load pool-engine.js and pool-ui.js first'); return; }

  // The localStorage store from pool-ui.js, kept as the offline cache.
  // WHY a named constant: we call local.save()/local.load() as METHODS of this
  // object, so their internal `this` stays correct.
  const local = PZ.store;

  /* ---------- Firebase access ---------- */
  const fb   = () => (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length) ? firebase : null;
  const user = () => { try { const f = fb(); return f ? f.auth().currentUser : null; } catch (e) { return null; } };
  const db   = () => { try { const f = fb(); return f ? f.firestore() : null; } catch (e) { return null; } };
  const stamp = () => fb().firestore.FieldValue.serverTimestamp();
  const withTimeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);
  const ready = () => (typeof waitForRole === 'function') ? withTimeout(waitForRole(), 4000).catch(() => null) : Promise.resolve();

  // The pupil's display name lives in users/<uid>.pupilName. Read it once.
  let profileName = null;
  function loadProfileName() {
    const u = user(), d = u ? db() : null;
    if (!u || !d || profileName !== null) return Promise.resolve();
    return withTimeout(d.collection('users').doc(u.uid).get(), 4000).then(snap => {
      const n = snap.exists && snap.data().pupilName;
      profileName = (n && String(n).trim()) || '';
    }).catch(() => {});
  }
  function pupilName() {
    try { return profileName || localStorage.getItem('xeledif.pupil') || (user() && user().email) || 'Unknown'; }
    catch (e) { return 'Unknown'; }
  }

  /* ---------- question-ID shortening (smaller documents) ---------- */
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

  // Lesson attempts for this step, read from Firestore (source of truth).
  // WHY two equality filters: Firestore serves equality-only queries from its
  // automatic indexes, so no composite index is needed. Filtering by stepId
  // leaves out the "-practice" records, which the question history already tracks.
  function fetchCore(u, d, stepId) {
    if (!stepId) return Promise.resolve([]);
    return withTimeout(
      d.collection('progress').where('pupilUid', '==', u.uid).where('stepId', '==', stepId).get(), 6000)
      .then(snap => { const out = []; snap.forEach(x => out.push(x.data())); return out; })
      .catch(() => []);   // never block the Practice Zone on this
  }

  /* ---------- the history store used by the Practice Zone ---------- */
  PZ.store = {
    load(stepKey, ctx) {
      return ready().then(loadProfileName).then(() => {
        const u = user(), d = u ? db() : null;
        if (!u || !d) return local.load(stepKey);
        return Promise.all([
          withTimeout(d.collection('questionHistory').doc(u.uid + '_' + stepKey).get(), 6000)
            .then(snap => snap.exists ? fromDoc(stepKey, snap.data()) : null).catch(() => null),
          local.load(stepKey),
          ctx ? fetchCore(u, d, ctx.stepId) : Promise.resolve([])
        ]).then(([remote, cached, core]) => {
          if (ctx) ctx.coreRecords = core;   // consumed by importCore() in pool-ui.js
          if (remote && cached) return (cached.updatedAt || '') > (remote.updatedAt || '') ? cached : remote;  // newest wins
          return remote || cached || null;
        });
      });
    },

    // WHY written out in full and never copied from another object: it must not
    // depend on `this`, so it works however it is called.
    save(stepKey, history, data) {
      local.save(stepKey, history).catch(() => {});          // keep the local cache fresh
      const u = user(), d = u ? db() : null;
      if (!u || !d) return Promise.resolve();                // not signed in: local only
      return d.collection('questionHistory').doc(u.uid + '_' + stepKey).set(toDoc(stepKey, history, data));
    }
  };

  /* ---------- live session record (the dashboard reads the "progress" collection) ---------- */
  function qNum(id) { return parseInt(id.slice(-4), 10); }

  function buildAttempt(ctx, current, completed) {
    const S = ctx.session, u = user(), meta = S.meta || {};
    const ex = {}; let correct = 0, wrong = 0, ftc = 0, answered = 0;
    S.results.forEach(r => {
      if (!r) return;
      ex[qNum(r.id)] = { correct: 1, wrong: r.wrong, firstTry: r.firstTry, timeOnTaskMs: r.ms, concept: r.concept, qid: r.id };
      correct += 1; wrong += r.wrong; answered += 1; if (r.firstTry) ftc += 1;
    });
    if (current && !S.results[S.i] && S.wrong > 0) {         // wrong clicks on a question not yet solved
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
  PZ.hooks.onClick = function (info) {                       // every click, right or wrong
    const S = info.ctx.session;
    const allDone = info.correct && S.results.filter(Boolean).length === S.qs.length;   // 10th solved = session complete
    writeAttempt(info.ctx, info.question, allDone);
  };
  PZ.hooks.onSessionEnd = function (info) { writeAttempt(info.ctx, null, true); };
})();