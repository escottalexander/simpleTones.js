// https://github.com/escottalexander/simpleTones.js

//Create Audio Context
let AudioContext = window.AudioContext || window.webkitAudioContext;
let context = new AudioContext();

let o = null;
let g = null;

//Sound Storage
//If you add your own sounds here, please consider
//submitting a pull request with your new sounds effects
const soundObj = {
  bump: ["triangle", 100, 0.8, 333, 0.2, 100, 0.4, 80, 0.7],
  buzzer: ["sawtooth", 40, 0.8, 100, 0.3, 110, 0.5],
  zip: ["sawtooth", 75, 0.8, 85, 0.2, 95, 0.4, 110, 0.6, 120, 0.7, 100, 0.8],
  powerdown: ["sine", 300, 1.2, 150, 0.5, 1, 0.9],
  powerup: ["sine", 30, 1, 150, 0.4, 350, 0.9],
  bounce: ["square", 75, 0.5, 150, 0.4],
  siren: ["sawtooth", 900, 2.5, 400, 0.5, 900, 1, 400, 1.4, 900, 2, 400, 2.5],
  loop: ["sine", 340, 2.5, 550, 0.8, 440, 1.4],
  falling: ["sine", 750, 5.2, 700, 1, 600, 2, 500, 3, 400, 4, 300, 4.5, 200, 5],
};

const Tone = {
  NOTES: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],

  /**
   * This function calculates tone
   * @param { String } tone and scale
   * @returns { Number } of tone frequency
   */
  getToneFrequency(note = "C") {
    console.log(`foo: ${note}`);
    if (this.isFlatTone(note)) {
      note = this.downFlatTone(note);
    }
    let index = null;
    this.NOTES.forEach((NOTE, i) => {
      if (note.includes(NOTE)) index = i;
    });
    if (index === null) {
      throw new Error("Input contains no note, returning C instead.");
    }
    let level = 4;
    for (let i = 0; i <= 8; i++) {
      if (note.includes(i)) level = i;
    }
    return 440 * Math.pow(2, (level * 12 + index - 57) / 12);
  },

  /**
   * This function checks if given tone is flat
   * @param { String } tone given tone
   * @returns { Boolean } whether it is or isn't flat
   */
  isFlatTone(tone) {
    /\wb\d/.test(tone);
  },

  /**
   * This functions corresponds a flat tone notation, to a sharp musical acident
   * @param { String } tone flat tone
   * @returns { String } corresponding sharp tone
   */
  downFlatTone(tone) {
    var flatMap = {
      Cb: "B",
      Db: "C#",
      Eb: "D#",
      Fb: "E",
      Gb: "F#",
      Ab: "G#",
      Bb: "A#",
    };
    toneKey = tone.replace(/\d/, "");
    toneOctave = tone.replace(/\D/g, "");
    return (
      flatMap[toneKey] +
      (toneKey === "Cb" ? Number(toneOctave) - 1 : toneOctave)
    );
  },
};

const VOLUME_CURVE = [1.0, 0.61, 0.37, 0.22, 0.14, 0.08, 0.05, 0.0];

/**
 * This functions plays chords given array of n string tones
 * @param { any } whatever to play
 * @param { string } type of waveform
 * @param { number } duration
 */
const playTone = (whatever = "C4", type = "sine", duration = 1.3) => {
  if (typeof whatever === "object") {
    playChord(whatever, type, duration);
  } else if (typeof whatever === "string") {
    playSingleFrequency(Tone.getToneFrequency(whatever), type, duration);
  } else if (typeof whatever === "number") {
    playSingleFrequency(whatever, type, duration);
  }
};

/**
 * This functions plays chords given array of n string tones
 * @param { String[] } tone name
 */
const playChord = (chords = 440, type = "sine", duration = 1.3) => {
  for (let i = 0; i <= 2; i++) {
    playSingleFrequency(Tone.getToneFrequency(chords[i]), type, duration);
  }
};

// Plays single tones. Helperfunction for playChord and playTone, but can also be used by itself.
const playSingleFrequency = (
  frequency = 440,
  type = "sine",
  duration = 1.3
) => {
  o = context.createOscillator();
  g = context.createGain();
  o.connect(g);
  o.type = type;
  o.frequency.value = frequency;
  g.connect(context.destination);
  o.start(0);
  //g.gain.exponentialRampToValueAtTime(0.0001,context.currentTime + duration)
  g.gain.setValueCurveAtTime(VOLUME_CURVE, context.currentTime, duration);
};

//This function plays sounds
function playSound(waveType, startFreq, endTime) {
  if (soundObj[arguments[0]] && arguments.length === 1) {
    var soundName = arguments[0];
    playSound(...soundObj[soundName]);
  } else {
    var oscillatorNode = context.createOscillator();
    var gainNode = context.createGain();

    oscillatorNode.type = waveType;
    oscillatorNode.frequency.setValueAtTime(startFreq, context.currentTime);

    for (var i = 3; i < arguments.length; i += 2) {
      oscillatorNode.frequency.exponentialRampToValueAtTime(
        arguments[i],
        context.currentTime + arguments[i + 1]
      );
    }
    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    gainNode.gain.setValueCurveAtTime(VOLUME_CURVE, context.currentTime, 2.0);

    oscillatorNode.connect(gainNode);
    gainNode.connect(context.destination);

    oscillatorNode.start();
    oscillatorNode.stop(context.currentTime + endTime);
  }
}

