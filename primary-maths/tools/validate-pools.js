#!/usr/bin/env node
/* ============================================================
   XELEDIF POOL VALIDATOR
   Usage:   node tools/validate-pools.js pools/p5_spr_decperc.js
   Checks every question in a pool file and prints a quota report.
   Exit code 1 if any ERROR is found (so it can run in CI later).
   ============================================================ */
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const file = process.argv[2];
if (!file) { console.error('Usage: node validate-pools.js <pool-file.js>'); process.exit(2); }

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.resolve(file), 'utf8'), sandbox, { filename: file });
const pools = sandbox.window.XELEDIF_POOLS || {};

let errors = 0, warnings = 0;
const err  = m => { errors++;   console.log('  ✗ ERROR   ' + m); };
const warn = m => { warnings++; console.log('  ! warning ' + m); };

/* numeric value of an option such as "£23.50", "4,500", "0.05316", "150 cm" */
function num(optText){
  const m = String(optText).replace(/,/g, '').match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : NaN;
}

for (const [topicKey, topic] of Object.entries(pools)) {
  console.log(`\nTOPIC ${topicKey}  (schema v${topic.schemaVersion})`);
  const seenIds = new Set();

  for (const [stepKey, step] of Object.entries(topic.steps || {})) {
    console.log(`\n STEP ${stepKey} — ${step.label}`);
    const idRe = new RegExp('^' + stepKey.replace(/\./g, '\\.') + '\\.Q\\d{4}$');
    const concepts = new Map((step.concepts || []).map(c => [c.id, { ...c, have: 0 }]));
    const stems = new Set();
    const levels = { n: 0, t: 0, b: 0 };
    let active = 0;

    for (const q of step.questions || []) {
      const tag = q.id || '(no id)';
      if (!idRe.test(q.id || '')) err(`${tag}: ID must match ${stepKey}.Qnnnn`);
      if (seenIds.has(q.id)) err(`${tag}: duplicate ID`);
      seenIds.add(q.id);
      if (!Number.isInteger(q.v) || q.v < 1) err(`${tag}: v must be an integer ≥ 1`);
      if (!concepts.has(q.concept)) err(`${tag}: unknown concept "${q.concept}"`);
      if (!['n', 't', 'b'].includes(q.level)) err(`${tag}: level must be n, t or b`);
      if (![1, 2, 3].includes(q.difficulty)) err(`${tag}: difficulty must be 1, 2 or 3`);
      if (!q.stem || !String(q.stem).trim()) err(`${tag}: empty stem`);
      if (!Array.isArray(q.options) || q.options.length < 3 || q.options.length > 4) err(`${tag}: needs 3 or 4 options`);
      else {
        if (new Set(q.options.map(o => String(o).trim())).size !== q.options.length) err(`${tag}: duplicate options`);
        if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct >= q.options.length) err(`${tag}: correct index out of range`);
      }
      if (stems.has(String(q.stem).trim())) warn(`${tag}: same stem as another question`);
      stems.add(String(q.stem).trim());

      /* automatic answer check */
      if (q.check && Array.isArray(q.options) && q.options[q.correct] !== undefined) {
        let expected;
        try { expected = Function('"use strict";return (' + q.check + ')')(); }
        catch (e) { err(`${tag}: check expression failed (${e.message})`); }
        if (expected !== undefined) {
          const got = num(q.options[q.correct]);
          if (!(Math.abs(expected - got) <= 1e-9 * Math.max(1, Math.abs(expected))))
            err(`${tag}: ANSWER KEY WRONG — check gives ${expected} but marked option is "${q.options[q.correct]}"`);
          q.options.forEach((o, i) => {
            if (i !== q.correct && Math.abs(num(o) - expected) < 1e-9) err(`${tag}: option ${i} "${o}" is ALSO correct`);
          });
        }
      }
      if (!q.retired) {
        active++;
        levels[q.level] = (levels[q.level] || 0) + 1;
        if (concepts.has(q.concept)) concepts.get(q.concept).have++;
      }
    }

    console.log(`  Active questions: ${active} / target ${step.targetSize}   (n=${levels.n}  t=${levels.t}  b=${levels.b})`);
    console.log('  Concept quota:');
    let total = 0;
    for (const c of concepts.values()) {
      total += c.target;
      const bar = '█'.repeat(Math.min(c.have, 12)) + '░'.repeat(Math.max(0, Math.min(c.target, 12) - c.have));
      console.log(`    ${c.id.padEnd(16)} ${String(c.have).padStart(2)} / ${String(c.target).padEnd(2)} ${bar}${c.have > c.target ? '  (over quota)' : ''}`);
    }
    if (total !== step.targetSize) err(`concept targets add up to ${total}, but targetSize is ${step.targetSize}`);
  }
}
console.log(`\nResult: ${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
