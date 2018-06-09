let baseNotes = [{
    name: 'a',
    freq: 55
  },
  {
    name: 'a#',
    freq: 58.2705
  },
  {
    name: 'b',
    freq: 61.7354
  },
  {
    name: 'c',
    freq: 65.4064
  },
  {
    name: 'c#',
    freq: 69.2957
  },
  {
    name: 'd',
    freq: 73.4162
  },
  {
    name: 'd#',
    freq: 77.7817
  },
  {
    name: 'e',
    freq: 82.4069
  },
  {
    name: 'f',
    freq: 87.3071
  },
  {
    name: 'f#',
    freq: 92.4986
  },
  {
    name: 'g',
    freq: 97.9989
  },
  {
    name: 'g#',
    freq: 103.826
  },
]

const scaleIndexesForColumns = {
  a: 0,
  b: 2,
  c: 4,
  d: 5,
  e: 7,
  f: 9,
  g: 10,
  h: 11
}

const beatsForPieces = {
  P: .5,
  B: 1,
  N: 1,
  R: 1,
  Q: 1,
  K: 1
}


const waveTypesForPieces = {
  P: 'sine',
  B: 'triangle',
  N: 'triangle',
  R: 'triangle',
  Q: 'square',
  K: 'square'
}

const octavesForRows = {
  1: 1,
  2: 1,
  3: 2,
  4: 2,
  5: 3,
  6: 3,
  7: 4,
  8: 4
}

const volumesForWaveTypes = {
  'sine': 1,
  'triangle': .5,
  'square': .16
}

const initialBeatMilliseconds = 320;
const finalBeatMilliseconds = 250;
let currentBeatMilliseconds = initialBeatMilliseconds;

//Initialize audio
var audioContext = new AudioContext();

function playSongFromMoveIndex(moveIndex) {

  //Get move info 
  let moveText = splitMoves[moveIndex]; 
  let piece = parsedMoves[moveIndex][0];
  let column = parsedMoves[moveIndex][1];
  let row = parsedMoves[moveIndex][2];
  let board = parsedMoves[moveIndex][3];
  let isCastle = parsedMoves[moveIndex][0] === 'O';

  //Get note info
  let noteBeats, noteFrequency, noteName, noteWaveType;
  if (!isCastle) {
    noteBeats = beatsForPieces[piece];
    noteFrequency = baseNotes[scaleIndexesForColumns[column]].freq * Math.pow(2, octavesForRows[row]);
    noteName = baseNotes[scaleIndexesForColumns[column]].name + octavesForRows[row];
    noteWaveType = waveTypesForPieces[piece];
  } else {
    noteBeats = beatsForPieces.K;
    noteFrequency = baseNotes[scaleIndexesForColumns.a].freq * Math.pow(2, octavesForRows[4]);
    noteWaveType = waveTypesForPieces.K;
  }

  //Start sound
  let oscillator = audioContext.createOscillator();
  let gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.gain.setValueAtTime(volumesForWaveTypes[noteWaveType], 0);
  gainNode.connect(audioContext.destination);
  oscillator.start();
  oscillator.type = noteWaveType;
  oscillator.frequency.value = noteFrequency;

  //Update speed
  if (splitMoves[moveIndex].includes('x')) {
    currentBeatMilliseconds = finalBeatMilliseconds + (initialBeatMilliseconds - finalBeatMilliseconds) * ((splitMoves.length - moveIndex) / splitMoves.length);
  }

  //Display move
  displayMove(moveText, noteName, board, row, column, piece);

  //Delay and play remainder of song
  setTimeout(function () {
    //Stop sound
    oscillator.stop();
    if (moveIndex + 1 < parsedMoves.length)
      //Play remainder of song
      playSongFromMoveIndex(moveIndex + 1);
    else {      
      //Reset
      document.querySelector("#move").innerHTML = '';
      document.querySelector("body").className = '';
      currentBeatMilliseconds = initialBeatMilliseconds;
    }
  }, noteBeats * currentBeatMilliseconds);
}

