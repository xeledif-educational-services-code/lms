/* ============================================================
   XELEDIF QUESTION POOL — Primary 5 · Autumn · Fractions A
   topicKey : P5.AUT.FA
   FILE RULES
   - Plain data only. No functions, no HTML except the entities listed in the guide.
   - A question ID is permanent. Never reuse one. To fix a question, keep the ID and
     increase `v`. To remove one, set `retired:true` (never delete the object).
   - `correct` is the index in `options` AS AUTHORED. The engine shuffles at runtime.
   - `check` (optional) is a JS arithmetic expression the validator evaluates and
     compares with the correct option, so wrong answer keys are caught automatically.
   ============================================================ */
window.XELEDIF_POOLS = window.XELEDIF_POOLS || {};

window.XELEDIF_POOLS['P5.AUT.FA'] = {
  topicKey: 'P5.AUT.FA',
  schemaVersion: 1,
  steps: {

    /* ---------------------------------------------------------
       STEP 1 — What is a fraction?
       Lesson constant in index.html: P5_FA1
       --------------------------------------------------------- */
    'P5.AUT.FA.S01': {
      label: 'What is a fraction?',
      lesson: 'P5_FA1',
      targetSize: 50,

      concepts: [
        { id:'fa1.identify',     name:'Reading and writing fractions from diagrams and descriptions', target:8 },
        { id:'fa1.denom-numer',  name:'Meaning of numerator and denominator',                         target:6 },
        { id:'fa1.not-shaded',   name:'Fraction not shaded (complement to one whole)',                target:6 },
        { id:'fa1.unit-compare', name:'Comparing and ordering unit fractions',                        target:6 },
        { id:'fa1.set',          name:'Fractions of a group (a set of objects)',                      target:6 },
        { id:'fa1.number-line',  name:'Fractions on a number line from 0 to 1',                       target:5 },
        { id:'fa1.division',     name:'A fraction is a division: a/b = a ÷ b',                        target:5 },
        { id:'fa1.misconceptions', name:'Unequal parts and other fraction traps',                     target:8 }
      ],

      questions: [
        /* ===== CORE 10 — the lesson's own exercises (Q0001–Q0010) ===== */
        { id:'P5.AUT.FA.S01.Q0001', v:1, concept:'fa1.identify', level:'n', difficulty:1,
          stem:'A rectangle is split into 8 equal parts and 5 are shaded. What fraction is shaded?', options:['5/8','3/8','5/3'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0002', v:1, concept:'fa1.denom-numer', level:'n', difficulty:1,
          stem:'In the fraction 7/12, what does the denominator (12) tell us?', options:['The whole is cut into 12 equal parts','7 parts are shaded','There are 12 shaded parts'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0003', v:1, concept:'fa1.not-shaded', level:'n', difficulty:2,
          stem:'A pizza is cut into 10 equal slices and 4 are eaten. What fraction is NOT eaten?', options:['6/10','4/10','6/4'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0004', v:1, concept:'fa1.unit-compare', level:'n', difficulty:1,
          stem:'Which is greater: 1/4 or 1/8?', options:['1/4','1/8','They are equal'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0005', v:1, concept:'fa1.set', level:'n', difficulty:2,
          stem:'There are 20 counters and 15 are red. What fraction of the counters are red?', options:['15/20','5/20','15/5'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0006', v:1, concept:'fa1.number-line', level:'n', difficulty:2,
          stem:'A number line from 0 to 1 is cut into 6 equal steps. A dot is on the 4th mark. What fraction is it?', options:['4/6','4/5','6/4'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0007', v:1, concept:'fa1.division', level:'n', difficulty:2,
          stem:'Which fraction is the same as 5 ÷ 8?', options:['5/8','8/5','1/40'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0008', v:1, concept:'fa1.misconceptions', level:'n', difficulty:2,
          stem:'Chidi shades 3 of 5 parts of a rectangle, but the parts are different sizes. Can he write 3/5?', options:['No — the parts must be equal','Yes — 3 are shaded out of 5','Yes — if the shaded parts are the biggest'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0009', v:1, concept:'fa1.unit-compare', level:'t', difficulty:2,
          stem:'Ada says "1/10 is bigger than 1/5 because 10 is bigger than 5." Is she right?', options:['No — more parts means each part is smaller','Yes — 10 is greater than 5','Only when the shape is a circle'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0010', v:1, concept:'fa1.set', level:'b', difficulty:3,
          stem:'In a class of 30 pupils, 12 play football and 9 play basketball. The rest swim. What fraction of the class swim?', options:['9/30','21/30','12/30'], correct:0 },

        /* ===== BATCH A — identify (Q0011–Q0017) ===== */
        { id:'P5.AUT.FA.S01.Q0011', v:1, concept:'fa1.identify', level:'n', difficulty:1,
          stem:'A circle is cut into 6 equal slices and 2 are shaded. What fraction is shaded?', options:['2/6','4/6','6/2'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0012', v:1, concept:'fa1.identify', level:'n', difficulty:1,
          stem:'A chocolate bar is cut into 10 equal pieces and 7 are eaten. What fraction is eaten?', options:['7/10','3/10','10/7'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0013', v:1, concept:'fa1.identify', level:'n', difficulty:1,
          stem:'A strip is cut into 4 equal parts and 3 are shaded. What fraction is shaded?', options:['3/4','1/4','4/3'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0014', v:1, concept:'fa1.identify', level:'n', difficulty:2,
          stem:'A tray of puff-puff is cut into 12 equal pieces and 5 are given away. What fraction was given away?', options:['5/12','7/12','12/5'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0015', v:1, concept:'fa1.identify', level:'n', difficulty:1,
          stem:'A fraction has a numerator of 3 and a denominator of 7. How is it written?', options:['3/7','7/3','3/10'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0016', v:1, concept:'fa1.identify', level:'t', difficulty:2,
          stem:'A shape is split into 9 equal parts and 4 are shaded. Which statement is fully correct?', options:['The shaded fraction is 4/9, read as four ninths','The shaded fraction is 9/4, read as nine fourths','The shaded fraction is 4/9, read as nine fourths'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0017', v:1, concept:'fa1.identify', level:'b', difficulty:3,
          stem:'A cake is cut into 8 equal slices. Kemi eats some and 3 slices are left. What fraction of the cake did she eat?', options:['5/8','3/8','8/5'], correct:0 },

        /* ===== BATCH A — denom-numer (Q0018–Q0022) ===== */
        { id:'P5.AUT.FA.S01.Q0018', v:1, concept:'fa1.denom-numer', level:'n', difficulty:1,
          stem:'In the fraction 5/8, what does the 5 tell us?', options:['5 of the equal parts are being counted','The whole is cut into 5 parts','5 parts are left over'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0019', v:1, concept:'fa1.denom-numer', level:'n', difficulty:1,
          stem:'What is the numerator of 7/10?', options:['7','10','3'], correct:0, check:'7' },

        { id:'P5.AUT.FA.S01.Q0020', v:1, concept:'fa1.denom-numer', level:'n', difficulty:1,
          stem:'What is the denominator of 4/9?', options:['9','4','13'], correct:0, check:'9' },

        { id:'P5.AUT.FA.S01.Q0021', v:1, concept:'fa1.denom-numer', level:'t', difficulty:2,
          stem:'Which fraction has a numerator of 5 and a denominator of 6?', options:['5/6','6/5','1/6'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0022', v:1, concept:'fa1.denom-numer', level:'b', difficulty:3,
          stem:'A fraction has a numerator of 3. Its denominator is twice the numerator. What is the fraction?', options:['3/6','6/3','3/9'], correct:0 },

        /* ===== BATCH A — not-shaded (Q0023–Q0027) ===== */
        { id:'P5.AUT.FA.S01.Q0023', v:1, concept:'fa1.not-shaded', level:'n', difficulty:2,
          stem:'A strip is 3/7 shaded. What fraction is NOT shaded?', options:['4/7','3/7','7/4'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0024', v:1, concept:'fa1.not-shaded', level:'n', difficulty:2,
          stem:'5/8 of a cake has been eaten. What fraction is left?', options:['3/8','5/8','8/3'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0025', v:1, concept:'fa1.not-shaded', level:'n', difficulty:2,
          stem:'A rectangle is split into 8 equal parts and 6 are shaded. What fraction is not shaded?', options:['2/8','6/8','8/2'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0026', v:1, concept:'fa1.not-shaded', level:'n', difficulty:2,
          stem:'4/5 of a garden is planted with corn. What fraction is not planted?', options:['1/5','4/5','5/1'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0027', v:1, concept:'fa1.not-shaded', level:'t', difficulty:3,
          stem:'Tayo shades 2/5 of a strip, then Ada shades another 2/5 of the SAME strip. What fraction of the strip is now shaded?', options:['4/5','2/5','1'], correct:0 },

        /* ===== BATCH A — unit-compare (Q0028–Q0031) ===== */
        { id:'P5.AUT.FA.S01.Q0028', v:1, concept:'fa1.unit-compare', level:'n', difficulty:1,
          stem:'Which is greater: 1/3 or 1/6?', options:['1/3','1/6','They are equal'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0029', v:1, concept:'fa1.unit-compare', level:'n', difficulty:1,
          stem:'Which is smaller: 1/4 or 1/2?', options:['1/4','1/2','They are equal'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0030', v:1, concept:'fa1.unit-compare', level:'t', difficulty:2,
          stem:'Put these in order from SMALLEST to biggest: 1/2, 1/3, 1/6.', options:['1/6, 1/3, 1/2','1/2, 1/3, 1/6','1/3, 1/6, 1/2'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0031', v:1, concept:'fa1.unit-compare', level:'b', difficulty:3,
          stem:'If 1/a is greater than 1/b, what must be true about a and b?', options:['a is less than b','a is greater than b','a equals b'], correct:0 },

        /* ===== BATCH A — set (Q0032–Q0035) ===== */
        { id:'P5.AUT.FA.S01.Q0032', v:1, concept:'fa1.set', level:'n', difficulty:2,
          stem:'There are 10 counters and 6 are red. What fraction of the counters are red?', options:['6/10','4/10','10/6'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0033', v:1, concept:'fa1.set', level:'n', difficulty:2,
          stem:'A class has 25 pupils and 10 are girls. What fraction of the class are girls?', options:['10/25','15/25','25/10'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0034', v:1, concept:'fa1.set', level:'t', difficulty:3,
          stem:'A basket holds 18 mangoes. 6 are ripe. What fraction are NOT ripe?', options:['12/18','6/18','18/12'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0035', v:1, concept:'fa1.set', level:'b', difficulty:3,
          stem:'A bag has 24 sweets. Kemi takes 1/4 of them. How many sweets does she take?', options:['6','8','4'], correct:0, check:'24/4' },

        /* ===== BATCH B — number-line (Q0036–Q0039) ===== */
        { id:'P5.AUT.FA.S01.Q0036', v:1, concept:'fa1.number-line', level:'n', difficulty:2,
          stem:'A number line from 0 to 1 is cut into 5 equal steps. A dot is on the 3rd mark. What fraction is it?', options:['3/5','3/4','5/3'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0037', v:1, concept:'fa1.number-line', level:'n', difficulty:2,
          stem:'A number line from 0 to 1 is cut into 8 equal steps. A dot is on the 2nd mark. What fraction is it?', options:['2/8','2/7','8/2'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0038', v:1, concept:'fa1.number-line', level:'n', difficulty:2,
          stem:'A number line from 0 to 1 is cut into 10 equal steps. A dot is on the 7th mark. What fraction is it?', options:['7/10','7/9','10/7'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0039', v:1, concept:'fa1.number-line', level:'t', difficulty:3,
          stem:'On a number line cut into 4 equal steps, a dot sits at the same point as 1/2. Which mark is the dot on?', options:['The 2nd mark (2/4)','The 1st mark (1/4)','The 4th mark (4/4)'], correct:0 },

        /* ===== BATCH B — division (Q0040–Q0043) ===== */
        { id:'P5.AUT.FA.S01.Q0040', v:1, concept:'fa1.division', level:'n', difficulty:1,
          stem:'2 ÷ 3 written as a fraction is…', options:['2/3','3/2','1/6'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0041', v:1, concept:'fa1.division', level:'n', difficulty:1,
          stem:'7 ÷ 10 written as a fraction is…', options:['7/10','10/7','1/70'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0042', v:1, concept:'fa1.division', level:'n', difficulty:2,
          stem:'Which division has the same answer as the fraction 4/9?', options:['4 ÷ 9','9 ÷ 4','4 × 9'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0043', v:1, concept:'fa1.division', level:'t', difficulty:3,
          stem:'3 identical pizzas are shared equally between 5 children. What fraction of a pizza does each child get?', options:['3/5','5/3','1/5'], correct:0 },

        /* ===== BATCH B — misconceptions (Q0044–Q0050) ===== */
        { id:'P5.AUT.FA.S01.Q0044', v:1, concept:'fa1.misconceptions', level:'n', difficulty:2,
          stem:'A circle is cut into 4 parts of DIFFERENT sizes. Is one of those parts a quarter?', options:['No — the parts must be equal','Yes — there are 4 parts','Yes — if the part is the biggest'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0045', v:1, concept:'fa1.misconceptions', level:'n', difficulty:2,
          stem:'True or false: in the fraction 2/3, the 3 counts only the UNshaded parts.', options:['False — it counts ALL the equal parts','True — the bottom is always the unshaded parts','True — but only for thirds'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0046', v:1, concept:'fa1.misconceptions', level:'n', difficulty:2,
          stem:'A rectangle is cut into 3 equal parts. Tunde shades 2 and writes 2/3. Is he right?', options:['Yes — 2 of 3 equal parts are shaded','No — he should write 3/2','No — he should write 1/3'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0047', v:1, concept:'fa1.misconceptions', level:'n', difficulty:2,
          stem:'Bola cuts a cake into 6 equal slices and eats 2. She says she ate 2/4. What is her mistake?', options:['She counted the slices left (4) instead of the slices eaten (2) — she ate 2/6','She should have said 4/6','Nothing — 2/4 is correct'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0048', v:1, concept:'fa1.misconceptions', level:'t', difficulty:3,
          stem:'Ada shades 3 of 4 equal parts of a rectangle, then writes that the SHADED fraction is 1/4. What went wrong?', options:['She wrote the unshaded fraction — the shaded fraction is 3/4','She wrote the total number of parts — it should be 4/4','Nothing — 1/4 is correct'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0049', v:1, concept:'fa1.misconceptions', level:'t', difficulty:3,
          stem:'Chidi says: "A fraction can have any denominator, even if the parts are not equal." Which example proves him wrong?', options:['A pizza cut into 5 unequal slices — a slice is not 1/5','A pizza cut into 5 equal slices — each slice is 1/5','A pizza cut into 6 equal slices — each slice is 1/6'], correct:0 },

        { id:'P5.AUT.FA.S01.Q0050', v:1, concept:'fa1.misconceptions', level:'b', difficulty:3,
          stem:'Ngozi draws a shape cut into 5 parts: 3 large and 2 small. She shades 3 parts and writes 3/5. Why is she wrong, and what would make it right?', options:['The parts are not equal — recut the shape into 5 EQUAL parts, then count the shaded ones','Nothing is wrong — any 3 of 5 parts make 3/5','She should shade all 5 parts to make 3/5'], correct:0 }
      ]
    },

    /* ---------------------------------------------------------
       STEP 2 — Equivalent fractions
       Lesson constant in index.html: P5_FA2
       --------------------------------------------------------- */
    'P5.AUT.FA.S02': {
      label:'Equivalent fractions',
      lesson: 'P5_FA2',
      targetSize: 50,

      concepts: [
        { id:'fa2.multiply-missing', name:'Multiply top and bottom to find a missing number',   target:10 },
        { id:'fa2.divide-missing',   name:'Divide top and bottom to find a missing number',     target:8 },
        { id:'fa2.identify-equiv',   name:'Spotting equivalent fractions',                      target:10 },
        { id:'fa2.not-equiv',        name:'Spotting fractions that are NOT equivalent',         target:6 },
        { id:'fa2.adding-rule',      name:'Why adding (or subtracting) breaks equivalence',     target:5 },
        { id:'fa2.number-line',      name:'Equivalent fractions on a number line',              target:5 },
        { id:'fa2.family',           name:'Families and patterns of equivalent fractions',      target:6 }
      ],

      questions: [
        /* ===== CORE 10 — the lesson's own exercises (Q0001–Q0010) ===== */
        { id:'P5.AUT.FA.S02.Q0001', v:1, concept:'fa2.multiply-missing', level:'n', difficulty:1,
          stem:'1/2 = ?/8. What goes in the box?', options:['4','2','16'], correct:0, check:'8/2' },

        { id:'P5.AUT.FA.S02.Q0002', v:1, concept:'fa2.multiply-missing', level:'n', difficulty:2,
          stem:'2/3 = ?/12. What goes in the box?', options:['8','5','6'], correct:0, check:'12/3*2' },

        { id:'P5.AUT.FA.S02.Q0003', v:1, concept:'fa2.divide-missing', level:'n', difficulty:2,
          stem:'9/12 = ?/4. What goes in the box?', options:['3','5','9'], correct:0, check:'9/12*4' },

        { id:'P5.AUT.FA.S02.Q0004', v:1, concept:'fa2.identify-equiv', level:'n', difficulty:1,
          stem:'Which fraction is equivalent to 3/5?', options:['6/10','4/6','3/10'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0005', v:1, concept:'fa2.not-equiv', level:'n', difficulty:2,
          stem:'Which fraction is NOT equivalent to 2/5?', options:['5/8','4/10','6/15'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0006', v:1, concept:'fa2.adding-rule', level:'n', difficulty:2,
          stem:'Tolu says 1/3 = 2/4 because he added 1 to the top and the bottom. Is he right?', options:['No — you must multiply (or divide) both numbers by the same number','Yes — adding to both keeps it equal','Yes — but only for thirds'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0007', v:1, concept:'fa2.identify-equiv', level:'n', difficulty:2,
          stem:'Ngozi eats 3/4 of a cake. Tunde eats 9/12 of an identical cake. Who ate more?', options:['They ate the same amount','Ngozi','Tunde'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0008', v:1, concept:'fa2.multiply-missing', level:'n', difficulty:2,
          stem:'?/6 = 20/30. What goes in the box?', options:['4','5','14'], correct:0, check:'20/30*6' },

        { id:'P5.AUT.FA.S02.Q0009', v:1, concept:'fa2.identify-equiv', level:'t', difficulty:3,
          stem:'THINK DEEPER: Which pair are BOTH equivalent to 4/6?', options:['2/3 and 8/12','2/3 and 6/8','3/4 and 8/12'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0010', v:1, concept:'fa2.identify-equiv', level:'b', difficulty:3,
          stem:'BOSS LEVEL: A ribbon is 5/8 m long and a second ribbon is 3/4 m long. Change both to sixteenths. Which ribbon is longer?', options:['3/4 m (12/16 is more than 10/16)','5/8 m (10/16 is more than 12/16)','They are the same length'], correct:0 },

        /* ===== BATCH A — multiply-missing (Q0011–Q0017) ===== */
        { id:'P5.AUT.FA.S02.Q0011', v:1, concept:'fa2.multiply-missing', level:'n', difficulty:1,
          stem:'1/4 = ?/12. What goes in the box?', options:['3','2','8'], correct:0, check:'12/4' },

        { id:'P5.AUT.FA.S02.Q0012', v:1, concept:'fa2.multiply-missing', level:'n', difficulty:2,
          stem:'3/5 = ?/15. What goes in the box?', options:['9','6','18'], correct:0, check:'15/5*3' },

        { id:'P5.AUT.FA.S02.Q0013', v:1, concept:'fa2.multiply-missing', level:'n', difficulty:2,
          stem:'4/7 = ?/21. What goes in the box?', options:['12','8','28'], correct:0, check:'21/7*4' },

        { id:'P5.AUT.FA.S02.Q0014', v:1, concept:'fa2.multiply-missing', level:'n', difficulty:2,
          stem:'5/6 = ?/30. What goes in the box?', options:['25','24','36'], correct:0, check:'30/6*5' },

        { id:'P5.AUT.FA.S02.Q0015', v:1, concept:'fa2.multiply-missing', level:'n', difficulty:1,
          stem:'2/9 = ?/18. What goes in the box?', options:['4','6','8'], correct:0, check:'18/9*2' },

        { id:'P5.AUT.FA.S02.Q0016', v:1, concept:'fa2.multiply-missing', level:'t', difficulty:3,
          stem:'7/8 = ?/32. What goes in the box?', options:['28','24','14'], correct:0, check:'32/8*7' },

        { id:'P5.AUT.FA.S02.Q0017', v:1, concept:'fa2.multiply-missing', level:'b', difficulty:3,
          stem:'?/7 = 30/42. What number goes in the box, and by what was the top and bottom multiplied?', options:['5 — multiplied by 6','6 — multiplied by 5','7 — multiplied by 6'], correct:0 },

        /* ===== BATCH A — divide-missing (Q0018–Q0024) ===== */
        { id:'P5.AUT.FA.S02.Q0018', v:1, concept:'fa2.divide-missing', level:'n', difficulty:2,
          stem:'6/8 = ?/4. What goes in the box?', options:['3','4','2'], correct:0, check:'6/8*4' },

        { id:'P5.AUT.FA.S02.Q0019', v:1, concept:'fa2.divide-missing', level:'n', difficulty:2,
          stem:'10/15 = ?/3. What goes in the box?', options:['2','5','3'], correct:0, check:'10/15*3' },

        { id:'P5.AUT.FA.S02.Q0020', v:1, concept:'fa2.divide-missing', level:'n', difficulty:2,
          stem:'8/12 = ?/3. What goes in the box?', options:['2','4','3'], correct:0, check:'8/12*3' },

        { id:'P5.AUT.FA.S02.Q0021', v:1, concept:'fa2.divide-missing', level:'n', difficulty:2,
          stem:'14/18 = ?/9. What goes in the box?', options:['7','9','2'], correct:0, check:'14/18*9' },

        { id:'P5.AUT.FA.S02.Q0022', v:1, concept:'fa2.divide-missing', level:'t', difficulty:3,
          stem:'15/20 = ?/4. What goes in the box?', options:['3','5','4'], correct:0, check:'15/20*4' },

        { id:'P5.AUT.FA.S02.Q0023', v:1, concept:'fa2.divide-missing', level:'t', difficulty:3,
          stem:'12/16 = 6/8 = ?/4. What goes in the box?', options:['3','4','6'], correct:0, check:'12/16*4' },

        { id:'P5.AUT.FA.S02.Q0024', v:1, concept:'fa2.divide-missing', level:'b', difficulty:3,
          stem:'BOSS LEVEL: 30/45 simplified to a fraction with a denominator of 3 is…', options:['2/3','3/3','6/3'], correct:0, check:'30/45*3' },

        /* ===== BATCH B — identify-equiv (Q0025–Q0030) ===== */
        { id:'P5.AUT.FA.S02.Q0025', v:1, concept:'fa2.identify-equiv', level:'n', difficulty:1,
          stem:'Which fraction is equivalent to 1/2?', options:['5/10','2/5','1/5'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0026', v:1, concept:'fa2.identify-equiv', level:'n', difficulty:2,
          stem:'Which fraction is equivalent to 2/3?', options:['8/12','6/8','4/9'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0027', v:1, concept:'fa2.identify-equiv', level:'n', difficulty:2,
          stem:'Which fraction is equivalent to 4/5?', options:['12/15','8/10','5/4'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0028', v:1, concept:'fa2.identify-equiv', level:'n', difficulty:2,
          stem:'Which fraction is equivalent to 3/10?', options:['6/20','3/20','9/30'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0029', v:1, concept:'fa2.identify-equiv', level:'t', difficulty:3,
          stem:'Which fraction is equivalent to 7/10?', options:['21/30','14/30','7/30'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0030', v:1, concept:'fa2.identify-equiv', level:'b', difficulty:3,
          stem:'BOSS LEVEL: Three friends eat identical cakes. Ada eats 2/3, Bola eats 8/12, Chidi eats 10/15. Who ate the most?', options:['They all ate the same amount','Ada','Bola'], correct:0 },

        /* ===== BATCH B — not-equiv (Q0031–Q0035) ===== */
        { id:'P5.AUT.FA.S02.Q0031', v:1, concept:'fa2.not-equiv', level:'n', difficulty:2,
          stem:'Which fraction is NOT equivalent to 1/2?', options:['3/7','2/4','5/10'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0032', v:1, concept:'fa2.not-equiv', level:'n', difficulty:2,
          stem:'Which fraction is NOT equivalent to 3/4?', options:['9/14','6/8','15/20'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0033', v:1, concept:'fa2.not-equiv', level:'n', difficulty:2,
          stem:'Which fraction is NOT equivalent to 5/6?', options:['10/18','15/18','20/24'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0034', v:1, concept:'fa2.not-equiv', level:'t', difficulty:3,
          stem:'True or false: 6/9 and 8/12 are equivalent fractions.', options:['True — both simplify to 2/3','False — 6/9 is bigger','False — 8/12 is bigger'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0035', v:1, concept:'fa2.not-equiv', level:'b', difficulty:3,
          stem:'BOSS LEVEL: Which fraction is NOT equivalent to 2/3?', options:['8/11','4/6','6/9'], correct:0 },

        /* ===== BATCH B — adding-rule (Q0036–Q0039) ===== */
        { id:'P5.AUT.FA.S02.Q0036', v:1, concept:'fa2.adding-rule', level:'n', difficulty:2,
          stem:'Tunde says 2/5 = 4/7 because he added 2 to the top and the bottom. Is he right?', options:['No — adding changes the amount; 2/5 = 4/10','Yes — adding the same number keeps it equivalent','Yes — but only when the fraction is less than 1'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0037', v:1, concept:'fa2.adding-rule', level:'n', difficulty:2,
          stem:'Ada says 3/4 = 4/5 because she added 1 to the top and the bottom. What is the correct equivalent of 3/4 with denominator 20?', options:['15/20','4/20','12/20'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0038', v:1, concept:'fa2.adding-rule', level:'t', difficulty:3,
          stem:'Kemi knows 1/3 = 2/6. She adds 1 to the top and bottom of 2/6 and gets 3/7. Is 3/7 equivalent to 1/3?', options:['No — 3/7 is not equivalent to 1/3; adding never works','Yes — 1/3 = 3/7','Yes — adding works when the fractions are less than 1'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0039', v:1, concept:'fa2.adding-rule', level:'b', difficulty:3,
          stem:'BOSS LEVEL: Kemi says: "Adding the same number to the top and bottom keeps a fraction equivalent, but multiplying does not always work." Which part of her sentence is right?', options:['Neither part — multiplying (or dividing) both by the same number is what works; adding does not','Both parts are right','The first part only — adding always works'], correct:0 },

        /* ===== BATCH C — number-line (Q0040–Q0044) ===== */
        { id:'P5.AUT.FA.S02.Q0040', v:1, concept:'fa2.number-line', level:'n', difficulty:2,
          stem:'On a 0-to-1 line cut into 5 equal steps, a dot sits at the 2nd mark. On a line cut into 10 equal steps, the SAME point is which fraction?', options:['4/10','2/10','5/10'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0041', v:1, concept:'fa2.number-line', level:'n', difficulty:2,
          stem:'On a 0-to-1 line cut into 8 equal steps, a dot sits at the 6th mark. On a line cut into 4 equal steps, the SAME point is which fraction?', options:['3/4','2/4','6/4'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0042', v:1, concept:'fa2.number-line', level:'n', difficulty:2,
          stem:'A dot sits at 3/5 on a fifths line. Where does it sit on a tenths line?', options:['6/10','3/10','5/10'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0043', v:1, concept:'fa2.number-line', level:'n', difficulty:2,
          stem:'Two equivalent fractions land on the same point of a number line. Which pair does that?', options:['1/2 and 3/6','1/2 and 2/3','1/3 and 3/4'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0044', v:1, concept:'fa2.number-line', level:'t', difficulty:3,
          stem:'THINK DEEPER: On a tenths line, 6/10 sits at the same point as ?/5 on a fifths line. What goes in the box?', options:['3','2','5'], correct:0, check:'6/10*5' },

        /* ===== BATCH C — family (Q0045–Q0050) ===== */
        { id:'P5.AUT.FA.S02.Q0045', v:1, concept:'fa2.family', level:'n', difficulty:2,
          stem:'Continue the family: 2/3, 4/6, 6/9, …', options:['8/12','7/10','8/9'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0046', v:1, concept:'fa2.family', level:'n', difficulty:2,
          stem:'Which pair are BOTH equivalent to 3/4?', options:['6/8 and 9/12','6/8 and 10/12','5/8 and 9/12'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0047', v:1, concept:'fa2.family', level:'n', difficulty:2,
          stem:'Continue the pattern: 3/5, 6/10, 9/15, …', options:['12/20','10/15','12/15'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0048', v:1, concept:'fa2.family', level:'n', difficulty:2,
          stem:'The family of 1/2 includes 2/4, 3/6, 4/8 and 6/12. Which fraction does NOT belong?', options:['5/9','4/8','6/12'], correct:0 },

        { id:'P5.AUT.FA.S02.Q0049', v:1, concept:'fa2.family', level:'t', difficulty:3,
          stem:'THINK DEEPER: 8/12, 12/18 and 16/24 are all equivalent to ?/3. What goes in the box?', options:['2','3','4'], correct:0, check:'16/24*3' },

        { id:'P5.AUT.FA.S02.Q0050', v:1, concept:'fa2.family', level:'t', difficulty:3,
          stem:'THINK DEEPER: Ngozi lists the family of 2/5: 2/5, 4/10, 6/15, 8/20. What is the 10th fraction in this family?', options:['20/50','10/50','20/25'], correct:0 }
      ]
    }

  }
};