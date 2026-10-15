/* ============================================================
   XELEDIF QUESTION POOL — Primary 5 · Spring · Decimals & Percentages
   topicKey : P5.SPR.DP
   FILE RULES
   - Plain data only. No functions, no HTML except the entities listed in the guide.
   - A question ID is permanent. Never reuse one. To fix a question, keep the ID and
     increase `v`. To remove one, set `retired:true` (never delete the object).
   - `correct` is the index in `options` AS AUTHORED. The engine shuffles at runtime.
   - `check` (optional) is a JS arithmetic expression the validator evaluates and
     compares with the correct option, so wrong answer keys are caught automatically.
   ============================================================ */
window.XELEDIF_POOLS = window.XELEDIF_POOLS || {};

window.XELEDIF_POOLS['P5.SPR.DP'] = {
  topicKey: 'P5.SPR.DP',
  schemaVersion: 1,
  steps: {

    /* ---------------------------------------------------------
       STEP 9 — Divide decimals by 10, 100 and 1,000   (PILOT)
       Lesson constant in index.html: P5_DP9
       --------------------------------------------------------- */
    'P5.SPR.DP.S09': {
      label: 'Divide decimals by 10, 100 and 1,000',
      lesson: 'P5_DP9',
      targetSize: 50,

      /* Concept list — drives the parent report. Target counts add up to 50. */
      concepts: [
        { id:'dp9.shift-right', name:'Digits move right (direction and number of places)', target:5 },
        { id:'dp9.div10',       name:'Divide by 10',                                     target:8 },
        { id:'dp9.div100',      name:'Divide by 100',                                    target:8 },
        { id:'dp9.div1000',     name:'Divide by 1,000',                                  target:9 },
        { id:'dp9.hero-zero',   name:'Hero zeros / place-holder zeros in answers',       target:6 },
        { id:'dp9.inverse',     name:'Inverse and missing numbers (× and ÷ by 10, 100, 1,000)', target:6 },
        { id:'dp9.units',       name:'Converting to bigger units (p→£, cm→m, g→kg, ml→L)', target:5 },
        { id:'dp9.reasoning',   name:'Comparing, ordering and spotting errors',          target:3 }
      ],

      /* Level mix to aim for across the 50: n = normal (≈34), t = think deeper (≈10), b = boss (≈6) */
      questions: [
        { id:'P5.SPR.DP.S09.Q0001', v:1, concept:'dp9.div10',     level:'n', difficulty:1,
          stem:'34 ÷ 10 = ?', options:['3.4','340','0.34'], correct:0, check:'34/10' },

        { id:'P5.SPR.DP.S09.Q0002', v:1, concept:'dp9.div10',     level:'n', difficulty:1,
          stem:'45.6 ÷ 10 = ?', options:['4.56','456','0.456'], correct:0, check:'45.6/10' },

        { id:'P5.SPR.DP.S09.Q0003', v:1, concept:'dp9.div100',    level:'n', difficulty:2,
          stem:'7.2 ÷ 100 = ?', options:['0.072','0.72','0.0072'], correct:0, check:'7.2/100' },

        { id:'P5.SPR.DP.S09.Q0004', v:1, concept:'dp9.div1000',   level:'n', difficulty:2,
          stem:'467.1 ÷ 1,000 = ?', options:['0.4671','4.671','0.04671'], correct:0, check:'467.1/1000' },

        { id:'P5.SPR.DP.S09.Q0005', v:1, concept:'dp9.div1000',   level:'n', difficulty:3,
          stem:'53.16 ÷ 1,000 = ?', options:['0.05316','0.5316','0.005316'], correct:0, check:'53.16/1000' },

        { id:'P5.SPR.DP.S09.Q0006', v:1, concept:'dp9.div1000',   level:'n', difficulty:1,
          stem:'5,316 ÷ 1,000 = ?', options:['5.316','53.16','0.5316'], correct:0, check:'5316/1000' },

        { id:'P5.SPR.DP.S09.Q0007', v:1, concept:'dp9.hero-zero', level:'n', difficulty:2,
          stem:'40 ÷ 1,000 = ?', options:['0.04','0.4','0.004'], correct:0, check:'40/1000' },

        { id:'P5.SPR.DP.S09.Q0008', v:1, concept:'dp9.units',     level:'n', difficulty:1,
          stem:'A pencil costs 235p. How much is that in pounds?', options:['£2.35','£23.50','£0.235'], correct:0, check:'235/100' },

        { id:'P5.SPR.DP.S09.Q0009', v:1, concept:'dp9.inverse',   level:'t', difficulty:2,
          stem:'▢ ÷ 100 = 0.35. What number goes in the box?', options:['35','3.5','350'], correct:0, check:'0.35*100' },

        { id:'P5.SPR.DP.S09.Q0010', v:1, concept:'dp9.hero-zero', level:'b', difficulty:3,
          stem:'Tomi says 8 ÷ 100 = 0.8. Is she right?',
          options:['No — 8 ÷ 100 = 0.08; the 8 moves two places right, so a hero zero holds the tenths','Yes — 8 ÷ 100 = 0.8','No — 8 ÷ 100 = 0.008'], correct:0 }
      ]
    }

  }
};
