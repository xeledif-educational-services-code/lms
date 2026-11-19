/* ============================================================
   XELEDIF PRACTICE ZONE — UI (step 2 of 4)
   Place NEXT TO index.html (primary-maths\pool-ui.js).
   Needs pool-engine.js loaded first.

   What it does
     - Adds a "Practice Zone" panel BELOW the lesson + exercises of any step
       that has a question pool.
     - Idle panel: progress meter + "Practise 10 new questions" button.
     - Carousel: one question at a time, progress dots, retry until correct,
       hint after a wrong answer, "Next" button.
     - Summary: first-try score, per-question list, concepts to practise.
   What it does NOT do yet (step 3): save to Firestore. History is kept in the
   browser (localStorage) through PracticeZone.store, which step 3 replaces.
   PracticeZone.hooks.* are the places step 3 plugs real-time saving into.
   ============================================================ */
(function () {
  'use strict';
  const E = window.PoolEngine;
  if (!E) { console.warn('pool-ui.js: load pool-engine.js first'); return; }

  const SESSION = 10;

    /* ── render any "a b/c" or "b/c" pattern in plain text as stacked fractions ──
     Used for question stems and option labels. HTML-bearing strings are
     returned untouched so the function is safe to call on pre-built markup. */
  function renderFractions(text) {
    if (typeof text !== 'string') return String(text == null ? '' : text);
    if (/<[a-z][\s\S]*>/i.test(text)) return text;
    const frac = (n, d) => '<span class="frac"><span class="num">' + n + '</span><span class="den">' + d + '</span></span>';
    return text
      .replace(/(\d+)\s+(\d+)\/(\d+)/g, (_, w, n, d) => w + frac(n, d))
      .replace(/(?<![\d\/])(\d+)\/(\d+)(?![\d\/])/g, (_, n, d) => frac(n, d));
  }

  /* ---------------- styles (injected once) ---------------- */
  const CSS = `
  .pz-panel{margin:18px 0 6px;border:2px solid #1D9E75;border-radius:16px;background:linear-gradient(180deg,#F0FAF6,#fff);padding:16px;font-family:inherit;color:#1a1a1a;}
  .pz-head{display:flex;align-items:center;gap:12px;margin-bottom:10px;}
  .pz-rocket{font-size:30px;}
  .pz-title{font-size:18px;font-weight:800;color:#085041;}
  .pz-sub{font-size:12.5px;color:#555;}
  .pz-meter{height:12px;background:#E5E7EB;border-radius:8px;overflow:hidden;margin:8px 0 6px;}
  .pz-meter-fill{height:100%;background:linear-gradient(90deg,#2DD4BF,#1D9E75);border-radius:8px;transition:width .4s;}
  .pz-meter-text{font-size:13px;color:#444;margin-bottom:12px;line-height:1.5;}
  .pz-btn{display:inline-block;padding:13px 22px;border:none;border-radius:12px;background:#1D9E75;color:#fff;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit;box-shadow:0 3px 0 #0F6E56;}
  .pz-btn:hover{background:#17896A;}
  .pz-btn.alt{background:#fff;color:#085041;border:2px solid #1D9E75;box-shadow:none;}
  .pz-note{font-size:11.5px;color:#666;margin-top:10px;line-height:1.5;}
  .pz-dots{display:flex;gap:7px;margin:6px 0 12px;flex-wrap:wrap;}
  .pz-dot{width:20px;height:20px;border-radius:50%;background:#E5E7EB;border:2px solid #D1D5DB;}
  .pz-dot.cur{background:#fff;border-color:#1D9E75;box-shadow:0 0 0 3px #A7F3D0;}
  .pz-dot.ok{background:#639922;border-color:#3B6D11;}
  .pz-dot.retry{background:#F59E0B;border-color:#B45309;}
  .pz-card{background:#fff;border:1.5px solid #D1E7DD;border-radius:14px;padding:16px;}
  .pz-tag{display:inline-block;font-size:11px;font-weight:700;padding:2px 10px;border-radius:10px;margin-bottom:8px;}
  .pz-tag.n{background:#E6F1FB;color:#0C447C;} .pz-tag.t{background:#EEEDFE;color:#3C3489;} .pz-tag.b{background:#FAECE7;color:#712B13;}
  .pz-stem{font-size:18px;font-weight:700;line-height:1.5;margin-bottom:14px;}
  .pz-opts{display:flex;flex-direction:column;gap:9px;}
  .pz-opt{display:flex;align-items:center;gap:12px;text-align:left;width:100%;min-height:48px;padding:10px 14px;border:2px solid #CBD5E1;border-radius:12px;background:#F8FAFC;font-size:16px;font-family:inherit;cursor:pointer;color:#1a1a1a;}
  .pz-opt:hover:not(:disabled){background:#EEF2F7;}
  .pz-letter{flex:0 0 28px;height:28px;border-radius:50%;background:#1D9E75;color:#fff;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center;}
  .pz-opt.good{background:#639922;border-color:#3B6D11;color:#fff;} .pz-opt.good .pz-letter{background:#fff;color:#3B6D11;}
  .pz-opt.bad{background:#D85A30;border-color:#9B3A18;color:#fff;opacity:.85;} .pz-opt.bad .pz-letter{background:#fff;color:#9B3A18;}
  .pz-opt.dim{opacity:.55;}
  .pz-opt:disabled{cursor:default;}
  .pz-fb{min-height:24px;margin-top:12px;font-size:14px;font-weight:700;}
  .pz-fb.good{color:#27500A;} .pz-fb.bad{color:#712B13;}
  .pz-hint{margin-top:6px;font-size:13px;font-weight:600;color:#633806;background:#FAEEDA;border-radius:8px;padding:8px 10px;}
  .pz-next{margin-top:12px;text-align:right;}
  .pz-warn{margin-top:10px;font-size:12px;font-weight:700;color:#712B13;background:#FAECE7;border-radius:8px;padding:6px 10px;display:none;}
  .pz-big{font-size:34px;font-weight:800;margin:4px 0;}
  .pz-sum{border-radius:12px;padding:14px;margin-bottom:12px;}
  .pz-rows{margin:10px 0;display:flex;flex-direction:column;gap:5px;}
  .pz-row{display:flex;gap:8px;align-items:flex-start;font-size:13px;line-height:1.4;padding:6px 8px;border-radius:8px;background:#F8FAFC;}
  .pz-chips{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 12px;}
  .pz-chip{font-size:12px;font-weight:700;padding:4px 10px;border-radius:12px;background:#FAEEDA;color:#633806;border:1px solid #FAC775;}
  .pz-actions{display:flex;gap:10px;flex-wrap:wrap;}
  .frac{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;line-height:1.05;font-size:.85em;margin:0 2px;position:relative;top:-.12em;}
  .frac .num,.frac .den{padding:0 3px;}
  .frac .num{border-bottom:1.2px solid currentColor;padding-bottom:1px;}
  .frac .den{padding-top:1px;}
  .pz-opt .frac{font-size:1.1em;top:-.14em;}
  @media(max-width:480px){.pz-stem{font-size:16px;} .pz-opt{font-size:15px;}}`;
  function injectCss() {
    if (document.getElementById('pz-style')) return;
    const s = document.createElement('style'); s.id = 'pz-style'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ---------------- tiny DOM helpers (text is always set with textContent) ---------------- */
  function div(cls, text) { const d = document.createElement('div'); if (cls) d.className = cls; if (text !== undefined) d.textContent = text; return d; }
  function btn(cls, text, onclick) { const b = document.createElement('button'); b.type = 'button'; b.className = cls; b.textContent = text; b.onclick = onclick; return b; }

  /* ---------------- who is the pupil? (step 3 will use the Firebase uid for sure) ---------------- */
  function pupilId() {
    try { if (typeof getFirebaseUser === 'function') { const u = getFirebaseUser(); if (u && u.uid) return u.uid; } } catch (e) {}
    try { return localStorage.getItem('xeledif.pupil') || 'local'; } catch (e) { return 'local'; }
  }

  /* ---------------- history store (swap this object in step 3) ---------------- */
  const localStore = {
    key(stepKey) { return 'xeledif.pool.hist.v1::' + pupilId() + '::' + stepKey; },
    load(stepKey) {
      try { const raw = localStorage.getItem(this.key(stepKey)); return Promise.resolve(raw ? JSON.parse(raw) : null); }
      catch (e) { return Promise.resolve(null); }
    },
    save(stepKey, history) {
      try { localStorage.setItem(this.key(stepKey), JSON.stringify(history)); return Promise.resolve(); }
      catch (e) { return Promise.reject(e); }
    }
  };

  /* ---------------- the core-10 exercises count as "seen" ----------------
     Lesson exercise k  ==  pool question Q000k (by design).  We read the
     existing ProgressStore (never prompting) and mark those questions as seen. */
  function importCore(history, ctx) {
    try {
      if (typeof ProgressStore === 'undefined' || !ctx.stepId) return history;
      const pupil = localStorage.getItem('xeledif.pupil');
      if (!pupil) return history;
      const valid = new Set(E.activeQuestions(ctx.data).map(q => q.id));
      const h = JSON.parse(JSON.stringify(history));
      const all = ProgressStore.readAll();
      Object.values(all).forEach(rec => {
        if (!rec || rec.stepId !== ctx.stepId || rec.pupil !== pupil) return;
        Object.entries(rec.exercises || {}).forEach(([num, e]) => {
          if (!(e.correct > 0 || e.wrong > 0)) return;
          const qid = ctx.stepKey + '.Q' + String(num).padStart(4, '0');
          if (!valid.has(qid) || h.seen[qid]) return;
          h.seen[qid] = { n: 1, ftc: e.firstTry === true ? 1 : 0, wrong: e.wrong || 0, ms: e.timeOnTaskMs || 0, last: rec.updatedAt || null, core: true };
          if (!h.inCycle.includes(qid)) h.inCycle.push(qid);
        });
      });
      return h;
    } catch (err) { console.warn('importCore skipped:', err); return history; }
  }

  /* ============================================================
     PracticeZone
     ============================================================ */
  const PZ = {
    store: localStore,
    hooks: {                       // step 3 plugs real-time saving in here
      onSessionStart(info) {},     // a session begins     { ctx }
      onClick(info) {},            // every option click  { ctx, question, correct, wrongSoFar }
      onAnswer(info) {},           // a question solved   { ctx, question, result, history, session }
      onSessionEnd(info) {}        // all 10 done         { ctx, results, firstTry }
    },
    ctx: null,
    _token: 0,

    available() { return !!this.ctx; },

    mount(host, topic, step) {
      injectCss();
      this._token++;
      const token = this._token;
      const old = host.querySelector('#pz-root'); if (old) old.remove();
      if (!topic || !topic.poolFile || !step || !step.poolStep) { this.ctx = null; return; }

      const root = document.createElement('div'); root.id = 'pz-root'; root.className = 'pz-panel';
      host.appendChild(root);
      const ctx = { token, host, root, topic, step, stepKey: step.poolStep, stepId: window.__currentStepId || '',
                    state: 'loading', history: null, data: null, session: null };
      this.ctx = ctx;
      root.textContent = '⏳ Loading practice questions…';

      E.loadPool(topic.poolFile, topic.poolKey).then(pool => {
        if (token !== this._token) return;
        const data = pool.steps && pool.steps[ctx.stepKey];
        if (!data) throw new Error('Step ' + ctx.stepKey + ' is not in the pool');
        ctx.data = data;
        return this.store.load(ctx.stepKey).then(h => {
          if (token !== this._token) return;
          ctx.history = importCore(h || E.emptyHistory(ctx.stepKey, pupilId()), ctx);
          this.showIdle(ctx);
        });
      }).catch(err => {
        if (token !== this._token) return;
        console.warn('Practice Zone:', err);
        this.showError(ctx);
      });
    },

    /* index.html rebuilds the step area when a fresh attempt starts — put the panel back */
    remount(host) {
      if (window.__currentTopic && window.__currentStepObject) this.mount(host, window.__currentTopic, window.__currentStepObject);
    },

    /* the "Practise 10 more" button inside the scorecard pop-up */
    fromScorecard() {
      const ov = document.getElementById('mcq-modal-overlay'); if (ov) ov.classList.remove('show');
      const ctx = this.ctx; if (!ctx) return;
      ctx.root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (ctx.state === 'idle') this.startSession(ctx);
    },

    /* ---------------- screens ---------------- */
    showError(ctx) {
      ctx.state = 'error';
      const r = ctx.root; r.innerHTML = '';
      r.appendChild(div('pz-title', '🚀 Practice Zone'));
      r.appendChild(div('pz-meter-text', 'We could not load the practice questions. Please check your internet and try again.'));
      r.appendChild(btn('pz-btn', 'Try again', () => this.mount(ctx.host, ctx.topic, ctx.step)));
    },

    showIdle(ctx) {
      ctx.state = 'idle';
      ctx.history = importCore(ctx.history, ctx);        // picks up core exercises finished since mounting
      const p = E.progress(ctx.data, ctx.history);
      const pct = Math.round(100 * p.seenDistinct / p.total);
      const r = ctx.root; r.innerHTML = '';

      const head = div('pz-head');
      head.appendChild(div('pz-rocket', '🚀'));
      const hb = div(); hb.appendChild(div('pz-title', 'Practice Zone')); hb.appendChild(div('pz-sub', 'Extra questions for this step — practise as much as you like!'));
      head.appendChild(hb); r.appendChild(head);

      const meter = div('pz-meter'); const fill = div('pz-meter-fill'); fill.style.width = pct + '%'; meter.appendChild(fill); r.appendChild(meter);
      const t = div('pz-meter-text');
      t.textContent = 'You have practised ' + p.seenDistinct + ' of ' + p.total + ' different questions in this step' + (p.round > 1 ? ' · Round ' + p.round : '') + '.';
      r.appendChild(t);

      const label = (p.seenDistinct === 0 || p.leftThisRound >= SESSION) ? 'Practise ' + SESSION + ' new questions' : 'Practise ' + SESSION + ' more questions';
      r.appendChild(btn('pz-btn', label, () => this.startSession(ctx)));
      r.appendChild(div('pz-note', p.round > 1
        ? 'You have been through every question! They now come round again, starting with the ones you missed.'
        : 'Optional — but the more you practise, the better your teacher can see what you have mastered.'));
    },

    startSession(ctx) {
      ctx.history = importCore(ctx.history, ctx);
      const sel = E.pickSession(ctx.data, ctx.history, SESSION);
      if (!sel.questions.length) { this.showError(ctx); return; }
      ctx.history = sel.history;                           // may start a new round; saved with the first answer
      ctx.session = { raw: sel.questions, qs: sel.questions.map(q => E.prepare(q)), i: 0, results: [], wrong: 0, shownAt: 0, locked: false, refs: null };
      try { this.hooks.onSessionStart({ ctx }); } catch (e) { console.warn('hook error', e); }
      this.renderQuestion(ctx);
    },

        /* Scroll to the lesson example card whose title starts with "Example N".
       Falls back to the top of the step content if the card isn't found.
       Uses smooth scrolling so the pupil can follow the motion. */
    jumpToExample(n) {
      const cards = Array.from(document.querySelectorAll('.step-content-area .card'));
      const re = new RegExp('^Example\\s+' + Number(n) + '\\b');
      const target = cards.find(c => {
        const t = (c.querySelector('.card-title')?.textContent || '').trim();
        return re.test(t);
      });
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // subtle flash so the eye lands on it
        target.style.transition = 'box-shadow .6s';
        target.style.boxShadow = '0 0 0 3px #FCD34D';
        setTimeout(() => { target.style.boxShadow = ''; }, 1400);
      } else {
        // Fallback: at least scroll up so the pupil sees the lesson
        const area = document.querySelector('.step-content-area:not(.hidden)');
        if (area) area.scrollIntoView({ behavior: 'smooth', block: 'start' });
        console.warn('[pool-ui] Example', n, 'not found in step content');
      }
    },


    renderQuestion(ctx) {
      ctx.state = 'question';
      const S = ctx.session, q = S.qs[S.i], r = ctx.root;
      r.innerHTML = '';
      S.wrong = 0; S.locked = false; S.shownAt = Date.now();

      const head = div('pz-head'); head.appendChild(div('pz-rocket', '🚀'));
      const hb = div(); hb.appendChild(div('pz-title', 'Practice Zone')); hb.appendChild(div('pz-sub', 'Question ' + (S.i + 1) + ' of ' + S.qs.length));
      head.appendChild(hb); r.appendChild(head);

      const dots = div('pz-dots');
      S.qs.forEach((_, k) => {
        const d = div('pz-dot'); const res = S.results[k];
        if (res) d.classList.add(res.firstTry ? 'ok' : 'retry'); else if (k === S.i) d.classList.add('cur');
        dots.appendChild(d);
      });
      r.appendChild(dots);

      const card = div('pz-card');
      const tag = document.createElement('span');
      tag.className = 'pz-tag ' + q.level;
      tag.textContent = q.level === 'b' ? '🔥 Boss level' : q.level === 't' ? '🧠 Think deeper' : '⭐ Practice';
      card.appendChild(tag);
      const stemDiv = div('pz-stem');
      stemDiv.innerHTML = renderFractions(q.stem);       // fractions in the stem
      card.appendChild(stemDiv);

      // ── Hint ── optional per-question "Review Example N" panel.
      // source: q.exampleRef (set in pool data) OR q._raw.exampleRef
      // (if pool-engine's prepare() copies the raw question).
      const exampleRef = q.exampleRef || (q._raw && q._raw.exampleRef);
      if (exampleRef) {
        const hintWrap = div('pz-hintref');
        hintWrap.style.marginBottom = '10px';
        hintWrap.style.fontSize = '12.5px';
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.style.cssText = 'background:none;border:none;color:#5B21B6;font-size:12.5px;font-weight:600;cursor:pointer;padding:0;font-family:inherit;';
        toggle.textContent = '💡 Hint';
        const body = document.createElement('div');
        body.style.cssText = 'display:none;margin-top:4px;color:#555;line-height:1.5;';
        body.innerHTML =
          'Review <strong>Example ' + exampleRef.n + '</strong>' +
          (exampleRef.label ? ': ' + renderFractions(exampleRef.label) : '') + '. ' +
          '<a href="#" class="pz-hint-jump" data-example="' + exampleRef.n + '" style="color:#185FA5;text-decoration:underline;">Go to example ↓</a>';
        toggle.onclick = () => { body.style.display = body.style.display === 'none' ? 'block' : 'none'; };
        hintWrap.appendChild(toggle);
        hintWrap.appendChild(body);
        card.appendChild(hintWrap);

        // delegate the "Go to example" click once per mount
        body.querySelector('.pz-hint-jump').addEventListener('click', (e) => {
          e.preventDefault();
          this.jumpToExample(exampleRef.n);
        });
      }

      const opts = div('pz-opts'); const buttons = [];
      q.options.forEach((text, i) => {
        const b = document.createElement('button'); b.type = 'button'; b.className = 'pz-opt';
        const L = document.createElement('span'); L.className = 'pz-letter'; L.textContent = 'ABCD'[i];
        const T = document.createElement('span'); T.innerHTML = renderFractions(text);
        b.appendChild(L); b.appendChild(T);


        b.appendChild(L); b.appendChild(T);
        b.onclick = () => this.choose(ctx, i, b);
        opts.appendChild(b); buttons.push(b);
      });
      card.appendChild(opts);
      const fb = div('pz-fb'); card.appendChild(fb);
      const next = div('pz-next'); card.appendChild(next);
      r.appendChild(card);
      const warn = div('pz-warn', '⚠️ Your last answer has not been saved yet. Please check your internet connection.');
      if (ctx.unsaved) warn.style.display = 'block';
      r.appendChild(warn);
      S.refs = { fb, next, buttons, warn, card };
    },

    choose(ctx, i, b) {
      const S = ctx.session; if (!S || S.locked || b.disabled) return;
      const q = S.qs[S.i], R = S.refs;
      if (i === q.correctIndex) {
        S.locked = true;
        b.classList.add('good');
        R.buttons.forEach(x => { if (x !== b) { x.disabled = true; if (!x.classList.contains('bad')) x.classList.add('dim'); } });
        b.disabled = true;
        const result = { firstTry: S.wrong === 0, wrong: S.wrong, ms: Date.now() - S.shownAt };
        S.results[S.i] = { id: q.id, concept: q.concept, level: q.level, stem: q.stem, firstTry: result.firstTry, wrong: result.wrong, ms: result.ms };
        ctx.history = E.recordAnswer(ctx.history, S.raw[S.i], result);
        this.persist(ctx);
        try { this.hooks.onClick({ ctx, question: q, correct: true, wrongSoFar: S.wrong }); this.hooks.onAnswer({ ctx, question: q, result, history: ctx.history, session: S }); }
        catch (e) { console.warn('hook error', e); }
        R.fb.className = 'pz-fb good';
        R.fb.textContent = result.firstTry ? '✓ Correct — first try! 🌟' : '✓ Correct! You got there.';
        const last = S.i === S.qs.length - 1;
        R.next.appendChild(btn('pz-btn', last ? 'See my score ▸' : 'Next question ▸', () => {
          if (last) this.finish(ctx); else { S.i++; this.renderQuestion(ctx); }
        }));
      } else {
        S.wrong++;
        b.classList.add('bad'); b.disabled = true;
        R.fb.className = 'pz-fb bad';
        R.fb.textContent = 'Not quite — have another go!';
        if (q.hint && !R.card.querySelector('.pz-hint')) { const h = div('pz-hint', '💡 Hint: ' + q.hint); R.fb.after(h); }
        try { this.hooks.onClick({ ctx, question: q, correct: false, wrongSoFar: S.wrong }); } catch (e) { console.warn('hook error', e); }
      }
    },

    /* saves the history immediately after every solved question.
       If the save is not confirmed within 5 seconds (e.g. offline) the pupil sees a warning;
       it disappears as soon as the save is finally confirmed. */
    persist(ctx) {
      const token = ctx.token; let settled = false;
      const showWarn = on => {
        ctx.unsaved = on;
        if (token === ctx.token && ctx.session && ctx.session.refs) ctx.session.refs.warn.style.display = on ? 'block' : 'none';
      };
      const timer = setTimeout(() => { if (!settled) showWarn(true); }, 5000);
      Promise.resolve(this.store.save(ctx.stepKey, ctx.history, ctx.data))
        .then(() => { settled = true; clearTimeout(timer); showWarn(false); })
        .catch(err => { settled = true; clearTimeout(timer); console.warn('save failed', err); showWarn(true); });
    },

    finish(ctx) {
      ctx.state = 'summary';
      const S = ctx.session, res = S.results, r = ctx.root;
      const first = res.filter(x => x.firstTry).length, total = res.length, pct = Math.round(100 * first / total);
      const band = pct >= 80 ? ['#EAF3DE', '#27500A', '🎉 Brilliant work!'] : pct >= 50 ? ['#FAEEDA', '#633806', '👍 Good effort — keep going!']
                                                                        : ['#FAECE7', '#712B13', '💪 Every try makes you stronger!'];
      r.innerHTML = '';
      r.appendChild(div('pz-title', '🚀 Practice Zone — session complete'));

      const sum = div('pz-sum'); sum.style.background = band[0]; sum.style.color = band[1];
      sum.appendChild(div('', band[2]));
      sum.appendChild(div('pz-big', first + ' / ' + total));
      sum.appendChild(div('', 'first-try correct (' + pct + '%) · you solved all ' + total + ' questions'));
      r.appendChild(sum);

      const conceptName = id => { const c = (ctx.data.concepts || []).find(x => x.id === id); return c ? c.name : id; };
      const missed = []; res.forEach(x => { if (!x.firstTry && !missed.includes(x.concept)) missed.push(x.concept); });
      if (missed.length) {
        r.appendChild(div('pz-meter-text', 'Worth practising a little more:'));
        const chips = div('pz-chips');
        missed.forEach(c => chips.appendChild(div('pz-chip', conceptName(c))));
        r.appendChild(chips);
      } else {
        r.appendChild(div('pz-meter-text', 'You got every question right first time! 🌟'));
      }

      const rows = div('pz-rows');
      res.forEach((x, k) => {
        const row = div('pz-row');
        row.appendChild(div('', x.firstTry ? '✅' : '⚠️'));
        row.appendChild(div('', (k + 1) + '. ' + (x.stem.length > 70 ? x.stem.slice(0, 70) + '…' : x.stem)));
        rows.appendChild(row);
      });
      r.appendChild(rows);

      const act = div('pz-actions');
      act.appendChild(btn('pz-btn', 'Practise ' + SESSION + ' more', () => this.startSession(ctx)));
      act.appendChild(btn('pz-btn alt', 'Close', () => this.showIdle(ctx)));
      r.appendChild(act);

      try { this.hooks.onSessionEnd({ ctx, results: res, firstTry: first }); } catch (e) { console.warn('hook error', e); }
    }
  };

  window.PracticeZone = PZ;
})();
