
let halfsteps = [
  { note: 'a', freq: 55 },
  { note: 'a#', freq: 58.2705 },
  { note: 'b', freq: 61.7354 },
  { note: 'c', freq: 65.4064 },
  { note: 'c#', freq: 69.2957 },
  { note: 'd', freq: 73.4162 },
  { note: 'd#', freq: 77.7817 },
  { note: 'e', freq: 82.4069 },
  { note: 'f', freq: 87.3071 },
  { note: 'f#', freq: 92.4986 },
  { note: 'g', freq: 97.9989 },
  { note: 'g#', freq: 103.826 }
]

const allnotes = [  {"note": "a1","freq": 55  },  {"note": "a#1","freq": 58.2705  },  {"note": "b1","freq": 61.7354  },  {"note": "c1","freq": 65.4064  },  {"note": "c#1","freq": 69.2957  },  {"note": "d1","freq": 73.4162  },  {"note": "d#1","freq": 77.7817  },  {"note": "e1","freq": 82.4069  },  {"note": "f1","freq": 87.3071  },  {"note": "f#1","freq": 92.4986  },  {"note": "g1","freq": 97.9989  },  {"note": "g#1","freq": 103.826  },  {"note": "a2","freq": 110  },  {"note": "a#2","freq": 116.541  },  {"note": "b2","freq": 123.4708  },  {"note": "c2","freq": 130.8128  },  {"note": "c#2","freq": 138.5914  },  {"note": "d2","freq": 146.8324  },  {"note": "d#2","freq": 155.5634  },  {"note": "e2","freq": 164.8138  },  {"note": "f2","freq": 174.6142  },  {"note": "f#2","freq": 184.9972  },  {"note": "g2","freq": 195.9978  },  {"note": "g#2","freq": 207.652  },  {"note": "a3","freq": 220  },  {"note": "a#3","freq": 233.082  },  {"note": "b3","freq": 246.9416  },  {"note": "c3","freq": 261.6256  },  {"note": "c#3","freq": 277.1828  },  {"note": "d3","freq": 293.6648  },  {"note": "d#3","freq": 311.1268  },  {"note": "e3","freq": 329.6276  },  {"note": "f3","freq": 349.2284  },  {"note": "f#3","freq": 369.9944  },  {"note": "g3","freq": 391.9956  },  {"note": "g#3","freq": 415.304  },  {"note": "a4","freq": 440  },  {"note": "a#4","freq": 466.164  },  {"note": "b4","freq": 493.8832  },  {"note": "c4","freq": 523.2512  },  {"note": "c#4","freq": 554.3656  },  {"note": "d4","freq": 587.3296  },  {"note": "d#4","freq": 622.2536  },  {"note": "e4","freq": 659.2552  },  {"note": "f4","freq": 698.4568  },  {"note": "f#4","freq": 739.9888  },  {"note": "g4","freq": 783.9912  },  {"note": "g#4","freq": 830.608  },  {"note": "a5","freq": 880  },  {"note": "a#5","freq": 932.328  },  {"note": "b5","freq": 987.7664  },  {"note": "c5","freq": 1046.5024  },  {"note": "c#5","freq": 1108.7312  },  {"note": "d5","freq": 1174.6592  },  {"note": "d#5","freq": 1244.5072  },  {"note": "e5","freq": 1318.5104  },  {"note": "f5","freq": 1396.9136  },  {"note": "f#5","freq": 1479.9776  },  {"note": "g5","freq": 1567.9824  },  {"note": "g#5","freq": 1661.216  },  {"note": "a6","freq": 1760  },  {"note": "a#6","freq": 1864.656  },  {"note": "b6","freq": 1975.5328  },  {"note": "c6","freq": 2093.0048  }]

const baseNotes = {
  a: halfsteps[0].freq,
  b: halfsteps[2].freq,
  c: halfsteps[4].freq,
  d: halfsteps[5].freq,
  e: halfsteps[7].freq,
  f: halfsteps[9].freq,
  g: halfsteps[10].freq,
  h: halfsteps[11].freq
}

