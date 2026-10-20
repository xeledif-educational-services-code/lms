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
    }
  }
};