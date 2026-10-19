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
          options:['No — 8 ÷ 100 = 0.08; the 8 moves two places right, so a hero zero holds the tenths','Yes — 8 ÷ 100 = 0.8','No — 8 ÷ 100 = 0.008'], correct:0 },

        /* ===== BATCH A — shift-right (Q0011–Q0015) ===== */
        { id:'P5.SPR.DP.S09.Q0011', v:1, concept:'dp9.shift-right', level:'n', difficulty:1,
          stem:'When you divide a number by 10, which way do its digits move?',
          options:['One place to the right','One place to the left','The decimal point jumps to the end'], correct:0 },

        { id:'P5.SPR.DP.S09.Q0012', v:1, concept:'dp9.shift-right', level:'n', difficulty:1,
          stem:'Dividing by 100 moves every digit how many places to the right?',
          options:['2','1','3'], correct:0 },

        { id:'P5.SPR.DP.S09.Q0013', v:1, concept:'dp9.shift-right', level:'n', difficulty:1,
          stem:'Dividing by 1,000 moves every digit how many places to the right?',
          options:['3','2','4'], correct:0 },

        { id:'P5.SPR.DP.S09.Q0014', v:1, concept:'dp9.shift-right', level:'n', difficulty:2,
          stem:'What happens to the value of each digit when you divide a number by 10?',
          options:['It becomes ten times smaller','It becomes ten times bigger','It stays the same'], correct:0 },

        { id:'P5.SPR.DP.S09.Q0015', v:1, concept:'dp9.shift-right', level:'t', difficulty:2,
          stem:'In 52.8 ÷ 100, the digit 5 starts in the tens column. Which column does it land in?',
          options:['Tenths','Ones','Hundredths'], correct:0 },

        /* ===== BATCH A — div10 (Q0016–Q0021) ===== */
        { id:'P5.SPR.DP.S09.Q0016', v:1, concept:'dp9.div10', level:'n', difficulty:1,
          stem:'70 ÷ 10 = ?', options:['7','0.7','700'], correct:0, check:'70/10' },

        { id:'P5.SPR.DP.S09.Q0017', v:1, concept:'dp9.div10', level:'n', difficulty:1,
          stem:'8 ÷ 10 = ?', options:['0.8','0.08','80'], correct:0, check:'8/10' },

        { id:'P5.SPR.DP.S09.Q0018', v:1, concept:'dp9.div10', level:'n', difficulty:1,
          stem:'6.3 ÷ 10 = ?', options:['0.63','63','0.063'], correct:0, check:'6.3/10' },

        { id:'P5.SPR.DP.S09.Q0019', v:1, concept:'dp9.div10', level:'n', difficulty:2,
          stem:'128 ÷ 10 = ?', options:['12.8','1.28','1,280'], correct:0, check:'128/10' },

        { id:'P5.SPR.DP.S09.Q0020', v:1, concept:'dp9.div10', level:'n', difficulty:2,
          stem:'25.9 ÷ 10 = ?', options:['2.59','259','0.259'], correct:0, check:'25.9/10' },

        { id:'P5.SPR.DP.S09.Q0021', v:1, concept:'dp9.div10', level:'t', difficulty:2,
          stem:'Which calculation gives the answer 4.6?', options:['46 ÷ 10','460 ÷ 10','4.6 ÷ 10'], correct:0 },

        /* ===== BATCH A — div100 (Q0022–Q0028) ===== */
        { id:'P5.SPR.DP.S09.Q0022', v:1, concept:'dp9.div100', level:'n', difficulty:1,
          stem:'600 ÷ 100 = ?', options:['6','60','0.6'], correct:0, check:'600/100' },

        { id:'P5.SPR.DP.S09.Q0023', v:1, concept:'dp9.div100', level:'n', difficulty:1,
          stem:'345 ÷ 100 = ?', options:['3.45','34.5','0.345'], correct:0, check:'345/100' },

        { id:'P5.SPR.DP.S09.Q0024', v:1, concept:'dp9.div100', level:'n', difficulty:2,
          stem:'82.5 ÷ 100 = ?', options:['0.825','8.25','0.0825'], correct:0, check:'82.5/100' },

        { id:'P5.SPR.DP.S09.Q0025', v:1, concept:'dp9.div100', level:'n', difficulty:2,
          stem:'9 ÷ 100 = ?', options:['0.09','0.9','0.009'], correct:0, check:'9/100' },

        { id:'P5.SPR.DP.S09.Q0026', v:1, concept:'dp9.div100', level:'n', difficulty:2,
          stem:'4.7 ÷ 100 = ?', options:['0.047','0.47','0.0047'], correct:0, check:'4.7/100' },

        { id:'P5.SPR.DP.S09.Q0027', v:1, concept:'dp9.div100', level:'t', difficulty:3,
          stem:'2,050 ÷ 100 = ?', options:['20.5','2.05','205'], correct:0, check:'2050/100' },

        { id:'P5.SPR.DP.S09.Q0028', v:1, concept:'dp9.div100', level:'b', difficulty:3,
          stem:'Aisha says 350 ÷ 100 = 0.35. What is the correct answer, and what was her mistake?',
          options:['3.5 — she moved the digits three places instead of two','0.35 — she is right','35 — she moved the digits only one place'], correct:0 },

        /* ===== BATCH B — div1000 (Q0029–Q0034) ===== */
        { id:'P5.SPR.DP.S09.Q0029', v:1, concept:'dp9.div1000', level:'n', difficulty:1,
          stem:'9,000 ÷ 1,000 = ?', options:['9','90','0.9'], correct:0, check:'9000/1000' },

        { id:'P5.SPR.DP.S09.Q0030', v:1, concept:'dp9.div1000', level:'n', difficulty:1,
          stem:'2,500 ÷ 1,000 = ?', options:['2.5','25','0.25'], correct:0, check:'2500/1000' },

        { id:'P5.SPR.DP.S09.Q0031', v:1, concept:'dp9.div1000', level:'n', difficulty:2,
          stem:'738 ÷ 1,000 = ?', options:['0.738','7.38','0.0738'], correct:0, check:'738/1000' },

        { id:'P5.SPR.DP.S09.Q0032', v:1, concept:'dp9.div1000', level:'n', difficulty:2,
          stem:'64.5 ÷ 1,000 = ?', options:['0.0645','0.645','0.00645'], correct:0, check:'64.5/1000' },

        { id:'P5.SPR.DP.S09.Q0033', v:1, concept:'dp9.div1000', level:'n', difficulty:3,
          stem:'8.2 ÷ 1,000 = ?', options:['0.0082','0.082','0.00082'], correct:0, check:'8.2/1000' },

        { id:'P5.SPR.DP.S09.Q0034', v:1, concept:'dp9.div1000', level:'t', difficulty:3,
          stem:'Which calculation gives the answer 0.0372?', options:['37.2 ÷ 1,000','3.72 ÷ 1,000','372 ÷ 1,000'], correct:0 },

        /* ===== BATCH B — hero-zero (Q0035–Q0038) ===== */
        { id:'P5.SPR.DP.S09.Q0035', v:1, concept:'dp9.hero-zero', level:'n', difficulty:2,
          stem:'Which calculation has an answer with a zero in the TENTHS column?', options:['6 ÷ 100','60 ÷ 100','6 ÷ 10'], correct:0 },

        { id:'P5.SPR.DP.S09.Q0036', v:1, concept:'dp9.hero-zero', level:'n', difficulty:2,
          stem:'3 ÷ 1,000 = ?', options:['0.003','0.03','0.0003'], correct:0, check:'3/1000' },

        { id:'P5.SPR.DP.S09.Q0037', v:1, concept:'dp9.hero-zero', level:'n', difficulty:3,
          stem:'0.5 ÷ 10 = ?', options:['0.05','0.5','0.005'], correct:0, check:'0.5/10' },

        { id:'P5.SPR.DP.S09.Q0038', v:1, concept:'dp9.hero-zero', level:'b', difficulty:3,
          stem:'Kemi writes 53.16 ÷ 1,000 = 0.5316. How many places did she move the digits, and what is the right answer?',
          options:['She moved them 2 places; the right answer is 0.05316','She moved them 3 places; the right answer is 0.5316','She moved them 1 place; the right answer is 5.316'], correct:0 },

        /* ===== BATCH C — inverse (Q0039–Q0043) ===== */
        { id:'P5.SPR.DP.S09.Q0039', v:1, concept:'dp9.inverse', level:'n', difficulty:1,
          stem:'4.5 × 10 = 45. So what is 45 ÷ 10?', options:['4.5','450','0.45'], correct:0, check:'45/10' },

        { id:'P5.SPR.DP.S09.Q0040', v:1, concept:'dp9.inverse', level:'n', difficulty:2,
          stem:'0.82 × 100 = 82. So what is 82 ÷ 100?', options:['0.82','8.2','820'], correct:0, check:'82/100' },

        { id:'P5.SPR.DP.S09.Q0041', v:1, concept:'dp9.inverse', level:'n', difficulty:2,
          stem:'▢ ÷ 10 = 6.4. What number goes in the box?', options:['64','0.64','640'], correct:0, check:'6.4*10' },

        { id:'P5.SPR.DP.S09.Q0042', v:1, concept:'dp9.inverse', level:'t', difficulty:2,
          stem:'3.7 ÷ ▢ = 0.037. What number goes in the box?', options:['100','10','1,000'], correct:0 },

        { id:'P5.SPR.DP.S09.Q0043', v:1, concept:'dp9.inverse', level:'t', difficulty:3,
          stem:'▢ ÷ 1,000 = 0.0405. What number goes in the box?', options:['40.5','4.05','405'], correct:0, check:'0.0405*1000' },

        /* ===== BATCH C — units (Q0044–Q0047) ===== */
        { id:'P5.SPR.DP.S09.Q0044', v:1, concept:'dp9.units', level:'n', difficulty:1,
          stem:'Change 75 cm into metres.', options:['0.75 m','7.5 m','0.075 m'], correct:0, check:'75/100' },

        { id:'P5.SPR.DP.S09.Q0045', v:1, concept:'dp9.units', level:'n', difficulty:1,
          stem:'Change 450 g into kilograms.', options:['0.45 kg','4.5 kg','0.045 kg'], correct:0, check:'450/1000' },

        { id:'P5.SPR.DP.S09.Q0046', v:1, concept:'dp9.units', level:'n', difficulty:2,
          stem:'Change 1,250 ml into litres.', options:['1.25 L','12.5 L','0.125 L'], correct:0, check:'1250/1000' },

        { id:'P5.SPR.DP.S09.Q0047', v:1, concept:'dp9.units', level:'b', difficulty:3,
          stem:'Chidi has 4 pieces of ribbon, each 35 cm long. What is the total length in metres?', options:['1.4 m','14 m','0.14 m'], correct:0, check:'4*35/100' },

        /* ===== BATCH C — reasoning (Q0048–Q0050) ===== */
        { id:'P5.SPR.DP.S09.Q0048', v:1, concept:'dp9.reasoning', level:'t', difficulty:2,
          stem:'Which is greater: 90 ÷ 10 or 900 ÷ 1,000?', options:['90 ÷ 10','900 ÷ 1,000','They are equal'], correct:0 },

        { id:'P5.SPR.DP.S09.Q0049', v:1, concept:'dp9.reasoning', level:'t', difficulty:3,
          stem:'What do 5.2 ÷ 10, 52 ÷ 100 and 520 ÷ 1,000 have in common?', options:['They all equal 0.52','They all equal 5.2','They all equal 0.052'], correct:0 },

        { id:'P5.SPR.DP.S09.Q0050', v:1, concept:'dp9.reasoning', level:'b', difficulty:3,
          stem:'Dev says: "To divide by 100, I just take away two zeros," so he writes 3.5 ÷ 100 = 3.5. Why is he wrong?',
          options:['Dividing by 100 moves the digits two places right, so 3.5 ÷ 100 = 0.035','3.5 ÷ 100 = 0.35','3.5 ÷ 100 = 35'], correct:0 }
      ]
    }

  }
};