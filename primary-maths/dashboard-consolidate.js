/* ============================================================
   XELEDIF DASHBOARD — consolidated view, concept report, parent report (step 4)
   Place NEXT TO dashboard.html and add ONE line as the very LAST script:
        <script src="dashboard-consolidate.js"></script>
   Also paste cloudSubscribeAll-replacement.js into firebase-integration.js
   (it limits what the dashboard downloads to the last 30 days by default).

   What it does
   1. One block per pupil (grouped by pupilUid → email → name); name from users/<uid>.pupilName.
   2. One block per step: Regular exercises + Practice sessions together, badged.
   3. NEWEST FIRST: pupils, steps and attempts are ordered by last activity (updatedAt),
      so a pupil who just answered jumps to the top. Toggle to "name / curriculum order".
      Attempts you have opened stay open when live updates arrive.
   4. 📊 Concept report per pupil: Secure / Developing / Struggling per concept,
      only after at least 5 DIFFERENT questions (otherwise "needs more practice data").
   5. 📄 Parent report: a printable monthly report (Print → Save as PDF).
   6. Period control (30 days / 90 days / all time) with a record counter.
   7. Consolidated, Excel-safe CSV export.
   ============================================================ */
(function () {
  'use strict';

  window.__userNames = window.__userNames || {};       // uid -> { name, email, role }

  /* ---------- settings ---------- */
  const MIN_Q = 5, SECURE_FROM = 0.8, STRUGGLING_BELOW = 0.6, LIVE_MINUTES = 5;
  const DAYS_KEY = 'xeledif.dash.days', SORT_KEY = 'xeledif.dash.sort';
  const getDays = () => { const v = localStorage.getItem(DAYS_KEY); return v === 'all' ? 'all' : (parseInt(v, 10) || 30); };
  const getSort = () => localStorage.getItem(SORT_KEY) || 'new';

  /* ---------- helpers ---------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const baseStepId = id => String(id || '').replace(/-practice$/, '');
  const cleanLabel = l => String(l || '').replace(/\s+[—–-]\s*Practice Zone\s*$/i, '');
  const kindOf = rec => (rec.source === 'practice' || /-practice$/.test(rec.stepId || '')) ? 'practice' : 'regular';
  const stamp = rec => String(rec.updatedAt || rec.startedAt || '');
  const byStart = (a, b) => String(a.startedAt || '').localeCompare(String(b.startedAt || '')) || (a.attemptNumber || 0) - (b.attemptNumber || 0);
  const isTest = rec => rec.stepId === 'test-step' || String(rec.attemptId || '').startsWith('smoke-test-');
  const looksLikeEmail = s => /@/.test(String(s || ''));
  const fmtDate = d => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  function ago(iso) {
    if (!iso) return '';
    const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
    if (s < 60) return 'just now';
    if (s < 3600) return Math.floor(s / 60) + ' min ago';
    if (s < 86400) return Math.floor(s / 3600) + ' h ago';
    return Math.floor(s / 86400) + ' d ago';
  }
  function periodText() {
    const d = getDays();
    return d === 'all' ? 'all recorded activity' : 'the last ' + d + ' days (from ' + fmtDate(Date.now() - d * 86400000) + ')';
  }

  /* ---------- who is who ---------- */
  function displayName(key, recs) {
    const u = window.__userNames[key];
    if (u && u.name) return u.name;
    const counts = {};
    recs.forEach(r => { const n = String(r.pupil || '').trim(); if (n && !looksLikeEmail(n)) counts[n] = (counts[n] || 0) + 1; });
    const best = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
    return best || recs.map(r => r.pupil).find(Boolean) || key;
  }
  function emailOf(key, recs) {
    const u = window.__userNames[key];
    return (u && u.email) || (recs.find(r => r.pupilEmail) || {}).pupilEmail || '';
  }
  function groupRecords(all) {
    const recs = Object.values(all || {}).filter(r => r && r.pupil && !isTest(r));
    const email2uid = {};
    recs.forEach(r => { if (r.pupilUid && r.pupilEmail) email2uid[r.pupilEmail.toLowerCase()] = r.pupilUid; });
    Object.keys(window.__userNames).forEach(uid => { const e = window.__userNames[uid].email; if (e) email2uid[e.toLowerCase()] = uid; });
    const groups = {};
    recs.forEach(r => {
      const em = (r.pupilEmail || '').toLowerCase();
      const key = r.pupilUid || (em && email2uid[em]) || em || ('name:' + String(r.pupil).trim().toLowerCase());
      (groups[key] = groups[key] || []).push(r);
    });
    const byName = {};
    Object.keys(groups).forEach(k => {
      if (k.indexOf('name:') === 0) return;
      byName[displayName(k, groups[k]).toLowerCase()] = k;
      groups[k].forEach(r => { const n = String(r.pupil || '').trim().toLowerCase(); if (n && !looksLikeEmail(n)) byName[n] = byName[n] || k; });
    });
    Object.keys(groups).forEach(k => {
      if (k.indexOf('name:') === 0 && byName[k.slice(5)]) { groups[byName[k.slice(5)]] = groups[byName[k.slice(5)]].concat(groups[k]); delete groups[k]; }
    });
    return groups;
  }

  /* ============================================================
     Concept report
     Regular exercises carry no concept tag, so they are mapped through the pool file:
       exercise number k of step S  ==  pool question  <stepKey>.Q000k
     ============================================================ */
  const TOPIC_CODES = { decperc: 'DP', fractionsB: 'FB', fractionsA: 'FA', addsub: 'AS', placevalue: 'PV', multdivA: 'MA', multdivB: 'MB',
                        perarea: 'PA', stats: 'ST', shape: 'SH', posdir: 'PD', decimals: 'DC', negatives: 'NG', converting: 'CV', volume: 'VO' };
  const TERM_CODES = { autumn: 'AUT', spring: 'SPR', summer: 'SUM' };

  function parseStepId(stepId) {                       // 'p5-term-groups-spring-decperc-step9' -> keys + pool file
    const m = /^(p\d)-term-groups-(autumn|spring|summer)-([A-Za-z0-9]+)-step(\d+)$/.exec(baseStepId(stepId));
    if (!m || !TOPIC_CODES[m[3]]) return null;
    const term = TERM_CODES[m[2]], topicKey = m[1].toUpperCase() + '.' + term + '.' + TOPIC_CODES[m[3]];
    return { topicKey, stepKey: topicKey + '.S' + String(m[4]).padStart(2, '0'), file: 'pools/' + m[1] + '_' + term.toLowerCase() + '_' + m[3].toLowerCase() + '.js' };
  }
  const poolState = {};
  let renderTimer = null;
  const scheduleRender = () => { clearTimeout(renderTimer); renderTimer = setTimeout(render, 60); };
  function ensurePool(info) {
    window.XELEDIF_POOLS = window.XELEDIF_POOLS || {};
    if (!info || window.XELEDIF_POOLS[info.topicKey] || poolState[info.file]) return;
    poolState[info.file] = 'loading';
    const s = document.createElement('script');
    s.src = info.file;
    s.onload = () => { poolState[info.file] = 'ok'; scheduleRender(); };
    s.onerror = () => { poolState[info.file] = 'none'; };            // that topic simply has no pool yet
    document.head.appendChild(s);
  }

  const STATUS = {
    secure:     { icon: '✅', label: 'Secure',                   say: 'Confident',                bg: '#EAF3DE', fg: '#27500A', bar: '#639922' },
    developing: { icon: '🟡', label: 'Developing',               say: 'Getting there',            bg: '#FAEEDA', fg: '#633806', bar: '#BA7517' },
    struggling: { icon: '🔴', label: 'Struggling',               say: 'Needs support',            bg: '#FAECE7', fg: '#712B13', bar: '#D85A30' },
    few:        { icon: '⚪', label: 'Needs more practice data', say: 'Not enough practice yet',  bg: '#F1F5F9', fg: '#475569', bar: '#94A3B8' },
    none:       { icon: '—',  label: 'Not started',              say: 'Not started',              bg: '#F8FAFC', fg: '#94A3B8', bar: '#CBD5E1' }
  };
  function statusOf(distinct, attempts, ftc) {
    if (!distinct) return 'none';
    if (distinct < MIN_Q) return 'few';
    const acc = ftc / attempts;
    return acc >= SECURE_FROM ? 'secure' : acc < STRUGGLING_BELOW ? 'struggling' : 'developing';
  }

  /* returns { steps: [ { stepKey, label, concepts: [ {id,name,distinct,attempts,ftc,wrong,acc,status} ] } ] } */
  function conceptReport(recs) {
    const steps = {};
    recs.forEach(rec => {
      const info = parseStepId(rec.stepId);
      if (!info) return;
      ensurePool(info);
      const pool = (window.XELEDIF_POOLS || {})[info.topicKey];
      const pstep = pool && pool.steps && pool.steps[info.stepKey];
      if (!pstep) return;
      const S = steps[info.stepKey] || (steps[info.stepKey] = { stepKey: info.stepKey, label: pstep.label, pstep, map: {} });
      Object.entries(rec.exercises || {}).forEach(([num, e]) => {
        const qid = info.stepKey + '.Q' + String(num).padStart(4, '0');
        let cid = e.concept;
        if (!cid) { const q = pstep.questions.find(x => x.id === qid); cid = q && q.concept; }
        if (!cid) return;
        const c = S.map[cid] || (S.map[cid] = { qs: new Set(), attempts: 0, ftc: 0, wrong: 0 });
        c.qs.add(qid); c.attempts++; if (e.firstTry === true) c.ftc++; c.wrong += e.wrong || 0;
      });
    });
    return {
      steps: Object.values(steps).sort((a, b) => a.stepKey.localeCompare(b.stepKey)).map(S => ({
        stepKey: S.stepKey, label: S.label,
        concepts: (S.pstep.concepts || []).map(def => {
          const c = S.map[def.id] || { qs: new Set(), attempts: 0, ftc: 0, wrong: 0 };
          return { id: def.id, name: def.name, distinct: c.qs.size, attempts: c.attempts, ftc: c.ftc, wrong: c.wrong,
                   acc: c.attempts ? c.ftc / c.attempts : null, status: statusOf(c.qs.size, c.attempts, c.ftc) };
        })
      }))
    };
  }
  const allConcepts = rep => rep.steps.reduce((a, s) => a.concat(s.concepts.map(c => Object.assign({ step: s.label }, c))), []);

  function conceptPanel(key, rep) {
    if (!rep.steps.length) return '';
    const cs = allConcepts(rep), n = st => cs.filter(c => c.status === st).length;
    const head = `📊 Concept report <span style="font-weight:400;color:#666;font-size:12px;">— ✅ ${n('secure')} secure · 🟡 ${n('developing')} developing · 🔴 ${n('struggling')} struggling · ⚪ ${n('few')} need more data</span>`;
    const tables = rep.steps.map(s => `
      <div style="font-size:12px;font-weight:700;margin:10px 0 4px;color:#444;">${esc(s.label)}</div>
      ${s.concepts.map(c => {
        const st = STATUS[c.status], pct = c.acc == null ? 0 : Math.round(c.acc * 100);
        const detail = c.status === 'few' ? `${c.distinct} of ${MIN_Q} different questions` : c.status === 'none' ? 'not attempted' : `${pct}% first-try · ${c.distinct} different questions · ${c.attempts} attempts`;
        return `<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:6px 8px;border-radius:8px;background:${st.bg};margin-bottom:4px;">
          <div style="flex:1 1 220px;font-size:12.5px;font-weight:700;color:${st.fg};">${st.icon} ${esc(c.name)}</div>
          <div style="flex:0 0 110px;height:8px;background:#fff;border-radius:6px;overflow:hidden;"><div style="width:${pct}%;height:100%;background:${st.bar};"></div></div>
          <div style="flex:1 1 200px;font-size:11.5px;color:${st.fg};">${st.label} — ${detail}</div>
        </div>`;
      }).join('')}`).join('');
    return `<details class="cr" data-k="${esc(key)}" open style="margin:6px 0 14px;border:1px solid var(--border);border-radius:10px;padding:8px 12px;background:#fff;">
      <summary style="cursor:pointer;font-size:13px;font-weight:700;">${head}</summary>
      ${tables}
      <div style="font-size:10.5px;color:#777;margin-top:8px;">A concept is rated only after at least ${MIN_Q} different questions. Secure = ${SECURE_FROM * 100}%+ right first time · Developing = ${STRUGGLING_BELOW * 100}–${SECURE_FROM * 100 - 1}% · Struggling = under ${STRUGGLING_BELOW * 100}%. Period: ${esc(periodText())}.</div>
    </details>`;
  }

  /* ============================================================
     Parent report (printable)
     ============================================================ */
  function parentReportHtml(key) {
    const groups = groupRecords(readAll()), recs = groups[key] || [];
    const name = displayName(key, recs), rep = conceptReport(recs), cs = allConcepts(rep);
    let q = 0, ft = 0, nReg = 0, nPrac = 0;
    recs.forEach(r => { kindOf(r) === 'practice' ? nPrac++ : nReg++; const ex = Object.values(r.exercises || {}); q += ex.length; ft += ex.filter(e => e.firstTry === true).length; });
    const pct = q ? Math.round(100 * ft / q) : 0;
    const names = st => cs.filter(c => c.status === st).map(c => esc(c.name));
    const list = a => a.length ? '<ul>' + a.map(x => '<li>' + x + '</li>').join('') + '</ul>' : '<p class="muted">None yet.</p>';
    const struggling = names('struggling'), developing = names('developing'), secure = names('secure'), few = names('few');
    const stepTables = rep.steps.map(s => `<h3>${esc(s.label)}</h3><table><tr><th>Skill</th><th>How it is going</th><th>First-try</th><th>Different questions tried</th></tr>
      ${s.concepts.map(c => { const st = STATUS[c.status];
        return `<tr><td>${esc(c.name)}</td><td style="background:${st.bg};color:${st.fg};font-weight:700;">${st.icon} ${st.say}</td><td>${c.acc == null ? '—' : Math.round(c.acc * 100) + '%'}</td><td>${c.distinct}</td></tr>`; }).join('')}</table>`).join('');
    return `<!doctype html><html><head><meta charset="utf-8"><title>Progress report — ${esc(name)}</title><style>
      body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:800px;margin:24px auto;padding:0 18px;color:#1a1a1a;line-height:1.5}
      h1{font-size:24px;margin:0} h2{font-size:17px;border-bottom:2px solid #1D9E75;padding-bottom:4px;margin-top:26px;color:#085041} h3{font-size:14px;margin:16px 0 6px}
      .muted{color:#777;font-size:13px} .grid{display:flex;gap:10px;flex-wrap:wrap;margin:10px 0} .box{flex:1 1 150px;background:#F0FAF6;border:1px solid #9FE1CB;border-radius:10px;padding:10px;text-align:center}
      .box b{display:block;font-size:22px;color:#085041} table{width:100%;border-collapse:collapse;font-size:13px} th,td{border:1px solid #ddd;padding:6px 8px;text-align:left} th{background:#f3f4f6}
      .comment{border:1.5px dashed #999;border-radius:8px;min-height:80px;padding:8px;margin-top:8px} button{padding:8px 16px;font-size:14px;border-radius:8px;border:none;background:#1D9E75;color:#fff;cursor:pointer}
      @media print{.noprint{display:none} body{margin:0}}</style></head><body>
      <div class="noprint" style="text-align:right;margin-bottom:8px"><button onclick="window.print()">🖨 Print / Save as PDF</button></div>
      <h1>Monthly Progress Report</h1>
      <p><b>${esc(name)}</b> · Primary 5 Mathematics · Xeledif Educational Services<br><span class="muted">Period: ${esc(periodText())} · Report date: ${fmtDate(Date.now())}</span></p>
      <h2>Overview</h2>
      <div class="grid"><div class="box"><b>${q}</b>questions answered</div><div class="box"><b>${pct}%</b>right first time</div><div class="box"><b>${nReg}</b>lesson exercise attempts</div><div class="box"><b>${nPrac}</b>Practice Zone sessions</div></div>
      <h2>Strengths</h2>${list(secure)}
      <h2>Areas to focus on</h2>
      <p><b>Needs support:</b></p>${list(struggling)}<p><b>Getting there:</b></p>${list(developing)}
      ${few.length ? `<p class="muted">Not enough practice yet to judge (at least ${MIN_Q} different questions are needed): ${few.join('; ')}.</p>` : ''}
      ${rep.steps.length ? '<h2>Skill-by-skill</h2>' + stepTables : '<p class="muted">No Practice Zone data yet for this period.</p>'}
      <h2>Recommended next steps</h2>
      <p>${struggling.length ? 'Revisit the lesson examples for: ' + struggling.join('; ') + '. Then complete another Practice Zone session — a little and often (10 minutes a day) works best.' : developing.length ? 'Keep practising: ' + developing.join('; ') + '. A few more Practice Zone sessions should make these secure.' : 'Keep up the good work! Continue with Practice Zone sessions to stay sharp.'}</p>
      <h2>Teacher's comment</h2><div class="comment" contenteditable="true"></div>
      <p class="muted" style="margin-top:22px">How skills are rated: a skill is rated only after at least ${MIN_Q} different questions. <b>Confident</b> = ${SECURE_FROM * 100}% or more right first time; <b>Getting there</b> = ${STRUGGLING_BELOW * 100}–${SECURE_FROM * 100 - 1}%; <b>Needs support</b> = under ${STRUGGLING_BELOW * 100}%.</p>
    </body></html>`;
  }
  function openParentReport(key) {
    const w = window.open('', '_blank');
    if (!w) { alert('Please allow pop-ups for this page to open the report.'); return; }
    w.document.open(); w.document.write(parentReportHtml(key)); w.document.close();
  }

  /* ============================================================
     Period / sort bar + live info
     ============================================================ */
  function ensureBar() {
    if (document.getElementById('dash-bar')) return;
    const root = document.getElementById('root');
    if (!root || !root.parentNode) return;
    const bar = document.createElement('div');
    bar.id = 'dash-bar';
    bar.style.cssText = 'display:flex;gap:16px;flex-wrap:wrap;align-items:center;font-size:13px;margin-bottom:14px;background:#fff;border:1px solid var(--border);border-radius:10px;padding:10px 14px;';
    bar.innerHTML = `
      <label>Show activity from <select id="dash-days"><option value="30">the last 30 days</option><option value="90">the last 90 days</option><option value="all">all time (more Firestore reads)</option></select></label>
      <label>Order <select id="dash-sort"><option value="new">newest activity first</option><option value="curriculum">name / curriculum order</option></select></label>
      <span id="dash-info" style="color:#666;"></span>`;
    root.parentNode.insertBefore(bar, root);
    const d = document.getElementById('dash-days'), s = document.getElementById('dash-sort');
    d.value = String(getDays()); s.value = getSort();
    d.onchange = () => { localStorage.setItem(DAYS_KEY, d.value); document.getElementById('dash-info').textContent = 'Loading…'; if (typeof cloudSubscribeAll === 'function') cloudSubscribeAll(); render(); };
    s.onchange = () => { localStorage.setItem(SORT_KEY, s.value); render(); };
  }
  window.__dashInfo = n => {
    const el = document.getElementById('dash-info');
    if (el) el.textContent = n + ' record' + (n === 1 ? '' : 's') + ' loaded · ' + periodText();
  };

  /* ============================================================
     render
     ============================================================ */
  function render() {
    const root = document.getElementById('root');
    if (!root || typeof readAll !== 'function') { console.warn('[dashboard-consolidate] page not ready (no #root yet)'); return; }
    ensureBar();
    const openAttempts = new Set([...root.querySelectorAll('.attempt.open')].map(a => a.dataset.aid));
    const closedPanels = new Set([...root.querySelectorAll('details.cr:not([open])')].map(d => d.dataset.k));

    const groups = groupRecords(readAll());
    const keys = Object.keys(groups);
    const newest = getSort() === 'new';
    const last = k => groups[k].reduce((m, r) => stamp(r) > m ? stamp(r) : m, '');

    if (!keys.length) {
      root.innerHTML = '<div class="empty">No progress recorded in this period. Once a pupil answers a question, it will appear here.</div>';
      return;
    }
    keys.sort(newest ? (a, b) => last(b).localeCompare(last(a)) : (a, b) => displayName(a, groups[a]).localeCompare(displayName(b, groups[b])));

    let html = keys.map(key => {
      const recs = groups[key], name = displayName(key, recs), email = emailOf(key, recs);

      const stepMap = {};
      recs.forEach(rec => {
        const sid = baseStepId(rec.stepId);
        const m = stepMap[sid] || (stepMap[sid] = { stepId: sid, stepLabel: cleanLabel(rec.stepLabel || sid), attempts: [] });
        m.attempts.push(rec);
      });
      const stepLast = s => s.attempts.reduce((m, r) => stamp(r) > m ? stamp(r) : m, '');
      const steps = Object.values(stepMap).map(s => { s.attempts.sort(byStart); return s; }).sort((a, b) => {
        if (newest) return stepLast(b).localeCompare(stepLast(a));
        const sa = a.attempts.find(x => x.term || x.topic) || a.attempts[0] || {}, sb = b.attempts.find(x => x.term || x.topic) || b.attempts[0] || {};
        return (sa.term || '').localeCompare(sb.term || '') || (sa.topic || '').localeCompare(sb.topic || '') || (sa.stepNumber || 0) - (sb.stepNumber || 0);
      });

      let totalAttempts = 0, totalQuestions = 0, totalFirstTry = 0, totalSolved = 0, totalWrong = 0, nReg = 0, nPrac = 0;
      steps.forEach(({ attempts }) => attempts.forEach(rec => {
        totalAttempts++; kindOf(rec) === 'practice' ? nPrac++ : nReg++;
        const ex = Object.values(rec.exercises || {});
        totalQuestions += ex.length; totalFirstTry += ex.filter(e => e.firstTry === true).length;
        totalSolved += ex.filter(e => e.correct > 0).length; totalWrong += rec.wrong || 0;
      }));
      const pBucket = bucket(totalFirstTry, totalQuestions);

      const weakSteps = steps.map(({ stepLabel, attempts }) => {
        const sample = attempts.find(a => a.term || a.topic) || {};
        let qs = 0, first = 0;
        attempts.forEach(rec => { const ex = Object.values(rec.exercises || {}); qs += ex.length; first += ex.filter(e => e.firstTry === true).length; });
        return { term: sample.term || '', topic: sample.topic || '', stepNumber: sample.stepNumber || 0, stepLabel, pct: qs ? first / qs : 0, qs };
      }).filter(s => s.pct < 0.5 && s.qs > 0).sort((a, b) => a.pct - b.pct);
      const focusHtml = weakSteps.length
        ? `<div style="background:#FAECE7;border:1px solid #F0997B;border-radius:10px;padding:10px 14px;margin:8px 0 12px;"><div style="font-size:12px;font-weight:700;color:#712B13;margin-bottom:6px;">⚠️ Priority focus</div>
           <div style="font-size:12px;color:#712B13;line-height:1.6;">${weakSteps.map(s => esc([s.term, s.topic, s.stepNumber ? 'Step ' + s.stepNumber : '', s.stepLabel].filter(Boolean).join(' · ')) + ': ' + Math.round(s.pct * 100) + '% first-try').join('<br>')}</div></div>` : '';

      const stepBlocks = steps.map(({ stepLabel, attempts }) => {
        const sample = attempts.find(a => a.term || a.topic) || {};
        let allQ = 0, allFirst = 0, allSolved = 0, allWrong = 0, sReg = 0, sPrac = 0;
        attempts.forEach(rec => {
          kindOf(rec) === 'practice' ? sPrac++ : sReg++;
          const ex = Object.values(rec.exercises || {});
          allQ += ex.length; allFirst += ex.filter(e => e.firstTry === true).length; allSolved += ex.filter(e => e.correct > 0).length; allWrong += rec.wrong || 0;
        });
        const stepBucket = bucket(allFirst, allQ);
        const trendBars = attempts.map((rec, i) => {
          const ex = Object.values(rec.exercises || {}), first = ex.filter(e => e.firstTry === true).length, total = ex.length || 1, p = first / total;
          return `<div class="trend-bar ${trendClass(p)}" style="height:${Math.max(10, Math.round(p * 100))}%" title="Attempt ${i + 1} (${kindOf(rec) === 'practice' ? 'Practice' : 'Regular'}): ${first}/${total} first-try (${Math.round(p * 100)}%)"></div>`;
        }).join('');
        const trendLabels = attempts.map((rec, i) => `<span>${kindOf(rec) === 'practice' ? 'P' : 'R'}${i + 1}</span>`).join('');
        const qWrong = {};
        attempts.forEach(rec => Object.entries(rec.exercises || {}).forEach(([num, e]) => { qWrong[num] = (qWrong[num] || 0) + (e.wrong || 0); }));
        const hotQs = Object.entries(qWrong).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]).slice(0, 5);
        const hotHtml = hotQs.length ? `<div style="font-size:11px;color:var(--text-sec);margin-top:8px;"><strong>Most-missed questions:</strong> ${hotQs.map(([num, n]) => `Q${esc(num)} (${n}✗)`).join(' · ')}</div>` : '';

        // NEWEST FIRST: listed by last activity, numbered in the order they were started
        const attemptRows = attempts.map((rec, i) => ({ rec, seq: i + 1 })).sort((a, b) => stamp(b.rec).localeCompare(stamp(a.rec))).map(({ rec, seq }) => {
          const ex = Object.entries(rec.exercises || {}).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
          const firstTry = ex.filter(([, e]) => e.firstTry === true).length, solved = ex.filter(([, e]) => e.correct > 0).length, b = bucket(firstTry, ex.length);
          const prac = kindOf(rec) === 'practice';
          const badge = prac ? '<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:9px;background:#E1F5EE;color:#085041;border:1px solid #9FE1CB;">🚀 Practice</span>'
                             : '<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:9px;background:#EEEDFE;color:#3C3489;border:1px solid #CECBF6;">📘 Regular</span>';
          const live = !rec.completed && rec.updatedAt && (Date.now() - new Date(rec.updatedAt).getTime()) < LIVE_MINUTES * 60000;
          const perQ = ex.map(([num, e]) => {
            const isFirst = e.firstTry === true, isRetry = e.firstTry === false && e.correct > 0, isFail = e.correct === 0;
            const cls = isFirst ? 'first' : isRetry ? 'retry' : isFail ? 'fail' : '', icon = isFirst ? '✅' : isRetry ? '⚠️' : '❌';
            const time = e.timeOnTaskMs ? Math.round(e.timeOnTaskMs / 1000) + 's' : '—';
            return `<div class="q-cell ${cls}" title="${esc(e.concept || '')}"><span class="qlab">${icon} Q${esc(num)}</span><span class="qdet">${e.wrong ? e.wrong + '✗' : '0✗'} · ${time}</span></div>`;
          }).join('');
          const started = rec.startedAt ? new Date(rec.startedAt).toLocaleString() : '—';
          return `
            <div class="attempt" data-aid="${esc(rec.attemptId || '')}">
              <div class="attempt-head" onclick="this.parentElement.classList.toggle('open')">
                <span class="num">Attempt ${seq}</span>${badge}${live ? '<span style="font-size:10px;font-weight:700;color:#15803D;">🟢 live</span>' : ''}
                <span class="date">${started} · ${rec.completed ? 'submitted' : 'incomplete'} · last activity ${ago(rec.updatedAt)}</span>
                <span class="score" style="color:${b.cls === 'good' ? 'var(--good-fg)' : b.cls === 'mid' ? 'var(--mid-fg)' : 'var(--bad-fg)'}">${firstTry}/${ex.length} first-try</span>
                <span class="arrow">▶</span>
              </div>
              <div class="attempt-body">
                <div class="step-meta"><span>Solved: <strong>${solved}/${ex.length}</strong></span><span>Wrong attempts: <strong>${rec.wrong || 0}</strong></span><span>Questions touched: <strong>${ex.length}</strong></span></div>
                <div class="q-grid">${perQ}</div>
              </div>
            </div>`;
        }).join('');

        return `
          <div class="step-block">
            <div class="step-head"><h3>
              <span style="font-size:11px;color:var(--text-sec);font-weight:600;display:block;margin-bottom:2px;">${esc(sample.term || '')}${sample.topic ? ' · ' + esc(sample.topic) : ''}${sample.stepNumber ? ' · Step ' + sample.stepNumber : ''}</span>
              ${esc(stepLabel)}</h3><span class="pill ${stepBucket.cls}">${stepBucket.label} aggregate</span></div>
            <div class="step-meta">
              <span>Regular attempts: <strong>${sReg}</strong></span><span>Practice sessions: <strong>${sPrac}</strong></span><span>Total questions: <strong>${allQ}</strong></span>
              <span>Aggregate first-try: <strong>${allFirst}/${allQ}</strong></span><span>Aggregate solved: <strong>${allSolved}/${allQ}</strong></span><span>Total wrong clicks: <strong>${allWrong}</strong></span>
            </div>
            ${attempts.length >= 2 ? `<div style="font-size:11px;color:var(--text-sec);margin-top:6px;">Progress trend (first-try % per attempt, oldest → newest — R = Regular, P = Practice):</div><div class="trend">${trendBars}</div><div class="trend-labels">${trendLabels}</div>` : ''}
            ${hotHtml}
            <div class="attempt-list">${attemptRows}</div>
          </div>`;
      }).join('');

      const keyAttr = encodeURIComponent(key);
      return `
        <div class="pupil">
          <div class="pupil-head">
            <h2>${esc(name)} <span class="pill ${pBucket.cls}">${pBucket.label} aggregate</span>
              ${email ? `<span style="font-size:12px;color:#777;font-weight:400;">${esc(email)}</span>` : ''}
              <span style="font-size:11px;color:#777;font-weight:400;">· last active ${ago(last(key))}</span></h2>
            <button class="small" data-key="${keyAttr}" onclick="openParentReport(decodeURIComponent(this.dataset.key))">📄 Parent report</button>
            <button class="small" data-key="${keyAttr}" onclick="exportPupilJSON(decodeURIComponent(this.dataset.key))">⬇ Export ${esc(name)}</button>
            <button class="small" data-key="${keyAttr}" onclick="exportPupilCSV(decodeURIComponent(this.dataset.key))">⬇ CSV</button>
          </div>
          <div class="kpis">
            <span>Steps attempted: <strong>${steps.length}</strong></span><span>Regular attempts: <strong>${nReg}</strong></span><span>Practice sessions: <strong>${nPrac}</strong></span>
            <span>Questions answered: <strong>${totalQuestions}</strong></span><span>First-try correct: <strong>${totalFirstTry}</strong></span>
            <span>Eventually solved: <strong>${totalSolved}</strong></span><span>Total wrong clicks: <strong>${totalWrong}</strong></span>
          </div>
          ${focusHtml}
          ${conceptPanel(key, conceptReport(recs))}
          ${stepBlocks}
        </div>`;
    }).join('');

    // pupils registered but silent in this period
    const quiet = Object.keys(window.__userNames).filter(uid => !groups[uid] && window.__userNames[uid].role !== 'teacher' && window.__userNames[uid].name);
    if (quiet.length) html += `<div style="font-size:12px;color:#777;margin:10px 4px;">No activity in this period: ${quiet.map(uid => esc(window.__userNames[uid].name)).join(', ')}.</div>`;

    root.innerHTML = html;
    root.querySelectorAll('.attempt').forEach(a => { if (openAttempts.has(a.dataset.aid)) a.classList.add('open'); });
    root.querySelectorAll('details.cr').forEach(d => { if (closedPanels.has(d.dataset.k)) d.removeAttribute('open'); });
  }

  /* ============================================================
     exports — consolidated, Excel-safe
     ============================================================ */
  function pupilRecords(key) {
    const g = groupRecords(readAll()), out = {};
    (g[key] || []).forEach((r, i) => { out[r.attemptId || ('r' + i)] = r; });
    return out;
  }
  const safeFile = s => String(s).replace(/[^\w.-]+/g, '_');
  function exportPupilJSON(key) {
    const recs = pupilRecords(key), name = displayName(key, Object.values(recs));
    const blob = new Blob([JSON.stringify(recs, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `${safeFile(name)}-progress-${new Date().toISOString().slice(0, 10)}.json`; a.click();
  }
  function exportPupilCSV(key) {
    const recs = pupilRecords(key), name = displayName(key, Object.values(recs));
    downloadCSV(buildRows(recs), `${safeFile(name)}-progress-${new Date().toISOString().slice(0, 10)}.csv`);
  }
  function buildRows(data) {
    const rows = [['Pupil', 'Email', 'Term', 'Topic', 'Step Number', 'Step', 'Source', 'Attempt #', 'Started At', 'Completed', 'Exercise', 'Concept', 'First Try', 'Correct', 'Wrong', 'Time on Task (s)']];
    const groups = groupRecords(data);
    Object.keys(groups).forEach(key => {
      const recs = groups[key], name = displayName(key, recs), email = emailOf(key, recs);
      recs.slice().sort(byStart).forEach(rec => {
        const ex = rec.exercises || {};
        const info = parseStepId(rec.stepId);
        const pool = info && (window.XELEDIF_POOLS || {})[info.topicKey], pstep = pool && pool.steps && pool.steps[info.stepKey];
        const base = [name, email, rec.term || '', rec.topic || '', rec.stepNumber || '', cleanLabel(rec.stepLabel || rec.stepId),
                      kindOf(rec) === 'practice' ? 'Practice' : 'Regular', rec.attemptNumber || 1, rec.startedAt || '', rec.completed ? 'yes' : 'no'];
        if (!Object.keys(ex).length) { rows.push([...base, '(no questions answered)', '', '', '', '', '']); return; }
        Object.entries(ex).sort((a, b) => parseInt(a[0]) - parseInt(b[0])).forEach(([num, e]) => {
          let concept = e.concept || '';
          if (!concept && pstep) { const q = pstep.questions.find(x => x.id === info.stepKey + '.Q' + String(num).padStart(4, '0')); concept = q ? q.concept : ''; }
          rows.push([...base, 'Q' + num, concept, e.firstTry === true ? 'yes' : e.firstTry === false ? 'no' : '', e.correct, e.wrong, e.timeOnTaskMs ? Math.round(e.timeOnTaskMs / 1000) : '']);
        });
      });
    });
    return rows;
  }
  function downloadCSV(rows, filename) {
    const csv = rows.map(r => r.map(cell => { const s = String(cell == null ? '' : cell); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; }).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click();
  }

  /* ---------- official names from Firestore (teacher only) ---------- */
  function loadUserNames() {
    const wait = (typeof waitForRole === 'function') ? waitForRole() : Promise.resolve(null);
    return wait.then(role => {
      if (role !== 'teacher' || typeof firebase === 'undefined') return;
      return firebase.firestore().collection('users').get().then(snap => {
        const m = {};
        snap.forEach(d => { const u = d.data(); m[d.id] = { name: (u.pupilName || '').trim(), email: u.email || '', role: u.role || '' }; });
        window.__userNames = m; render();
      });
    }).catch(err => console.warn('[dashboard] could not load pupil names (is the new firestore.rules published?)', err && err.message));
  }

  /* ---------- take over (only once the page and its own script have finished loading) ---------- */
  function start() {
    Object.assign(window, { render, pupilRecords, exportPupilJSON, exportPupilCSV, buildRows, downloadCSV, groupRecords, openParentReport,
                            __conceptReport: conceptReport, __parentReportHtml: parentReportHtml });
    render();
    loadUserNames();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
