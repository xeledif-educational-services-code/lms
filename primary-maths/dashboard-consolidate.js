/* ============================================================
   XELEDIF DASHBOARD — ONE BLOCK PER PUPIL
   Place NEXT TO dashboard.html (primary-maths\dashboard-consolidate.js) and add
   ONE line as the very LAST script of dashboard.html (after the big inline <script>):
        <script src="dashboard-consolidate.js"></script>

   What it does
   - Groups every record by the pupil's permanent ID (pupilUid). Older records
     without it fall back to email, then to name.
   - The pupil's name is the name stored in Firestore users/<uid>.pupilName
     (the teacher can read it). So "SeeJabor" and "seejabor@yahoo.com" are one person.
   - Inside a pupil, ONE block per lesson step, holding the Regular exercises AND
     every Practice Zone session, each marked with a badge.
   - Exports (JSON / CSV) are consolidated the same way; the CSV opens correctly in
     Excel (no more "â€”") and has new Email, Source and Concept columns.
   It replaces: render, pupilRecords, exportPupilJSON, exportPupilCSV, buildRows, downloadCSV.
   ============================================================ */
(function () {
  'use strict';

  window.__userNames = window.__userNames || {};       // uid -> { name, email }

  /* ---------- helpers ---------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const baseStepId = id => String(id || '').replace(/-practice$/, '');
  const cleanLabel = l => String(l || '').replace(/\s+[—–-]\s*Practice Zone\s*$/i, '');
  const kindOf = rec => (rec.source === 'practice' || /-practice$/.test(rec.stepId || '')) ? 'practice' : 'regular';
  const byTime = (a, b) => String(a.startedAt || '').localeCompare(String(b.startedAt || '')) || (a.attemptNumber || 0) - (b.attemptNumber || 0);
  const isTest = rec => rec.stepId === 'test-step' || String(rec.attemptId || '').startsWith('smoke-test-');
  const looksLikeEmail = s => /@/.test(String(s || ''));

  /* ---------- who is who ---------- */
  function displayName(key, recs) {
    const u = window.__userNames[key];
    if (u && u.name) return u.name;                                  // 1. the official name from users/<uid>
    const counts = {};                                               // 2. otherwise the most common non-email name
    recs.forEach(r => { const n = String(r.pupil || '').trim(); if (n && !looksLikeEmail(n)) counts[n] = (counts[n] || 0) + 1; });
    const best = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
    if (best) return best;
    const any = recs.map(r => r.pupil).find(Boolean);                // 3. anything (may be an email)
    return any || key;
  }
  function emailOf(key, recs) {
    const u = window.__userNames[key];
    return (u && u.email) || (recs.find(r => r.pupilEmail) || {}).pupilEmail || '';
  }

  /* Group records: uid first, then email (mapped to a uid when known), then name. */
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
    // records that only had a name: merge into a pupil whose official name matches
    const byName = {};                     // every name this pupil has ever been recorded under -> their key
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
     render — same look as before, one block per pupil
     ============================================================ */
  function render() {
    const root = document.getElementById('root');
    const groups = groupRecords(readAll());
    const keys = Object.keys(groups);
    if (!keys.length) {
      root.innerHTML = '<div class="empty">No progress recorded yet. Once a pupil answers a question, it will appear here.</div>';
      return;
    }
    keys.sort((a, b) => displayName(a, groups[a]).localeCompare(displayName(b, groups[b])));

    root.innerHTML = keys.map(key => {
      const recs = groups[key], name = displayName(key, recs), email = emailOf(key, recs);

      // one block per lesson step (Regular + Practice together)
      const stepMap = {};
      recs.forEach(rec => {
        const sid = baseStepId(rec.stepId);
        const m = stepMap[sid] || (stepMap[sid] = { stepId: sid, stepLabel: cleanLabel(rec.stepLabel || sid), attempts: [] });
        m.attempts.push(rec);
      });
      const steps = Object.values(stepMap).map(s => { s.attempts.sort(byTime); return s; }).sort((a, b) => {
        const sa = a.attempts.find(x => x.term || x.topic) || a.attempts[0] || {};
        const sb = b.attempts.find(x => x.term || x.topic) || b.attempts[0] || {};
        return (sa.term || '').localeCompare(sb.term || '') || (sa.topic || '').localeCompare(sb.topic || '') || (sa.stepNumber || 0) - (sb.stepNumber || 0);
      });

      // pupil totals
      let totalAttempts = 0, totalQuestions = 0, totalFirstTry = 0, totalSolved = 0, totalWrong = 0, nReg = 0, nPrac = 0;
      steps.forEach(({ attempts }) => attempts.forEach(rec => {
        totalAttempts++; kindOf(rec) === 'practice' ? nPrac++ : nReg++;
        const ex = Object.values(rec.exercises || {});
        totalQuestions += ex.length;
        totalFirstTry += ex.filter(e => e.firstTry === true).length;
        totalSolved += ex.filter(e => e.correct > 0).length;
        totalWrong += rec.wrong || 0;
      }));
      const pBucket = bucket(totalFirstTry, totalQuestions);

      // priority focus: steps below 50% first-try
      const weakSteps = steps.map(({ stepLabel, attempts }) => {
        const sample = attempts.find(a => a.term || a.topic) || {};
        let qs = 0, first = 0;
        attempts.forEach(rec => { const ex = Object.values(rec.exercises || {}); qs += ex.length; first += ex.filter(e => e.firstTry === true).length; });
        return { term: sample.term || '', topic: sample.topic || '', stepNumber: sample.stepNumber || 0, stepLabel, pct: qs ? first / qs : 0, qs };
      }).filter(s => s.pct < 0.5 && s.qs > 0).sort((a, b) => a.pct - b.pct);

      const focusHtml = weakSteps.length
        ? `<div style="background:#FAECE7;border:1px solid #F0997B;border-radius:10px;padding:10px 14px;margin:8px 0 12px;">
             <div style="font-size:12px;font-weight:700;color:#712B13;margin-bottom:6px;">⚠️ Priority focus</div>
             <div style="font-size:12px;color:#712B13;line-height:1.6;">${weakSteps.map(s =>
               esc([s.term, s.topic, s.stepNumber ? 'Step ' + s.stepNumber : '', s.stepLabel].filter(Boolean).join(' · ')) + ': ' + Math.round(s.pct * 100) + '% first-try').join('<br>')}</div>
           </div>` : '';

      const stepBlocks = steps.map(({ stepLabel, attempts }) => {
        const sample = attempts.find(a => a.term || a.topic) || {};
        const termName = sample.term || '', topicName = sample.topic || '', stepNum = sample.stepNumber || '';
        let allQ = 0, allFirst = 0, allSolved = 0, allWrong = 0, sReg = 0, sPrac = 0;
        attempts.forEach(rec => {
          kindOf(rec) === 'practice' ? sPrac++ : sReg++;
          const ex = Object.values(rec.exercises || {});
          allQ += ex.length; allFirst += ex.filter(e => e.firstTry === true).length;
          allSolved += ex.filter(e => e.correct > 0).length; allWrong += rec.wrong || 0;
        });
        const stepBucket = bucket(allFirst, allQ);

        const trendBars = attempts.map((rec, i) => {
          const ex = Object.values(rec.exercises || {});
          const first = ex.filter(e => e.firstTry === true).length, total = ex.length || 1, pct = first / total;
          return `<div class="trend-bar ${trendClass(pct)}" style="height:${Math.max(10, Math.round(pct * 100))}%"
                       title="Attempt ${i + 1} (${kindOf(rec) === 'practice' ? 'Practice' : 'Regular'}): ${first}/${total} first-try (${Math.round(pct * 100)}%)"></div>`;
        }).join('');
        const trendLabels = attempts.map((rec, i) => `<span>${kindOf(rec) === 'practice' ? 'P' : 'R'}${i + 1}</span>`).join('');

        const qWrong = {};
        attempts.forEach(rec => Object.entries(rec.exercises || {}).forEach(([num, e]) => { qWrong[num] = (qWrong[num] || 0) + (e.wrong || 0); }));
        const hotQs = Object.entries(qWrong).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]).slice(0, 5);
        const hotHtml = hotQs.length
          ? `<div style="font-size:11px;color:var(--text-sec);margin-top:8px;"><strong>Most-missed questions:</strong> ${hotQs.map(([num, n]) => `Q${esc(num)} (${n}✗)`).join(' · ')}</div>` : '';

        const attemptRows = attempts.map((rec, i) => ({ rec, seq: i + 1 })).reverse().map(({ rec, seq }) => {
          const ex = Object.entries(rec.exercises || {}).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
          const firstTry = ex.filter(([, e]) => e.firstTry === true).length;
          const solved = ex.filter(([, e]) => e.correct > 0).length;
          const b = bucket(firstTry, ex.length);
          const prac = kindOf(rec) === 'practice';
          const badge = prac ? '<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:9px;background:#E1F5EE;color:#085041;border:1px solid #9FE1CB;">🚀 Practice</span>'
                             : '<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:9px;background:#EEEDFE;color:#3C3489;border:1px solid #CECBF6;">📘 Regular</span>';

          const perQ = ex.map(([num, e]) => {
            const isFirst = e.firstTry === true, isRetry = e.firstTry === false && e.correct > 0, isFail = e.correct === 0;
            const cls = isFirst ? 'first' : isRetry ? 'retry' : isFail ? 'fail' : '';
            const icon = isFirst ? '✅' : isRetry ? '⚠️' : '❌';
            const time = e.timeOnTaskMs ? Math.round(e.timeOnTaskMs / 1000) + 's' : '—';
            return `<div class="q-cell ${cls}" title="${esc(e.concept || '')}"><span class="qlab">${icon} Q${esc(num)}</span><span class="qdet">${e.wrong ? e.wrong + '✗' : '0✗'} · ${time}</span></div>`;
          }).join('');

          const started = rec.startedAt ? new Date(rec.startedAt).toLocaleString() : '—';
          const status = rec.completed ? 'submitted' : 'incomplete';
          return `
            <div class="attempt">
              <div class="attempt-head" onclick="this.parentElement.classList.toggle('open')">
                <span class="num">Attempt ${seq}</span>${badge}
                <span class="date">${started} · ${status}</span>
                <span class="score" style="color:${b.cls === 'good' ? 'var(--good-fg)' : b.cls === 'mid' ? 'var(--mid-fg)' : 'var(--bad-fg)'}">${firstTry}/${ex.length} first-try</span>
                <span class="arrow">▶</span>
              </div>
              <div class="attempt-body">
                <div class="step-meta">
                  <span>Solved: <strong>${solved}/${ex.length}</strong></span>
                  <span>Wrong attempts: <strong>${rec.wrong || 0}</strong></span>
                  <span>Questions touched: <strong>${ex.length}</strong></span>
                </div>
                <div class="q-grid">${perQ}</div>
              </div>
            </div>`;
        }).join('');

        return `
          <div class="step-block">
            <div class="step-head">
              <h3>
                <span style="font-size:11px;color:var(--text-sec);font-weight:600;display:block;margin-bottom:2px;">${esc(termName)}${topicName ? ' · ' + esc(topicName) : ''}${stepNum ? ' · Step ' + stepNum : ''}</span>
                ${esc(stepLabel)}
              </h3>
              <span class="pill ${stepBucket.cls}">${stepBucket.label} aggregate</span>
            </div>
            <div class="step-meta">
              <span>Regular attempts: <strong>${sReg}</strong></span>
              <span>Practice sessions: <strong>${sPrac}</strong></span>
              <span>Total questions: <strong>${allQ}</strong></span>
              <span>Aggregate first-try: <strong>${allFirst}/${allQ}</strong></span>
              <span>Aggregate solved: <strong>${allSolved}/${allQ}</strong></span>
              <span>Total wrong clicks: <strong>${allWrong}</strong></span>
            </div>
            ${attempts.length >= 2 ? `<div style="font-size:11px;color:var(--text-sec);margin-top:6px;">Progress trend (first-try % per attempt — R = Regular, P = Practice):</div>
              <div class="trend">${trendBars}</div><div class="trend-labels">${trendLabels}</div>` : ''}
            ${hotHtml}
            <div class="attempt-list">${attemptRows}</div>
          </div>`;
      }).join('');

      return `
        <div class="pupil">
          <div class="pupil-head">
            <h2>${esc(name)}
              <span class="pill ${pBucket.cls}">${pBucket.label} aggregate</span>
              ${email ? `<span style="font-size:12px;color:#777;font-weight:400;">${esc(email)}</span>` : ''}
            </h2>
            <button class="small" data-key="${encodeURIComponent(key)}" onclick="exportPupilJSON(decodeURIComponent(this.dataset.key))">⬇ Export ${esc(name)}</button>
            <button class="small" data-key="${encodeURIComponent(key)}" onclick="exportPupilCSV(decodeURIComponent(this.dataset.key))">⬇ CSV</button>
          </div>
          <div class="kpis">
            <span>Steps attempted: <strong>${steps.length}</strong></span>
            <span>Regular attempts: <strong>${nReg}</strong></span>
            <span>Practice sessions: <strong>${nPrac}</strong></span>
            <span>Questions answered: <strong>${totalQuestions}</strong></span>
            <span>First-try correct: <strong>${totalFirstTry}</strong></span>
            <span>Eventually solved: <strong>${totalSolved}</strong></span>
            <span>Total wrong clicks: <strong>${totalWrong}</strong></span>
          </div>
          ${focusHtml}
          ${stepBlocks}
        </div>`;
    }).join('');
  }

  /* ============================================================
     exports — consolidated, Excel-safe
     ============================================================ */
  function pupilRecords(key) {                         // returns { id: record } for ONE pupil (key = uid/email/name key)
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
      recs.slice().sort(byTime).forEach(rec => {
        const ex = rec.exercises || {};
        const base = [name, email, rec.term || '', rec.topic || '', rec.stepNumber || '', cleanLabel(rec.stepLabel || rec.stepId),
                      kindOf(rec) === 'practice' ? 'Practice' : 'Regular', rec.attemptNumber || 1, rec.startedAt || '', rec.completed ? 'yes' : 'no'];
        if (!Object.keys(ex).length) { rows.push([...base, '(no questions answered)', '', '', '', '', '', '']); return; }
        Object.entries(ex).sort((a, b) => parseInt(a[0]) - parseInt(b[0])).forEach(([num, e]) => {
          rows.push([...base, 'Q' + num, e.concept || '', e.firstTry === true ? 'yes' : e.firstTry === false ? 'no' : '', e.correct, e.wrong,
                     e.timeOnTaskMs ? Math.round(e.timeOnTaskMs / 1000) : '']);
        });
      });
    });
    return rows;
  }
  function downloadCSV(rows, filename) {
    const csv = rows.map(r => r.map(cell => { const s = String(cell == null ? '' : cell); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; }).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });      // BOM → Excel shows — correctly
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click();
  }

  /* ---------- official names from Firestore (teacher only) ---------- */
  function loadUserNames() {
    const wait = (typeof waitForRole === 'function') ? waitForRole() : Promise.resolve(null);
    return wait.then(role => {
      if (role !== 'teacher' || typeof firebase === 'undefined') return;
      return firebase.firestore().collection('users').get().then(snap => {
        const m = {};
        snap.forEach(d => { const u = d.data(); m[d.id] = { name: (u.pupilName || '').trim(), email: u.email || '' }; });
        window.__userNames = m;
        render();
      });
    }).catch(err => console.warn('[dashboard] could not load pupil names (is the new firestore.rules published?)', err && err.message));
  }

  /* ---------- take over ---------- */
  window.render = render;
  window.pupilRecords = pupilRecords;
  window.exportPupilJSON = exportPupilJSON;
  window.exportPupilCSV = exportPupilCSV;
  window.buildRows = buildRows;
  window.downloadCSV = downloadCSV;
  window.groupRecords = groupRecords;

  render();
  loadUserNames();
})();