let input = `[Event "F/S Return Match"]
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

const processedInput = ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7",
  "Re1", "b5", "Bb3", "d6", "c3", "O-O", "h3", "Nb8", "d4", "Nbd7",
  "c4", "c6", "cxb5", "axb5", "Nc3", "Bb7", "Bg5", "b4", "Nb1", "h6",
  "Bh4", "c5", "dxe5", "Nxe4", "Bxe7", "Qxe7", "exd6", "Qf6", "Nbd2",
  "Nxd6", "Nc4", "Nxc4", "Bxc4", "Nb6", "Ne5", "Rae8", "Bxf7+", "Rxf7",
  "Nxf7", "Rxe1+", "Qxe1", "Kxf7", "Qe3", "Qg5", "Qxg5", "hxg5", "b3",
  "Ke6", "a3", "Kd6", "axb4", "cxb4", "Ra5", "Nd5", "f3", "Bc8", "Kf2",
  "Bf5", "Ra7", "g6", "Ra6+", "Kc5", "Ke1", "Nf4", "g3", "Nxh3", "Kd2",
  "Kb5", "Rd6", "Kc5", "Ra6", "Nf2", "g4", "Bd3", "Re6"];

const simplified = ["Pe4", "Pe5", "Nf3", "Nc6", "Bb5", "Pa6", "Ba4", "Nf6", "O-O", "Be7",
  "Re1", "Pb5", "Bb3", "Pd6", "Pc3", "O-O", "Ph3", "Nb8", "Pd4", "Nbd7",
  "Pc4", "Pc6", "Pb5", "Pb5", "Nc3", "Bb7", "Bg5", "Pb4", "Nb1", "Ph6",
  "Bh4", "Pc5", "Pe5", "Ne4", "Be7", "Qe7", "Pd6", "Qf6", "Nd2", "Nd6",
  "Nc4", "Nc4", "Bc4", "Nb6", "Ne5", "Re8", "Bf7", "Rf7", "Nf7", "Re1",
  "Qe1", "Kf7", "Qe3", "Qg5", "Qg5", "Pg5", "Pb3", "Ke6", "Pa3", "Kd6",
  "Pb4", "Pb4", "Ra5", "Nd5", "Pf3", "Bc8", "Kf2", "Bf5", "Ra7", "g6",
  "Ra6", "Kc5", "Ke1", "Nf4", "Pg3", "Nh3", "Kd2", "Kb5", "Rd6", "Kc5",
  "Ra6", "Nf2", "Pg4", "Bd3", "Re6"];


const split = [["P", "e", 4], ["P", "e", 5], ["N", "f", 3], ["N", "c", 6], ["B", "b", 5],
["P", "a", 6], ["B", "a", 4], ["N", "f", 6], ["O", "O", 0], ["B", "e", 7],
["R", "e", 1], ["P", "b", 5], ["B", "b", 3], ["P", "d", 6], ["P", "c", 3],
["O", "O", 0], ["P", "h", 3], ["N", "b", 8], ["P", "d", 4], ["N", "d", 7],
["P", "c", 4], ["P", "c", 6], ["P", "b", 5], ["P", "b", 5], ["N", "c", 3],
["B", "b", 7], ["B", "g", 5], ["P", "b", 4], ["N", "b", 1], ["P", "h", 6],
["B", "h", 4], ["P", "c", 5], ["P", "e", 5], ["N", "e", 4], ["B", "e", 7],
["Q", "e", 7], ["P", "d", 6], ["Q", "f", 6], ["N", "d", 2], ["N", "d", 6],
["N", "c", 4], ["N", "c", 4], ["B", "c", 4], ["N", "b", 6], ["N", "e", 5],
["R", "e", 8], ["B", "f", 7], ["R", "f", 7], ["N", "f", 7], ["R", "e", 1],
["Q", "e", 1], ["K", "f", 7], ["Q", "e", 3], ["Q", "g", 5], ["Q", "g", 5],
["P", "g", 5], ["P", "b", 3], ["K", "e", 6], ["P", "a", 3], ["K", "d", 6],
["P", "b", 4], ["P", "b", 4], ["R", "a", 5], ["N", "d", 5], ["P", "f", 3],
["B", "c", 8], ["K", "f", 2], ["B", "f", 5], ["R", "a", 7], ["P", "g", 6],
["R", "a", 6], ["K", "c", 5], ["K", "e", 1], ["N", "f", 4], ["P", "g", 3],
["N", "h", 3], ["K", "d", 2], ["K", "b", 5], ["R", "d", 6], ["K", "c", 5],
["R", "a", 6], ["N", "f", 2], ["P", "g", 4], ["B", "d", 3], ["R", "e", 6]];


const initialNoteLength = 160;
const finalNoteLength = 125;
let currentNoteLength = initialNoteLength;

const durations = {
  P: 1,
  B: 2,
  N: 2,
  R: 3,
  Q: 3,
  K: 4
}


const types = {
  P: 'sine',
  B: 'triangle',
  N: 'triangle',
  R: 'triangle',
  Q: 'square',
  K: 'square'
}

const octaves = {
  1: 1,
  2: 1,
  3: 2,
  4: 2,
  5: 3,
  6: 3,
  7: 4,
  8: 4
}

const volumes = {
  'sine': 1,
  'triangle': .5,
  'square': .16
}

var context = new AudioContext(); // Create audio container

function playSongFromIndex(index) {

  //Play note
  let currentMove = split[index];
  let duration, note, type;

  let notedisplay = '';
  if (currentMove[0] == "O") {
    duration = durations.N;
    note = baseNotes.a * Math.pow(2, octaves[4]);
    type = types.K;
  } else {
    duration = durations[currentMove[0]];
    //note = baseNotes[currentMove[1]] * Math.pow(2, octaves[currentMove[2]]);
    let squarenumber = 8 * (currentMove[2] -1) + currentMove[1].charCodeAt(0)-97
    note = allnotes[squarenumber].freq;
    notedisplay = allnotes[squarenumber].note;
    type = types[currentMove[0]];
  }
  let oscillator = context.createOscillator();
  let gainNode = context.createGain();
  oscillator.connect(gainNode);
  gainNode.gain.setValueAtTime(volumes[type], 1);
  gainNode.connect(context.destination);

  oscillator.start();
  oscillator.type = type;
  oscillator.frequency.value = note;

  //Update speed
  if (processedInput[index].includes('x')) {
    currentNoteLength = finalNoteLength + (initialNoteLength - finalNoteLength) * ((processedInput.length - index) / processedInput.length);
  }

  //Display move
  displayMove(index);
  displayNote(notedisplay);

  //Delay and play remainder of song
  setTimeout(function () {
    oscillator.stop();
    if (index + 1 < split.length)
      playSongFromIndex(index + 1);
    else {
      document.querySelector("#move").innerHTML = '';
      currentNoteLength = initialNoteLength;
    }
  }, duration * currentNoteLength);

}










function playSound(note, time, duration) {

  let oscillator = context.createOscillator();

  oscillator.type = 'sine';
  oscillator.frequency.value = note;

  oscillator.connect(context.destination); // Connect sound to output
  oscillator.start(time);
  oscillator.stop(time + (duration / 1000));

}

function playSong(index) {

  var startTime = context.currentMoveTime;
  let timeSoFar = 0;

  for (var i = 0; i < split.length; i++) {
    let currentMove = split[i];
    let duration = durations[currentMove[0]];
    let note = baseNotes[currentMove[1]] * Math.pow(2, currentMove[2]);
    note = (note / 32) + 300; //scale down the note

    playSound(note, startTime + timeSoFar, duration);
    displayMove(currentMove);
    timeSoFar += (duration / 1000);
  }

}

function displayMove(move) {
  document.querySelector("#move").innerHTML = processedInput[move];
}

function displayNote(note) {
  document.querySelector("#note").innerHTML = note;
}