function displayMove(moveText, noteName, board, row, column, piece) {

  //Move text
  document.querySelector("#move").innerHTML = splitMoves[moveText];

  //Note name
  document.querySelector("#note").innerHTML = noteName;

  //Board
  document.querySelector("#chess-board").innerHTML = board;

  //Piece class
  document.querySelector("body").classList.remove("piece-P");
  document.querySelector("body").classList.remove("piece-R");
  document.querySelector("body").classList.remove("piece-N");
  document.querySelector("body").classList.remove("piece-B");
  document.querySelector("body").classList.remove("piece-Q");
  document.querySelector("body").classList.remove("piece-K");
  document.querySelector("body").classList.remove("piece-O"); 
  document.querySelector("body").classList.add("piece-" + piece);

  //Column class
  document.querySelector("body").classList.remove("col-a");
  document.querySelector("body").classList.remove("col-b");
  document.querySelector("body").classList.remove("col-c");
  document.querySelector("body").classList.remove("col-d");
  document.querySelector("body").classList.remove("col-e");
  document.querySelector("body").classList.remove("col-f");
  document.querySelector("body").classList.remove("col-g");
  document.querySelector("body").classList.remove("col-h");
  document.querySelector("body").classList.add("col-" + column);  

  //Row class
  document.querySelector("body").classList.remove("row-1-2");
  document.querySelector("body").classList.remove("row-3-4");
  document.querySelector("body").classList.remove("row-5-6");
  document.querySelector("body").classList.remove("row-7-8");
  if (row === 1 || row === 2)
    document.querySelector("body").classList.add("row-1-2");
  if (row === 3 || row === 4)
    document.querySelector("body").classList.add("row-3-4");
  if (row === 5 || row === 6)
    document.querySelector("body").classList.add("row-5-6");
  if (row === 7 || row === 8)
    document.querySelector("body").classList.add("row-7-8");
}














const input = `[Event "F/S Return Match"]
[Site "Belgrade, Serbia JUG"]
[Date "1992.11.04"]
[Round "29"]
[White "Fischer, Robert J."]
[Black "Spassky, Boris V."]
[Result "1/2-1/2"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 {This opening is called the Ruy Lopez.}
4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7
11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7 14. Bg5 b4 15. Nb1 h6 16. Bh4 c5 17. dxe5
Nxe4 18. Bxe7 Qxe7 19. exd6 Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4 22. Bxc4 Nb6
23. Ne5 Rae8 24. Bxf7+ Rxf7 25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5 28. Qxg5
hxg5 29. b3 Ke6 30. a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8 34. Kf2 Bf5
35. Ra7 g6 36. Ra6+ Kc5 37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5 40. Rd6 Kc5 41. Ra6
Nf2 42. g4 Bd3 43. Re6 1/2-1/2`;

const splitMoves = ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7",
  "Re1", "b5", "Bb3", "d6", "c3", "O-O", "h3", "Nb8", "d4", "Nbd7",
  "c4", "c6", "cxb5", "axb5", "Nc3", "Bb7", "Bg5", "b4", "Nb1", "h6",
  "Bh4", "c5", "dxe5", "Nxe4", "Bxe7", "Qxe7", "exd6", "Qf6", "Nbd2",
  "Nxd6", "Nc4", "Nxc4", "Bxc4", "Nb6", "Ne5", "Rae8", "Bxf7+", "Rxf7",
  "Nxf7", "Rxe1+", "Qxe1", "Kxf7", "Qe3", "Qg5", "Qxg5", "hxg5", "b3",
  "Ke6", "a3", "Kd6", "axb4", "cxb4", "Ra5", "Nd5", "f3", "Bc8", "Kf2",
  "Bf5", "Ra7", "g6", "Ra6+", "Kc5", "Ke1", "Nf4", "g3", "Nxh3", "Kd2",
  "Kb5", "Rd6", "Kc5", "Ra6", "Nf2", "g4", "Bd3", "Re6"
];

