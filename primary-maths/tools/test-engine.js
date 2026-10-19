#!/usr/bin/env node
/* ============================================================
   Tests for pool-engine.js
   Run from the primary-maths folder:   node tools\test-engine.js
   ============================================================ */
const fs = require('fs'), vm = require('vm'), path = require('path');
const E = require('../pool-engine.js');

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../pools/p5_spr_decperc.js'), 'utf8'), sandbox);
const step = sandbox.window.XELEDIF_POOLS['P5.SPR.DP'].steps['P5.SPR.DP.S09'];
const all = E.activeQuestions(step);

let failed = 0;
const ok = (cond, msg) => { console.log((cond ? '  ✓ ' : '  ✗ FAIL ') + msg); if (!cond) failed++; };
const answerAll = (hist, qs, rng, pCorrect) => qs.reduce((h, q) =>
  E.recordAnswer(h, q, { firstTry: rng() < (pCorrect === undefined ? 0.7 : pCorrect), wrong: 0, ms: 5000 }), hist);

console.log('\n1. A first session');
{
  const rng = E.mulberry32(1);
  const s = E.pickSession(step, E.emptyHistory('P5.SPR.DP.S09', 'u1'), 10, rng);
  const ids = s.questions.map(q => q.id);
  ok(s.questions.length === 10, '10 questions served');
  ok(new Set(ids).size === 10, 'no duplicates inside the session');
  ok(new Set(s.questions.map(q => q.concept)).size >= 7, 'at least 7 different concepts covered (' + new Set(s.questions.map(q => q.concept)).size + ')');
  ok(s.questions.filter(q => q.level === 'b').length <= 1, 'at most 1 boss question');
  ok(s.questions.filter(q => q.level === 't').length <= 2, 'at most 2 think-deeper questions');
  const rank = { n: 0, t: 1, b: 2 };
  ok(s.questions.every((q, i, a) => i === 0 || rank[q.level] >= rank[a[i - 1].level]), 'ordered easier → harder');
  ok(!s.rolled, 'not a new round');
}

console.log('\n2. Five sessions see all 50 questions exactly once');
{
  const rng = E.mulberry32(7);
  let h = E.emptyHistory('P5.SPR.DP.S09', 'u1');
  const seen = [];
  for (let i = 0; i < 5; i++) {
    const s = E.pickSession(step, h, 10, rng);
    h = answerAll(s.history, s.questions, rng);
    seen.push(...s.questions.map(q => q.id));
  }
  ok(seen.length === 50 && new Set(seen).size === 50, '50 different questions in 5 sessions');
  const p = E.progress(step, h);
  ok(p.seenDistinct === 50 && p.leftThisRound === 0, 'progress shows 50 seen, 0 left this round');

  console.log('\n3. Session 6 starts a new round');
  const s6 = E.pickSession(step, h, 10, rng);
  ok(s6.rolled === true && s6.history.cycle === 2, 'new round started (cycle 2)');
  ok(s6.questions.length === 10 && new Set(s6.questions.map(q => q.id)).size === 10, 'still 10 different questions');
}

console.log('\n4. A round that ends part-way through a session');
{
  const rng = E.mulberry32(11);
  let h = E.emptyHistory('P5.SPR.DP.S09', 'u1');
  for (let i = 0; i < 4; i++) { const s = E.pickSession(step, h, 10, rng); h = answerAll(s.history, s.questions, rng); }
  const s5 = E.pickSession(step, h, 10, rng);               // 10 left exactly
  h = answerAll(s5.history, s5.questions.slice(0, 5), rng); // answers only 5 of them
  const left = all.filter(q => !h.inCycle.includes(q.id));
  ok(left.length === 5, '5 questions left unseen in this round');
  const s6 = E.pickSession(step, h, 10, rng);
  const ids = s6.questions.map(q => q.id);
  ok(left.every(q => ids.includes(q.id)), 'all 5 leftover questions come first');
  ok(s6.rolled && new Set(ids).size === 10, 'then a new round tops up to 10 different questions');
}

console.log('\n5. Weak concepts get more attention');
{
  const rng = E.mulberry32(3);
  let h = E.emptyHistory('P5.SPR.DP.S09', 'u1');
  // pupil has failed all 9 div1000 questions before, but they are not yet "seen" in this round
  all.filter(q => q.concept === 'dp9.div1000').forEach(q => { h.seen[q.id] = { n: 1, ftc: 0, wrong: 1, ms: 9000, last: 'x' }; });
  const stats = E.conceptStats(step, h);
  ok(stats['dp9.div1000'].status === 'struggling', 'div1000 is reported as struggling (0% over 9 different questions)');
  const s = E.pickSession(step, h, 10, rng);
  const n = s.questions.filter(q => q.concept === 'dp9.div1000').length;
  ok(n >= 2, 'weak concept gets at least 2 of the 10 questions (got ' + n + ')');
}

console.log('\n6. Option shuffling never loses the right answer');
{
  const rng = E.mulberry32(5);
  let allGood = true; const where = [0, 0, 0];
  for (let t = 0; t < 600; t++) {
    const q = all[t % all.length];
    const p = E.prepare(q, rng);
    if (p.options[p.correctIndex] !== q.options[q.correct]) allGood = false;
    if (q.options.length === 3) where[p.correctIndex]++;
  }
  ok(allGood, 'correct option always found after 600 shuffles');
  ok(where.every(c => c > 100), 'correct answer lands in every position (' + where.join(' / ') + ')');
}

console.log('\n7. Recording answers');
{
  let h = E.emptyHistory('P5.SPR.DP.S09', 'u1');
  const q = all[0];
  h = E.recordAnswer(h, q, { firstTry: false, wrong: 2, ms: 8000 });
  h = E.recordAnswer(h, q, { firstTry: true, wrong: 0, ms: 3000 });
  const s = h.seen[q.id];
  ok(s.n === 2 && s.ftc === 1 && s.wrong === 2 && s.ms === 11000, 'counters add up (n=2, first-try=1, wrong=2, ms=11000)');
  ok(h.inCycle.length === 1, 'question counted once in this round');
}

console.log('\n' + (failed ? failed + ' TEST(S) FAILED' : 'ALL TESTS PASSED'));
process.exit(failed ? 1 : 0);
