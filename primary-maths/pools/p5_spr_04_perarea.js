/* ============================================================
   XELEDIF QUESTION POOL — Primary 5 · Spring · Perimeter & Area
   topicKey : P5.SPR.PA
   FILE RULES
   - Plain data only. No functions, no HTML except the entities listed in the guide.
   - A question ID is permanent. Never reuse one. To fix a question, keep the ID and
     increase `v`. To remove one, set `retired:true` (never delete the object).
   - `correct` is the index in `options` AS AUTHORED. The engine shuffles at runtime.
   - `check` (optional) is a JS arithmetic expression the validator evaluates and
     compares with the correct option, so wrong answer keys are caught automatically.
   ============================================================ */
window.XELEDIF_POOLS = window.XELEDIF_POOLS || {};

window.XELEDIF_POOLS['P5.SPR.PA'] = {
  topicKey: 'P5.SPR.PA',
  schemaVersion: 1,
  steps: {

    /* ---------------------------------------------------------
       STEP 1 — What is perimeter?
       Lesson constant in index.html: P5_PA1
       --------------------------------------------------------- */
    'P5.SPR.PA.S01': {
      label: 'What is perimeter?',
      lesson: 'P5_PA1',
      targetSize: 50,

      concepts: [
        { id:'pa1.meaning',     name:'Meaning of perimeter (the distance around the outside)', target:7 },
        { id:'pa1.count-grid',  name:'Counting unit lengths round a grid shape',                 target:9 },
        { id:'pa1.add-sides',   name:'Adding the side lengths of a polygon',                     target:10 },
        { id:'pa1.units',       name:'Choosing the right unit (length vs area)',                 target:6 },
        { id:'pa1.regular',     name:'Regular polygons: multiply the side length',               target:6 },
        { id:'pa1.perim-vs-area', name:'Perimeter is not area (edge vs inside)',                 target:6 },
        { id:'pa1.reasoning',   name:'Reasoning and problem-solving about perimeter',            target:6 }
      ],

      /* Level mix to aim for: n ≈ 34, t ≈ 10, b ≈ 6 */
      questions: [
        /* ===== CORE 10 — copied from the lesson's exercises, in order ===== */
        { id:'P5.SPR.PA.S01.Q0001', v:1, concept:'pa1.meaning', level:'n', difficulty:1,
          stem:'What does the perimeter of a shape measure?',
          options:['The distance around the outside','The space inside the shape','The number of corners'], correct:0 },

        { id:'P5.SPR.PA.S01.Q0002', v:1, concept:'pa1.count-grid', level:'n', difficulty:1,
          stem:'A rectangle on a grid is 4 units wide and 2 units tall. What is its perimeter?',
          options:['12 units','8 units','6 units'], correct:0, check:'2*(4+2)' },

        { id:'P5.SPR.PA.S01.Q0003', v:1, concept:'pa1.add-sides', level:'n', difficulty:1,
          stem:'A triangle has sides 7 cm, 8 cm and 9 cm. What is its perimeter?',
          options:['24 cm','21 cm','25 cm'], correct:0, check:'7+8+9' },

        { id:'P5.SPR.PA.S01.Q0004', v:1, concept:'pa1.units', level:'n', difficulty:1,
          stem:'Which unit is best for the perimeter of a football pitch?',
          options:['metres (m)','square centimetres (cm²)','square metres (m²)'], correct:0 },

        { id:'P5.SPR.PA.S01.Q0005', v:1, concept:'pa1.regular', level:'n', difficulty:2,
          stem:'A regular pentagon has sides of 6 cm. What is its perimeter?',
          options:['30 cm','36 cm','11 cm'], correct:0, check:'5*6' },

        { id:'P5.SPR.PA.S01.Q0006', v:1, concept:'pa1.perim-vs-area', level:'n', difficulty:2,
          stem:'Ade says the perimeter of a 6 by 1 rectangle is 6 because there are 6 squares. What is his mistake?',
          options:['He found the area; the perimeter is 14','He should have said 12','He is correct'], correct:0, check:'2*(6+1)' },

        { id:'P5.SPR.PA.S01.Q0007', v:1, concept:'pa1.add-sides', level:'n', difficulty:1,
          stem:'A square has sides of 9 cm. What is its perimeter?',
          options:['36 cm','18 cm','81 cm'], correct:0, check:'4*9' },

        { id:'P5.SPR.PA.S01.Q0008', v:1, concept:'pa1.add-sides', level:'n', difficulty:2,
          stem:'A pentagon has sides 3 cm, 4 cm, 3 cm, 4 cm and 2 cm. What is its perimeter?',
          options:['16 cm','12 cm','14 cm'], correct:0, check:'3+4+3+4+2' },

        { id:'P5.SPR.PA.S01.Q0009', v:1, concept:'pa1.reasoning', level:'t', difficulty:2,
          stem:'Can two different shapes have exactly the same perimeter?',
          options:['Yes — for example a 4 by 4 and a 6 by 2 rectangle both have perimeter 16','No — each perimeter belongs to one shape only','Only if they have the same area'], correct:0 },

        { id:'P5.SPR.PA.S01.Q0010', v:1, concept:'pa1.regular', level:'b', difficulty:3,
          stem:'A 42 cm ribbon fits exactly once round a regular hexagon. How long is each side?',
          options:['7 cm','6 cm','8 cm'], correct:0, check:'42/6' },

        /* ===== BATCH A — meaning (Q0011–Q0016) ===== */
        { id:'P5.SPR.PA.S01.Q0011', v:1, concept:'pa1.meaning', level:'n', difficulty:1,
          stem:'The word "perimeter" comes from Greek. What does "peri" mean?',
          options:['Around','Inside','Straight'], correct:0 },

        { id:'P5.SPR.PA.S01.Q0012', v:1, concept:'pa1.meaning', level:'n', difficulty:1,
          stem:'To find the perimeter of a shape, what do you do?',
          options:['Add the lengths of all the sides','Count the squares inside it','Count the corners'], correct:0 },

        { id:'P5.SPR.PA.S01.Q0013', v:1, concept:'pa1.meaning', level:'n', difficulty:2,
          stem:'A farmer fences a field all the way round the edge. What is he finding?',
          options:['The perimeter of the field','The area of the field','The number of corners of the field'], correct:0 },

        { id:'P5.SPR.PA.S01.Q0014', v:1, concept:'pa1.meaning', level:'n', difficulty:2,
          stem:'A pupil lays string round an exercise book, straightens it, then measures it. What has she measured?',
          options:['The perimeter of the book','The area of the book','The width of the book'], correct:0 },

        { id:'P5.SPR.PA.S01.Q0015', v:1, concept:'pa1.meaning', level:'n', difficulty:2,
          stem:'Which of these describes the perimeter of a shape?',
          options:['Walking once round the edge and stopping where you started','Colouring in the whole shape','Counting how many squares fit inside'], correct:0 },

        { id:'P5.SPR.PA.S01.Q0016', v:1, concept:'pa1.meaning', level:'t', difficulty:2,
          stem:'A shape is made of 10 squares. Is its perimeter 10?',
          options:['Not necessarily — the perimeter depends on the outside edge, not the number of squares','Yes — every square adds 1 to the perimeter','Yes — as long as the squares are all the same size'], correct:0 },

        /* ===== BATCH A — count-grid (Q0017–Q0024) ===== */
        { id:'P5.SPR.PA.S01.Q0017', v:1, concept:'pa1.count-grid', level:'n', difficulty:1,
          stem:'A rectangle on a grid is 3 units wide and 2 units tall. What is its perimeter?',
          options:['10 units','6 units','5 units'], correct:0, check:'2*(3+2)' },

        { id:'P5.SPR.PA.S01.Q0018', v:1, concept:'pa1.count-grid', level:'n', difficulty:1,
          stem:'A rectangle on a grid is 5 units wide and 3 units tall. What is its perimeter?',
          options:['16 units','15 units','8 units'], correct:0, check:'2*(5+3)' },

        { id:'P5.SPR.PA.S01.Q0019', v:1, concept:'pa1.count-grid', level:'n', difficulty:2,
          stem:'A square on a grid is 4 units by 4 units. What is its perimeter?',
          options:['16 units','8 units','4 units'], correct:0, check:'4*4' },

        { id:'P5.SPR.PA.S01.Q0020', v:1, concept:'pa1.count-grid', level:'n', difficulty:2,
          stem:'An L-shape on a grid has sides 3, 2, 2, 2, 5 and 4 unit lengths. What is its perimeter?',
          options:['18 units','16 units','20 units'], correct:0, check:'3+2+2+2+5+4' },

        { id:'P5.SPR.PA.S01.Q0021', v:1, concept:'pa1.count-grid', level:'n', difficulty:2,
          stem:'A rectangle on a grid is 7 units wide and 1 unit tall. What is its perimeter?',
          options:['16 units','7 units','8 units'], correct:0, check:'2*(7+1)' },

        { id:'P5.SPR.PA.S01.Q0022', v:1, concept:'pa1.count-grid', level:'t', difficulty:2,
          stem:'An L-shape is built inside a 5 by 4 rectangle by cutting out a small corner. Is its perimeter bigger than, smaller than or equal to the rectangle\'s 18 units?',
          options:['Equal to 18 units — cutting a corner and stepping back the same amount keeps the perimeter the same','Smaller than 18 units because some squares were removed','Bigger than 18 units because there are more sides'], correct:0 },

        { id:'P5.SPR.PA.S01.Q0023', v:1, concept:'pa1.count-grid', level:'t', difficulty:3,
          stem:'A rectangle on a grid has a perimeter of 14 units. Its height is 2 units. What is its width?',
          options:['5 units','7 units','12 units'], correct:0, check:'14/2-2' },

        { id:'P5.SPR.PA.S01.Q0024', v:1, concept:'pa1.count-grid', level:'b', difficulty:3,
          stem:'A rectangle on a grid is 6 units wide and 2 units tall. Another rectangle has the same perimeter but is 5 units wide. How tall is the second rectangle?',
          options:['3 units','4 units','2 units'], correct:0, check:'(2*(6+2))/2-5' },

        /* ===== BATCH B — add-sides (Q0025–Q0030) ===== */
        { id:'P5.SPR.PA.S01.Q0025', v:1, concept:'pa1.add-sides', level:'n', difficulty:1,
          stem:'A triangle has sides 5 cm, 6 cm and 7 cm. What is its perimeter?',
          options:['18 cm','11 cm','17 cm'], correct:0, check:'5+6+7' },

        { id:'P5.SPR.PA.S01.Q0026', v:1, concept:'pa1.add-sides', level:'n', difficulty:1,
          stem:'A quadrilateral has sides 4 cm, 5 cm, 4 cm and 5 cm. What is its perimeter?',
          options:['18 cm','9 cm','14 cm'], correct:0, check:'4+5+4+5' },

        { id:'P5.SPR.PA.S01.Q0027', v:1, concept:'pa1.add-sides', level:'n', difficulty:2,
          stem:'An irregular pentagon has sides 5 cm, 7 cm, 6 cm, 7 cm and 5 cm. What is its perimeter?',
          options:['30 cm','25 cm','35 cm'], correct:0, check:'5+7+6+7+5' },

        { id:'P5.SPR.PA.S01.Q0028', v:1, concept:'pa1.add-sides', level:'n', difficulty:2,
          stem:'A triangle has two sides of 8 cm and one side of 11 cm. What is its perimeter?',
          options:['27 cm','19 cm','24 cm'], correct:0, check:'8+8+11' },

        { id:'P5.SPR.PA.S01.Q0029', v:1, concept:'pa1.add-sides', level:'n', difficulty:2,
          stem:'A rectangle has a length of 12 cm and a width of 5 cm. What is its perimeter?',
          options:['34 cm','17 cm','60 cm'], correct:0, check:'2*(12+5)' },

        { id:'P5.SPR.PA.S01.Q0030', v:1, concept:'pa1.add-sides', level:'t', difficulty:3,
          stem:'A hexagon has five sides of 4 cm each and one side of 9 cm. What is its perimeter?',
          options:['29 cm','24 cm','33 cm'], correct:0, check:'5*4+9' },

        /* ===== BATCH B — units (Q0031–Q0034) ===== */
        { id:'P5.SPR.PA.S01.Q0031', v:1, concept:'pa1.units', level:'n', difficulty:1,
          stem:'Which unit is best for the perimeter of a photo frame?',
          options:['centimetres (cm)','square centimetres (cm²)','square metres (m²)'], correct:0 },

        { id:'P5.SPR.PA.S01.Q0032', v:1, concept:'pa1.units', level:'n', difficulty:1,
          stem:'Perimeter is a length. Which of these is NOT a unit of perimeter?',
          options:['square metres (m²)','metres (m)','kilometres (km)'], correct:0 },

        { id:'P5.SPR.PA.S01.Q0033', v:1, concept:'pa1.units', level:'n', difficulty:2,
          stem:'A pupil writes the perimeter of a garden as "24 m²". What is wrong?',
          options:['Perimeter is a length, so the answer should be 24 m, not m²','Nothing is wrong','It should be 24 cm'], correct:0 },

        { id:'P5.SPR.PA.S01.Q0034', v:1, concept:'pa1.units', level:'t', difficulty:2,
          stem:'Which unit is best for the perimeter of a small eraser?',
          options:['millimetres (mm)','kilometres (km)','square millimetres (mm²)'], correct:0 },

        /* ===== BATCH C — regular (Q0035–Q0038) ===== */
        { id:'P5.SPR.PA.S01.Q0035', v:1, concept:'pa1.regular', level:'n', difficulty:1,
          stem:'A regular hexagon has sides of 5 cm. What is its perimeter?',
          options:['30 cm','25 cm','11 cm'], correct:0, check:'6*5' },

        { id:'P5.SPR.PA.S01.Q0036', v:1, concept:'pa1.regular', level:'n', difficulty:1,
          stem:'A regular octagon has sides of 4 cm. What is its perimeter?',
          options:['32 cm','12 cm','16 cm'], correct:0, check:'8*4' },

        { id:'P5.SPR.PA.S01.Q0037', v:1, concept:'pa1.regular', level:'t', difficulty:2,
          stem:'A regular triangle (equilateral) has a perimeter of 27 cm. How long is each side?',
          options:['9 cm','13.5 cm','3 cm'], correct:0, check:'27/3' },

        { id:'P5.SPR.PA.S01.Q0038', v:1, concept:'pa1.regular', level:'b', difficulty:3,
          stem:'A regular pentagon and a square both have a perimeter of 40 cm. How much longer is the square\'s side?',
          options:['2 cm','8 cm','10 cm'], correct:0, check:'40/4-40/5' },

        /* ===== BATCH C — perim-vs-area (Q0039–Q0043) ===== */
        { id:'P5.SPR.PA.S01.Q0039', v:1, concept:'pa1.perim-vs-area', level:'n', difficulty:1,
          stem:'A shape covers 15 squares. Is that its perimeter or its area?',
          options:['Its area','Its perimeter','Neither'], correct:0 },

        { id:'P5.SPR.PA.S01.Q0040', v:1, concept:'pa1.perim-vs-area', level:'n', difficulty:2,
          stem:'A 5 by 3 rectangle has a perimeter of 16 units and an area of 15 squares. Which number is the perimeter?',
          options:['16','15','Both 16 and 15'], correct:0 },

        { id:'P5.SPR.PA.S01.Q0041', v:1, concept:'pa1.perim-vs-area', level:'n', difficulty:2,
          stem:'Two shapes have the same area. Must they have the same perimeter?',
          options:['No — shapes with the same area can have different perimeters','Yes — same area always means same perimeter','Only if they are rectangles'], correct:0 },

        { id:'P5.SPR.PA.S01.Q0042', v:1, concept:'pa1.perim-vs-area', level:'t', difficulty:2,
          stem:'A 4 by 4 square and a 6 by 2 rectangle both have a perimeter of 16 units. Which covers more squares?',
          options:['The 4 by 4 square (16 squares against 12)','The 6 by 2 rectangle','They cover the same'], correct:0, check:'4*4-6*2' },

        { id:'P5.SPR.PA.S01.Q0043', v:1, concept:'pa1.perim-vs-area', level:'b', difficulty:3,
          stem:'A pupil says: "These two shapes must have the same area because they both have a perimeter of 20 cm." Why is the pupil wrong?',
          options:['Equal perimeter does not mean equal area — for example 6 by 4 and 8 by 2 both give 20 but cover 24 and 16 squares','The pupil is right','Perimeter and area are always equal'], correct:0 },

        /* ===== BATCH C — reasoning (Q0044–Q0047) ===== */
        { id:'P5.SPR.PA.S01.Q0044', v:1, concept:'pa1.reasoning', level:'n', difficulty:2,
          stem:'A square has a perimeter of 20 cm. How long is each side?',
          options:['5 cm','4 cm','10 cm'], correct:0, check:'20/4' },

        { id:'P5.SPR.PA.S01.Q0045', v:1, concept:'pa1.reasoning', level:'n', difficulty:2,
          stem:'Mr Bello walks once round a triangular plot with sides 12 m, 15 m and 9 m. How far does he walk?',
          options:['36 m','27 m','180 m'], correct:0, check:'12+15+9' },

        { id:'P5.SPR.PA.S01.Q0046', v:1, concept:'pa1.reasoning', level:'t', difficulty:3,
          stem:'A triangle has a perimeter of 20 cm. Two of its sides are 6 cm and 8 cm. How long is the third side?',
          options:['6 cm','5 cm','12 cm'], correct:0, check:'20-6-8' },

        { id:'P5.SPR.PA.S01.Q0047', v:1, concept:'pa1.reasoning', level:'b', difficulty:3,
          stem:'A shape has sides 4 cm, 6 cm, 4 cm, 6 cm. Amaka says it must be a rectangle because opposite sides are equal. Is she right?',
          options:['No — a parallelogram or other quadrilateral can also have two pairs of equal sides','Yes — only rectangles have two pairs of equal sides','Yes — because 4 + 6 + 4 + 6 = 20'], correct:0 }
      ]
    },

    /* ---------------------------------------------------------
       STEP 2 — Perimeter of rectangles
       Lesson constant in index.html: P5_PA2
       --------------------------------------------------------- */
    'P5.SPR.PA.S02': {
      label: 'Perimeter of rectangles',
      lesson: 'P5_PA2',
      targetSize: 50,

      concepts: [
        { id:'pa2.add-four',      name:'Adding all four sides (l + w + l + w)',                  target:9 },
        { id:'pa2.two-l-plus-w',  name:'The 2 × (l + w) method',                                target:10 },
        { id:'pa2.2l-plus-2w',    name:'Double each side: 2l + 2w',                              target:6 },
        { id:'pa2.square',        name:'A square: 4 × side',                                     target:6 },
        { id:'pa2.missing-side',  name:'Finding a missing side from the perimeter',              target:7 },
        { id:'pa2.units',         name:'Converting mixed units before adding',                   target:6 },
        { id:'pa2.real-life',     name:'Real-life problems (fencing, cost, running round)',       target:6 }
      ],

      /* Level mix to aim for: n ≈ 34, t ≈ 10, b ≈ 6 */
      questions: [
        /* ===== CORE 10 — copied from the lesson's exercises, in order ===== */
        { id:'P5.SPR.PA.S02.Q0001', v:1, concept:'pa2.two-l-plus-w', level:'n', difficulty:1,
          stem:'What is the perimeter of a rectangle 8 cm long and 3 cm wide?',
          options:['22 cm','24 cm','11 cm'], correct:0, check:'2*(8+3)' },

        { id:'P5.SPR.PA.S02.Q0002', v:1, concept:'pa2.two-l-plus-w', level:'n', difficulty:1,
          stem:'Use 2 × (l + w) to find the perimeter of a rectangle with l = 15 cm and w = 6 cm.',
          options:['42 cm','21 cm','90 cm'], correct:0, check:'2*(15+6)' },

        { id:'P5.SPR.PA.S02.Q0003', v:1, concept:'pa2.square', level:'n', difficulty:1,
          stem:'A square has sides of 12 m. What is its perimeter?',
          options:['48 m','24 m','144 m'], correct:0, check:'4*12' },

        { id:'P5.SPR.PA.S02.Q0004', v:1, concept:'pa2.missing-side', level:'n', difficulty:2,
          stem:'A rectangle has a perimeter of 30 m and a length of 9 m. What is its width?',
          options:['6 m','12 m','21 m'], correct:0, check:'30/2-9' },

        { id:'P5.SPR.PA.S02.Q0005', v:1, concept:'pa2.real-life', level:'t', difficulty:2,
          stem:'Which rectangle has the greatest perimeter?',
          options:['10 cm by 2 cm','6 cm by 5 cm','7 cm by 4 cm'], correct:0 },

        { id:'P5.SPR.PA.S02.Q0006', v:1, concept:'pa2.units', level:'n', difficulty:2,
          stem:'A rectangle is 1 m 50 cm long and 70 cm wide. What is its perimeter in centimetres?',
          options:['440 cm','220 cm','2,220 cm'], correct:0, check:'2*(150+70)' },

        { id:'P5.SPR.PA.S02.Q0007', v:1, concept:'pa2.real-life', level:'n', difficulty:1,
          stem:'A rectangular playground is 25 m by 14 m. Tola runs once round it. How far does she run?',
          options:['78 m','39 m','350 m'], correct:0, check:'2*(25+14)' },

        { id:'P5.SPR.PA.S02.Q0008', v:1, concept:'pa2.add-four', level:'n', difficulty:2,
          stem:'Kemi says the perimeter of a 9 cm by 4 cm rectangle is 9 + 4 = 13 cm. What is her mistake?',
          options:['She added only two sides; the perimeter is 26 cm','She should have multiplied 9 × 4 = 36 cm','She is correct'], correct:0, check:'2*(9+4)' },

        { id:'P5.SPR.PA.S02.Q0009', v:1, concept:'pa2.missing-side', level:'t', difficulty:3,
          stem:'A rectangle has a perimeter of 20 cm and whole-number sides. How many different rectangles are possible? (Count 2 by 8 and 8 by 2 as the same.)',
          options:['5','4','9'], correct:0 },

        { id:'P5.SPR.PA.S02.Q0010', v:1, concept:'pa2.real-life', level:'b', difficulty:3,
          stem:'A garden is 14 m by 9 m. Fencing costs £6 per metre, but a 2 m gate needs no fencing. How much is the fencing?',
          options:['£264','£276','£138'], correct:0, check:'(2*(14+9)-2)*6' },

        /* ===== BATCH A — add-four (Q0011–Q0018) ===== */
        { id:'P5.SPR.PA.S02.Q0011', v:1, concept:'pa2.add-four', level:'n', difficulty:1,
          stem:'A rectangle is 9 cm long and 4 cm wide. Write its perimeter as a sum of four sides.',
          options:['9 + 4 + 9 + 4 = 26 cm','9 + 4 = 13 cm','9 × 4 = 36 cm'], correct:0, check:'9+4+9+4' },

        { id:'P5.SPR.PA.S02.Q0012', v:1, concept:'pa2.add-four', level:'n', difficulty:1,
          stem:'A rectangle is 6 cm long and 2 cm wide. What is its perimeter?',
          options:['16 cm','8 cm','12 cm'], correct:0, check:'6+2+6+2' },

        { id:'P5.SPR.PA.S02.Q0013', v:1, concept:'pa2.add-four', level:'n', difficulty:1,
          stem:'A rectangle is 11 m long and 3 m wide. What is its perimeter?',
          options:['28 m','14 m','33 m'], correct:0, check:'11+3+11+3' },

        { id:'P5.SPR.PA.S02.Q0014', v:1, concept:'pa2.add-four', level:'n', difficulty:2,
          stem:'A rectangle has sides 12 cm and 5 cm. What is its perimeter?',
          options:['34 cm','17 cm','60 cm'], correct:0, check:'12+5+12+5' },

        { id:'P5.SPR.PA.S02.Q0015', v:1, concept:'pa2.add-four', level:'n', difficulty:2,
          stem:'A rectangle is 20 m long and 7 m wide. What is its perimeter?',
          options:['54 m','27 m','140 m'], correct:0, check:'20+7+20+7' },

        { id:'P5.SPR.PA.S02.Q0016', v:1, concept:'pa2.add-four', level:'n', difficulty:2,
          stem:'A pupil walks once round a rectangular field 30 m by 18 m. How far does she walk?',
          options:['96 m','48 m','540 m'], correct:0, check:'30+18+30+18' },

        { id:'P5.SPR.PA.S02.Q0017', v:1, concept:'pa2.add-four', level:'t', difficulty:2,
          stem:'A rectangle has a perimeter of 26 cm. Three of its sides are 9 cm, 4 cm and 9 cm. What is the fourth side?',
          options:['4 cm','9 cm','13 cm'], correct:0, check:'26-9-4-9' },

        { id:'P5.SPR.PA.S02.Q0018', v:1, concept:'pa2.add-four', level:'b', difficulty:3,
          stem:'A rectangular frame is made from 40 cm of wire. Its length is 13 cm. What is its width?',
          options:['7 cm','14 cm','27 cm'], correct:0, check:'40/2-13' },

        /* ===== BATCH A — two-l-plus-w (Q0019–Q0026) ===== */
        { id:'P5.SPR.PA.S02.Q0019', v:1, concept:'pa2.two-l-plus-w', level:'n', difficulty:1,
          stem:'Use 2 × (l + w) with l = 7 cm and w = 3 cm. What is the perimeter?',
          options:['20 cm','10 cm','21 cm'], correct:0, check:'2*(7+3)' },

        { id:'P5.SPR.PA.S02.Q0020', v:1, concept:'pa2.two-l-plus-w', level:'n', difficulty:1,
          stem:'Use 2 × (l + w) with l = 12 m and w = 8 m. What is the perimeter?',
          options:['40 m','20 m','96 m'], correct:0, check:'2*(12+8)' },

        { id:'P5.SPR.PA.S02.Q0021', v:1, concept:'pa2.two-l-plus-w', level:'n', difficulty:2,
          stem:'Use 2 × (l + w) with l = 25 cm and w = 14 cm. What is the perimeter?',
          options:['78 cm','39 cm','350 cm'], correct:0, check:'2*(25+14)' },

        { id:'P5.SPR.PA.S02.Q0022', v:1, concept:'pa2.two-l-plus-w', level:'n', difficulty:2,
          stem:'In 2 × (l + w), why do we add the length and width first?',
          options:['One length and one width is half the journey round the rectangle, so doubling gives the whole perimeter','Because addition is always done before multiplication','Because the length and width are always the same'], correct:0 },

        { id:'P5.SPR.PA.S02.Q0023', v:1, concept:'pa2.two-l-plus-w', level:'n', difficulty:2,
          stem:'A rectangle is 18 m long and 9 m wide. What is its perimeter?',
          options:['54 m','27 m','162 m'], correct:0, check:'2*(18+9)' },

        { id:'P5.SPR.PA.S02.Q0024', v:1, concept:'pa2.two-l-plus-w', level:'t', difficulty:2,
          stem:'Which calculation gives the perimeter of a rectangle 16 cm by 4 cm?',
          options:['2 × (16 + 4)','16 × 4','16 + 4'], correct:0, check:'2*(16+4)' },

        { id:'P5.SPR.PA.S02.Q0025', v:1, concept:'pa2.two-l-plus-w', level:'t', difficulty:3,
          stem:'A rectangle has a perimeter of 50 cm and a length of 17 cm. What is its width?',
          options:['8 cm','16 cm','33 cm'], correct:0, check:'50/2-17' },

        { id:'P5.SPR.PA.S02.Q0026', v:1, concept:'pa2.two-l-plus-w', level:'b', difficulty:3,
          stem:'Two rectangles both have a perimeter of 36 cm. One is 12 cm by 6 cm. The other is 15 cm long. How wide is it?',
          options:['3 cm','6 cm','9 cm'], correct:0, check:'36/2-15' },

        /* ===== BATCH B — 2l-plus-2w (Q0027–Q0032) ===== */
        { id:'P5.SPR.PA.S02.Q0027', v:1, concept:'pa2.2l-plus-2w', level:'n', difficulty:1,
          stem:'Use 2l + 2w with l = 7 and w = 3. What is the perimeter?',
          options:['20','10','21'], correct:0, check:'2*7+2*3' },

        { id:'P5.SPR.PA.S02.Q0028', v:1, concept:'pa2.2l-plus-2w', level:'n', difficulty:1,
          stem:'Use 2l + 2w with l = 14 and w = 6. What is the perimeter?',
          options:['40','20','84'], correct:0, check:'2*14+2*6' },

        { id:'P5.SPR.PA.S02.Q0029', v:1, concept:'pa2.2l-plus-2w', level:'n', difficulty:2,
          stem:'A rectangle is 21 cm long and 9 cm wide. Use 2l + 2w to find its perimeter.',
          options:['60 cm','30 cm','189 cm'], correct:0, check:'2*21+2*9' },

        { id:'P5.SPR.PA.S02.Q0030', v:1, concept:'pa2.2l-plus-2w', level:'n', difficulty:2,
          stem:'Which calculation matches the perimeter of a rectangle 13 m by 7 m?',
          options:['(2 × 13) + (2 × 7)','13 × 7','13 + 7'], correct:0, check:'2*13+2*7' },

        { id:'P5.SPR.PA.S02.Q0031', v:1, concept:'pa2.2l-plus-2w', level:'t', difficulty:2,
          stem:'A pupil calculates the perimeter of a 15 cm by 8 cm rectangle as (2 × 15) + 8. What is the correct answer?',
          options:['46 cm','38 cm','23 cm'], correct:0, check:'2*15+2*8' },

        { id:'P5.SPR.PA.S02.Q0032', v:1, concept:'pa2.2l-plus-2w', level:'b', difficulty:3,
          stem:'A rectangle has a perimeter of 44 m. Its length is 6 m more than its width. What is its width?',
          options:['8 m','14 m','22 m'], correct:0, check:'(44-2*6)/4' },

        /* ===== BATCH B — square (Q0033–Q0038) ===== */
        { id:'P5.SPR.PA.S02.Q0033', v:1, concept:'pa2.square', level:'n', difficulty:1,
          stem:'A square has sides of 9 cm. What is its perimeter?',
          options:['36 cm','18 cm','81 cm'], correct:0, check:'4*9' },

        { id:'P5.SPR.PA.S02.Q0034', v:1, concept:'pa2.square', level:'n', difficulty:1,
          stem:'A square has sides of 7 m. What is its perimeter?',
          options:['28 m','14 m','49 m'], correct:0, check:'4*7' },

        { id:'P5.SPR.PA.S02.Q0035', v:1, concept:'pa2.square', level:'n', difficulty:2,
          stem:'A square has sides of 15 cm. What is its perimeter?',
          options:['60 cm','30 cm','225 cm'], correct:0, check:'4*15' },

        { id:'P5.SPR.PA.S02.Q0036', v:1, concept:'pa2.square', level:'n', difficulty:2,
          stem:'How is the perimeter of a square different from a rectangle\'s?',
          options:['All four sides are equal, so you can simply do 4 × side','The opposite sides are not equal','You still need length and width'], correct:0 },

        { id:'P5.SPR.PA.S02.Q0037', v:1, concept:'pa2.square', level:'t', difficulty:2,
          stem:'A square has a perimeter of 32 cm. How long is each side?',
          options:['8 cm','4 cm','16 cm'], correct:0, check:'32/4' },

        { id:'P5.SPR.PA.S02.Q0038', v:1, concept:'pa2.square', level:'b', difficulty:3,
          stem:'A square has a perimeter of 36 cm. A rectangle has the same perimeter and a length of 13 cm. What is the rectangle\'s width?',
          options:['5 cm','9 cm','18 cm'], correct:0, check:'36/2-13' },

        /* ===== BATCH C — missing-side (Q0039–Q0043) ===== */
        { id:'P5.SPR.PA.S02.Q0039', v:1, concept:'pa2.missing-side', level:'n', difficulty:1,
          stem:'A rectangle has a perimeter of 20 cm and a width of 4 cm. What is its length?',
          options:['6 cm','12 cm','5 cm'], correct:0, check:'20/2-4' },

        { id:'P5.SPR.PA.S02.Q0040', v:1, concept:'pa2.missing-side', level:'n', difficulty:2,
          stem:'A rectangle has a perimeter of 42 m and a length of 15 m. What is its width?',
          options:['6 m','12 m','27 m'], correct:0, check:'42/2-15' },

        { id:'P5.SPR.PA.S02.Q0041', v:1, concept:'pa2.missing-side', level:'n', difficulty:2,
          stem:'In working backwards from a perimeter, what is the first step?',
          options:['Halve the perimeter to find one length plus one width','Subtract the known side from the perimeter','Multiply the perimeter by 2'], correct:0 },

        { id:'P5.SPR.PA.S02.Q0042', v:1, concept:'pa2.missing-side', level:'t', difficulty:3,
          stem:'A rectangle has a perimeter of 60 cm. Its length is twice its width. What is its width?',
          options:['10 cm','15 cm','20 cm'], correct:0, check:'60/6' },

        { id:'P5.SPR.PA.S02.Q0043', v:1, concept:'pa2.missing-side', level:'b', difficulty:3,
          stem:'A rectangle has a perimeter of 70 m. Its length is 5 m more than its width. What is its width?',
          options:['15 m','20 m','30 m'], correct:0, check:'(70-2*5)/4' },

        /* ===== BATCH C — units (Q0044–Q0048) ===== */
        { id:'P5.SPR.PA.S02.Q0044', v:1, concept:'pa2.units', level:'n', difficulty:1,
          stem:'A rectangle is 1 m 20 cm long and 80 cm wide. Before adding, what should you do with 1 m 20 cm?',
          options:['Convert it to 120 cm','Change 80 cm to metres without converting 1 m 20 cm','Multiply it by 80'], correct:0, check:'120' },

        { id:'P5.SPR.PA.S02.Q0045', v:1, concept:'pa2.units', level:'n', difficulty:1,
          stem:'A rectangle is 2 m long and 60 cm wide. What is its perimeter in centimetres?',
          options:['520 cm','260 cm','120 cm'], correct:0, check:'2*(200+60)' },

        { id:'P5.SPR.PA.S02.Q0046', v:1, concept:'pa2.units', level:'n', difficulty:2,
          stem:'Convert 1 m 20 cm to centimetres.',
          options:['120 cm','12 cm','1,020 cm'], correct:0, check:'120' },

        { id:'P5.SPR.PA.S02.Q0047', v:1, concept:'pa2.units', level:'n', difficulty:2,
          stem:'A mat is 1 m 50 cm long and 90 cm wide. What is its perimeter in centimetres?',
          options:['480 cm','240 cm','4,800 cm'], correct:0, check:'2*(150+90)' },

        { id:'P5.SPR.PA.S02.Q0048', v:1, concept:'pa2.units', level:'t', difficulty:3,
          stem:'A rectangle is 3 m long and 1 m 40 cm wide. What is its perimeter in metres?',
          options:['8.8 m','4.4 m','8.4 m'], correct:0, check:'2*(3+1.4)' },

        /* ===== BATCH C — real-life (Q0049–Q0051) ===== */
        { id:'P5.SPR.PA.S02.Q0049', v:1, concept:'pa2.real-life', level:'n', difficulty:1,
          stem:'Fencing costs £4 per metre. How much does it cost to fence a rectangular garden 10 m by 6 m all the way round?',
          options:['£128','£64','£240'], correct:0, check:'2*(10+6)*4' },

        { id:'P5.SPR.PA.S02.Q0050', v:1, concept:'pa2.real-life', level:'t', difficulty:2,
          stem:'A rectangular pool is 25 m by 12 m. A pupil swims once round the edge. How far does she swim?',
          options:['74 m','37 m','300 m'], correct:0, check:'2*(25+12)' },

        { id:'P5.SPR.PA.S02.Q0051', v:1, concept:'pa2.real-life', level:'b', difficulty:3,
          stem:'A rectangular school field is 80 m by 45 m. A runner does 3 laps. How far does he run?',
          options:['750 m','250 m','1,500 m'], correct:0, check:'3*2*(80+45)' }
      ]
    },

        /* ---------------------------------------------------------
       STEP 3 — Perimeter of rectilinear shapes
       Lesson constant in index.html: P5_PA3
       --------------------------------------------------------- */
    'P5.SPR.PA.S03': {
      label: 'Perimeter of rectilinear shapes',
      lesson: 'P5_PA3',
      targetSize: 50,

      concepts: [
        { id:'pa3.definition',     name:'What makes a shape rectilinear',                          target:6 },
        { id:'pa3.count-grid',     name:'Counting round the edge of an L, T or staircase',         target:9 },
        { id:'pa3.walk-edge',      name:'Adding all sides once round the edge',                    target:10 },
        { id:'pa3.bounding-box',   name:'The bounding-rectangle trick (and when it fails)',        target:7 },
        { id:'pa3.internal-line',  name:'Not counting the internal line',                          target:6 },
        { id:'pa3.area-link',      name:'Same perimeter, different area',                          target:6 },
        { id:'pa3.real-life',      name:'Real-life rectilinear problems (lawns, rooms, fencing)',  target:6 }
      ],

      questions: [
        /* ===== CORE 10 — copied from the lesson's exercises ===== */
        { id:'P5.SPR.PA.S03.Q0001', v:1, concept:'pa3.definition', level:'n', difficulty:1,
          stem:'What is a rectilinear shape?',
          options:['A shape made only from rectangles, with all right angles','Any shape with straight sides','A shape with curved edges'], correct:0 },

        { id:'P5.SPR.PA.S03.Q0002', v:1, concept:'pa3.bounding-box', level:'n', difficulty:2,
          stem:'An L-shape is drawn inside a 4 by 3 rectangle by cutting a 1 by 1 square out of the top-right corner. What is the perimeter of the L-shape?',
          options:['14 units','12 units','10 units'], correct:0, check:'2*(4+3)' },

        { id:'P5.SPR.PA.S03.Q0003', v:1, concept:'pa3.bounding-box', level:'n', difficulty:2,
          stem:'A staircase is drawn inside a 6 by 2 rectangle. What is its perimeter?',
          options:['16 units','12 units','8 units'], correct:0, check:'2*(6+2)' },

        { id:'P5.SPR.PA.S03.Q0004', v:1, concept:'pa3.walk-edge', level:'n', difficulty:2,
          stem:'A U-shape has these side lengths in order: 6, 5, 2, 3, 2, 3, 2, 5. What is its perimeter?',
          options:['28 units','22 units','32 units'], correct:0, check:'6+5+2+3+2+3+2+5' },

        { id:'P5.SPR.PA.S03.Q0005', v:1, concept:'pa3.bounding-box', level:'n', difficulty:2,
          stem:'Why does the bounding-rectangle trick work for an L-shape cut from a corner?',
          options:['Because the cut-out and the step-back match, so the perimeter is unchanged','Because the area stays the same','Because L-shapes are always rectangles'], correct:0 },

        { id:'P5.SPR.PA.S03.Q0006', v:1, concept:'pa3.bounding-box', level:'t', difficulty:2,
          stem:'A pupil says the perimeter of the L-shape in Q2 is 12 because the rectangle is 4 by 3. Is the pupil right?',
          options:['No — the L-shape perimeter is 14, the rectangle perimeter is also 14 but the L is not the same shape','Yes — the L is the same as the rectangle','Only if the cut is 2 by 2'], correct:0 },

        { id:'P5.SPR.PA.S03.Q0007', v:1, concept:'pa3.walk-edge', level:'n', difficulty:2,
          stem:'A T-shape with a 1 by 2 arm on top of a 4 by 3 body. What is its perimeter?',
          options:['18 units','16 units','20 units'], correct:0, check:'4+1+1+2+1+1+4+4' },

        { id:'P5.SPR.PA.S03.Q0008', v:1, concept:'pa3.internal-line', level:'n', difficulty:2,
          stem:'A square of side 5 has a 1 by 1 square removed from the middle of one edge. What is the new perimeter?',
          options:['24 units','20 units','22 units'], correct:0, check:'4*5+2*2' },

        { id:'P5.SPR.PA.S03.Q0009', v:1, concept:'pa3.area-link', level:'t', difficulty:3,
          stem:'Two rectilinear shapes both have a perimeter of 20 units but different areas. Is that possible?',
          options:['Yes — the U-shape (28 units in the example) is a reminder that perimeters change easily while areas do not','No — same perimeter always gives same area','Only for rectangles'], correct:0 },

        { id:'P5.SPR.PA.S03.Q0010', v:1, concept:'pa3.real-life', level:'b', difficulty:3,
          stem:'A lawn 14 m by 10 m has a 4 by 4 square shed built into one corner. How many metres of fencing go round the remaining lawn?',
          options:['48 m','44 m','52 m'], correct:0, check:'2*(14+10)' },

        /* ===== BATCH A — definition (Q0011–Q0015) ===== */
        { id:'P5.SPR.PA.S03.Q0011', v:1, concept:'pa3.definition', level:'n', difficulty:1,
          stem:'Which of these shapes is NOT rectilinear?',
          options:['A circle','An L-shape','A T-shape'], correct:0 },

        { id:'P5.SPR.PA.S03.Q0012', v:1, concept:'pa3.definition', level:'n', difficulty:1,
          stem:'Every corner of a rectilinear shape is what kind of angle?',
          options:['A right angle','An acute angle','An obtuse angle'], correct:0 },

        { id:'P5.SPR.PA.S03.Q0013', v:1, concept:'pa3.definition', level:'n', difficulty:2,
          stem:'A rectilinear shape is made by joining two rectangles. How many sides can it have?',
          options:['6, 8, or more — depending on how the rectangles are joined','Always 4','Always 8'], correct:0 },

        { id:'P5.SPR.PA.S03.Q0014', v:1, concept:'pa3.definition', level:'n', difficulty:2,
          stem:'Which of these is rectilinear?',
          options:['A plus-sign shape made of squares','A triangle','A semicircle'], correct:0 },

        { id:'P5.SPR.PA.S03.Q0015', v:1, concept:'pa3.definition', level:'t', difficulty:2,
          stem:'Two rectangles are joined along one full edge to make an L-shape. Why is the perimeter of the L-shape less than the sum of the perimeters of the two rectangles?',
          options:['Because the shared edge is no longer on the outside — it is internal and is not counted','Because the L-shape is smaller','Because rectangles get smaller when joined'], correct:0 },

        /* ===== BATCH A — count-grid (Q0016–Q0023) ===== */
        { id:'P5.SPR.PA.S03.Q0016', v:1, concept:'pa3.count-grid', level:'n', difficulty:1,
          stem:'A rectilinear shape fits inside a 5 by 4 rectangle. What is the perimeter of the bounding rectangle?',
          options:['18 units','20 units','9 units'], correct:0, check:'2*(5+4)' },

        { id:'P5.SPR.PA.S03.Q0017', v:1, concept:'pa3.count-grid', level:'n', difficulty:2,
          stem:'An L-shape on a grid has sides 3, 2, 2, 2, 5 and 4 unit lengths. What is its perimeter?',
          options:['18 units','16 units','20 units'], correct:0, check:'3+2+2+2+5+4' },

        { id:'P5.SPR.PA.S03.Q0018', v:1, concept:'pa3.count-grid', level:'n', difficulty:2,
          stem:'A staircase is built inside a 6 by 3 rectangle. What is its perimeter?',
          options:['18 units','12 units','24 units'], correct:0, check:'2*(6+3)' },

        { id:'P5.SPR.PA.S03.Q0019', v:1, concept:'pa3.count-grid', level:'n', difficulty:2,
          stem:'A T-shape is made from a 4 by 2 body with a 2 by 1 arm on top. What is its perimeter?',
          options:['14 units','16 units','12 units'], correct:0, check:'4+2+1+1+1+1+2+4' },

        { id:'P5.SPR.PA.S03.Q0020', v:1, concept:'pa3.count-grid', level:'n', difficulty:2,
          stem:'A rectangle is 7 units wide and 4 units tall. What is its perimeter?',
          options:['22 units','28 units','11 units'], correct:0, check:'2*(7+4)' },

        { id:'P5.SPR.PA.S03.Q0021', v:1, concept:'pa3.count-grid', level:'t', difficulty:3,
          stem:'A 1 by 1 square is removed from the middle of one edge of a 5 by 5 square. What is the new perimeter?',
          options:['24 units','20 units','22 units'], correct:0, check:'4*5+2*2' },

        { id:'P5.SPR.PA.S03.Q0022', v:1, concept:'pa3.count-grid', level:'t', difficulty:3,
          stem:'A U-shape is cut into a 10 by 6 rectangle. The cut is 4 units wide and 3 units deep. What is the perimeter of the U-shape?',
          options:['38 units','32 units','36 units'], correct:0, check:'2*(10+6)+2*3' },

        { id:'P5.SPR.PA.S03.Q0023', v:1, concept:'pa3.count-grid', level:'b', difficulty:3,
          stem:'An L-shape has a perimeter of 30 units and fits inside a 12 by 3 rectangle. What is the perimeter of the bounding rectangle?',
          options:['30 units','24 units','36 units'], correct:0, check:'2*(12+3)' },

        /* ===== BATCH B — walk-edge (Q0024–Q0031) ===== */
        { id:'P5.SPR.PA.S03.Q0024', v:1, concept:'pa3.walk-edge', level:'n', difficulty:1,
          stem:'To find the perimeter of a rectilinear shape, what do you do?',
          options:['Add the lengths of every outside edge once','Add the inside edges too','Multiply the two longest sides'], correct:0 },

        { id:'P5.SPR.PA.S03.Q0025', v:1, concept:'pa3.walk-edge', level:'n', difficulty:1,
          stem:'An L-shape has sides 4, 3, 1, 2, 3 and 5. What is its perimeter?',
          options:['18 units','12 units','16 units'], correct:0, check:'4+3+1+2+3+5' },

        { id:'P5.SPR.PA.S03.Q0026', v:1, concept:'pa3.walk-edge', level:'n', difficulty:2,
          stem:'A rectilinear shape has 8 sides of 3 units each. What is its perimeter?',
          options:['24 units','16 units','12 units'], correct:0, check:'8*3' },

        { id:'P5.SPR.PA.S03.Q0027', v:1, concept:'pa3.walk-edge', level:'n', difficulty:2,
          stem:'An L-shape has 6 sides. Four of them are 5 cm, 3 cm, 2 cm and 4 cm. What are the other two?',
          options:['5 cm and 3 cm','4 cm and 2 cm','6 cm and 3 cm'], correct:0 },

        { id:'P5.SPR.PA.S03.Q0028', v:1, concept:'pa3.walk-edge', level:'n', difficulty:2,
          stem:'A rectilinear shape has sides 12, 8, 5, 3, 7 and 5 metres. What is its perimeter?',
          options:['40 m','35 m','45 m'], correct:0, check:'12+8+5+3+7+5' },

        { id:'P5.SPR.PA.S03.Q0029', v:1, concept:'pa3.walk-edge', level:'t', difficulty:2,
          stem:'A pupil adds the sides of an L-shape in order: 4, 2, 2, 2, 5, 4 — but forgets one short vertical edge of 2. The perimeter is therefore 19 cm. What is the correct answer?',
          options:['21 cm','17 cm','23 cm'], correct:0, check:'19+2' },

        { id:'P5.SPR.PA.S03.Q0030', v:1, concept:'pa3.walk-edge', level:'t', difficulty:3,
          stem:'A rectilinear shape has a perimeter of 40 cm. Its sides are 8, 5, 4, 3, 5, 2, ? and ? . What is the sum of the two missing sides?',
          options:['13 cm','14 cm','15 cm'], correct:0, check:'40-8-5-4-3-5-2' },

        { id:'P5.SPR.PA.S03.Q0031', v:1, concept:'pa3.walk-edge', level:'b', difficulty:3,
          stem:'A rectilinear shape has 10 sides. Six of them are 4 cm each, and three are 5 cm each. If the perimeter is 51 cm, what is the 10th side?',
          options:['12 cm','7 cm','5 cm'], correct:0, check:'51-6*4-3*5' },

        /* ===== BATCH B — bounding-box (Q0032–Q0036) ===== */
        { id:'P5.SPR.PA.S03.Q0032', v:1, concept:'pa3.bounding-box', level:'n', difficulty:1,
          stem:'An L-shape is made by removing a small square from a corner of a 6 by 4 rectangle. What is the perimeter of the L?',
          options:['20 units','18 units','22 units'], correct:0, check:'2*(6+4)' },

        { id:'P5.SPR.PA.S03.Q0033', v:1, concept:'pa3.bounding-box', level:'n', difficulty:2,
          stem:'A staircase is made by cutting small squares from the top-right corner of an 8 by 3 rectangle. What is the perimeter of the staircase?',
          options:['22 units','24 units','16 units'], correct:0, check:'2*(8+3)' },

        { id:'P5.SPR.PA.S03.Q0034', v:1, concept:'pa3.bounding-box', level:'n', difficulty:2,
          stem:'A U-shape fits in a 9 by 5 rectangle and its cut is 3 units deep. What is the perimeter of the U?',
          options:['34 units','28 units','31 units'], correct:0, check:'2*(9+5)+2*3' },

        { id:'P5.SPR.PA.S03.Q0035', v:1, concept:'pa3.bounding-box', level:'t', difficulty:3,
          stem:'A pupil says: "I can use the bounding-rectangle trick for every rectilinear shape." When is the pupil WRONG?',
          options:['When the shape has a cut-out that is deeper than its step-back (e.g. a deep U-shape)','Never — the trick always works','When the shape is made from more than two rectangles'], correct:0 },

        { id:'P5.SPR.PA.S03.Q0036', v:1, concept:'pa3.bounding-box', level:'b', difficulty:3,
          stem:'A U-shape fits in a 12 by 8 rectangle. Its cut is 5 units wide and x units deep. Its perimeter is 48 units. What is x?',
          options:['2','3','4'], correct:0, check:'(48-2*(12+8))/2' },

        /* ===== BATCH C — internal-line (Q0037–Q0042) ===== */
        { id:'P5.SPR.PA.S03.Q0037', v:1, concept:'pa3.internal-line', level:'n', difficulty:1,
          stem:'Two rectangles share an internal edge of 3 cm. Should that edge be counted in the perimeter of the combined shape?',
          options:['No — the internal edge is not on the outside','Yes — every edge is counted','Only if the shape is an L'], correct:0 },

        { id:'P5.SPR.PA.S03.Q0038', v:1, concept:'pa3.internal-line', level:'n', difficulty:2,
          stem:'A 4 by 3 rectangle and a 4 by 2 rectangle are joined along their 4 cm side. What is the perimeter of the new shape?',
          options:['22 cm','24 cm','28 cm'], correct:0, check:'2*(4+(3+2))' },

        { id:'P5.SPR.PA.S03.Q0039', v:1, concept:'pa3.internal-line', level:'n', difficulty:2,
          stem:'A 5 by 2 rectangle and a 3 by 2 rectangle are joined along their 2 cm side. What is the perimeter of the new shape?',
          options:['20 cm','24 cm','18 cm'], correct:0, check:'2*((5+3)+2)' },

        { id:'P5.SPR.PA.S03.Q0040', v:1, concept:'pa3.internal-line', level:'t', difficulty:3,
          stem:'Two identical 6 by 4 rectangles are joined along their long edge. What is the perimeter of the combined shape?',
          options:['32 units','48 units','40 units'], correct:0, check:'2*(6+(4+4))' },

        { id:'P5.SPR.PA.S03.Q0041', v:1, concept:'pa3.internal-line', level:'t', difficulty:3,
          stem:'Two rectangles 8 by 3 are joined along their short edge. What is the perimeter of the combined shape?',
          options:['38 units','48 units','28 units'], correct:0, check:'2*((8+8)+3)' },

        { id:'P5.SPR.PA.S03.Q0042', v:1, concept:'pa3.internal-line', level:'b', difficulty:3,
          stem:'Two rectangles, 6 by 2 and 4 by 3, are joined along a shared edge of 2 cm. What is the perimeter of the new rectilinear shape?',
          options:['20 cm','24 cm','22 cm'], correct:0, check:'2*(6+2)+2*(4+3)-2*2' },

        /* ===== BATCH C — area-link (Q0043–Q0046) ===== */
        { id:'P5.SPR.PA.S03.Q0043', v:1, concept:'pa3.area-link', level:'n', difficulty:2,
          stem:'Two rectilinear shapes both have a perimeter of 20 units. Do they have to cover the same area?',
          options:['No — same perimeter does not mean same area','Yes','Only if both are rectangles'], correct:0 },

        { id:'P5.SPR.PA.S03.Q0044', v:1, concept:'pa3.area-link', level:'n', difficulty:2,
          stem:'An L-shape is made from 13 unit squares and has perimeter 18. If a 1 by 1 square is removed from a corner, what is the new area and new perimeter?',
          options:['Area 12, perimeter 18','Area 12, perimeter 20','Area 13, perimeter 18'], correct:0 },

        { id:'P5.SPR.PA.S03.Q0045', v:1, concept:'pa3.area-link', level:'t', difficulty:3,
          stem:'Two rectilinear shapes each have perimeter 30 but one has area 24 and the other has area 40. How is this possible?',
          options:['Perimeter measures the edge, area measures the inside — they can vary independently','The shapes must be identical','Area always equals perimeter when both are 30'], correct:0 },

        { id:'P5.SPR.PA.S03.Q0046', v:1, concept:'pa3.area-link', level:'b', difficulty:3,
          stem:'A rectilinear shape has perimeter 40 units and area 64 squares. Which could its dimensions be (as a bounding rectangle)?',
          options:['8 by 8','10 by 4','16 by 2.5'], correct:0 },

        /* ===== BATCH C — real-life (Q0047–Q0051) ===== */
        { id:'P5.SPR.PA.S03.Q0047', v:1, concept:'pa3.real-life', level:'n', difficulty:1,
          stem:'A room is L-shaped: it fits inside a 9 m by 6 m rectangle, and the cut-out is 2 m by 2 m from one corner. What is the perimeter of the room?',
          options:['30 m','28 m','32 m'], correct:0, check:'2*(9+6)' },

        { id:'P5.SPR.PA.S03.Q0048', v:1, concept:'pa3.real-life', level:'n', difficulty:2,
          stem:'A lawn 20 m by 15 m has a 3 by 3 square shed built into one corner. How many metres of fence go round the remaining lawn?',
          options:['70 m','64 m','76 m'], correct:0, check:'2*(20+15)' },

        { id:'P5.SPR.PA.S03.Q0049', v:1, concept:'pa3.real-life', level:'n', difficulty:2,
          stem:'A U-shaped flowerbed fits in an 8 m by 5 m rectangle with a 2 m deep cut. What is its perimeter?',
          options:['30 m','26 m','32 m'], correct:0, check:'2*(8+5)+2*2' },

        { id:'P5.SPR.PA.S03.Q0050', v:1, concept:'pa3.real-life', level:'t', difficulty:3,
          stem:'A gallery room is L-shaped with perimeter 44 m. The bounding rectangle is 12 m by 8 m. What is the perimeter of the bounding rectangle, and is the L bigger or smaller?',
          options:['40 m — the L is BIGGER than its bounding rectangle','44 m — they are the same','24 m — the L is bigger'], correct:0, check:'2*(12+8)' },

        { id:'P5.SPR.PA.S03.Q0051', v:1, concept:'pa3.real-life', level:'b', difficulty:3,
          stem:'A 12 m by 8 m garden has a 4 by 4 square shed built into one corner AND a 2 by 1 shallow cut on one long edge. What is the perimeter?',
          options:['44 m','40 m','48 m'], correct:0, check:'2*(12+8)+2*1' }
      ]
    },

    /* ---------------------------------------------------------
       STEP 4 — Find missing lengths
       Lesson constant in index.html: P5_PA4
       --------------------------------------------------------- */
    'P5.SPR.PA.S04': {
      label: 'Find missing lengths',
      lesson: 'P5_PA4',
      targetSize: 50,

      concepts: [
        { id:'pa4.opposite',     name:'Opposite sides of a rectangle are equal',                    target:8 },
        { id:'pa4.perimeter-wb', name:'Finding a side from the perimeter (halve, then subtract)',   target:10 },
        { id:'pa4.totals',       name:'Matching totals of parallel sides on a rectilinear shape',   target:9 },
        { id:'pa4.area-link',    name:'Finding a side from the area (length × width)',             target:6 },
        { id:'pa4.square',       name:'A square from its perimeter or side',                       target:6 },
        { id:'pa4.multi-step',   name:'Multi-step problems and missing-side word problems',        target:6 },
        { id:'pa4.real-life',    name:'Real-life problems with missing measurements',              target:5 }
      ],

      questions: [
        /* ===== CORE 10 — copied from the lesson's exercises ===== */
        { id:'P5.SPR.PA.S04.Q0001', v:1, concept:'pa4.perimeter-wb', level:'n', difficulty:2,
          stem:'A rectangle has a perimeter of 30 cm and a width of 4 cm. What is its length?',
          options:['11 cm','15 cm','7.5 cm'], correct:0, check:'30/2-4' },

        { id:'P5.SPR.PA.S04.Q0002', v:1, concept:'pa4.opposite', level:'n', difficulty:1,
          stem:'A rectangle has three sides 9 cm, 4 cm and 9 cm. What is the fourth side?',
          options:['4 cm','9 cm','13 cm'], correct:0 },

        { id:'P5.SPR.PA.S04.Q0003', v:1, concept:'pa4.totals', level:'n', difficulty:2,
          stem:'An L-shape has a total height of 10 cm on the left. The two vertical edges on the right are 3 cm and ?. What is ??',
          options:['7 cm','13 cm','3 cm'], correct:0, check:'10-3' },

        { id:'P5.SPR.PA.S04.Q0004', v:1, concept:'pa4.totals', level:'n', difficulty:2,
          stem:'An L-shape has a bottom edge of 9 cm. The top horizontals are 5 cm and ?. What is ??',
          options:['4 cm','14 cm','5 cm'], correct:0, check:'9-5' },

        { id:'P5.SPR.PA.S04.Q0005', v:1, concept:'pa4.square', level:'n', difficulty:1,
          stem:'A square has a perimeter of 36 cm. What is its side length?',
          options:['9 cm','6 cm','18 cm'], correct:0, check:'36/4' },

        { id:'P5.SPR.PA.S04.Q0006', v:1, concept:'pa4.perimeter-wb', level:'n', difficulty:2,
          stem:'A rectangle has a perimeter of 24 cm and a length of 8 cm. What is its width?',
          options:['4 cm','8 cm','16 cm'], correct:0, check:'24/2-8' },

        { id:'P5.SPR.PA.S04.Q0007', v:1, concept:'pa4.area-link', level:'n', difficulty:2,
          stem:'A rectangle has an area of 42 cm² and a width of 6 cm. What is its length?',
          options:['7 cm','8 cm','36 cm'], correct:0, check:'42/6' },

        { id:'P5.SPR.PA.S04.Q0008', v:1, concept:'pa4.totals', level:'n', difficulty:2,
          stem:'A U-shape has a perimeter of 30 cm. Three known sides are 8 cm, 5 cm and 3 cm. What is the sum of the remaining five sides?',
          options:['14 cm','19 cm','22 cm'], correct:0, check:'30-8-5-3' },

        { id:'P5.SPR.PA.S04.Q0009', v:1, concept:'pa4.multi-step', level:'t', difficulty:3,
          stem:'A rectangle and a square both have a perimeter of 24 cm. The rectangle is 8 cm long. What is the rectangle\'s width and what is the square\'s side?',
          options:['Rectangle width 4 cm, square side 6 cm','Rectangle width 6 cm, square side 4 cm','Rectangle width 3 cm, square side 5 cm'], correct:0 },

        { id:'P5.SPR.PA.S04.Q0010', v:1, concept:'pa4.real-life', level:'b', difficulty:3,
          stem:'A garden is 20 m by 12 m. A square shed 5 m by 5 m is built into one corner. What is the perimeter of the remaining lawn?',
          options:['64 m','54 m','74 m'], correct:0, check:'2*(20+12)' },

        /* ===== BATCH A — opposite (Q0011–Q0018) ===== */
        { id:'P5.SPR.PA.S04.Q0011', v:1, concept:'pa4.opposite', level:'n', difficulty:1,
          stem:'In a rectangle, which side is equal to the top side?',
          options:['The bottom side','The left side','No side'], correct:0 },

        { id:'P5.SPR.PA.S04.Q0012', v:1, concept:'pa4.opposite', level:'n', difficulty:1,
          stem:'A rectangle has a top of 6 cm and a left of 4 cm. What is the right side?',
          options:['4 cm','6 cm','10 cm'], correct:0 },

        { id:'P5.SPR.PA.S04.Q0013', v:1, concept:'pa4.opposite', level:'n', difficulty:1,
          stem:'A rectangle has a bottom of 9 cm and a right of 7 cm. What is the bottom-plus-right sum?',
          options:['16 cm','14 cm','9 cm'], correct:0, check:'9+7' },

        { id:'P5.SPR.PA.S04.Q0014', v:1, concept:'pa4.opposite', level:'n', difficulty:2,
          stem:'A rectangle has three sides 11 cm, 6 cm and 11 cm. What is the fourth side?',
          options:['6 cm','11 cm','17 cm'], correct:0 },

        { id:'P5.SPR.PA.S04.Q0015', v:1, concept:'pa4.opposite', level:'n', difficulty:2,
          stem:'A rectangle has a perimeter of 30 cm. Its left side is 5 cm. What is its top side?',
          options:['10 cm','15 cm','5 cm'], correct:0, check:'30/2-5' },

        { id:'P5.SPR.PA.S04.Q0016', v:1, concept:'pa4.opposite', level:'t', difficulty:2,
          stem:'A rectangle has a top of 13 cm and a perimeter of 44 cm. What is its right side?',
          options:['9 cm','13 cm','22 cm'], correct:0, check:'44/2-13' },

        { id:'P5.SPR.PA.S04.Q0017', v:1, concept:'pa4.opposite', level:'t', difficulty:3,
          stem:'A rectangle has sides in order top, right, bottom, left. If top = 8 and perimeter = 30, what are right and left?',
          options:['7 and 7','8 and 8','6 and 6'], correct:0, check:'(30-2*8)/2' },

        { id:'P5.SPR.PA.S04.Q0018', v:1, concept:'pa4.opposite', level:'b', difficulty:3,
          stem:'A rectangle has top 3x, right x and perimeter 48 cm. What is x?',
          options:['6','8','12'], correct:0, check:'48/8' },

        /* ===== BATCH A — perimeter-wb (Q0019–Q0027) ===== */
        { id:'P5.SPR.PA.S04.Q0019', v:1, concept:'pa4.perimeter-wb', level:'n', difficulty:1,
          stem:'A rectangle has a perimeter of 20 cm and a length of 7 cm. What is its width?',
          options:['3 cm','7 cm','13 cm'], correct:0, check:'20/2-7' },

        { id:'P5.SPR.PA.S04.Q0020', v:1, concept:'pa4.perimeter-wb', level:'n', difficulty:1,
          stem:'A rectangle has a perimeter of 30 cm and a width of 5 cm. What is its length?',
          options:['10 cm','15 cm','25 cm'], correct:0, check:'30/2-5' },

        { id:'P5.SPR.PA.S04.Q0021', v:1, concept:'pa4.perimeter-wb', level:'n', difficulty:2,
          stem:'A rectangle has a perimeter of 40 m and a length of 12 m. What is its width?',
          options:['8 m','12 m','28 m'], correct:0, check:'40/2-12' },

        { id:'P5.SPR.PA.S04.Q0022', v:1, concept:'pa4.perimeter-wb', level:'n', difficulty:2,
          stem:'A rectangle has a perimeter of 26 cm and a width of 4 cm. What is its length?',
          options:['9 cm','13 cm','22 cm'], correct:0, check:'26/2-4' },

        { id:'P5.SPR.PA.S04.Q0023', v:1, concept:'pa4.perimeter-wb', level:'n', difficulty:2,
          stem:'A rectangle has a perimeter of 50 cm and a length of 17 cm. What is its width?',
          options:['8 cm','16 cm','33 cm'], correct:0, check:'50/2-17' },

        { id:'P5.SPR.PA.S04.Q0024', v:1, concept:'pa4.perimeter-wb', level:'t', difficulty:2,
          stem:'A rectangle has a perimeter of 36 m and a length of 13 m. What is its width?',
          options:['5 m','13 m','23 m'], correct:0, check:'36/2-13' },

        { id:'P5.SPR.PA.S04.Q0025', v:1, concept:'pa4.perimeter-wb', level:'t', difficulty:3,
          stem:'A rectangle has a perimeter of 42 cm and a length that is 3 cm more than its width. What is its width?',
          options:['9 cm','12 cm','15 cm'], correct:0, check:'(42-2*3)/4' },

        { id:'P5.SPR.PA.S04.Q0026', v:1, concept:'pa4.perimeter-wb', level:'t', difficulty:3,
          stem:'A rectangle has a perimeter of 60 cm and a length that is twice its width. What is its width?',
          options:['10 cm','20 cm','15 cm'], correct:0, check:'60/6' },

        { id:'P5.SPR.PA.S04.Q0027', v:1, concept:'pa4.perimeter-wb', level:'b', difficulty:3,
          stem:'A rectangle has a perimeter of 44 cm and a width that is 6 cm less than its length. What is its length?',
          options:['14 cm','8 cm','22 cm'], correct:0, check:'(44/2+6)/2' },

        /* ===== BATCH B — totals (Q0028–Q0035) ===== */
        { id:'P5.SPR.PA.S04.Q0028', v:1, concept:'pa4.totals', level:'n', difficulty:1,
          stem:'An L-shape has a total height of 8 cm on the left. The vertical edges on the right are 3 cm and ?. What is ??',
          options:['5 cm','11 cm','3 cm'], correct:0, check:'8-3' },

        { id:'P5.SPR.PA.S04.Q0029', v:1, concept:'pa4.totals', level:'n', difficulty:2,
          stem:'An L-shape has a top edge of 10 cm. The bottom horizontal edges are 6 cm and ?. What is ??',
          options:['4 cm','16 cm','6 cm'], correct:0, check:'10-6' },

        { id:'P5.SPR.PA.S04.Q0030', v:1, concept:'pa4.totals', level:'n', difficulty:2,
          stem:'A rectilinear shape has a total left side of 12 cm. The right side is split into three vertical edges: 4 cm, 3 cm and ?. What is ??',
          options:['5 cm','8 cm','9 cm'], correct:0, check:'12-4-3' },

        { id:'P5.SPR.PA.S04.Q0031', v:1, concept:'pa4.totals', level:'n', difficulty:2,
          stem:'A rectilinear shape has a total width of 15 m at the bottom. The top horizontals are 6 m, 4 m and ?. What is ??',
          options:['5 m','10 m','9 m'], correct:0, check:'15-6-4' },

        { id:'P5.SPR.PA.S04.Q0032', v:1, concept:'pa4.totals', level:'t', difficulty:3,
          stem:'A U-shape has a total height of 14 cm on each side. The inner cut is 5 cm deep. What is the missing vertical edge at the bottom of the cut?',
          options:['9 cm','14 cm','5 cm'], correct:0, check:'14-5' },

        { id:'P5.SPR.PA.S04.Q0033', v:1, concept:'pa4.totals', level:'t', difficulty:3,
          stem:'An L-shape has a perimeter of 32 cm. Four known sides are 5, 3, 6 and 4. The remaining sides are 6 cm and x. What is x?',
          options:['8 cm','7 cm','9 cm'], correct:0, check:'32-5-3-6-4-6' },

        { id:'P5.SPR.PA.S04.Q0034', v:1, concept:'pa4.totals', level:'b', difficulty:3,
          stem:'A rectilinear shape has a total left side of 15 cm split into 4 + 4 + x. The right side is a single edge of 15 cm. What is x?',
          options:['7 cm','8 cm','15 cm'], correct:0, check:'15-4-4' },

        { id:'P5.SPR.PA.S04.Q0035', v:1, concept:'pa4.totals', level:'b', difficulty:3,
          stem:'A T-shape has an arm 3 cm tall, a body 5 cm tall, a top width of 6 cm split into 2 + 2 + 2, and a stem 4 cm wide. What is its perimeter?',
          options:['30 cm','28 cm','32 cm'], correct:0, check:'6+3+2+5+4+5+2+3' },

        /* ===== BATCH B — area-link (Q0036–Q0041) ===== */
        { id:'P5.SPR.PA.S04.Q0036', v:1, concept:'pa4.area-link', level:'n', difficulty:1,
          stem:'A rectangle has area 24 cm² and width 4 cm. What is its length?',
          options:['6 cm','20 cm','8 cm'], correct:0, check:'24/4' },

        { id:'P5.SPR.PA.S04.Q0037', v:1, concept:'pa4.area-link', level:'n', difficulty:2,
          stem:'A rectangle has area 48 m² and length 8 m. What is its width?',
          options:['6 m','40 m','12 m'], correct:0, check:'48/8' },

        { id:'P5.SPR.PA.S04.Q0038', v:1, concept:'pa4.area-link', level:'n', difficulty:2,
          stem:'A rectangle has area 35 cm² and width 5 cm. What is its perimeter?',
          options:['24 cm','12 cm','40 cm'], correct:0, check:'2*(35/5+5)' },

        { id:'P5.SPR.PA.S04.Q0039', v:1, concept:'pa4.area-link', level:'t', difficulty:2,
          stem:'A rectangle has area 72 m² and a length of 12 m. What is its perimeter?',
          options:['36 m','24 m','60 m'], correct:0, check:'2*(12+72/12)' },

        { id:'P5.SPR.PA.S04.Q0040', v:1, concept:'pa4.area-link', level:'t', difficulty:3,
          stem:'A rectangle has area 60 cm² and a length that is 4 cm more than its width. What is its width?',
          options:['6 cm','10 cm','15 cm'], correct:0 },

        { id:'P5.SPR.PA.S04.Q0041', v:1, concept:'pa4.area-link', level:'b', difficulty:3,
          stem:'A rectangle has area 96 cm². Its length is 3 times its width. What is its perimeter?',
          options:['64 cm','48 cm','56 cm'], correct:0, check:'2*(3*Math.sqrt(96/3)+Math.sqrt(96/3))' },

        /* ===== BATCH C — square (Q0042–Q0046) ===== */
        { id:'P5.SPR.PA.S04.Q0042', v:1, concept:'pa4.square', level:'n', difficulty:1,
          stem:'A square has a perimeter of 20 cm. What is its side?',
          options:['5 cm','10 cm','4 cm'], correct:0, check:'20/4' },

        { id:'P5.SPR.PA.S04.Q0043', v:1, concept:'pa4.square', level:'n', difficulty:1,
          stem:'A square has a perimeter of 32 m. What is its side?',
          options:['8 m','16 m','4 m'], correct:0, check:'32/4' },

        { id:'P5.SPR.PA.S04.Q0044', v:1, concept:'pa4.square', level:'n', difficulty:2,
          stem:'A square has a side of 9 cm. What is its perimeter, and what is the side of a square with the SAME perimeter?',
          options:['36 cm; the same square has side 9 cm','36 cm; the matching square has side 18 cm','18 cm; the matching square has side 9 cm'], correct:0, check:'4*9' },

        { id:'P5.SPR.PA.S04.Q0045', v:1, concept:'pa4.square', level:'t', difficulty:3,
          stem:'A square and a rectangle both have perimeter 40 cm. The rectangle is 14 cm long. What is the side of the square, and the width of the rectangle?',
          options:['Side 10 cm; width 6 cm','Side 10 cm; width 14 cm','Side 20 cm; width 6 cm'], correct:0, check:'40/4' },

        { id:'P5.SPR.PA.S04.Q0046', v:1, concept:'pa4.square', level:'b', difficulty:3,
          stem:'A square and a rectangle have the same perimeter of 60 cm. The rectangle is twice as long as it is wide. How much longer is the rectangle than the square?',
          options:['5 cm','10 cm','15 cm'], correct:0, check:'60/3/2-60/8' },

        /* ===== BATCH C — multi-step (Q0047–Q0050) ===== */
        { id:'P5.SPR.PA.S04.Q0047', v:1, concept:'pa4.multi-step', level:'n', difficulty:2,
          stem:'A rectangle has a perimeter of 28 cm and a length of 9 cm. What is its area?',
          options:['45 cm²','63 cm²','126 cm²'], correct:0, check:'9*(28/2-9)' },

        { id:'P5.SPR.PA.S04.Q0048', v:1, concept:'pa4.multi-step', level:'t', difficulty:3,
          stem:'A rectangle and a square both have a perimeter of 32 cm. The rectangle is 10 cm long. How much wider is the square than the rectangle?',
          options:['2 cm','4 cm','6 cm'], correct:0, check:'32/4-(32/2-10)' },

        { id:'P5.SPR.PA.S04.Q0049', v:1, concept:'pa4.multi-step', level:'t', difficulty:3,
          stem:'A rectilinear shape has a perimeter of 52 cm. Four sides are 10, 8, 6, 4. The other two sides are equal. What is the length of each?',
          options:['12 cm','6 cm','18 cm'], correct:0, check:'(52-10-8-6-4)/2' },

        { id:'P5.SPR.PA.S04.Q0050', v:1, concept:'pa4.multi-step', level:'b', difficulty:3,
          stem:'A garden is 25 m by 15 m. The owner wants a rectangular fence that uses exactly 80 m of fencing. What could the dimensions be?',
          options:['25 m by 15 m','20 m by 20 m','30 m by 10 m'], correct:0, check:'2*(25+15)' },

        /* ===== BATCH C — real-life (Q0051) ===== */
        { id:'P5.SPR.PA.S04.Q0051', v:1, concept:'pa4.real-life', level:'b', difficulty:3,
          stem:'A rectangular lawn has perimeter 76 m and length 24 m. A gardener charges £3 per metre to edge it. What is the cost?',
          options:['£228','£156','£228'], correct:0, check:'76*3' }
      ]
    }




  }
};