const parsedMoves = [
  ["P", "e", 4,
    `RNBQKBNR<br/>
   PPPPPPPP<br/>
   --------<br/>
   --------<br/>
   ----P---<br/>
   --------<br/>
   PPPP-PPP<br/>
   RNBQKBNR<br/>`
  ],
  ["P", "e", 5,
    `RNBQKBNR<br/>
   PPPP-PPP<br/>
   --------<br/>
   ----P---<br/>
   ----P---<br/>
   --------<br/>
   PPPP-PPP<br/>
   RNBQKBNR<br/>`
  ],
  ["N", "f", 3,
    `RNBQKBNR<br/>
   PPPP-PPP<br/>
   --------<br/>
   ----P---<br/>
   ----P---<br/>
   -----N--<br/>
   PPPP-PPP<br/>
   RNBQKB-R<br/>`
  ],
  ["N", "c", 6,
    `R-BQKBNR<br/>
  PPPP-PPP<br/>
  --N-----<br/>
  ----P---<br/>
  ----P---<br/>
  -----N--<br/>
  PPPP-PPP<br/>
  RNBQKB-R<br/>`
  ],
  ["B", "b", 5,
    `R-BQKBNR<br/>
   PPPP-PPP<br/>
   --N-----<br/>
   -B--P---<br/>
   ----P---<br/>
   -----N--<br/>
   PPPP-PPP<br/>
   RNBQK--R<br/>`
  ],
  ["P", "a", 6,
    `R-BQKBNR<br/>
   -PPP-PPP<br/>
   P-N-----<br/>
   -B--P---<br/>
   ----P---<br/>
   -----N--<br/>
   PPPP-PPP<br/>
   RNBQK--R<br/>`
  ],
  ["B", "a", 4,
    `R-BQKBNR<br/>
   -PPP-PPP<br/>
   P-N-----<br/>
   ----P---<br/>
   B---P---<br/>
   -----N--<br/>
   PPPP-PPP<br/>
   RNBQK--R<br/>`
  ],
  ["N", "f", 6,
    `R-BQKB-R<br/>
   -PPP-PPP<br/>
   P-N--N--<br/>
   ----P---<br/>
   B---P---<br/>
   -----N--<br/>
   PPPP-PPP<br/>
   RNBQK--R<br/>`
  ],
  ["O", "O", 0,
    `R-BQKB-R<br/>
   -PPP-PPP<br/>
   P-N--N--<br/>
   ----P---<br/>
   B---P---<br/>
   -----N--<br/>
   PPPP-PPP<br/>
   RNBQ-RK-<br/>`
  ],
  ["B", "e", 7,
  `R-BQK--R<br/>
  -PPPBPPP<br/>
  P-N--N--<br/>
  ----P---<br/>
  B---P---<br/>
  -----N--<br/>
  PPPP-PPP<br/>
  RNBQ-RK-<br/>`
  ],
  ["R", "e", 1,
  `R-BQK--R<br/>
  -PPPBPPP<br/>
  P-N--N--<br/>
  ----P---<br/>
  B---P---<br/>
  -----N--<br/>
  PPPP-PPP<br/>
  RNBQR-K-<br/>`
  ],
  ["P", "b", 5,
  `R-BQK--R<br/>
  --PPBPPP<br/>
  P-N--N--<br/>
  -P--P---<br/>
  B---P---<br/>
  -----N--<br/>
  PPPP-PPP<br/>
  RNBQR-K-<br/>`
  ],
  ["B", "b", 3,
  `R-BQK--R<br/>
  --PPBPPP<br/>
  P-N--N--<br/>
  -P--P---<br/>
  ----P---<br/>
  -B---N--<br/>
  PPPP-PPP<br/>
  RNBQR-K-<br/>`
  ],
  ["P", "d", 6,
  `R-BQK--R<br/>
  --P-BPPP<br/>
  P-NP-N--<br/>
  -P--P---<br/>
  ----P---<br/>
  -B---N--<br/>
  PPPP-PPP<br/>
  RNBQR-K-<br/>`
  ],
  ["P", "c", 3,
  `R-BQK--R<br/>
  --P-BPPP<br/>
  P-NP-N--<br/>
  -P--P---<br/>
  ----P---<br/>
  -BP--N--<br/>
  PP-P-PPP<br/>
  RNBQR-K-<br/>`
  ],
  ["O", "O", 0,
  `R-BQ-RK-<br/>
  --P-BPPP<br/>
  P-NP-N--<br/>
  -P--P---<br/>
  ----P---<br/>
  -BP--N--<br/>
  PP-P-PPP<br/>
  RNBQR-K-<br/>`
  ],
  ["P", "h", 3],
  ["N", "b", 8],
  ["P", "d", 4],
  ["N", "d", 7],
  ["P", "c", 4],
  ["P", "c", 6],
  ["P", "b", 5],
  ["P", "b", 5],
  ["N", "c", 3],
  ["B", "b", 7],
  ["B", "g", 5],
  ["P", "b", 4],
  ["N", "b", 1],
  ["P", "h", 6],
  ["B", "h", 4],
  ["P", "c", 5],
  ["P", "e", 5],
  ["N", "e", 4],
  ["B", "e", 7],
  ["Q", "e", 7],
  ["P", "d", 6],
  ["Q", "f", 6],
  ["N", "d", 2],
  ["N", "d", 6],
  ["N", "c", 4],
  ["N", "c", 4],
  ["B", "c", 4],
  ["N", "b", 6],
  ["N", "e", 5],
  ["R", "e", 8],
  ["B", "f", 7],
  ["R", "f", 7],
  ["N", "f", 7],
  ["R", "e", 1],
  ["Q", "e", 1],
  ["K", "f", 7],
  ["Q", "e", 3],
  ["Q", "g", 5],
  ["Q", "g", 5],
  ["P", "g", 5],
  ["P", "b", 3],
  ["K", "e", 6],
  ["P", "a", 3],
  ["K", "d", 6],
  ["P", "b", 4],
  ["P", "b", 4],
  ["R", "a", 5],
  ["N", "d", 5],
  ["P", "f", 3],
  ["B", "c", 8],
  ["K", "f", 2],
  ["B", "f", 5],
  ["R", "a", 7],
  ["P", "g", 6],
  ["R", "a", 6],
  ["K", "c", 5],
  ["K", "e", 1],
  ["N", "f", 4],
  ["P", "g", 3],
  ["N", "h", 3],
  ["K", "d", 2],
  ["K", "b", 5],
  ["R", "d", 6],
  ["K", "c", 5],
  ["R", "a", 6],
  ["N", "f", 2],
  ["P", "g", 4],
  ["B", "d", 3],
  ["R", "e", 6]
];