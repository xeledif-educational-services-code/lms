/* ============================================================
   XELEDIF POOL ENGINE — core (step 1 of 4)
   Place this file NEXT TO index.html (primary-maths\pool-engine.js).
   It has NO screens and NO Firestore yet. It only decides:
     - which questions to serve (10 unseen, fairly spread, weak concepts first)
     - how to shuffle answer options safely
     - how to update a pupil's history after each answer
   Works in the browser (window.PoolEngine) and in Node (for tests).
   ============================================================ */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PoolEngine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const LEVEL_RANK = { n: 0, t: 1, b: 2 };
  const CFG = {
    sessionSize: 10,
    maxBoss: 1,            // at most this many "boss" questions in one session
    maxThink: 2,           // at most this many "think deeper" questions in one session
    minAttempts: 3,        // below this, a concept has too little data to judge
    minDistinct: 5,        // distinct questions needed before a concept is reported
    strugglingBelow: 0.6,  // first-try accuracy under this  = struggling
    secureFrom: 0.8        // first-try accuracy at/over this = secure
  };

  /* ---------- small utilities ---------- */
  function mulberry32(seed) {               // deterministic random, for tests
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(arr, rng) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const clone = o => JSON.parse(JSON.stringify(o));
  const activeQuestions = step => (step.questions || []).filter(q => !q.retired);

  /* ---------- history (this exact shape becomes the Firestore document in step 3) ----------
     {
       pupilUid, stepKey,
       cycle: 1,                      // how many times the pupil has gone round the whole pool
       inCycle: ['...Q0001', ...],    // questions answered in the CURRENT cycle
       seen: { 'id': { n, ftc, wrong, ms, last } },   // lifetime stats per question
       updatedAt
     }                                                                                          */
  function emptyHistory(stepKey, pupilUid) {
    return { pupilUid: pupilUid || '', stepKey, cycle: 1, inCycle: [], seen: {}, updatedAt: null };
  }

  /* ---------- per-concept statistics (what the dashboard report will use) ---------- */
  function conceptStats(step, history) {
    const byId = new Map(activeQuestions(step).map(q => [q.id, q]));
    const out = {};
    (step.concepts || []).forEach(c => {
      out[c.id] = { concept: c.id, name: c.name, attempts: 0, firstTryCorrect: 0, wrong: 0, distinct: 0 };
    });
    Object.entries(history.seen || {}).forEach(([qid, s]) => {
      const q = byId.get(qid);
      if (!q || !out[q.concept]) return;              // retired / unknown questions are ignored
      const c = out[q.concept];
      c.attempts += s.n; c.firstTryCorrect += s.ftc; c.wrong += s.wrong; c.distinct += 1;
    });
    Object.values(out).forEach(c => {
      c.accuracy = c.attempts ? c.firstTryCorrect / c.attempts : null;
      if (c.distinct < CFG.minDistinct) c.status = 'not-enough-data';
      else if (c.accuracy >= CFG.secureFrom) c.status = 'secure';
      else if (c.accuracy < CFG.strugglingBelow) c.status = 'struggling';
      else c.status = 'developing';
    });
    return out;
  }

  /* ---------- fair, balanced picking ---------- */
  function balancedPick(cands, step, hist, k, rng, opts) {
    opts = opts || {};
    if (k <= 0 || !cands.length) return [];
    const stats = conceptStats(step, hist);

    // group candidates by concept
    const groups = new Map();
    cands.forEach(q => {
      if (!groups.has(q.concept)) groups.set(q.concept, []);
      groups.get(q.concept).push(q);
    });
    groups.forEach((list, cid) => {
      let l = shuffle(list, rng);
      if (opts.preferMissed) {                        // when going round again: missed questions first
        const miss = q => { const s = hist.seen[q.id]; return s && s.n ? s.wrong / s.n : 0; };
        l = l.map(q => [q, miss(q) + rng() * 0.01]).sort((a, b) => b[1] - a[1]).map(x => x[0]);
      }
      groups.set(cid, l);
    });

    // weakest concept first; concepts with too little data sit in the middle (0.5)
    const prio = cid => {
      const s = stats[cid];
      return (!s || s.attempts < CFG.minAttempts) ? 0.5 : 1 - s.accuracy;
    };
    const order = [...groups.keys()].map(cid => [cid, prio(cid) + rng() * 0.001])
      .sort((a, b) => b[1] - a[1]).map(x => x[0]);

    // round-robin over concepts so every concept gets a turn
    const picked = [];
    let boss = 0, think = 0, relaxed = false;
    while (picked.length < k) {
      let progress = false;
      for (const cid of order) {
        if (picked.length >= k) break;
        const list = groups.get(cid);
        const idx = list.findIndex(q => relaxed ||
          !((q.level === 'b' && boss >= CFG.maxBoss) || (q.level === 't' && think >= CFG.maxThink)));
        if (idx < 0) continue;
        const q = list.splice(idx, 1)[0];
        picked.push(q);
        if (q.level === 'b') boss++;
        if (q.level === 't') think++;
        progress = true;
      }
      if (!progress) { if (!relaxed) { relaxed = true; continue; } break; }
    }
    return picked;
  }

  // easier → harder inside a session
  function sortSession(qs, rng) {
    return qs.map(q => [q, rng()]).sort((a, b) =>
      (LEVEL_RANK[a[0].level] - LEVEL_RANK[b[0].level]) ||
      (a[0].difficulty - b[0].difficulty) || (a[1] - b[1])).map(x => x[0]);
  }

  /* ---------- the main call: choose the next session ----------
     Returns { questions, history, rolled }
     - questions: raw question objects (call prepare() on each before showing)
     - history  : the (possibly cycle-rolled) history to keep working with
     - rolled   : true if the pupil has finished the whole pool and a new round began */
  function pickSession(step, history, n, rng) {
    rng = rng || Math.random;
    n = Math.min(n || CFG.sessionSize, activeQuestions(step).length);
    const all = activeQuestions(step);
    const hist = clone(history);
    const done = new Set(hist.inCycle || []);
    const unseen = all.filter(q => !done.has(q.id));

    let chosen, rolled = false;
    if (unseen.length >= n) {
      chosen = balancedPick(unseen, step, hist, n, rng);
    } else {
      chosen = unseen.slice();                                  // use up what is left of this round…
      hist.cycle = (hist.cycle || 1) + 1; hist.inCycle = []; rolled = true;   // …then start a new round
      const rest = all.filter(q => !chosen.includes(q));
      chosen = chosen.concat(balancedPick(rest, step, hist, n - chosen.length, rng, { preferMissed: true }));
    }
    return { questions: sortSession(chosen, rng), history: hist, rolled };
  }

  /* ---------- shuffle options without ever losing which one is correct ---------- */
  function prepare(q, rng) {
    rng = rng || Math.random;
    const idx = shuffle(q.options.map((_, i) => i), rng);
    return {
      id: q.id, v: q.v, concept: q.concept, level: q.level, difficulty: q.difficulty,
      stem: q.stem, hint: q.hint || null,
      options: idx.map(i => q.options[i]),
      correctIndex: idx.indexOf(q.correct)
    };
  }

  /* ---------- update history after ONE answered question (called on every answer) ----------
     result = { firstTry: true/false, wrong: number of wrong clicks, ms: time taken }          */
  function recordAnswer(history, q, result, nowIso) {
    const h = clone(history);
    const s = h.seen[q.id] || (h.seen[q.id] = { n: 0, ftc: 0, wrong: 0, ms: 0, last: null });
    s.n += 1;
    if (result.firstTry) s.ftc += 1;
    s.wrong += result.wrong || 0;
    s.ms += result.ms || 0;
    s.last = nowIso || new Date().toISOString();
    if (!h.inCycle.includes(q.id)) h.inCycle.push(q.id);
    h.updatedAt = s.last;
    return h;
  }

  /* ---------- progress summary for the Practice Zone panel ---------- */
  function progress(step, history) {
    const all = activeQuestions(step), ids = new Set(all.map(q => q.id));
    const seenDistinct = Object.keys(history.seen || {}).filter(id => ids.has(id)).length;
    const left = all.filter(q => !(history.inCycle || []).includes(q.id)).length;
    return { total: all.length, seenDistinct, leftThisRound: left, round: history.cycle || 1 };
  }

  /* ---------- browser helper: download a pool file only when it is needed ---------- */
  const loading = {};
  function loadPool(file, topicKey) {
    if (typeof window === 'undefined') return Promise.reject(new Error('loadPool needs a browser'));
    window.XELEDIF_POOLS = window.XELEDIF_POOLS || {};
    if (window.XELEDIF_POOLS[topicKey]) return Promise.resolve(window.XELEDIF_POOLS[topicKey]);
    if (loading[file]) return loading[file];
    loading[file] = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = file; s.async = true;
      s.onload = () => {
        const p = window.XELEDIF_POOLS[topicKey];
        p ? resolve(p) : reject(new Error('Pool ' + topicKey + ' not found in ' + file));
      };
      s.onerror = () => { delete loading[file]; reject(new Error('Could not load ' + file)); };
      document.head.appendChild(s);
    });
    return loading[file];
  }

  return {
    CFG, mulberry32, loadPool, emptyHistory, conceptStats,
    pickSession, prepare, recordAnswer, progress, activeQuestions
  };
});