function init() {
  AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
}

const CHORDS = {
  C: ["C4", "E4", "G4"],
  Cm: ["C4", "D#4", "G4"],
  "C#": ["C#4", "F4", "G#4"],
  D: ["D4", "F#4", "A4"],
  Dm: ["D4", "F4", "A4"],
  "D#": ["D#4", "G4", "A#4"],
  E: ["E4", "G#4", "B4"],
  Em: ["E4", "G4", "B4"],
  F: ["F4", "A4", "C5"],
  Fm: ["F4", "G#4", "C5"],
  "F#": ["F#4", "A#4", "C#5"],
  G: ["G4", "B4", "D5"],
  Gm: ["G4", "A#4", "D5"],
  "G#": ["A#4", "C5", "D#5"],
  A: ["A4", "C#5", "E5"],
  Am: ["A4", "C5", "E5"],
  "A#": ["A#4", "D5", "F5"],
  B: ["B4", "D#5", "F#5"],
  Bm: ["B4", "D5", "F#5"],
};

const CHORD_FREQUENCIES = {
  C: [261.6, 329.6, 392.0],
  Cm: [261.6, 311.1, 392.0],
  "C#": [277.2, 349.2, 415.3],
  D: [293.7, 370.0, 440.0],
  Dm: [293.7, 349.2, 440.0],
  "D#": [311.1, 392.0, 466.2],
  E: [329.6, 415.3, 493.9],
  Em: [329.6, 392.0, 493.9],
  F: [349.2, 440.0, 523.251],
  Fm: [349.2, 415.3, 523.251],
  "F#": [370.0, 466.2, 554.365],
  G: [392.0, 493.9, 587.33],
  Gm: [392.0, 466.2, 587.33],
  "G#": [466.2, 523.251, 622.254],
  A: [440.0, 554.365, 659.255],
  Am: [440.0, 523.251, 659.255],
  "A#": [466.2, 587.33, 698.456],
  B: [493.9, 622.254, 739.989],
  Bm: [493.9, 587.33, 739.989],
};

const TONE_FREQENCIES = {
  C0: 16.35,
  "C#0": 17.32,
  D0: 18.35,
  "D#0": 19.45,
  E0: 20.6,
  F0: 21.83,
  "F#0": 23.12,
  Gb0: 23.12,
  G0: 24.5,
  "G#0": 25.96,
  A0: 27.5,
  "A#0": 29.14,
  B0: 30.87,
  C1: 32.7,
  "C#1": 34.65,
  D1: 36.71,
  "D#1": 38.89,
  E1: 41.2,
  F1: 43.65,
  "F#1": 46.25,
  G1: 49.0,
  "G#1": 51.91,
  A1: 55.0,
  "A#1": 58.27,
  B1: 61.74,
  C2: 65.41,
  "C#2": 69.3,
  D2: 73.42,
  "D#2": 77.78,
  E2: 82.41,
  F2: 87.31,
  "F#2": 92.5,
  G2: 98.0,
  "G#2": 103.83,
  A2: 110.0,
  "A#2": 116.54,
  B2: 123.47,
  C3: 130.81,
  "C#3": 138.59,
  D3: 146.83,
  "D#3": 155.56,
  E3: 164.81,
  F3: 174.61,
  "F#3": 185.0,
  G3: 196.0,
  "G#3": 207.65,
  A3: 220.0,
  "A#3": 233.08,
  B3: 246.94,
  C4: 261.63,
  "C#4": 277.18,
  D4: 293.66,
  "D#4": 311.13,
  E4: 329.63,
  F4: 349.23,
  "F#4": 369.99,
  G4: 392.0,
  "G#4": 415.3,
  A4: 440.0,
  "A#4": 466.16,
  B4: 493.88,
  C5: 523.25,
  "C#5": 554.37,
  D5: 587.33,
  "D#5": 622.25,
  E5: 659.26,
  F5: 698.46,
  "F#5": 739.99,
  G5: 783.99,
  "G#5": 830.61,
  A5: 880.0,
  "A#5": 932.33,
  B5: 987.77,
  C6: 1046.5,
  "C#6": 1108.73,
  D6: 1174.66,
  "D#6": 1244.51,
  E6: 1318.51,
  F6: 1396.91,
  "F#6": 1479.98,
  G6: 1567.98,
  "G#6": 1661.22,
  A6: 1760.0,
  "A#6": 1864.66,
  B6: 1975.53,
  C7: 2093.0,
  "C#7": 2217.46,
  D7: 2349.32,
  "D#7": 2489.02,
  E7: 2637.02,
  F7: 2793.83,
  "F#7": 2959.96,
  G7: 3135.96,
  "G#7": 3322.44,
  A7: 3520.0,
  "A#7": 3729.31,
  B7: 3951.07,
  C8: 4186.01,
  "C#8": 4435,
  D8: 4699,
  "D#8": 4978,
  E8: 5274,
  F8: 5588,
  "F#8": 5920,
  G8: 6272,
  "G#8": 6645,
  A8: 7040,
  "A#8": 7459,
  B8: 7902,
};

module.exports = {
  init,
  playChord,
  playSingleFrequency,
  playSound,
  playTone,
  TONE_FREQENCIES,
  CHORD_FREQUENCIES,
  CHORDS,
};
