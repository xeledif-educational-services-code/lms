/* ============================================================
   XELEDIF QUESTION POOL — Primary 5 · Autumn · Place Value
   topicKey : P5.AUT.PV
   ============================================================ */
window.XELEDIF_POOLS = window.XELEDIF_POOLS || {};

window.XELEDIF_POOLS['P5.AUT.PV'] = {
  topicKey: 'P5.AUT.PV',
  schemaVersion: 1,
  steps: {
    'P5.AUT.PV.S01': {
      label: 'Roman numerals to 1,000',
      lesson: 'P5_PV1',
      targetSize: 50,
      concepts: [
        { id:'pv1.read',        name:'Reading Roman numerals',                              target:10 },
        { id:'pv1.write',       name:'Writing Roman numerals',                              target:10 },
        { id:'pv1.subtract',    name:'The subtraction rule (IV, IX, XL, XC, CD, CM)',       target:10 },
        { id:'pv1.add',         name:'The addition rule (VI, LX, CX, etc.)',                target:8  },
        { id:'pv1.real-life',   name:'Roman numerals in real life (clocks, dates, names)',  target:7  },
        { id:'pv1.reasoning',   name:'Comparing, ordering and spotting errors',             target:5  }
      ],
      questions: [
        /* ===== CORE 10 (From Lesson) ===== */
        { id:'P5.AUT.PV.S01.Q0001', v:1, concept:'pv1.read', level:'n', difficulty:1,
          stem:'What number is VII?', options:['6','7','8'], correct:1, check:'7' },

        { id:'P5.AUT.PV.S01.Q0002', v:1, concept:'pv1.subtract', level:'n', difficulty:2,
          stem:'What number is XL?', options:['60','40','90'], correct:1, check:'40' },

        { id:'P5.AUT.PV.S01.Q0003', v:1, concept:'pv1.write', level:'n', difficulty:2,
          stem:'Write 24 as a Roman numeral.', options:['XXIIV','XXIV','XIVX'], correct:1 },

        { id:'P5.AUT.PV.S01.Q0004', v:1, concept:'pv1.subtract', level:'n', difficulty:3,
          stem:'What number is CD?', options:['600','500','400'], correct:2, check:'400' },

        { id:'P5.AUT.PV.S01.Q0005', v:1, concept:'pv1.subtract', level:'n', difficulty:2,
          stem:'Write 90 as a Roman numeral.', options:['LXL','XXXXL','XC'], correct:2 },

        { id:'P5.AUT.PV.S01.Q0006', v:1, concept:'pv1.real-life', level:'n', difficulty:1,
          stem:'A film is called "Episode IX". Which episode is it?', options:['8','9','11'], correct:1, check:'9' },

        { id:'P5.AUT.PV.S01.Q0007', v:1, concept:'pv1.read', level:'n', difficulty:2,
          stem:'What number is CCCXLV?', options:['345','335','355'], correct:0, check:'345' },

        { id:'P5.AUT.PV.S01.Q0008', v:1, concept:'pv1.read', level:'n', difficulty:1,
          stem:'Which Roman numeral equals 500?', options:['C','L','D'], correct:2 },

        { id:'P5.AUT.PV.S01.Q0009', v:1, concept:'pv1.real-life', level:'t', difficulty:2,
          stem:"A clock's hour hand points at IV. What o'clock is it?", options:["3 o'clock","4 o'clock","5 o'clock"], correct:1 },

        { id:'P5.AUT.PV.S01.Q0010', v:1, concept:'pv1.reasoning', level:'b', difficulty:3,
          stem:'A museum sign reads DCCCLXXXVIII. How old is the exhibit? (Hint: D + CCC + LXXX + VIII)', options:['888','838','788'], correct:0, check:'888' },

        /* ===== BATCH A — The Addition Rule (Q0011–Q0018) ===== */
        { id:'P5.AUT.PV.S01.Q0011', v:1, concept:'pv1.add', level:'n', difficulty:1,
          stem:'What number is VI?', options:['4','5','6'], correct:2, check:'6' },

        { id:'P5.AUT.PV.S01.Q0012', v:1, concept:'pv1.add', level:'n', difficulty:1,
          stem:'What number is LX?', options:['40','50','60'], correct:2, check:'60' },

        { id:'P5.AUT.PV.S01.Q0013', v:1, concept:'pv1.add', level:'n', difficulty:1,
          stem:'What number is CX?', options:['90','100','110'], correct:2, check:'110' },

        { id:'P5.AUT.PV.S01.Q0014', v:1, concept:'pv1.add', level:'n', difficulty:2,
          stem:'What number is MCC?', options:['1,200','1,100','1,000'], correct:0, check:'1200' },

        { id:'P5.AUT.PV.S01.Q0015', v:1, concept:'pv1.add', level:'n', difficulty:2,
          stem:'What number is DL?', options:['450','500','550'], correct:2, check:'550' },

        { id:'P5.AUT.PV.S01.Q0016', v:1, concept:'pv1.add', level:'n', difficulty:2,
          stem:'Write 15 as a Roman numeral.', options:['VX','XV','XXV'], correct:1 },

        { id:'P5.AUT.PV.S01.Q0017', v:1, concept:'pv1.add', level:'t', difficulty:3,
          stem:'Write 1,050 as a Roman numeral.', options:['ML','LM','CML'], correct:0 },

        { id:'P5.AUT.PV.S01.Q0018', v:1, concept:'pv1.add', level:'t', difficulty:3,
          stem:'What number is MMDCLXVI?', options:['2,666','2,166','2,660'], correct:0, check:'2666' },

        /* ===== BATCH B — Writing Rules & Subtraction (Q0019–Q0035) ===== */
        { id:'P5.AUT.PV.S01.Q0019', v:1, concept:'pv1.write', level:'n', difficulty:1,
          stem:'Write 9 as a Roman numeral.', options:['VIIII','IX','XI'], correct:1 },

        { id:'P5.AUT.PV.S01.Q0020', v:1, concept:'pv1.write', level:'n', difficulty:1,
          stem:'Write 40 as a Roman numeral.', options:['XXXX','XL','LX'], correct:1 },

        { id:'P5.AUT.PV.S01.Q0021', v:1, concept:'pv1.write', level:'n', difficulty:2,
          stem:'Write 45 as a Roman numeral.', options:['VL','XLV','XXXXV'], correct:1 },

        { id:'P5.AUT.PV.S01.Q0022', v:1, concept:'pv1.write', level:'n', difficulty:2,
          stem:'Write 150 as a Roman numeral.', options:['CL','LC','CXXL'], correct:0 },

        { id:'P5.AUT.PV.S01.Q0023', v:1, concept:'pv1.write', level:'n', difficulty:2,
          stem:'Write 400 as a Roman numeral.', options:['CCCC','CD','DC'], correct:1 },

        { id:'P5.AUT.PV.S01.Q0024', v:1, concept:'pv1.write', level:'n', difficulty:2,
          stem:'Write 900 as a Roman numeral.', options:['DCCCC','CM','MC'], correct:1 },

        { id:'P5.AUT.PV.S01.Q0025', v:1, concept:'pv1.subtract', level:'n', difficulty:1,
          stem:'What number is IV?', options:['4','5','6'], correct:0, check:'4' },

        { id:'P5.AUT.PV.S01.Q0026', v:1, concept:'pv1.subtract', level:'n', difficulty:1,
          stem:'What number is IX?', options:['11','9','10'], correct:1, check:'9' },

        { id:'P5.AUT.PV.S01.Q0027', v:1, concept:'pv1.subtract', level:'n', difficulty:2,
          stem:'What number is XC?', options:['110','90','100'], correct:1, check:'90' },

        { id:'P5.AUT.PV.S01.Q0028', v:1, concept:'pv1.subtract', level:'n', difficulty:2,
          stem:'What number is CM?', options:['900','1100','1000'], correct:0, check:'900' },

        { id:'P5.AUT.PV.S01.Q0029', v:1, concept:'pv1.subtract', level:'t', difficulty:3,
          stem:'Write 44 as a Roman numeral.', options:['XXXXIV','XLIV','XLIIII'], correct:1 },

        { id:'P5.AUT.PV.S01.Q0030', v:1, concept:'pv1.subtract', level:'t', difficulty:3,
          stem:'Write 99 as a Roman numeral.', options:['IC','XCIX','LXXXXIX'], correct:1 },

        { id:'P5.AUT.PV.S01.Q0031', v:1, concept:'pv1.subtract', level:'t', difficulty:3,
          stem:'Write 490 as a Roman numeral.', options:['XD','CDXC','CDLXXXX'], correct:1 },

        { id:'P5.AUT.PV.S01.Q0032', v:1, concept:'pv1.write', level:'n', difficulty:1,
          stem:'Write 7 as a Roman numeral.', options:['V','VII','VI'], correct:1 },

        { id:'P5.AUT.PV.S01.Q0033', v:1, concept:'pv1.write', level:'n', difficulty:2,
          stem:'Write 60 as a Roman numeral.', options:['XL','LX','LXX'], correct:1 },

        { id:'P5.AUT.PV.S01.Q0034', v:1, concept:'pv1.write', level:'n', difficulty:2,
          stem:'Write 200 as a Roman numeral.', options:['CC','DD','LL'], correct:0 },

        { id:'P5.AUT.PV.S01.Q0035', v:1, concept:'pv1.write', level:'n', difficulty:3,
          stem:'Write 1,000 as a Roman numeral.', options:['D','M','C'], correct:1 },

        /* ===== BATCH C — Real Life & Reasoning (Q0036–Q0050) ===== */
        { id:'P5.AUT.PV.S01.Q0036', v:1, concept:'pv1.real-life', level:'n', difficulty:1,
          stem:'A King is named Henry VIII. Which Henry is this?', options:['The 6th','The 7th','The 8th'], correct:2, check:'8' },

        { id:'P5.AUT.PV.S01.Q0037', v:1, concept:'pv1.real-life', level:'n', difficulty:1,
          stem:'Which Roman numeral is missing from a standard clock face?', options:['IV (4)','IX (9)','VIIII (4)'], correct:2 },

        { id:'P5.AUT.PV.S01.Q0038', v:1, concept:'pv1.real-life', level:'n', difficulty:2,
          stem:'The Super Bowl is labelled Super Bowl LV. Which number is this?', options:['45','50','55'], correct:2, check:'55' },

        { id:'P5.AUT.PV.S01.Q0039', v:1, concept:'pv1.real-life', level:'n', difficulty:2,
          stem:'A building was built in the year MMXII. What year is that?', options:['2002','2012','2020'], correct:1, check:'2012' },

        { id:'P5.AUT.PV.S01.Q0040', v:1, concept:'pv1.real-life', level:'t', difficulty:2,
          stem:'A film sequel is called "Rocky IV". If the first film came out in 1976, what number sequel is this?', options:['The 3rd','The 4th','The 5th'], correct:1, check:'4' },

        { id:'P5.AUT.PV.S01.Q0041', v:1, concept:'pv1.reasoning', level:'n', difficulty:2,
          stem:'Which is the correct way to write 4?', options:['IIII','IV','VX'], correct:1 },

        { id:'P5.AUT.PV.S01.Q0042', v:1, concept:'pv1.reasoning', level:'n', difficulty:2,
          stem:'Why do we write 90 as XC and not LXL?', options:['You should not subtract L from X','The Romans did not have an L','XC is shorter'], correct:0 },

        { id:'P5.AUT.PV.S01.Q0043', v:1, concept:'pv1.reasoning', level:'t', difficulty:3,
          stem:'Which of these Roman numerals is INVALID?', options:['MCMXCIV','XXXX','CDXL'], correct:1 },

        { id:'P5.AUT.PV.S01.Q0044', v:1, concept:'pv1.reasoning', level:'t', difficulty:3,
          stem:'Which Roman numeral is the LARGEST?', options:['DCC','CM','MCC'], correct:2 },

        { id:'P5.AUT.PV.S01.Q0045', v:1, concept:'pv1.read', level:'n', difficulty:2,
          stem:'What number is MCM?', options:['1900','2100','1100'], correct:0, check:'1900' },

        { id:'P5.AUT.PV.S01.Q0046', v:1, concept:'pv1.read', level:'n', difficulty:3,
          stem:'What number is CMXCIV?', options:['994','1094','984'], correct:0, check:'994' },

        { id:'P5.AUT.PV.S01.Q0047', v:1, concept:'pv1.read', level:'n', difficulty:2,
          stem:'What number is LXX?', options:['50','70','110'], correct:1, check:'70' },

        { id:'P5.AUT.PV.S01.Q0048', v:1, concept:'pv1.read', level:'n', difficulty:3,
          stem:'What number is MMM?', options:['300','3000','3300'], correct:1, check:'3000' },

        { id:'P5.AUT.PV.S01.Q0049', v:1, concept:'pv1.subtract', level:'t', difficulty:3,
          stem:'A pupil writes 49 as IL. Why is this wrong?', options:['You must only subtract powers of 10 (I, X, C)','49 is a prime number','You cannot use I in subtraction'], correct:0 },

        { id:'P5.AUT.PV.S01.Q0050', v:1, concept:'pv1.write', level:'b', difficulty:3,
          stem:'Write the year 2024 as a Roman numeral.', options:['MMXXIV','MMXXIVX','MMMXXIV'], correct:0 }
      ]
    },

    'P5.AUT.PV.S02': {
      label: 'Numbers to 10,000',
      lesson: 'P5_PV2',
      targetSize: 50,
      concepts: [
        { id:'pv2.place',       name:'Understanding place value (thousands, hundreds, tens, ones)', target:10 },
        { id:'pv2.value',       name:'Finding the value of a specific digit',                       target:5  },
        { id:'pv2.partition',   name:'Partitioning and recombining numbers',                        target:10 },
        { id:'pv2.zero',        name:'The role of zero (hero zero)',                                target:6  },
        { id:'pv2.counting',    name:'Counting in thousands and the ×10 machine',                   target:9  },
        { id:'pv2.real-life',   name:'Real-life problems and reasoning with 4-digit numbers',       target:6  },
        { id:'pv2.reasoning',   name:'Comparing, ordering and reasoning',                           target:4  }
      ],
      questions: [
        /* ===== CORE 10 (From Lesson) ===== */
        { id:'P5.AUT.PV.S02.Q0001', v:1, concept:'pv2.counting', level:'n', difficulty:1,
          stem:'What is 10 × 1,000?', options:['10,000','1,000','100,000'], correct:0, check:'10000' },

        { id:'P5.AUT.PV.S02.Q0002', v:1, concept:'pv2.place', level:'n', difficulty:1,
          stem:'In 8,253, what does the digit 8 represent?', options:['8,000','800','80'], correct:0, check:'8000' },

        { id:'P5.AUT.PV.S02.Q0003', v:1, concept:'pv2.partition', level:'n', difficulty:2,
          stem:'4,000 + 300 + 20 + 9 = ?', options:['4,329','4,239','3,429'], correct:0, check:'4329' },

        { id:'P5.AUT.PV.S02.Q0004', v:1, concept:'pv2.zero', level:'n', difficulty:2,
          stem:'Which number has 6 thousands and 5 ones?', options:['6,005','6,500','6,050'], correct:0, check:'6005' },

        { id:'P5.AUT.PV.S02.Q0005', v:1, concept:'pv2.counting', level:'n', difficulty:1,
          stem:'Continue the count: 2,000, 3,000, 4,000, ___', options:['5,000','6,000','4,100'], correct:0, check:'5000' },

        { id:'P5.AUT.PV.S02.Q0006', v:1, concept:'pv2.counting', level:'n', difficulty:1,
          stem:'Write ten thousand in figures.', options:['10,000','1,000','100,000'], correct:0, check:'10000' },

        { id:'P5.AUT.PV.S02.Q0007', v:1, concept:'pv2.value', level:'n', difficulty:2,
          stem:'What is the value of the 9 in 7,090?', options:['90','900','9'], correct:0, check:'90' },

        { id:'P5.AUT.PV.S02.Q0008', v:1, concept:'pv2.counting', level:'n', difficulty:2,
          stem:'10,000 − 1,000 = ?', options:['9,000','1,009','11,000'], correct:0, check:'9000' },

        { id:'P5.AUT.PV.S02.Q0009', v:1, concept:'pv2.partition', level:'t', difficulty:2,
          stem:'THINK DEEPER: I am a 4-digit number. My thousands digit is 5, hundreds digit is 2, tens digit is 0 and ones digit is 7. What am I?', options:['5,207','5,270','5,027'], correct:0, check:'5207' },

        { id:'P5.AUT.PV.S02.Q0010', v:1, concept:'pv2.real-life', level:'b', difficulty:3,
          stem:'BOSS LEVEL: A warehouse packs 1,000 pencils per box. There are 7 boxes, 4 packs of 100 and 3 loose pencils. How many pencils?', options:['7,403','7,430','7,304'], correct:0, check:'7403' },

        /* ===== BATCH A — Place Value & The Zero (Q0011–Q0026) ===== */
        { id:'P5.AUT.PV.S02.Q0011', v:1, concept:'pv2.place', level:'n', difficulty:1,
          stem:'What is the value of the digit 5 in 5,342?', options:['5','50','5,000'], correct:2, check:'5000' },
        { id:'P5.AUT.PV.S02.Q0012', v:1, concept:'pv2.place', level:'n', difficulty:1,
          stem:'What is the value of the digit 3 in 2,301?', options:['3','300','30'], correct:1, check:'300' },
        { id:'P5.AUT.PV.S02.Q0013', v:1, concept:'pv2.place', level:'n', difficulty:2,
          stem:'In the number 8,457, which digit is in the hundreds column?', options:['8','4','5'], correct:1 },
        { id:'P5.AUT.PV.S02.Q0014', v:1, concept:'pv2.place', level:'n', difficulty:2,
          stem:'In the number 9,104, which digit is in the tens column?', options:['1','0','4'], correct:1 },
        { id:'P5.AUT.PV.S02.Q0015', v:1, concept:'pv2.place', level:'t', difficulty:3,
          stem:'I have 6 thousands, 0 hundreds, 3 tens, and 8 ones. What number am I?', options:['6,038','6,308','6,380'], correct:0, check:'6038' },
        { id:'P5.AUT.PV.S02.Q0016', v:1, concept:'pv2.place', level:'n', difficulty:1,
          stem:'What is the next number after 9,999?', options:['9,100','10,000','100,000'], correct:1, check:'10000' },
        { id:'P5.AUT.PV.S02.Q0017', v:1, concept:'pv2.place', level:'n', difficulty:1,
          stem:'How many digits are in the number 10,000?', options:['4','5','6'], correct:1, check:'5' },
        
        { id:'P5.AUT.PV.S02.Q0018', v:1, concept:'pv2.value', level:'n', difficulty:2,
          stem:'What is the value of the digit 2 in 7,280?', options:['2','200','20'], correct:1, check:'200' },
        { id:'P5.AUT.PV.S02.Q0019', v:1, concept:'pv2.value', level:'n', difficulty:2,
          stem:'What is the value of the digit 0 in 4,502?', options:['0','50','100'], correct:0, check:'0' },
        { id:'P5.AUT.PV.S02.Q0020', v:1, concept:'pv2.value', level:'n', difficulty:2,
          stem:'In 3,762, the digit 7 is worth how much?', options:['7','70','700'], correct:2, check:'700' },
        { id:'P5.AUT.PV.S02.Q0021', v:1, concept:'pv2.value', level:'t', difficulty:3,
          stem:'In the number 1,050, what is the value of the 5?', options:['5','50','500'], correct:1, check:'50' },

        { id:'P5.AUT.PV.S02.Q0022', v:1, concept:'pv2.zero', level:'n', difficulty:2,
          stem:'Which number has a zero in the hundreds column?', options:['3,045','4,301','1,206'], correct:0 },
        { id:'P5.AUT.PV.S02.Q0023', v:1, concept:'pv2.zero', level:'n', difficulty:2,
          stem:'Write the number four thousand and six in figures.', options:['4,600','4,006','4,060'], correct:1, check:'4006' },
        { id:'P5.AUT.PV.S02.Q0024', v:1, concept:'pv2.zero', level:'n', difficulty:2,
          stem:'Write the number six thousand, five hundred and two in figures.', options:['6,520','6,502','6,052'], correct:1, check:'6502' },
        { id:'P5.AUT.PV.S02.Q0025', v:1, concept:'pv2.zero', level:'n', difficulty:3,
          stem:'If you remove the zero from 3,056, what number is left?', options:['356','3,560','3,060'], correct:0, check:'356' },
        { id:'P5.AUT.PV.S02.Q0026', v:1, concept:'pv2.zero', level:'t', difficulty:3,
          stem:'Why is the zero important in the number 7,405?', options:['It holds the hundreds place empty','It makes the number bigger','It does nothing'], correct:0 },

        /* ===== BATCH B — Partitioning & Counting (Q0027–Q0039) ===== */
        { id:'P5.AUT.PV.S02.Q0027', v:1, concept:'pv2.partition', level:'n', difficulty:1,
          stem:'What is 8,000 + 0 + 60 + 4?', options:['8,604','8,064','8,640'], correct:1, check:'8064' },
        { id:'P5.AUT.PV.S02.Q0028', v:1, concept:'pv2.partition', level:'n', difficulty:1,
          stem:'What is 5,000 + 400 + 30 + 8?', options:['5,348','5,438','5,834'], correct:1, check:'5438' },
        { id:'P5.AUT.PV.S02.Q0029', v:1, concept:'pv2.partition', level:'n', difficulty:2,
          stem:'What is 9,000 + 200 + 0 + 1?', options:['9,210','9,201','9,021'], correct:1, check:'9201' },
        { id:'P5.AUT.PV.S02.Q0030', v:1, concept:'pv2.partition', level:'n', difficulty:2,
          stem:'Partition 6,824 into thousands, hundreds, tens, and ones.', options:['6,000 + 800 + 20 + 4','6,000 + 800 + 200 + 4','600 + 80 + 20 + 4'], correct:0 },
        { id:'P5.AUT.PV.S02.Q0031', v:1, concept:'pv2.partition', level:'t', difficulty:3,
          stem:'Which of these is the correct partition for 1,090?', options:['1,000 + 90','1,000 + 900','100 + 90'], correct:0 },
        { id:'P5.AUT.PV.S02.Q0032', v:1, concept:'pv2.partition', level:'n', difficulty:2,
          stem:'What number is 3 thousands and 4 ones?', options:['3,040','3,004','3,400'], correct:1, check:'3004' },

        { id:'P5.AUT.PV.S02.Q0033', v:1, concept:'pv2.counting', level:'n', difficulty:1,
          stem:'Count on in thousands: 5,000, 6,000, 7,000, ___', options:['8,000','7,100','9,000'], correct:0, check:'8000' },
        { id:'P5.AUT.PV.S02.Q0034', v:1, concept:'pv2.counting', level:'n', difficulty:2,
          stem:'Count back in thousands: 10,000, 9,000, 8,000, ___', options:['7,000','6,000','9,100'], correct:0, check:'7000' },
        { id:'P5.AUT.PV.S02.Q0035', v:1, concept:'pv2.counting', level:'n', difficulty:1,
          stem:'1,000 more than 4,500 is ___', options:['4,600','5,500','5,000'], correct:1, check:'5500' },
        { id:'P5.AUT.PV.S02.Q0036', v:1, concept:'pv2.counting', level:'n', difficulty:2,
          stem:'Which calculation will give you 10,000?', options:['10 × 1,000','100 × 10','1,000 × 100'], correct:0 },
        { id:'P5.AUT.PV.S02.Q0037', v:1, concept:'pv2.counting', level:'t', difficulty:3,
          stem:'A machine makes 1,000 items an hour. How many does it make in 4 hours?', options:['4,000','40,000','1,040'], correct:0, check:'4000' },
        { id:'P5.AUT.PV.S02.Q0038', v:1, concept:'pv2.counting', level:'n', difficulty:1,
          stem:'10 lots of 1,000 is ___', options:['1,000','10,000','100,000'], correct:1, check:'10000' },
        { id:'P5.AUT.PV.S02.Q0039', v:1, concept:'pv2.zero', level:'n', difficulty:2,
          stem:'Which number has a zero in the tens column?', options:['2,407','3,560','1,050'], correct:0 },

        /* ===== BATCH C — Real Life & Reasoning (Q0040–Q0050) ===== */
        { id:'P5.AUT.PV.S02.Q0040', v:1, concept:'pv2.partition', level:'n', difficulty:2,
          stem:'What is 7,000 + 50 + 8?', options:['7,058','7,508','7,580'], correct:0, check:'7058' },
        { id:'P5.AUT.PV.S02.Q0041', v:1, concept:'pv2.real-life', level:'n', difficulty:1,
          stem:'A small stadium has 9 thousands, 6 hundreds and 5 tens of seats. How many seats?', options:['9,605','9,650','9,560'], correct:1, check:'9650' },
        { id:'P5.AUT.PV.S02.Q0042', v:1, concept:'pv2.real-life', level:'n', difficulty:2,
          stem:'A book has 8,402 pages. What is the value of the 4 in this number?', options:['4','400','40'], correct:1, check:'400' },
        { id:'P5.AUT.PV.S02.Q0043', v:1, concept:'pv2.real-life', level:'n', difficulty:2,
          stem:'A shop sells 1,000 sweets a day. How many does it sell in a 5-day week?', options:['5,000','500','50,000'], correct:0, check:'5000' },
        { id:'P5.AUT.PV.S02.Q0044', v:1, concept:'pv2.real-life', level:'t', difficulty:3,
          stem:'Tomi says "10,000 is just 1,000 with a zero added". Is she right?', options:['Yes, 10 × 1,000 = 10,000','No, 10,000 is smaller','No, 10,000 is a million'], correct:0 },
        { id:'P5.AUT.PV.S02.Q0045', v:1, concept:'pv2.real-life', level:'n', difficulty:2,
          stem:'A car costs £7,500. What is the value of the 5?', options:['5','50','500'], correct:2, check:'500' },
        
        { id:'P5.AUT.PV.S02.Q0046', v:1, concept:'pv2.reasoning', level:'t', difficulty:3,
          stem:'Which is the LARGEST number?', options:['4,099','4,909','4,990'], correct:2 },
        { id:'P5.AUT.PV.S02.Q0047', v:1, concept:'pv2.reasoning', level:'t', difficulty:3,
          stem:'Which is the SMALLEST number?', options:['3,050','3,005','3,500'], correct:1 },
        { id:'P5.AUT.PV.S02.Q0048', v:1, concept:'pv2.reasoning', level:'n', difficulty:2,
          stem:'Which statement is true?', options:['1,000 > 10,000','10,000 < 1,000','10,000 > 1,000'], correct:2 },
        { id:'P5.AUT.PV.S02.Q0049', v:1, concept:'pv2.reasoning', level:'t', difficulty:3,
          stem:'I am a number between 6,000 and 7,000. My digits add up to 11. I have a 4 in the tens column. What am I?', options:['6,340','6,240','6,042'], correct:0 },
        { id:'P5.AUT.PV.S02.Q0050', v:1, concept:'pv2.real-life', level:'b', difficulty:3,
          stem:'A shop has 4 boxes of 1,000 stickers, 5 packs of 100, 0 single stickers, and 8 loose stickers. How many stickers?', options:['4,508','4,580','4,050'], correct:0, check:'4508' }
      ]
    }
  }
};