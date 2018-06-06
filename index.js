
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
  { note: 'g#', freq: 103.826 },
]

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

const processedInput = ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5", "Bb3", "d6", "c3", "O-O", "h3", "Nb8", "d4", "Nbd7", "c4", "c6", "cxb5", "axb5", "Nc3", "Bb7", "Bg5", "b4", "Nb1", "h6", "Bh4", "c5", "dxe5", "Nxe4", "Bxe7", "Qxe7", "exd6", "Qf6", "Nbd2", "Nxd6", "Nc4", "Nxc4", "Bxc4", "Nb6", "Ne5", "Rae8", "Bxf7+", "Rxf7", "Nxf7", "Rxe1+", "Qxe1", "Kxf7", "Qe3", "Qg5", "Qxg5", "hxg5", "b3", "Ke6", "a3", "Kd6", "axb4", "cxb4", "Ra5", "Nd5", "f3", "Bc8", "Kf2", "Bf5", "Ra7", "g6", "Ra6+", "Kc5", "Ke1", "Nf4", "g3", "Nxh3", "Kd2", "Kb5", "Rd6", "Kc5", "Ra6", "Nf2", "g4", "Bd3", "Re6"];

const simplified = ["Pe4", "Pe5", "Nf3", "Nc6", "Bb5", "Pa6", "Ba4", "Nf6", "O-O", "Be7", "Re1", "Pb5", "Bb3", "Pd6", "Pc3", "O-O", "Ph3", "Nb8", "Pd4", "Nbd7", "Pc4", "Pc6", "Pb5", "Pb5", "Nc3", "Bb7", "Bg5", "Pb4", "Nb1", "Ph6", "Bh4", "Pc5", "Pe5", "Ne4", "Be7", "Qe7", "Pd6", "Qf6", "Nd2", "Nd6", "Nc4", "Nc4", "Bc4", "Nb6", "Ne5", "Re8", "Bf7", "Rf7", "Nf7", "Re1", "Qe1", "Kf7", "Qe3", "Qg5", "Qg5", "Pg5", "Pb3", "Ke6", "Pa3", "Kd6", "Pb4", "Pb4", "Ra5", "Nd5", "Pf3", "Bc8", "Kf2", "Bf5", "Ra7", "g6", "Ra6", "Kc5", "Ke1", "Nf4", "Pg3", "Nh3", "Kd2", "Kb5", "Rd6", "Kc5", "Ra6", "Nf2", "Pg4", "Bd3", "Re6"];


const split = [   ["P", "e", 4],   ["P", "e", 5],   ["N", "f", 3],   ["N", "c", 6],   ["B", "b", 5],   ["P", "a", 6],   ["B", "a", 4],   ["N", "f", 6],   /*["O", "O", 0],*/   ["B", "e", 7],   ["R", "e", 1],   ["P", "b", 5],   ["B", "b", 3],   ["P", "d", 6],   ["P", "c", 3],   /*["O", "O", 0],*/   ["P", "h", 3],   ["N", "b", 8],   ["P", "d", 4],   ["N", "d", 7],   ["P", "c", 4],   ["P", "c", 6],   ["P", "b", 5],   ["P", "b", 5],   ["N", "c", 3],   ["B", "b", 7],   ["B", "g", 5],   ["P", "b", 4],   ["N", "b", 1],   ["P", "h", 6],   ["B", "h", 4],   ["P", "c", 5],   ["P", "e", 5],   ["N", "e", 4],   ["B", "e", 7],   ["Q", "e", 7],   ["P", "d", 6],   ["Q", "f", 6],   ["N", "d", 2],   ["N", "d", 6],   ["N", "c", 4],   ["N", "c", 4],   ["B", "c", 4],   ["N", "b", 6],   ["N", "e", 5],   ["R", "e", 8],   ["B", "f", 7],   ["R", "f", 7],   ["N", "f", 7],   ["R", "e", 1],   ["Q", "e", 1],   ["K", "f", 7],   ["Q", "e", 3],   ["Q", "g", 5],   ["Q", "g", 5],   ["P", "g", 5],   ["P", "b", 3],   ["K", "e", 6],   ["P", "a", 3],   ["K", "d", 6],   ["P", "b", 4],   ["P", "b", 4],   ["R", "a", 5],   ["N", "d", 5],   ["P", "f", 3],   ["B", "c", 8],   ["k", "f", 2],   ["B", "f", 5],   ["R", "a", 7],   ["P", "g", 6],   ["B", "e", 6],   ["B", "e", 5],   ["B", "e", 1],   ["B", "e", 4],   ["B", "e", 3],   ["B", "e", 3],   ["B", "e", 2],   ["B", "e", 5],   ["B", "e", 6],   ["B", "e", 5],   ["R", "a", 6],   ["N", "f", 2],   ["P", "g", 4],   ["B", "d", 3],   ["R", "e", 6] ]; 


const noteLength = 150;

const durations = {
  P: noteLength * 1,
  B: noteLength * 2,
  N: noteLength * 2,
  R: noteLength * 2,
  Q: noteLength * 2,
  K: noteLength * 2
}


const types = {
  P: 'sine',
  B: 'triangle',
  N: 'triangle',
  R: 'triangle',
  Q: 'square',
  K: 'square'
}

var context = new AudioContext(); // Create audio container

playSongFromIndex(0);

function playSongFromIndex(index) {

  //Start note
  let current = split[index];
 
  let duration = durations[current[0]];
  let note = baseNotes[current[1]] * Math.pow(2, current[2]);
  note = (note / 32)+300;

  let oscillator = context.createOscillator(); // Create sound source

  oscillator.connect(context.destination); // Connect sound to output
  oscillator.start(0);

  oscillator.type = types[current[0]];// index%2==0?"triangle":'sine';
  oscillator.frequency.value = note;

  setTimeout(function () {
    oscillator.stop();
    //setTimeout(function () {
    if (index + 1 < split.length)
      playSongFromIndex(index + 1);
    //}, 100);
  }, duration/*-100*/);

}