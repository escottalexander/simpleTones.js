# SimpleTones.js

## The Premier Library For Easy Browser Based Tones - No Audio Files Required!

The goal of simpleTones.js is to provide every developer with a lightweight solution for creating interactive tones in their web applications. This documentation has been written in hopes that the least experienced developer can read, understand and go on to do great things. This library is based on the Web Audio API and has the same browser limitations. 

You can check out the documentation at [https://escottalexander.github.io/simpleTones.js/](https://escottalexander.github.io/simpleTones.js/) and several examples at [https://escottalexander.github.io/simpleTones.js/toneTest.html](https://escottalexander.github.io/simpleTones.js/index.html).

### Table of Contents
1. [Initial Setup](#setup-is-simple)
2. [Implementation](#implementation)
3. [Parameters For Sounds](#the-parameters-for-sounds)
4. [Custom Sounds](#creating-custom-sounds)
5. [Parameters For Tones](#the-parameters-for-tones)
6. [Limitations](#limitations)
7. [Contributing](#helpful-resources-for-contributing)

### Setup is simple 
Just add the simpleTones.js file to your file directory 

and include the simpleTones.js file in your header file sources.

```html
<head>
<script src="src/index.js"></script>
</head>
```

That's it!!!

Now you are ready to make some noise!

### Basic Implementation 

You have two options, sounds and tones. Sounds are either predefined noises or you can create a custom sound with any length and variation in frequency. Tones are all predefined (all the keys of a piano).

Super simple implementation - To get started, just use `playTone()` or `playSound(`<i>"sound name"</i>`)` anywhere in your code where you want it to trigger a sound.

For example:

```html
<button onclick="playTone()">Click me!</button>

<button onclick="playSound("buzzer")">Click me!</button>
```

or

```js
if (x === true) {
playTone();
}
```

### The Parameters For Sounds

#### You can use a sound that is shipped with the library

<code>playSound("sound")</code>

Currently, the library is shipped with only a handful of predefined sounds. The names of these sounds can be seen in the soundObj object at the very top of the simpleTones JavaScript file.
```js
//Sound Storage 
var soundObj = {
	bump:["triangle",100,0.8,333,0.2,100,0.4,80,0.7],
	buzzer:["sawtooth",40,0.8, 100,0.3 ,110, 0.5],
	zip:["sawtooth",75,0.8,85,0.2,95,0.4,110,0.6,120,0.7,100,0.8],
	powerdown:["sine", 300, 1.2, 150, 0.5,1,0.9],
	powerup:["sine", 30, 1, 150, 0.4,350,0.9],
	bounce:["square", 75, 0.5, 150, 0.4],
	siren:["sawtooth",900,2.5, 400,0.5 ,900, 1, 400,1.4, 900, 2, 400, 2.5]
}
```

### Creating Custom Sounds

#### You can make any sound you can imagine

<code>playSound(waveType, initialFrequency, fullLength, frequencyChange1, timingOfFrequencyChange1...)</code>

### waveType
#### There are four wave types to choose from: 
- Sine
- Square
- Triangle
- Sawtooth

These wave types are based on the sound wave pattern and are somewhat explained by this chart:

![Chart](https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Waveforms.svg/600px-Waveforms.svg.png)

### initialFrequency

This is the frequency with which your sound will start. The number should be <i>in Hertz</i>. For reference, on the piano an A played on the fourth scale is 440hz.

### fullLength

fullLength is the entire duration of your sound <i>in seconds</i>. Be very careful that you make it long enough to sustain until all the following freqency changes are carried through. For instance, if fullLength is set to 2 seconds and your next set of frequency change instructions are set to go off at 2.5 seconds, you will never hear the second set of frequency instructions.

### frequencyChange1 <i>or 2, 3, 4 etc.</i>
### and 
### timingOfFrequencyChange1 <i>or 2, 3, 4 etc.</i>
This is where you will give the sound its instructions to change frequency (frequencyChange1) and what time to do it (timingOfFrequencyChange1). You can chain together an unlimited quantity of these instructions to achieve the desired sound.

#### Here is an example

This is a sound that has the "sine" wave type and will start playing at 440Hz, it's set to end at 2.5 seconds but at 0.8 seconds the frequency will change to 220Hz.
```js
playSound("sine", 440, 2.5, 220, 0.8);
```
We can easily add another frequency change at another time interval by adding the following:
```js
playSound("sine", 440, 2.5, 220, 0.8, 440, 1.4);
```
Now after playing the original instructions it will go back to 440Hz at the 1.4 second interval.

### Adding your custom sounds to soundObj for easy reference 

At the very top of the simpleTones JavaScript file there is an object called soundObj.
```js
//Sound Storage 
var soundObj = {
	bump:["triangle",100,0.8,333,0.2,100,0.4,80,0.7],
	buzzer:["sawtooth",40,0.8, 100,0.3 ,110, 0.5],
	zip:["sawtooth",75,0.8,85,0.2,95,0.4,110,0.6,120,0.7,100,0.8],
	powerdown:["sine", 300, 1.2, 150, 0.5,1,0.9],
	powerup:["sine", 30, 1, 150, 0.4,350,0.9],
	bounce:["square", 75, 0.5, 150, 0.4],
	siren:["sawtooth",900,2.5, 400,0.5 ,900, 1, 400,1.4, 900, 2, 400, 2.5]
}
```
You can place your sound instructions here and give them a name so that you can easily reference them in your project. Please consider giving this project a pull request if you make some awesome sounds you want to share.

### The Parameters For Tones

<code>playTone(tone <i>or</i> chord <i>or</i> frequency, waveType, duration)</code>

#### You can select any tone that is on the piano, for reals
Tones are stored in an object and can be accessed with 
```js
playTone(tone["C1"])
```
Or, luckily, simpleTones.js is smart enough to know what you mean if you just use `"C1"` as the parameter.

For example:
```js
playTone("C1")
```
Now "C1" means, "play a C on the **_first_** scale". To play a Eb on the eighth scale you would use "Eb8". Or A# on the third scale would be "A#3". It's that simple.
Numbers range from 0 to 8. The higher the scale, the higher the pitch. Every tone has a #(sharp) _except_ E and B which have b(flat).

Now if I haven't lost you yet in the musical jargon, lets look at another way to make sounds.

### Chord
#### For a fuller sound, chords are a sure pick!
Chords are stored in an object and can be accessed with 
```js
playTone(chord["C"])
```
Or you just use `"C"` as the parameter.

For example:
```js
playTone("C")
```
The way chords work is that they play three tones that together equal "C". Currently all chords available are based on tones in the fourth scale. Chords from other scales coming in a later release.
You can play major chords like "G", "E" and "A", sharp chords such as "C#", "D# and "G# or even minor chords like "Em", "Cm" and "Am"!

### Frequency
#### For a tone that isn't predefined you can specify the Hz
To use a frequency, just type the quantity of Hz as a number:
```js
playTone(440)
```
For reference, 440 Hz is the equivalent of playing "A4" 

### waveType
#### There are four wave types to choose from: 
- Sine
- Square
- Triangle
- Sawtooth

These wave types are based on the sound wave pattern and are somewhat explained by this chart:

![Chart](https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Waveforms.svg/600px-Waveforms.svg.png)

When these are used as parameters they should look like this:
```js
playTone("Cm", "sine");
playTone("Eb4", "square");
playTone("A#6", "triangle");
playTone("E", "sawtooth");
```
Play around with them and see which one you like best for your project.

When you don't specify which one to use it will default to "sine".

### Duration
#### How long the tone will play
The default duration is 1.3 seconds. You can change it to any other number.
```js
BuzzerHit() {
//Annoyingly long tone
playTone("A#2", "sawtooth", 5.4)
}
```

### Limitations

The simpleTones.js library has been built on top of the [WebAudioAPI](https://webaudio.github.io/web-audio-api/) which currently has issues with [older browsers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API#Browser_compatibility). Keep this in mind as you use the library.

### Helpful Resources For Contributing

There are lots of ways that simpleTones.js could be improved and optimized. If you have an idea or would like to learn and apply the Web Audio API to more of the codebase, we would love to come along side you and help you leave your mark on this project. 

* [CSS-Tricks Introduction to Web Audio API](https://css-tricks.com/introduction-web-audio-api/)
* [MDN Web Docs - Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
* [Piano Key Frequencies PDF](http://www.ece.iastate.edu/~alexs/classes/2016_Spring_575/HW/HW5/files/piano-key-freq-wikipedia.pdf)
* [Generate Sounds Programmatically With Javascript](http://marcgg.com/blog/2016/11/01/javascript-audio/)

Please keep in mind that we want this project to stay as simple as possible so that new developers can easily learn and utilize browser based sounds without having to fully understand the Web Audio API.
