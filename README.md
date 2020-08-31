

<p align="center">
  <img src="https://user-images.githubusercontent.com/57997005/91635010-1c57d900-e9f5-11ea-9c0b-b008605fe2d1.png?raw=true" alt="logo" width="120"//>
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/57997005/91749439-bf5d4e00-ebc1-11ea-8c81-2c3514b02f03.gif" width="900"//>
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
### Band Instrument Selection

| Instrument | Low Complexity | High Complexity | 
| :---         | :---      | :--- |
| **Piano**   | Enriches the chords with maj and min 7th, if possible, depending on the chord progression    | Enriches the chords with 9th and generates voicings if possible    |
| **Bass**   | Plays the fundamental note of each chord       | Create a walking bass line      |
| **Drums**    | Plays a standard drumfill?       | Plays a strong drumfill     |

### Synthesizer
Inspired by the colorful design of the _Moog Grandmother_ and build using [Tone.js](https://tonejs.github.io/) framework the Spicer monophonic Synthesizer gives the opportunity to jam on top of your spiced arrangement.
The synth is composed of the following components:

| Control |  |
| :---  | :---  | 
| **Oscillators** | There are two of them: both are able to play the classic four waveforms (_Sine_, _Triangle_, _Square_ and _Sawtooth_) and have a dedicated octave control. |
| **Mixer** | Craft the sound by controlling the oscillators' gains and by adding some Noise that can be _White_, _Pink_ or _Brown_. |
| **Filter** | Can be _low pass_, _high pass_ or _bandpass_ with a 24 dB/octave slope and a Resonance control. |
| **Envelope** | Shapes the sound amplitude and (optionally) the filter cutoff frequency. |
| **Output** | Control the main output gain. |
| **Effects** | The sound generated can be spiced up even more applying a _PingPong Delay_ and a _Convolution Reverb_. |
| **Modulation** | Two indipendent LFOs that can be used to give life to the sound created. The LFOs are pre-routed to modulate the oscillators' pitches and the filter cutoff frequency. Both can be toggled on or off and can be controlled in Frequency, Amplitude and Waveform generated. |

The following scheme respresents the signal path.
-------------SCHEMA---------------
