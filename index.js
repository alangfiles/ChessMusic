//Cymbal beat
const CYMBAL_WAVE_TYPE = 'sine';
const CYMBAL_NOTE_FREQ = 1760;
const CYMBAL_BEAT_FREQ = 10;
const CYMBAL_BEAT_OFFSET = 0;
const CYMBAL_DURATION = 1;
const CYMBAL_VOLUME = .16;
//Snare beat
const SNARE_WAVE_TYPE = 'square';
const SNARE_NOTE_FREQ = 440;
const SNARE_BEAT_FREQ = 40;
const SNARE_BEAT_OFFSET = 0;
const SNARE_DURATION = 2;
const SNARE_VOLUME = .08;
//Kick beat
const KICK_WAVE_TYPE = 'sawtooth';
const KICK_NOTE_FREQ = 220;
const KICK_BEAT_FREQ = 40;
const KICK_BEAT_OFFSET = 20;
const KICK_DURATION = 2;
const KICK_VOLUME = .12;

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
  P: 5,
  B: 10,
  N: 10,
  R: 10,
  Q: 10,
  K: 10
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
  'sine': .5,
  'triangle': .25,
  'square': .08
}

const initialBeatMilliseconds = 32;
const finalBeatMilliseconds = 28;
let currentBeatMilliseconds = initialBeatMilliseconds;

//Initialize audio
var audioContext = new AudioContext();
let moveOscillator1 = null;
let moveOscillator2 = null;
let cymbalOscillator = null;
let snareOscillator = null;
let kickOscillator = null;

