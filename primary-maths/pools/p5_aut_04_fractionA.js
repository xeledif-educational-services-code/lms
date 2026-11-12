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
    },


    


'P5.AUT.FA.S03': {
    label: 'Simplifying Fractions',
    lesson: 'P5_FA3',
    targetSize: 50,
    concepts: [
      { id:'fa3.common-factors', name:'Finding common factors and HCF', target:7 },
      { id:'fa3.simplify-basic', name:'Simplifying fractions using common factors', target:11 },
      { id:'fa3.multi-step', name:'Simplifying fully, including multi-step methods', target:8 },
      { id:'fa3.simplest-test', name:'Recognising fractions in simplest form', target:6 },
      { id:'fa3.equivalent', name:'Checking equivalent fractions', target:7 },
      { id:'fa3.misconception', name:'Avoiding common simplification errors', target:4 },
      { id:'fa3.context', name:'Simplifying fractions in real-life contexts', target:7 }
    ],
    questions: [
      { id:'P5.AUT.FA.S03.Q0001', v:1, concept:'fa3.simplify-basic', level:'n', difficulty:1,
        stem:'Simplify 4/10.', options:['2/5', '4/5', '1/5'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0002', v:1, concept:'fa3.simplify-basic', level:'n', difficulty:1,
        stem:'Simplify 15/20.', options:['3/4', '5/4', '15/4'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0003', v:1, concept:'fa3.simplify-basic', level:'n', difficulty:1,
        stem:'Write 18/30 in its simplest form.', options:['3/5', '9/15', '6/10'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0004', v:1, concept:'fa3.common-factors', level:'n', difficulty:1,
        stem:'What is the highest common factor (HCF) of 12 and 18?', options:['6', '3', '9'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0005', v:1, concept:'fa3.simplest-test', level:'n', difficulty:1,
        stem:'Which of these fractions is already in its simplest form?', options:['7/12', '6/9', '10/15'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0006', v:1, concept:'fa3.simplify-basic', level:'n', difficulty:1,
        stem:'Write 40/100 in its simplest form.', options:['2/5', '4/10', '1/4'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0007', v:1, concept:'fa3.context', level:'n', difficulty:1,
        stem:'In a class of 30 pupils, 20 are girls. What fraction are girls, in simplest form?', options:['2/3', '20/30', '1/3'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0008', v:1, concept:'fa3.misconception', level:'n', difficulty:2,
        stem:'Tolu simplifies 12/18 by subtracting 6 from the top and bottom to get 6/12. Is he right?', options:['No — you must divide both numbers by a common factor', 'Yes — taking the same away keeps it equal', 'Yes — but only for even numbers'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0009', v:1, concept:'fa3.equivalent', level:'t', difficulty:2,
        stem:'THINK DEEPER: Which of these fractions simplifies to 3/7?', options:['12/28', '9/14', '6/21'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0010', v:1, concept:'fa3.multi-step', level:'b', difficulty:3,
        stem:'BOSS LEVEL: Write 72/96 in its simplest form.', options:['3/4', '9/12', '6/8'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0011', v:1, concept:'fa3.common-factors', level:'n', difficulty:1,
        stem:'Which number is a common factor of 8 and 12?', options:['4', '5', '6'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0012', v:1, concept:'fa3.common-factors', level:'n', difficulty:1,
        stem:'What is the HCF of 9 and 15?', options:['3', '5', '6'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0013', v:1, concept:'fa3.common-factors', level:'n', difficulty:1,
        stem:'Which list shows all the common factors of 10 and 20?', options:['1, 2, 5, 10', '1, 2, 4, 5', '1, 5, 10, 20'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0014', v:1, concept:'fa3.simplify-basic', level:'n', difficulty:1,
        stem:'Simplify 6/9.', options:['2/3', '3/2', '1/3'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0015', v:1, concept:'fa3.simplify-basic', level:'n', difficulty:1,
        stem:'Simplify 8/12.', options:['2/3', '4/6', '3/4'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0016', v:1, concept:'fa3.simplify-basic', level:'n', difficulty:1,
        stem:'Simplify 14/21.', options:['2/3', '7/21', '3/2'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0017', v:1, concept:'fa3.simplify-basic', level:'n', difficulty:1,
        stem:'Simplify 16/24.', options:['2/3', '4/6', '3/2'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0018', v:1, concept:'fa3.simplify-basic', level:'n', difficulty:1,
        stem:'Simplify 25/100.', options:['1/4', '1/5', '4/1'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0019', v:1, concept:'fa3.simplify-basic', level:'n', difficulty:1,
        stem:'Simplify 21/28.', options:['3/4', '7/9', '4/3'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0020', v:1, concept:'fa3.simplify-basic', level:'n', difficulty:1,
        stem:'Simplify 30/45.', options:['2/3', '3/2', '5/6'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0021', v:1, concept:'fa3.common-factors', level:'n', difficulty:2,
        stem:'What is the HCF of 18 and 30?', options:['6', '3', '9'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0022', v:1, concept:'fa3.common-factors', level:'n', difficulty:2,
        stem:'What is the HCF of 24 and 40?', options:['8', '6', '12'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0023', v:1, concept:'fa3.common-factors', level:'t', difficulty:2,
        stem:'Which is the greatest number that divides both 36 and 48 exactly?', options:['12', '6', '18'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0024', v:1, concept:'fa3.multi-step', level:'t', difficulty:2,
        stem:'Simplify 42/56 by dividing the numerator and denominator by their HCF.', options:['3/4', '6/8', '7/8'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0025', v:1, concept:'fa3.multi-step', level:'t', difficulty:2,
        stem:'Simplify 45/60 in one step.', options:['3/4', '9/12', '5/6'], correct:0 },
{ id:'P5.AUT.FA.S03.Q0041', v:1, concept:'fa3.context', level:'t', difficulty:2,
        stem:'A ribbon is 2 metres long. A 50 cm piece is cut off. What fraction of the ribbon was cut off?', options:['1/4', '1/2', '1/5'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0042', v:1, concept:'fa3.context', level:'t', difficulty:2,
        stem:'There are 24 books on a shelf and 18 are storybooks. What fraction are storybooks in simplest form?', options:['3/4', '18/24', '2/3'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0043', v:1, concept:'fa3.multi-step', level:'b', difficulty:3,
        stem:'A fraction is simplified by dividing top and bottom by 4, giving 5/7. What was the original fraction?', options:['20/28', '9/11', '15/28'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0044', v:1, concept:'fa3.multi-step', level:'b', difficulty:3,
        stem:'Which fraction is equivalent to 3/5 and has a denominator of 45?', options:['27/45', '15/45', '30/45'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0045', v:1, concept:'fa3.multi-step', level:'b', difficulty:3,
        stem:'A pupil says 18/27 is simplest because 18 and 27 are both odd. Which is correct?', options:['No — divide both by 9 to get 2/3', 'Yes — odd numbers cannot share factors', 'No — subtract 9 to get 9/18'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0046', v:1, concept:'fa3.equivalent', level:'b', difficulty:3,
        stem:'Four fractions are shown: 6/8, 9/12, 12/16 and 15/20. Which statement is correct?', options:['All four are equivalent and simplify to 3/4', 'Only 6/8 and 9/12 are equivalent', '12/16 simplifies to 2/3'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0047', v:1, concept:'fa3.context', level:'b', difficulty:3,
        stem:'A school has 120 pupils. 45 travel by bus. What fraction travel by bus in simplest form?', options:['3/8', '9/24', '5/8'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0048', v:1, concept:'fa3.multi-step', level:'b', difficulty:3,
        stem:'The HCF of a numerator and denominator is 12. Dividing both by 12 gives 7/9. What was the original fraction?', options:['84/108', '72/96', '96/120'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0049', v:1, concept:'fa3.simplest-test', level:'t', difficulty:2,
        stem:'Which fraction is already in simplest form: 8/12, 7/11 or 10/15?', options:['7/11', '8/12', '10/15'], correct:0 },
      { id:'P5.AUT.FA.S03.Q0050', v:1, concept:'fa3.misconception', level:'t', difficulty:2,
        stem:'A pupil divides the numerator by 2 but leaves the denominator unchanged. Why is this not simplifying correctly?', options:['Both numerator and denominator must be divided by the same factor', 'Only the numerator should change', 'The denominator must be doubled'], correct:0 }
    ]
  },

  'P5.AUT.FA.S04': {
    label: 'Improper Fractions',
    lesson: 'P5_FA4',
    targetSize: 50,
    concepts: [
      { id:'fa4.classify', name:'Identifying proper, improper and unit-whole fractions', target:8 },
      { id:'fa4.models', name:'Interpreting fraction bars and groups of parts', target:7 },
      { id:'fa4.whole-number', name:'Writing whole numbers as improper fractions', target:5 },
      { id:'fa4.compare', name:'Comparing improper fractions with whole numbers and each other', target:7 },
      { id:'fa4.number-line', name:'Locating improper fractions on number lines', target:7 },
      { id:'fa4.context', name:'Applying improper fractions to measures and real-life situations', target:9 },
      { id:'fa4.reasoning', name:'Explaining and correcting ideas about improper fractions', target:7 }
    ],
    questions: [
      { id:'P5.AUT.FA.S04.Q0001', v:1, concept:'fa4.classify', level:'n', difficulty:1,
        stem:'Which of these is an improper fraction?', options:['9/5', '5/9', '3/10'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0002', v:1, concept:'fa4.models', level:'n', difficulty:1,
        stem:'Seven quarters are shaded. Write this as an improper fraction.', options:['7/4', '4/7', '3/4'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0003', v:1, concept:'fa4.models', level:'n', difficulty:1,
        stem:'In 11/4 (eleven quarters), how many whole bars are completely full?', options:['2', '3', '11'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0004', v:1, concept:'fa4.whole-number', level:'n', difficulty:1,
        stem:'Write 3 as an improper fraction with a denominator of 5.', options:['15/5', '3/5', '5/3'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0005', v:1, concept:'fa4.classify', level:'n', difficulty:1,
        stem:'Which fraction is exactly equal to 1 whole?', options:['8/8', '1/8', '8/1'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0006', v:1, concept:'fa4.compare', level:'n', difficulty:1,
        stem:'Is 9/5 greater than 2, less than 2, or equal to 2?', options:['Less than 2', 'Greater than 2', 'Equal to 2'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0007', v:1, concept:'fa4.context', level:'n', difficulty:1,
        stem:'A jug holds 1/4 L. Emeka pours in 9 jugs. How much is that?', options:['9/4 L', '4/9 L', '9 L'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0008', v:1, concept:'fa4.classify', level:'n', difficulty:1,
        stem:'Which of these fractions is greater than 1?', options:['11/10', '10/11', '10/10'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0009', v:1, concept:'fa4.reasoning', level:'t', difficulty:2,
        stem:'THINK DEEPER: Ada says "every improper fraction is greater than 1." Is she right?', options:['No — if the numerator equals the denominator it is exactly 1', 'Yes — always greater than 1', 'No — improper fractions are less than 1'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0010', v:1, concept:'fa4.context', level:'b', difficulty:3,
        stem:'BOSS LEVEL: Chef Bola cuts each cake into 6 slices. She sells 17 slices. Write the amount sold as an improper fraction of a cake. How many whole cakes were completely sold?', options:['17/6 of a cake; 2 whole cakes', '17/4 of a cake; 4 whole cakes', '6/17 of a cake; 0 whole cakes'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0011', v:1, concept:'fa4.classify', level:'n', difficulty:1,
        stem:'Which fraction is a proper fraction?', options:['3/8', '8/3', '7/7'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0012', v:1, concept:'fa4.classify', level:'n', difficulty:1,
        stem:'What must be true for a fraction to be improper?', options:['The numerator is greater than or equal to the denominator', 'The numerator is always 1', 'The denominator is greater than the numerator'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0013', v:1, concept:'fa4.classify', level:'n', difficulty:1,
        stem:'Which fraction represents exactly one whole?', options:['6/6', '6/5', '5/6'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0014', v:1, concept:'fa4.classify', level:'n', difficulty:1,
        stem:'Which fraction is less than one whole?', options:['5/8', '8/5', '9/9'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0015', v:1, concept:'fa4.models', level:'n', difficulty:1,
        stem:'A whole is divided into 5 equal parts. How many fifths make 2 wholes?', options:['10/5', '5/10', '7/5'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0016', v:1, concept:'fa4.models', level:'n', difficulty:1,
        stem:'How many thirds are needed to make one whole and two more thirds?', options:['5/3', '3/5', '2/3'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0017', v:1, concept:'fa4.models', level:'n', difficulty:1,
        stem:'A cake is cut into 8 equal slices. 13 slices are eaten. What fraction of a cake is eaten?', options:['13/8', '8/13', '5/8'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0018', v:1, concept:'fa4.models', level:'t', difficulty:2,
        stem:'Three full strips are each divided into 4 equal parts. How many quarters are there altogether?', options:['12/4', '7/4', '3/4'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0019', v:1, concept:'fa4.whole-number', level:'n', difficulty:1,
        stem:'Write 2 as an improper fraction with denominator 3.', options:['6/3', '2/3', '3/2'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0020', v:1, concept:'fa4.whole-number', level:'n', difficulty:1,
        stem:'Write 5 as an improper fraction with denominator 8.', options:['40/8', '13/8', '8/5'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0021', v:1, concept:'fa4.whole-number', level:'n', difficulty:1,
        stem:'Which improper fraction is equal to 4 wholes?', options:['20/5', '4/5', '5/4'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0022', v:1, concept:'fa4.whole-number', level:'t', difficulty:2,
        stem:'A whole number is written as 21/7. What is the whole number?', options:['3', '7', '14'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0023', v:1, concept:'fa4.compare', level:'n', difficulty:1,
        stem:'Which is greater: 7/4 or 1?', options:['7/4', '1', 'They are equal'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0024', v:1, concept:'fa4.compare', level:'n', difficulty:1,
        stem:'Which fraction is less than 2?', options:['9/5', '11/5', '12/5'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0025', v:1, concept:'fa4.compare', level:'t', difficulty:2,
        stem:'Which is closest to 2 but still less than 2?', options:['9/5', '7/4', '3/2'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0026', v:1, concept:'fa4.compare', level:'t', difficulty:2,
        stem:'Which is greater: 11/6 or 9/5?', options:['11/6', '9/5', 'They are equal'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0027', v:1, concept:'fa4.number-line', level:'n', difficulty:1,
        stem:'On a number line marked in quarters, what is the first improper fraction after 1?', options:['5/4', '4/5', '3/4'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0028', v:1, concept:'fa4.number-line', level:'n', difficulty:1,
        stem:'How many fifth-size steps from 0 is 8/5?', options:['8', '5', '3'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0029', v:1, concept:'fa4.number-line', level:'t', difficulty:2,
        stem:'Which fraction lies between 1 and 2?', options:['7/4', '3/4', '9/4'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0030', v:1, concept:'fa4.number-line', level:'t', difficulty:2,
        stem:'A number line is marked in thirds. Which point is two steps after 1?', options:['5/3', '4/3', '2/3'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0031', v:1, concept:'fa4.number-line', level:'t', difficulty:2,
        stem:'Which improper fraction is closest to 1?', options:['6/5', '9/5', '7/4'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0032', v:1, concept:'fa4.context', level:'n', difficulty:1,
        stem:'A cup holds 1/3 L. How much do 4 full cups hold?', options:['4/3 L', '3/4 L', '4 L'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0033', v:1, concept:'fa4.context', level:'n', difficulty:1,
        stem:'A pizza has 6 equal slices. A family eats 8 slices. What fraction of a pizza is that?', options:['8/6', '6/8', '2/6'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0034', v:1, concept:'fa4.context', level:'t', difficulty:2,
        stem:'Each bottle contains 1/2 litre. How much liquid is in 5 bottles?', options:['5/2 L', '2/5 L', '5 L'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0035', v:1, concept:'fa4.context', level:'t', difficulty:2,
        stem:'A baker uses 3/4 kg of flour for each loaf. How much flour is needed for 3 loaves?', options:['9/4 kg', '4/9 kg', '3/4 kg'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0036', v:1, concept:'fa4.context', level:'t', difficulty:2,
        stem:'A ribbon is cut into pieces of length 1/5 metre. How many fifth-metre pieces make 2 metres?', options:['10', '7', '5'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0037', v:1, concept:'fa4.reasoning', level:'n', difficulty:1,
        stem:'Is 6/6 an improper fraction?', options:['Yes — the numerator is equal to the denominator', 'No — it is a proper fraction', 'No — it is not a fraction'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0038', v:1, concept:'fa4.reasoning', level:'t', difficulty:2,
        stem:'Ben says 10/8 is a proper fraction because it has a denominator of 8. What is the correction?', options:['It is improper because 10 is greater than 8', 'It is proper because 8 is even', 'It equals 8 wholes'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0039', v:1, concept:'fa4.reasoning', level:'t', difficulty:2,
        stem:'Which statement about an improper fraction is always true?', options:['Its value is at least 1', 'Its value is always greater than 2', 'Its numerator must be even'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0040', v:1, concept:'fa4.reasoning', level:'t', difficulty:2,
        stem:'Which fraction is exactly 2 wholes?', options:['10/5', '9/5', '11/5'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0041', v:1, concept:'fa4.compare', level:'b', difficulty:3,
        stem:'Arrange these from smallest to largest: 7/4, 5/3 and 9/6. Which is the correct order?', options:['9/6, 5/3, 7/4', '7/4, 5/3, 9/6', '5/3, 9/6, 7/4'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0042', v:1, concept:'fa4.number-line', level:'b', difficulty:3,
        stem:'A number line from 0 to 2 is divided into sixths. Which fraction marks the point one sixth before 2?', options:['11/6', '10/6', '12/6'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0043', v:1, concept:'fa4.context', level:'b', difficulty:3,
        stem:'A water tank holds 1/4 litre in each small jug. How many litres are in 11 full jugs?', options:['11/4 L', '4/11 L', '11 L'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0044', v:1, concept:'fa4.context', level:'b', difficulty:3,
        stem:'A chef cuts each pie into 8 equal slices. The team eats 19 slices. How many whole pies have been completely eaten?', options:['2 whole pies', '3 whole pies', '1 whole pie'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0045', v:1, concept:'fa4.reasoning', level:'b', difficulty:3,
        stem:'Which fraction is greater than 1 but less than 3/2?', options:['5/4', '7/4', '8/4'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0046', v:1, concept:'fa4.compare', level:'b', difficulty:3,
        stem:'Which is greatest: 13/8, 8/5 or 7/4?', options:['7/4', '8/5', '13/8'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0047', v:1, concept:'fa4.reasoning', level:'b', difficulty:3,
        stem:'A pupil writes 3 = 3/8. Which explanation identifies the error?', options:['3/8 is less than 1; 3 wholes with denominator 8 is 24/8', '3/8 is equal to 3 wholes', 'The denominator should be 3'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0048', v:1, concept:'fa4.models', level:'b', difficulty:3,
        stem:'There are 2 full bars and 3 fifths of another bar. How many fifths are shown altogether?', options:['13/5', '10/5', '8/5'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0049', v:1, concept:'fa4.classify', level:'n', difficulty:1,
        stem:'Which fraction is improper but equal to exactly one whole?', options:['9/9', '8/9', '9/8'], correct:0 },
      { id:'P5.AUT.FA.S04.Q0050', v:1, concept:'fa4.number-line', level:'t', difficulty:2,
        stem:'A number line is divided into quarters. What fraction is at the second tick after 1?', options:['6/4', '5/4', '2/4'], correct:0 }
    ]
  },

  

'P5.AUT.FA.S05': {
  label: 'Mixed Numbers',
  lesson: 'P5_FA5',
  targetSize: 50,
  concepts: [
    { id:'fa5.identify', name:'Reading and identifying mixed numbers', target:7 },
    { id:'fa5.partition', name:'Partitioning mixed numbers into wholes and parts', target:7 },
    { id:'fa5.models', name:'Representing mixed numbers with fraction models', target:7 },
    { id:'fa5.number-line', name:'Locating mixed numbers on number lines', target:6 },
    { id:'fa5.compare', name:'Comparing and ordering mixed numbers', target:6 },
    { id:'fa5.misconception', name:'Recognising and correcting mixed-number errors', target:7 },
    { id:'fa5.context', name:'Solving real-life problems involving mixed numbers', target:10 }
  ],
  questions: [
    { id:'P5.AUT.FA.S05.Q0001', v:1, concept:'fa5.identify', level:'n', difficulty:1,
      stem:'Write "two and three fifths" as a mixed number.', options:['2 3/5','3 2/5','2/5 3'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0002', v:1, concept:'fa5.identify', level:'n', difficulty:1,
      stem:'In the mixed number 4 5/8, what is the whole-number part?', options:['4','5','8'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0003', v:1, concept:'fa5.partition', level:'n', difficulty:1,
      stem:'Partition the mixed number 3 2/7.', options:['3 + 2/7','3 × 2/7','3 + 7/2'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0004', v:1, concept:'fa5.models', level:'n', difficulty:1,
      stem:'Two full bars of quarters are shaded plus 3 parts of a third bar. What mixed number is shaded?', options:['2 3/4','3 2/4','2 4/3'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0005', v:1, concept:'fa5.number-line', level:'n', difficulty:1,
      stem:'Which mixed number lies between 2 and 3?', options:['2 1/2','3 1/2','1 1/2'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0006', v:1, concept:'fa5.number-line', level:'n', difficulty:1,
      stem:'Count in halves: 1 1/2, 2, 2 1/2, ___. What comes next?', options:['3','3 1/2','2 3/4'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0007', v:1, concept:'fa5.context', level:'n', difficulty:1,
      stem:'Which of these is a properly written mixed number, with a fraction part less than 1?', options:['5 3/8','5 8/3','5 8/8'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0008', v:1, concept:'fa5.misconception', level:'n', difficulty:1,
      stem:'Kola says 2 3/5 means 2 × 3/5. Is he right?', options:['No — it means 2 + 3/5','Yes — whole numbers next to fractions mean multiply','No — it means 2 − 3/5'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0009', v:1, concept:'fa5.compare', level:'t', difficulty:2,
      stem:'THINK DEEPER: Ada has 2 3/4 pizzas. Bola has 2 1/4 pizzas. How many complete pizzas does each have, and who has more?', options:['Both have 2 whole pizzas; Ada has more','Ada has 3 whole pizzas; Bola has 2','They have the same amount'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0010', v:1, concept:'fa5.context', level:'b', difficulty:3,
      stem:'BOSS LEVEL: A rope is 6 7/8 m long. How much more rope is needed to make exactly 7 metres?', options:['1/8 m','7/8 m','1 m'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0011', v:1, concept:'fa5.identify', level:'n', difficulty:1,
      stem:'Which expression means 3 wholes and 1 quarter?', options:['3 1/4','1 3/4','3/4'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0012', v:1, concept:'fa5.identify', level:'n', difficulty:1,
      stem:'In 6 2/9, what does the 9 tell us?', options:['Each whole is divided into 9 equal parts','There are 9 whole numbers','There are 9 complete wholes'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0013', v:1, concept:'fa5.identify', level:'n', difficulty:1,
      stem:'Which mixed number is read as "five and two thirds"?', options:['5 2/3','2 5/3','5 3/2'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0014', v:1, concept:'fa5.identify', level:'n', difficulty:1,
      stem:'What is the fractional part of 7 4/5?', options:['4/5','7/5','7/4'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0015', v:1, concept:'fa5.identify', level:'n', difficulty:1,
      stem:'Which mixed number has 2 as its whole-number part and 5/6 as its fraction part?', options:['2 5/6','5 2/6','2 6/5'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0016', v:1, concept:'fa5.partition', level:'n', difficulty:1,
      stem:'Which addition is equal to 4 3/8?', options:['4 + 3/8','4 × 3/8','4 + 8/3'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0017', v:1, concept:'fa5.partition', level:'n', difficulty:1,
      stem:'Partition 5 1/6 into its whole and fractional parts.', options:['5 + 1/6','5 × 1/6','5 + 6/1'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0018', v:1, concept:'fa5.partition', level:'n', difficulty:1,
      stem:'Which mixed number represents 3 wholes and 7 tenths?', options:['3 7/10','7 3/10','3 10/7'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0019', v:1, concept:'fa5.partition', level:'n', difficulty:1,
      stem:'What is 2 5/8 written as a sum?', options:['2 + 5/8','2 + 8/5','2 × 5/8'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0020', v:1, concept:'fa5.partition', level:'n', difficulty:1,
      stem:'A mixed number has a whole-number part of 6 and a fraction part of 3/7. What is it?', options:['6 3/7','3 6/7','6 7/3'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0021', v:1, concept:'fa5.partition', level:'n', difficulty:1,
      stem:'Which statement correctly describes 1 4/5?', options:['One whole and four fifths','Four wholes and one fifth','One fifth of four wholes'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0022', v:1, concept:'fa5.models', level:'n', difficulty:1,
      stem:'A shape shows 1 whole and 2 of 5 equal parts of another whole. What mixed number does it show?', options:['1 2/5','2 1/5','1 5/2'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0023', v:1, concept:'fa5.models', level:'n', difficulty:1,
      stem:'Three whole circles and half of another circle are shaded. How much is shaded?', options:['3 1/2','1 3/2','3 2/1'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0024', v:1, concept:'fa5.models', level:'n', difficulty:1,
      stem:'Four whole strips and 3 out of 10 parts of another strip are shaded. What is the mixed number?', options:['4 3/10','3 4/10','4 10/3'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0025', v:1, concept:'fa5.models', level:'n', difficulty:1,
      stem:'A whole is divided into 6 equal parts. Two whole shapes and 5 parts of another are shaded. What is the amount?', options:['2 5/6','5 2/6','2 6/5'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0026', v:1, concept:'fa5.models', level:'n', difficulty:1,
      stem:'A bar is divided into 4 equal parts. Two whole bars and 1 quarter of another bar are shown. What is the total?', options:['2 1/4','1 2/4','2 4/1'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0027', v:1, concept:'fa5.models', level:'n', difficulty:1,
      stem:'A picture shows 2 complete wholes and 3 sixths of another whole. Which mixed number matches it?', options:['2 3/6','3 2/6','2 6/3'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0028', v:1, concept:'fa5.number-line', level:'n', difficulty:1,
      stem:'On a number line marked in quarters, what is the first tick after 2?', options:['2 1/4','1 2/4','2 3/4'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0029', v:1, concept:'fa5.number-line', level:'n', difficulty:1,
      stem:'Which mixed number is halfway between 3 and 4?', options:['3 1/2','3 1/4','3 3/4'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0030', v:1, concept:'fa5.number-line', level:'n', difficulty:1,
      stem:'A number line is divided into thirds. What is the second tick after 1?', options:['1 2/3','1 1/3','2 1/3'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0031', v:1, concept:'fa5.number-line', level:'n', difficulty:1,
      stem:'Which mixed number lies between 4 and 5?', options:['4 3/8','5 3/8','3 3/8'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0032', v:1, concept:'fa5.compare', level:'n', difficulty:1,
      stem:'Which is greater: 2 3/4 or 2 1/4?', options:['2 3/4','2 1/4','They are equal'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0033', v:1, concept:'fa5.compare', level:'n', difficulty:1,
      stem:'Which mixed number is smaller: 3 1/2 or 4 1/2?', options:['3 1/2','4 1/2','They are equal'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0034', v:1, concept:'fa5.compare', level:'n', difficulty:1,
      stem:'Which is greater: 5 2/3 or 5 1/3?', options:['5 2/3','5 1/3','They are equal'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0035', v:1, concept:'fa5.compare', level:'n', difficulty:1,
      stem:'Which is greater: 2 1/2 or 1 3/4?', options:['2 1/2','1 3/4','They are equal'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0036', v:1, concept:'fa5.compare', level:'n', difficulty:1,
      stem:'Which mixed number is the greatest?', options:['3 3/4','3 1/4','3 1/2'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0037', v:1, concept:'fa5.misconception', level:'t', difficulty:2,
      stem:'Chika says 4 2/5 means 4 multiplied by 2/5. What is the correct meaning?', options:['4 + 2/5','4 − 2/5','4 × 5/2'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0038', v:1, concept:'fa5.misconception', level:'t', difficulty:2,
      stem:'A pupil writes 3 5/4 as a finished mixed number. What is wrong?', options:['The fraction part is greater than 1, so it can make another whole','The whole-number part is too small','The denominator must always be 1'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0039', v:1, concept:'fa5.misconception', level:'t', difficulty:2,
      stem:'Tunde says 2 3/7 is smaller than 2 because 3/7 is less than 1. What is the mistake?', options:['The fraction is added to the 2 wholes, so the amount is greater than 2','The fraction should be subtracted from 2','The whole number should be ignored'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0040', v:1, concept:'fa5.misconception', level:'t', difficulty:2,
      stem:'Which is NOT a correctly written mixed number?', options:['4 6/5','4 3/5','4 1/5'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0041', v:1, concept:'fa5.misconception', level:'t', difficulty:2,
      stem:'A pupil says 3 1/4 is the same as 3/4. Why is this incorrect?', options:['3 1/4 includes 3 complete wholes as well as 1/4','3 1/4 is less than 3/4','The whole number should be the denominator'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0042', v:1, concept:'fa5.misconception', level:'t', difficulty:2,
      stem:'A pupil changes 2 3/8 into 2 8/3. What has the pupil done incorrectly?', options:['Swapped the numerator and denominator of the fraction part','Added the whole number incorrectly','Changed the whole number into a fraction'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0043', v:1, concept:'fa5.context', level:'t', difficulty:2,
      stem:'A family walks 2 1/2 km in the morning and 1 1/2 km in the afternoon. How far do they walk altogether?', options:['4 km','3 km','3 1/2 km'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0044', v:1, concept:'fa5.context', level:'t', difficulty:2,
      stem:'A bottle contains 1 3/4 litres of juice. How many whole litres are there in the bottle?', options:['1 whole litre','3 whole litres','4 whole litres'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0045', v:1, concept:'fa5.context', level:'t', difficulty:2,
      stem:'A piece of cloth is 5 2/3 metres long. Which two whole numbers does its length lie between?', options:['5 and 6','4 and 5','6 and 7'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0046', v:1, concept:'fa5.context', level:'b', difficulty:3,
      stem:'A runner completes 3 3/4 laps on Monday and 2 1/4 laps on Tuesday. How many laps does the runner complete altogether?', options:['6 laps','5 1/2 laps','6 1/2 laps'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0047', v:1, concept:'fa5.context', level:'b', difficulty:3,
      stem:'A recipe needs 2 1/2 cups of flour. A cook has already added 1 1/2 cups. How much more flour is needed?', options:['1 cup','2 cups','1 1/2 cups'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0048', v:1, concept:'fa5.context', level:'b', difficulty:3,
      stem:'A board is 4 3/4 metres long. A carpenter cuts off 1 1/4 metres. How much remains?', options:['3 1/2 m','3 1/4 m','2 1/2 m'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0049', v:1, concept:'fa5.context', level:'b', difficulty:3,
      stem:'Ngozi has 3 2/5 metres of ribbon. She uses 1 1/5 metres. How much ribbon is left?', options:['2 1/5 m','2 2/5 m','1 1/5 m'], correct:0 },
    { id:'P5.AUT.FA.S05.Q0050', v:1, concept:'fa5.context', level:'b', difficulty:3,
      stem:'A water container holds 5 3/4 litres. Another 2 1/4 litres are poured in. How much water is in the container now?', options:['8 litres','7 1/2 litres','8 1/2 litres'], correct:0 }
  ]
},

'P5.AUT.FA.S06': {
  label: 'Convert Improper Fractions to Mixed Numbers',
  lesson: 'P5_FA6',
  targetSize: 50,
  concepts: [
    { id:'fa6.divide-convert', name:'Converting improper fractions using division', target:12 },
    { id:'fa6.remainder', name:'Using the remainder as the new numerator', target:8 },
    { id:'fa6.whole-number', name:'Recognising improper fractions equal to whole numbers', target:5 },
    { id:'fa6.simplify', name:'Simplifying the fractional part after conversion', target:7 },
    { id:'fa6.check', name:'Checking conversions by multiplying and adding', target:6 },
    { id:'fa6.number-line', name:'Locating converted fractions between whole numbers', target:5 },
    { id:'fa6.context', name:'Converting improper fractions in real-life problems', target:7 }
  ],
  questions: [
    { id:'P5.AUT.FA.S06.Q0001', v:1, concept:'fa6.divide-convert', level:'n', difficulty:1,
      stem:'Convert 9/4 to a mixed number.', options:['2 1/4','1 2/4','2 4/9'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0002', v:1, concept:'fa6.divide-convert', level:'n', difficulty:1,
      stem:'Convert 17/5 to a mixed number.', options:['3 2/5','2 3/5','3 2/17'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0003', v:1, concept:'fa6.whole-number', level:'n', difficulty:1,
      stem:'Write 20/5 as a whole number.', options:['4','5','20'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0004', v:1, concept:'fa6.divide-convert', level:'n', difficulty:1,
      stem:'Convert 13/6 to a mixed number.', options:['2 1/6','1 7/6','2 7/6'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0005', v:1, concept:'fa6.simplify', level:'n', difficulty:1,
      stem:'Convert 22/8 to a mixed number with the fraction part in simplest form.', options:['2 3/4','2 6/8','3 1/4'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0006', v:1, concept:'fa6.number-line', level:'n', difficulty:1,
      stem:'Between which two whole numbers does 25/6 lie?', options:['4 and 5','5 and 6','3 and 4'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0007', v:1, concept:'fa6.context', level:'n', difficulty:1,
      stem:'A cup holds 1/3 litre. Tolu fills it 14 times. How many litres is that?', options:['4 2/3 L','4 1/3 L','3 2/3 L'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0008', v:1, concept:'fa6.check', level:'n', difficulty:1,
      stem:'Emeka says 14/3 = 4 2/3. Which calculation checks his answer?', options:['4 × 3 + 2 = 14','4 + 3 + 2 = 9','14 ÷ 2 = 7'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0009', v:1, concept:'fa6.check', level:'t', difficulty:2,
      stem:'THINK DEEPER: Ada converts 17/5 and writes 3 2/17. What went wrong?', options:['She put the remainder over the numerator instead of keeping the denominator 5','She found the wrong whole number','Nothing — she is correct'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0010', v:1, concept:'fa6.context', level:'b', difficulty:3,
      stem:'BOSS LEVEL: A bakery cuts every cake into 8 slices. They sell 53 slices. How many cakes is that, as a mixed number?', options:['6 5/8','5 6/8','6 3/8'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0011', v:1, concept:'fa6.divide-convert', level:'n', difficulty:1,
      stem:'Convert 7/3 to a mixed number.', options:['2 1/3','1 2/3','3 1/7'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0012', v:1, concept:'fa6.divide-convert', level:'n', difficulty:1,
      stem:'Convert 11/4 to a mixed number.', options:['2 3/4','3 2/4','2 1/4'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0013', v:1, concept:'fa6.divide-convert', level:'n', difficulty:1,
      stem:'Convert 14/5 to a mixed number.', options:['2 4/5','4 2/5','3 1/5'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0014', v:1, concept:'fa6.divide-convert', level:'n', difficulty:1,
      stem:'Convert 19/6 to a mixed number.', options:['3 1/6','2 1/6','3 6/19'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0015', v:1, concept:'fa6.divide-convert', level:'n', difficulty:1,
      stem:'Convert 16/3 to a mixed number.', options:['5 1/3','4 1/3','5 3/16'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0016', v:1, concept:'fa6.divide-convert', level:'n', difficulty:1,
      stem:'Convert 23/5 to a mixed number.', options:['4 3/5','3 4/5','5 3/5'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0017', v:1, concept:'fa6.divide-convert', level:'n', difficulty:1,
      stem:'Convert 15/4 to a mixed number.', options:['3 3/4','4 3/4','3 1/4'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0018', v:1, concept:'fa6.divide-convert', level:'n', difficulty:1,
      stem:'Convert 29/7 to a mixed number.', options:['4 1/7','3 1/7','4 7/29'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0019', v:1, concept:'fa6.divide-convert', level:'n', difficulty:1,
      stem:'Convert 31/6 to a mixed number.', options:['5 1/6','4 1/6','5 6/31'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0020', v:1, concept:'fa6.remainder', level:'n', difficulty:1,
      stem:'When 17 is divided by 5, what is the remainder?', options:['2','3','5'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0021', v:1, concept:'fa6.remainder', level:'n', difficulty:1,
      stem:'When converting 14/3 to a mixed number, what becomes the numerator of the fraction part?', options:['2','3','4'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0022', v:1, concept:'fa6.remainder', level:'n', difficulty:1,
      stem:'Convert 10/4 to a mixed number. What is the remainder?', options:['2','1','4'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0023', v:1, concept:'fa6.remainder', level:'n', difficulty:1,
      stem:'In the conversion 18/5 = 3 3/5, which number is the remainder?', options:['3','5','18'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0024', v:1, concept:'fa6.remainder', level:'n', difficulty:1,
      stem:'Convert 13/4 to a mixed number. What is left after making the complete wholes?', options:['1 quarter','3 quarters','2 quarters'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0025', v:1, concept:'fa6.remainder', level:'n', difficulty:1,
      stem:'When 22 is divided by 6, what is the remainder?', options:['4','3','2'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0026', v:1, concept:'fa6.remainder', level:'n', difficulty:1,
      stem:'Convert 16/5 to a mixed number. What is the remainder?', options:['1','2','3'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0027', v:1, concept:'fa6.remainder', level:'n', difficulty:1,
      stem:'A pupil divides 27 by 8 and gets 3 remainder 3. Which fraction part should be written?', options:['3/8','8/3','3/27'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0028', v:1, concept:'fa6.whole-number', level:'n', difficulty:1,
      stem:'Convert 18/6 to a whole number.', options:['3','6','12'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0029', v:1, concept:'fa6.whole-number', level:'n', difficulty:1,
      stem:'What whole number is equal to 24/8?', options:['3','4','8'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0030', v:1, concept:'fa6.whole-number', level:'n', difficulty:1,
      stem:'Convert 21/7 to a whole number.', options:['3','7','14'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0031', v:1, concept:'fa6.whole-number', level:'n', difficulty:1,
      stem:'What happens when the numerator divides exactly by the denominator?', options:['The answer is a whole number with no fraction part','The remainder becomes the denominator','The fraction becomes a proper fraction'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0032', v:1, concept:'fa6.simplify', level:'n', difficulty:1,
      stem:'Convert 14/4 to a mixed number and simplify the fraction part.', options:['3 1/2','3 2/4','2 1/2'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0033', v:1, concept:'fa6.simplify', level:'n', difficulty:1,
      stem:'Convert 26/8 to a mixed number in simplest form.', options:['3 1/4','3 2/8','2 3/4'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0034', v:1, concept:'fa6.simplify', level:'n', difficulty:1,
      stem:'Convert 15/6 to a mixed number and simplify the fraction part.', options:['2 1/2','2 3/6','3 1/2'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0035', v:1, concept:'fa6.simplify', level:'n', difficulty:1,
      stem:'Convert 21/9 to a mixed number in simplest form.', options:['2 1/3','2 3/9','3 1/3'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0036', v:1, concept:'fa6.simplify', level:'n', difficulty:1,
      stem:'Convert 35/10 to a mixed number in simplest form.', options:['3 1/2','3 5/10','2 1/2'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0037', v:1, concept:'fa6.simplify', level:'t', difficulty:2,
      stem:'A pupil converts 18/8 to 2 2/8. What is the fully simplified answer?', options:['2 1/4','2 1/8','1 2/4'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0038', v:1, concept:'fa6.check', level:'t', difficulty:2,
      stem:'Which calculation checks that 3 2/5 is equal to 17/5?', options:['3 × 5 + 2 = 17','3 + 5 + 2 = 10','3 × 2 + 5 = 11'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0039', v:1, concept:'fa6.check', level:'t', difficulty:2,
      stem:'A pupil converts 23/4 to 5 3/4. How can you check the answer?', options:['5 × 4 + 3 = 23','5 + 4 + 3 = 12','5 × 3 + 4 = 19'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0040', v:1, concept:'fa6.check', level:'t', difficulty:2,
      stem:'Which improper fraction is equal to 4 1/3?', options:['13/3','12/3','7/3'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0041', v:1, concept:'fa6.check', level:'t', difficulty:2,
      stem:'Which mixed number is equal to 19/6?', options:['3 1/6','2 1/6','3 6/19'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0042', v:1, concept:'fa6.number-line', level:'t', difficulty:2,
      stem:'Between which two whole numbers does 17/5 lie?', options:['3 and 4','2 and 3','4 and 5'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0043', v:1, concept:'fa6.number-line', level:'t', difficulty:2,
      stem:'Which mixed number is represented by 11/3 on a number line?', options:['3 2/3','2 2/3','3 1/3'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0044', v:1, concept:'fa6.number-line', level:'t', difficulty:2,
      stem:'Which improper fraction lies between 2 and 3?', options:['11/4','7/4','13/4'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0045', v:1, concept:'fa6.number-line', level:'t', difficulty:2,
      stem:'A number line is marked in fifths. Which fraction is one fifth after 2?', options:['11/5','9/5','10/5'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0046', v:1, concept:'fa6.context', level:'b', difficulty:3,
      stem:'A baker uses 1/4 kg of flour for each loaf. How many kilograms are used for 15 loaves? Give your answer as a mixed number.', options:['3 3/4 kg','3 1/4 kg','4 1/4 kg'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0047', v:1, concept:'fa6.context', level:'b', difficulty:3,
      stem:'A bottle holds 1/5 litre of juice. How many litres are in 18 full bottles?', options:['3 3/5 L','3 2/5 L','2 3/5 L'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0048', v:1, concept:'fa6.context', level:'b', difficulty:3,
      stem:'A cake is cut into 6 equal slices. A party eats 29 slices. How many cakes is this as a mixed number?', options:['4 5/6 cakes','5 4/6 cakes','4 1/6 cakes'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0049', v:1, concept:'fa6.context', level:'b', difficulty:3,
      stem:'A measuring cup holds 1/8 litre. If 35 cups are poured into a container, how many litres are there?', options:['4 3/8 L','3 4/8 L','4 5/8 L'], correct:0 },
    { id:'P5.AUT.FA.S06.Q0050', v:1, concept:'fa6.context', level:'b', difficulty:3,
      stem:'A runner completes 41 quarter-kilometre laps. How far does the runner travel in kilometres?', options:['10 1/4 km','10 3/4 km','11 1/4 km'], correct:0 }
  ]
}














  }
};