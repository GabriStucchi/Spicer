

<p align="center">
  <img src="https://user-images.githubusercontent.com/57997005/91635010-1c57d900-e9f5-11ea-9c0b-b008605fe2d1.png?raw=true" alt="logo" width="120"//>
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/57997005/91661200-c2c9da00-eada-11ea-9c8b-797fa9bf3db4.jpeg" alt="scritta" width="300"//>
</p>

<h3 align="center"> A tool for spicing up your music: as simple as a loop station, as spicy as a whole band! </h3>

![tag](https://img.shields.io/aur/last-modified/google-chrome) ![Mozilla Add-on](https://img.shields.io/amo/rating/dustman) ![Github All Contributors](https://img.shields.io/github/all-contributors/all-contributors/all-contributors/master) 

<p align="center">
  <img src="https://user-images.githubusercontent.com/57997005/91635013-1f52c980-e9f5-11ea-852c-8e1d80ab34b9.png?raw=true" alt="image"/>
</p>

## How To Use
The Spicer is meant to spice up your music performances offering a virtual band playing live together with you: just play the basic chord progression of your piece and let the magic happen! 

You can choose the instruments to play with on your band and their level of expertise and also modify them while playing to create different textures.

Follow this simple steps to get started:

1. Connect a MIDI keyboard
2. Select the tonality and bpm of your music piece
3. Press space bar and wait the countdown to start recording
4. Play the basic chords of your piece and stop recording, they will loop and form the harmony structure 
5. Choose which instruments to include and their spicer levels
6. Now you can start playing and improvising your solo with a synth and obtain the spiciest sound by tuning its parameters
7. At the end, if you like the performance, it is possible to export it as wav??

* EASY MODE: Instead of playing the chords for defining the harmony it's possible to play just the root of each one; then they will be set by looking at the key harmonization

<h3 align="center"> youtube demo link </h3>

## Features
#### Band Instrument Selection

| Instrument | Low Complexity | High Complexity | 
| :---         | :---      | :--- |
| Piano   | Enriches the chords with maj and min 7th, if possible, depending on the chord progression    | Enriches the chords with 9th and generates voicings if possible    |
| Bass    | Plays the fundamental note of each chord       | Create a walking bass line      |
| Drums    | Plays a standard drumfill?       | Plays a strong drumfill     |

#### Synthesizer
Inspired by the colorful design of the Moog Grandmother and build using [Tone.js](https://tonejs.github.io/) framework the Spicer monophonic Synthesizer gives the opportunity to jam on top of your spiced arrangement.
The synth is composed of the following components:
* **2 Oscillators** - Both are able to play the classic four waveforms (Sine, Triangle, Square and Sawtooth) and have a dedicated octave control.
* **Mixer** - Craft the sound by controlling oscillators' gains and by adding some Noise that can be White, Pink or Brown.
* **Filter** - Can be low pass, high pass or bandpass with a 24 dB/octave slope and a Resoncance control.
* **Envelope** - Shapes the sound amplitude and (optionally) the filter cutoff frequency.
* **Output** - Control the main output gain.
* **Effects** - The sound generated can be spiced up even more applying a PingPong Delay and a Convolution Reverb.
* **Modulation** - Two indipendent LFOs that can be used to give life to the sound created. The LFOs are pre-routed to modulate the oscillators' pitch and the filter cutoff frequency. Both can be toggled on or off and can be controlled in Frequency, Amplitude and Waveform generated.

The following scheme respresents the signal path.
-------------SCHEMA---------------
