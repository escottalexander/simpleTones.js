![simpleTonesLogo](https://gdurl.com/z7Vg)

## The Premier Library For Easy Browser Based Tones

The goal of simpleTones.js is to provide every developer with a lightweight(only 3kb) solution to creating interactive tones in their web applications. This documentation has been written in hopes that the least experienced developer can read, understand and go on to do great things. This library is based on the Web Audio API and has the same browser limitations. You can check out several examples at [SlayApps.com/simpleTones-js](https://slayapps.com/simpletones-js/).

### Table of Contents
1. [Initial Setup](#setup-is-simple)
2. [Implementation](#implementation)
3. [Parameters](#the-parameters)
4. [Limitations](#limitations)
5. [Contributing](#helpful-resources-for-contributing)

### Setup is simple 
Just add the simpleTones.js file to your file directory 

![FileStructure](https://gdurl.com/mdoF)

and include the simpleTones.js file in your header file sources.
```html
<head>
<script src="src/simpleTones.js"></script>
</head>
```
That's it!!!

Now you are ready to make some noise!

### Implementation 

Super simple implementation - To get started, just use `playTone()` anywhere in your code where you want it to trigger a sound.

For example:

```html
<button onclick="playTone()">Click me!</button>
```

or

```js
if (x === true) {
playTone();
}
```
### Additional Options
The thrust of this project is to make it super easy to create tones in the browser. For those who need more flexibility... You're in luck!!! We have endeavoured to provide a range of 'above and beyond' functionality that can be accessed through additional parameters.

And now introducing... 

### The Parameters

<code>playTone(tone <i>or</i> chord <i>or</i> frequency, style, duration)</code>

### Tone
#### You can select any tone that is on the piano, like seriously
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

### Style
#### There are four styles to choose from: 
- Sine
- Square
- Triangle
- Sawtooth

These styles are based on the sound wave pattern and are somewhat explained by this chart:

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