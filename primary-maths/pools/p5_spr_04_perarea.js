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
    }

  }
};