function playSongFromMoveIndex(beatIndex, moveIndex, nextMoveBeatIndex) {
  let isMoveBeat = beatIndex === nextMoveBeatIndex;
  let isCymbalBeatStart = (beatIndex + CYMBAL_BEAT_OFFSET) % CYMBAL_BEAT_FREQ === 0;
  let isCymbalBeatEnd = ((beatIndex + CYMBAL_BEAT_OFFSET) - CYMBAL_DURATION) % CYMBAL_BEAT_FREQ === 0;
  let isSnareBeatStart = (beatIndex + SNARE_BEAT_OFFSET) % SNARE_BEAT_FREQ === 0;
  let isSnareBeatEnd = ((beatIndex + SNARE_BEAT_OFFSET) - SNARE_DURATION) % SNARE_BEAT_FREQ === 0;
  let isKickBeatStart = (beatIndex + KICK_BEAT_OFFSET) % KICK_BEAT_FREQ === 0;  
  let isKickBeatEnd = ((beatIndex - KICK_DURATION) + KICK_BEAT_OFFSET) % KICK_BEAT_FREQ === 0;

  //Stop percussion
  if (isCymbalBeatEnd && cymbalOscillator !== null)
    cymbalOscillator.stop();
  if (isSnareBeatEnd && snareOscillator !== null)
    snareOscillator.stop();
  if (isKickBeatEnd && kickOscillator !== null)
    kickOscillator.stop();

  //Play cymbal
  if (isCymbalBeatStart) {
    cymbalOscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();
    cymbalOscillator.connect(gainNode);
    gainNode.gain.setValueAtTime(CYMBAL_VOLUME, 0);
    gainNode.connect(audioContext.destination);
    cymbalOscillator.start();
    cymbalOscillator.type = CYMBAL_WAVE_TYPE;
    cymbalOscillator.frequency.value = CYMBAL_NOTE_FREQ;
  }

   //Play snare
   if (isSnareBeatStart) {
    snareOscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();
    snareOscillator.connect(gainNode);
    gainNode.gain.setValueAtTime(SNARE_VOLUME, 0);
    gainNode.connect(audioContext.destination);
    snareOscillator.start();
    snareOscillator.type = SNARE_WAVE_TYPE;
    snareOscillator.frequency.value = SNARE_NOTE_FREQ;
  }

   //Play kick
   if (isKickBeatStart) {
    kickOscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();
    kickOscillator.connect(gainNode);
    gainNode.gain.setValueAtTime(KICK_VOLUME, 0);
    gainNode.connect(audioContext.destination);
    kickOscillator.start();
    kickOscillator.type = KICK_WAVE_TYPE;
    kickOscillator.frequency.value = KICK_NOTE_FREQ;
  }

  if (isMoveBeat) {
    moveIndex++;

    //Get move info
    let moveText = splitMoves[moveIndex];
    let piece = parsedMoves[moveIndex][0];
    let column = parsedMoves[moveIndex][1];
    let row = parsedMoves[moveIndex][2];
    let board = parsedMoves[moveIndex][3];
    let isCastle = parsedMoves[moveIndex][0] === 'O';

    //Get note info
    let noteBeats, noteFrequency, noteName, noteWaveType, secondFreq;
    if (!isCastle) {
      noteBeats = beatsForPieces[piece];
      noteFrequency = baseNotes[scaleIndexesForColumns[column]].freq * Math.pow(2, octavesForRows[row]);
      secondFreq = baseNotes[scaleIndexesForColumns[column]].freq * Math.pow(2, row);
      noteName = baseNotes[scaleIndexesForColumns[column]].name + octavesForRows[row];
      noteWaveType = waveTypesForPieces[piece];
    } else {
      noteBeats = beatsForPieces.K;
      noteFrequency = baseNotes[scaleIndexesForColumns.a].freq * Math.pow(2, octavesForRows[4]);
      secondFreq = baseNotes[scaleIndexesForColumns.a].freq * Math.pow(2, 4);
      noteWaveType = waveTypesForPieces.K;
    }

    //Stop sound
    if (moveOscillator1 !== null)
      moveOscillator1.stop();
    if (moveOscillator2 !== null)
      moveOscillator2.stop();
      
    //Start sound
    moveOscillator1 = audioContext.createOscillator();
    moveOscillator2 = audioContext.createOscillator();
    let gainNode = audioContext.createGain();
    moveOscillator1.connect(gainNode);
    moveOscillator2.connect(gainNode);
    gainNode.gain.setValueAtTime(volumesForWaveTypes[noteWaveType], 0);
    gainNode.connect(audioContext.destination);
    moveOscillator1.start();
    moveOscillator2.start();
    moveOscillator1.type = noteWaveType;
    moveOscillator1.frequency.value = noteFrequency;
    moveOscillator2.type = noteWaveType;
    moveOscillator2.frequency.value = secondFreq;

    //Update speed
    if (splitMoves[moveIndex].includes('x')) {
      currentBeatMilliseconds = finalBeatMilliseconds + (initialBeatMilliseconds - finalBeatMilliseconds) * ((splitMoves.length - moveIndex) / splitMoves.length);
    }

    //Display move
    displayMove(moveText, noteName, board, row, column, piece);

    //Get next move time
    nextMoveBeatIndex = beatIndex + noteBeats;
  }

  //Play remainder of song
  beatIndex++;
  setTimeout(function () {
    if (moveIndex + 1 < parsedMoves.length || beatIndex !== nextMoveBeatIndex)

      //Play remainder of song
      playSongFromMoveIndex(beatIndex, moveIndex, nextMoveBeatIndex);
    else {

      //Reset
      document.querySelector("#move").innerHTML = '';
      document.querySelector("body").className = '';
      if (moveOscillator1 !== null)
        moveOscillator1.stop();
      if (moveOscillator2 !== null)
        moveOscillator2.stop();
      currentBeatMilliseconds = initialBeatMilliseconds;
    }
  }, currentBeatMilliseconds);
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
  document.querySelector("body").classList.remove("row-1");
  document.querySelector("body").classList.remove("row-2");
  document.querySelector("body").classList.remove("row-3");
  document.querySelector("body").classList.remove("row-4");
  document.querySelector("body").classList.remove("row-5");
  document.querySelector("body").classList.remove("row-6");
  document.querySelector("body").classList.remove("row-7");
  document.querySelector("body").classList.remove("row-8");
  document.querySelector("body").classList.add("row-" + row);
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
  ["P", "h", 3,
    `R-BQ-RK-<br/>
  --P-BPPP<br/>
  P-NP-N--<br/>
  -P--P---<br/>
  ----P---<br/>
  -BP--N-P<br/>
  PP-P-PP-<br/>
  RNBQR-K-<br/>`
  ],
  ["N", "b", 8,
    `RNBQ-RK-<br/>
  --P-BPPP<br/>
  P--P-N--<br/>
  -P--P---<br/>
  ----P---<br/>
  -BP--N-P<br/>
  PP-P-PP-<br/>
  RNBQR-K-<br/>`
  ],
  ["P", "d", 4,
    `RNBQ-RK-<br/>
  --P-BPPP<br/>
  P--P-N--<br/>
  -P--P---<br/>
  ---PP---<br/>
  -BP--N-P<br/>
  PP---PP-<br/>
  RNBQR-K-<br/>`
  ],
  ["N", "d", 7,
    `R-BQ-RK-<br/>
  --PNBPPP<br/>
  P--P-N--<br/>
  -P--P---<br/>
  ---PP---<br/>
  -BP--N-P<br/>
  PP---PP-<br/>
  RNBQR-K-<br/>`
  ],
  ["P", "c", 4,
    `R-BQ-RK-<br/>
  --PNBPPP<br/>
  P--P-N--<br/>
  -P--P---<br/>
  --PPP---<br/>
  -B---N-P<br/>
  PP---PP-<br/>
  RNBQR-K-<br/>`
  ],
  ["P", "c", 6,
    `R-BQ-RK-<br/>
  ---NBPPP<br/>
  P-PP-N--<br/>
  -P--P---<br/>
  --PPP---<br/>
  -B---N-P<br/>
  PP---PP-<br/>
  RNBQR-K-<br/>`
  ],
  ["P", "b", 5,
    `R-BQ-RK-<br/>
  ---NBPPP<br/>
  P-PP-N--<br/>
  -P--P---<br/>
  ---PP---<br/>
  -B---N-P<br/>
  PP---PP-<br/>
  RNBQR-K-<br/>`
  ],
  ["P", "b", 5,
    `R-BQ-RK-<br/>
  ---NBPPP<br/>
  --PP-N--<br/>
  -P--P---<br/>
  ---PP---<br/>
  -B---N-P<br/>
  PP---PP-<br/>
  RNBQR-K-<br/>`
  ],
  ["N", "c", 3,
    `R-BQ-RK-<br/>
  ---NBPPP<br/>
  --PP-N--<br/>
  -P--P---<br/>
  ---PP---<br/>
  -BN--N-P<br/>
  PP---PP-<br/>
  R-BQR-K-<br/>`
  ],
  ["B", "b", 7,
    `R--Q-RK-<br/>
  -B-NBPPP<br/>
  --PP-N--<br/>
  -P--P---<br/>
  ---PP---<br/>
  -BN--N-P<br/>
  PP---PP-<br/>
  R-BQR-K-<br/>`
  ],
  ["B", "g", 5,
    `R--Q-RK-<br/>
  -B-NBPPP<br/>
  --PP-N--<br/>
  -P--P-B-<br/>
  ---PP---<br/>
  -BN--N-P<br/>
  PP---PP-<br/>
  R--QR-K-<br/>`
  ],
  ["P", "b", 4,
    `R--Q-RK-<br/>
  -B-NBPPP<br/>
  --PP-N--<br/>
  ----P-B-<br/>
  -P-PP---<br/>
  -BN--N-P<br/>
  PP---PP-<br/>
  R--QR-K-<br/>`
  ],
  ["N", "b", 1,
    `R--Q-RK-<br/>
  -B-NBPPP<br/>
  --PP-N--<br/>
  ----P-B-<br/>
  -P-PP---<br/>
  -B---N-P<br/>
  PP---PP-<br/>
  RN-QR-K-<br/>`
  ],
  ["P", "h", 6,
    `R--Q-RK-<br/>
  -B-NBPP-<br/>
  --PP-N-P<br/>
  ----P-B-<br/>
  -P-PP---<br/>
  -B---N-P<br/>
  PP---PP-<br/>
  RN-QR-K-<br/>`
  ],
  ["B", "h", 4,
    `R--Q-RK-<br/>
  -B-NBPP-<br/>
  --PP-N-P<br/>
  ----P---<br/>
  -P-PP--B<br/>
  -B---N-P<br/>
  PP---PP-<br/>
  RN-QR-K-<br/>`
  ],
  ["P", "c", 5,
    `R--Q-RK-<br/>
  -B-NBPP-<br/>
  ---P-N-P<br/>
  --P-P---<br/>
  -P-PP--B<br/>
  -B---N-P<br/>
  PP---PP-<br/>
  RN-QR-K-<br/>`
  ],
  ["P", "e", 5,
    `R--Q-RK-<br/>
  -B-NBPP-<br/>
  ---P-N-P<br/>
  --P-P---<br/>
  -P--P--B<br/>
  -B---N-P<br/>
  PP---PP-<br/>
  RN-QR-K-<br/>`
  ],
  ["N", "e", 4,
    `R--Q-RK-<br/>
  -B-NBPP-<br/>
  ---P---P<br/>
  --P-P---<br/>
  -P--N--B<br/>
  -B---N-P<br/>
  PP---PP-<br/>
  RN-QR-K-<br/>`
  ],
  ["B", "e", 7,
    `R--Q-RK-<br/>
  -B-NBPP-<br/>
  ---P---P<br/>
  --P-P---<br/>
  -P--N---<br/>
  -B---N-P<br/>
  PP---PP-<br/>
  RN-QR-K-<br/>`
  ],
  ["Q", "e", 7,
    `R----RK-<br/>
  -B-NQPP-<br/>
  ---P---P<br/>
  --P-P---<br/>
  -P--N---<br/>
  -B---N-P<br/>
  PP---PP-<br/>
  RN-QR-K-<br/>`
  ],
  ["P", "d", 6,
    `R----RK-<br/>
  -B-NQPP-<br/>
  ---P---P<br/>
  --P-----<br/>
  -P--N---<br/>
  -B---N-P<br/>
  PP---PP-<br/>
  RN-QR-K-<br/>`
  ],
  ["Q", "f", 6,
    `R----RK-<br/>
  -B-N-PP-<br/>
  ---P-Q-P<br/>
  --P-----<br/>
  -P--N---<br/>
  -B---N-P<br/>
  PP---PP-<br/>
  RN-QR-K-<br/>`
  ],
  ["N", "d", 2,
    `R----RK-<br/>
  -B-N-PP-<br/>
  ---P-Q-P<br/>
  --P-----<br/>
  -P--N---<br/>
  -B---N-P<br/>
  PP-N-PP-<br/>
  R--QR-K-<br/>`
  ],
  ["N", "d", 6,
    `R----RK-<br/>
  -B-N-PP-<br/>
  ---N-Q-P<br/>
  --P-----<br/>
  -P------<br/>
  -B---N-P<br/>
  PP-N-PP-<br/>
  R--QR-K-<br/>`
  ],
  ["N", "c", 4,
    `R----RK-<br/>
  -B-N-PP-<br/>
  ---N-Q-P<br/>
  --P-----<br/>
  -PN-----<br/>
  -B---N-P<br/>
  PP---PP-<br/>
  R--QR-K-<br/>`
  ],
  ["N", "c", 4,
    `R----RK-<br/>
  -B-N-PP-<br/>
  -----Q-P<br/>
  --P-----<br/>
  -PN-----<br/>
  -B---N-P<br/>
  PP---PP-<br/>
  R--QR-K-<br/>`
  ],
  ["B", "c", 4,
    `R----RK-<br/>
  -B-N-PP-<br/>
  -----Q-P<br/>
  --P-----<br/>
  -PB-----<br/>
  -----N-P<br/>
  PP---PP-<br/>
  R--QR-K-<br/>`
  ],
  ["N", "b", 6,
    `R----RK-<br/>
  -B---PP-<br/>
  -N---Q-P<br/>
  --P-----<br/>
  -PB-----<br/>
  -----N-P<br/>
  PP---PP-<br/>
  R--QR-K-<br/>`
  ],
  ["N", "e", 5,
    `R----RK-<br/>
  -B---PP-<br/>
  -N---Q-P<br/>
  --P-N---<br/>
  -PB-----<br/>
  -------P<br/>
  PP---PP-<br/>
  R--QR-K-<br/>`
  ],
  ["R", "e", 8,
    `----RRK-<br/>
  -B---PP-<br/>
  -N---Q-P<br/>
  --P-N---<br/>
  -PB-----<br/>
  -------P<br/>
  PP---PP-<br/>
  R--QR-K-<br/>`
  ],
  ["B", "f", 7,
    `----RRK-<br/>
  -B---BP-<br/>
  -N---Q-P<br/>
  --P-N---<br/>
  -P------<br/>
  -------P<br/>
  PP---PP-<br/>
  R--QR-K-<br/>`
  ],
  ["R", "f", 7,
    `----R-K-<br/>
  -B---RP-<br/>
  -N---Q-P<br/>
  --P-N---<br/>
  -P------<br/>
  -------P<br/>
  PP---PP-<br/>
  R--QR-K-<br/>`
  ],
  ["N", "f", 7,
    `----R-K-<br/>
  -B---NP-<br/>
  -N---Q-P<br/>
  --P-----<br/>
  -P------<br/>
  -------P<br/>
  PP---PP-<br/>
  R--QR-K-<br/>`
  ],
  ["R", "e", 1,
    `------K-<br/>
  -B---NP-<br/>
  -N---Q-P<br/>
  --P-----<br/>
  -P------<br/>
  -------P<br/>
  PP---PP-<br/>
  R--QR-K-<br/>`
  ],
  ["Q", "e", 1,
    `------K-<br/>
  -B---NP-<br/>
  -N---Q-P<br/>
  --P-----<br/>
  -P------<br/>
  -------P<br/>
  PP---PP-<br/>
  R---Q-K-<br/>`
  ],
  ["K", "f", 7,
    `--------<br/>
  -B---KP-<br/>
  -N---Q-P<br/>
  --P-----<br/>
  -P------<br/>
  -------P<br/>
  PP---PP-<br/>
  R---Q-K-<br/>`
  ],
  ["Q", "e", 3,
    `--------<br/>
  -B---KP-<br/>
  -N---Q-P<br/>
  --P-----<br/>
  -P------<br/>
  ----Q--P<br/>
  PP---PP-<br/>
  R-----K-<br/>`
  ],
  ["Q", "g", 5,
    `--------<br/>
  -B---KP-<br/>
  -N-----P<br/>
  --P---Q-<br/>
  -P------<br/>
  ----Q--P<br/>
  PP---PP-<br/>
  R-----K-<br/>`
  ],
  ["Q", "g", 5,
    `--------<br/>
  -B---KP-<br/>
  -N-----P<br/>
  --P---Q-<br/>
  -P------<br/>
  -------P<br/>
  PP---PP-<br/>
  R-----K-<br/>`
  ],
  ["P", "g", 5,
    `--------<br/>
  -B---KP-<br/>
  -N------<br/>
  --P---P-<br/>
  -P------<br/>
  -------P<br/>
  PP---PP-<br/>
  R-----K-<br/>`
  ],
  ["P", "b", 3,
    `--------<br/>
  -B---KP-<br/>
  -N------<br/>
  --P---P-<br/>
  -P------<br/>
  -------P<br/>
  PP---PP-<br/>
  R-----K-<br/>`
  ],
  ["K", "e", 6,
    `--------<br/>
  -B----P-<br/>
  -N--K---<br/>
  --P---P-<br/>
  -P------<br/>
  -------P<br/>
  PP---PP-<br/>
  R-----K-<br/>`
  ],
  ["P", "a", 3,
    `--------<br/>
  -B----P-<br/>
  -N--K---<br/>
  --P---P-<br/>
  -P------<br/>
  P------P<br/>
  -P---PP-<br/>
  R-----K-<br/>`
  ],
  ["K", "d", 6,
    `--------<br/>
  -B----P-<br/>
  -N-K----<br/>
  --P---P-<br/>
  -P------<br/>
  P------P<br/>
  -P---PP-<br/>
  R-----K-<br/>`
  ],
  ["P", "b", 4,
    `--------<br/>
  -B----P-<br/>
  -N-K----<br/>
  --P---P-<br/>
  -P------<br/>
  -------P<br/>
  -P---PP-<br/>
  R-----K-<br/>`
  ],
  ["P", "b", 4,
    `--------<br/>
  -B----P-<br/>
  -N-K----<br/>
  ------P-<br/>
  -P------<br/>
  -------P<br/>
  -P---PP-<br/>
  R-----K-<br/>`
  ],
  ["R", "a", 5,
    `--------<br/>
  -B----P-<br/>
  -N-K----<br/>
  R-----P-<br/>
  -P------<br/>
  -------P<br/>
  -P---PP-<br/>
  ------K-<br/>`
  ],
  ["N", "d", 5,
    `--------<br/>
  -B----P-<br/>
  ---K----<br/>
  R--N--P-<br/>
  -P------<br/>
  -------P<br/>
  -P---PP-<br/>
  ------K-<br/>`
  ],
  ["P", "f", 3,
    `--------<br/>
  -B----P-<br/>
  ---K----<br/>
  R--N--P-<br/>
  -P------<br/>
  -----P-P<br/>
  -P----P-<br/>
  ------K-<br/>`
  ],
  ["B", "c", 8,
    `--B-----<br/>
  ------P-<br/>
  ---K----<br/>
  R--N--P-<br/>
  -P------<br/>
  -----P-P<br/>
  -P----P-<br/>
  ------K-<br/>`
  ],
  ["K", "f", 2,
    `--B-----<br/>
  ------P-<br/>
  ---K----<br/>
  R--N--P-<br/>
  -P------<br/>
  -----P-P<br/>
  -P---KP-<br/>
  --------<br/>`
  ],
  ["B", "f", 5,
    `--------<br/>
  ------P-<br/>
  ---K----<br/>
  R--N-BP-<br/>
  -P------<br/>
  -----P-P<br/>
  -P---KP-<br/>
  --------<br/>`
  ],
  ["R", "a", 7,
    `--------<br/>
  R-----P-<br/>
  ---K----<br/>
  ---N-BP-<br/>
  -P------<br/>
  -----P-P<br/>
  -P---KP-<br/>
  --------<br/>`
  ],
  ["P", "g", 6,
    `--------<br/>
  R-------<br/>
  ---K--P-<br/>
  ---N-BP-<br/>
  -P------<br/>
  -----P-P<br/>
  -P---KP-<br/>
  --------<br/>`
  ],
  ["R", "a", 6,
    `--------<br/>
  --------<br/>
  R--K--P-<br/>
  ---N-BP-<br/>
  -P------<br/>
  -----P-P<br/>
  -P---KP-<br/>
  --------<br/>`
  ],
  ["K", "c", 5,
    `--------<br/>
  --------<br/>
  R-----P-<br/>
  --KN-BP-<br/>
  -P------<br/>
  -----P-P<br/>
  -P---KP-<br/>
  --------<br/>`
  ],
  ["K", "e", 1,
    `--------<br/>
  --------<br/>
  R-----P-<br/>
  --KN-BP-<br/>
  -P------<br/>
  -----P-P<br/>
  -P----P-<br/>
  ----K---<br/>`
  ],
  ["N", "f", 4,
    `--------<br/>
  --------<br/>
  R-----P-<br/>
  --K--BP-<br/>
  -P---N--<br/>
  -----P-P<br/>
  -P----P-<br/>
  ----K---<br/>`
  ],
  ["P", "g", 3,
    `--------<br/>
  --------<br/>
  R-----P-<br/>
  --K--BP-<br/>
  -P---N--<br/>
  -----PPP<br/>
  -P------<br/>
  ----K---<br/>`
  ],
  ["N", "h", 3,
    `--------<br/>
  --------<br/>
  R-----P-<br/>
  --K--BP-<br/>
  -P------<br/>
  -----PPN<br/>
  -P------<br/>
  ----K---<br/>`
  ],
  ["K", "d", 2,
    `--------<br/>
  --------<br/>
  R-----P-<br/>
  --K--BP-<br/>
  -P------<br/>
  -----PPN<br/>
  -P-K----<br/>
  --------<br/>`
  ],
  ["K", "b", 5,
    `--------<br/>
  --------<br/>
  R-----P-<br/>
  -K---BP-<br/>
  -P------<br/>
  -----PPN<br/>
  -P-K----<br/>
  --------<br/>`
  ],
  ["R", "d", 6,
    `--------<br/>
  --------<br/>
  ---R--P-<br/>
  -K---BP-<br/>
  -P------<br/>
  -----PPN<br/>
  -P-K----<br/>
  --------<br/>`
  ],
  ["K", "c", 5,
    `--------<br/>
  --------<br/>
  ---R--P-<br/>
  --K--BP-<br/>
  -P------<br/>
  -----PPN<br/>
  -P-K----<br/>
  --------<br/>`
  ],
  ["R", "a", 6,
    `--------<br/>
  --------<br/>
  R-----P-<br/>
  --K--BP-<br/>
  -P------<br/>
  -----PPN<br/>
  -P-K----<br/>
  --------<br/>`
  ],
  ["N", "f", 2,
    `--------<br/>
  --------<br/>
  R-----P-<br/>
  --K--BP-<br/>
  -P------<br/>
  -----PP-<br/>
  -P-K-N--<br/>
  --------<br/>`
  ],
  ["P", "g", 4,
    `--------<br/>
  --------<br/>
  R-----P-<br/>
  --K--BP-<br/>
  -P----P-<br/>
  -----P--<br/>
  -P-K-N--<br/>
  --------<br/>`
  ],
  ["B", "d", 3,
    `--------<br/>
  --------<br/>
  R-----P-<br/>
  --K---P-<br/>
  -P----P-<br/>
  ---B-P--<br/>
  -P-K-N--<br/>
  --------<br/>`
  ],
  ["R", "e", 6,
    `--------<br/>
  --------<br/>
  ----R-P-<br/>
  --K---P-<br/>
  -P----P-<br/>
  ---B-P--<br/>
  -P-K-N--<br/>
  --------<br/>`
  ]
];