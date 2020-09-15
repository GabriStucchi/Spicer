<p align="center">
  <img src="https://user-images.githubusercontent.com/24576858/92103904-e0e85080-ede0-11ea-8e61-5ba2f4050be4.gif" width="50%"//>
</p>

<h2 align="center"> As simple as a loop station, as spicy as a whole band! </h3>

<p align="center">
  <img src="https://user-images.githubusercontent.com/57997005/92999171-3d551980-f51f-11ea-8f0e-a5b6ac00dccb.gif" width="150%"/>
</p>

<h1 align="center">
<a href="https://gabristucchi.github.io/" align="center"> START SPICING </a>
</h1>

## How To Use
The Spicer a Web application meant to spice up your music performances offering a virtual band playing live together with you: just play a basic chord progression and let the magic happen! 

You can choose which instruments to include in your band and their level of expertise and also modify them while playing to create different textures.

Follow these simple steps to get started:

1. Connect a MIDI keyboard.
2. Select the tonality and the bpm.
3. Press 'R' and wait a bar to start recording.
4. Play in four bars the basic chords of your piece; then they will loop and form the harmony structure.
5. Choose which instruments to include and their Spice levels: look at the chili pepper on the logo to check the spiciness of the performance!
6. Now you can start playing and improvising your solo with a synth and obtain the spiciest sound by tuning its parameters.

* EASY MODE: Instead of playing the chords to define the harmony of your piece it's possible to play just the root of each one; then they will be harmonized depending on the key.
* SOUND SELECTION: It's possible to choose between different types of keys, including pianos, organs and pads. The set of possible sampled sounds is imported from [WebAudioFont](https://surikov.github.io/webaudiofont/).


<h3 align="center"> 
  <a href="https://www.youtube.com/watch?v=sBVO2PVux7Y&feature=emb_title" align="center"> WATCH A DEMO </a>
</h3>

## Controls
<p align="center">
<img src="https://user-images.githubusercontent.com/57997005/92999179-4f36bc80-f51f-11ea-94eb-66e507c0b769.jpg" alt="Spicer Bar" width="1200"/>
</p>

Open the Spicer menu by clicking on the window on the bottom or by pressing shift:

1. Choose the bpm.
2. Choose the tonality. 
3. Change the piano sound. 
4. Spice up or down the instruments.
5. Record a loop or delete the existing one.
6. Play or stop the recorded loop
7. Switch between playing the synth or the selected keys.

## Shortcuts
<p align="center">
<img src="https://user-images.githubusercontent.com/57997005/93243208-2c5b1100-f788-11ea-9c56-6f71eafd475b.jpg" alt="Spicer Bar" width="1200"/>
</p>

* Press the highlighted notes to play without a midi keyboard.
1. Press 'Q' to transpose the keyboard notes down an octave.
2. Press 'W' to transpose the keyboard notes up an octave.
3. Press 'R' to start recording, press it again to discard the record.
4. Press 'P' to pause the recorded loop, press it again to resume.
5. Press 'Shift' to open/close the Spicer menu.



## Features
### Band Instrument Selection
Each instrument of the band has two Spice levels: the higher it is, the more complex and spicy its performance style will be!
Level zero corresponds to muting the instrument except for keys which still play the recorded chord progression shifting all the notes to the D4 - F5 range.

| Instrument | Level 1  | Level 2 | 
| :---         | :---      | :--- |
| **Piano**   | Enriches the chords with maj/min 7th or 6th, if possible, depending on the chord progression.    | Enriches the chords with 9th and generates voicings if possible.    |
| **Bass**   | Plays the fundamental note of each chord and the leading tone to the next fundamental.      | Create a four beat walking bass line.      |
| **Drums**    | Plays a chilling drums pattern.       | Plays a powerful drums pattern.     |

### Synthesizer
Inspired by the colorful design of the _Moog Grandmother_ and built using the [Tone.js](https://tonejs.github.io/) framework, the monophonic Spicer Synthesizer gives the opportunity to jam on top of your spiced arrangement achieving the spiciest solo sound.

<p align="center">
<img src="https://user-images.githubusercontent.com/37587013/92270285-175bc380-eee6-11ea-945b-edfc5b78d920.png" alt="Spicer Bar" width="1000"/>
</p>


The synth is composed of the following components:

1. **Oscillators** - Two oscillators, both are able to play the classic four waveforms (_Sine_, _Triangle_, _Square_ and _Sawtooth_) and have a dedicated octave control.
2. **Mixer** - Craft the sound by controlling the oscillators' gains and by adding some Noise that can be _White_, _Pink_ or _Brown_.
3. **Filter** - Can be _low pass_, _high pass_ or _bandpass_ with a 24 dB/octave slope and a Resonance control.
4. **Envelope** - Shapes the sound amplitude and (optionally) the filter cutoff frequency.
5. **Output** - Control the main output gain.
6. **Effects** - The sound generated can be spiced up even more applying a _PingPong Delay_ and a _Convolution Reverb_. The dedicated knobs control the amount of wet signal.
7. **Modulation** - Two indipendent LFOs that can be used to give life to the created sound. The LFOs are pre-routed to modulate the oscillators' pitches and the filter's cutoff frequency. Both can be toggled on or off and can be controlled in Frequency, Amplitude and Waveform generated.

### Walking Bass
If the bass is active and set to the higher Spice level it plays an ever changing walking bass line, which consists of notes of equal duration (typically 1/4 notes) that create a feeling of forward motion. Its implementation is designed to give a realistic feel and a certain degree of freedom to it; the four beats <img src="https://user-images.githubusercontent.com/57997005/91971162-0a3da980-ed19-11ea-9efc-2077535bb9c8.png" alt="beat_1" width="23"/>  <img src="https://user-images.githubusercontent.com/57997005/91971170-0ca00380-ed19-11ea-9836-c5f73ef1b3a4.png" alt="beat_2" width="23"/>  <img src="https://user-images.githubusercontent.com/57997005/91971174-0e69c700-ed19-11ea-93cb-64aacc608455.png" alt="beat_3" width="23"/>  <img src="https://user-images.githubusercontent.com/57997005/91971178-10338a80-ed19-11ea-9988-25bf541da008.png" alt="beat_4" width="23"/> of each bass line are chosen by following specific rules:
* beat <img src="https://user-images.githubusercontent.com/57997005/91971162-0a3da980-ed19-11ea-9efc-2077535bb9c8.png" alt="beat_1" width="23"/> : It must be the root of the chord played on this beat. It's the first to be computed by the algorithm by randomly choosing the root on different octaves (but constrained to the walking bass range F2 - A3).



* beat  <img src="https://user-images.githubusercontent.com/57997005/91971170-0ca00380-ed19-11ea-9836-c5f73ef1b3a4.png" alt="beat_2" width="23"/> : It must be a note of the selected key. It's the last to be computed by the algorithm by choosing from a set of possible notes which depends on the other beats' choices and on a series of constraints about intervals' length and type.



* beat <img src="https://user-images.githubusercontent.com/57997005/91971174-0e69c700-ed19-11ea-93cb-64aacc608455.png" alt="beat_3" width="23"/> : It must be a note of the selected key. It's the third to be computed by the algorithm by choosing from a set of possible notes which depends on the other beats' choices and on a series of constraints about intervals' length and type.



* beat <img src="https://user-images.githubusercontent.com/57997005/91971178-10338a80-ed19-11ea-9988-25bf541da008.png" alt="beat_4" width="23"/> : It must be a _leading tone_ (chromatic, diatonic or dominant). It's the second to be computed by the algorithm by randomly choosing one of the leading tones.


The choice of <img src="https://user-images.githubusercontent.com/57997005/91971170-0ca00380-ed19-11ea-9836-c5f73ef1b3a4.png" alt="beat_2" width="23"/> and <img src="https://user-images.githubusercontent.com/57997005/91971174-0e69c700-ed19-11ea-93cb-64aacc608455.png" alt="beat_3" width="23"/> can follow two logics:
* **Close Walking** : They are chosen from the _possible beats sets_ by minimizing the distances between the beats. The result will be a walking bass line in which the notes played are as close as possible but still respect the basic constrains.

* **Random Walking** : They are chosen from the _possible beats sets_ randomly. The result will be a walking bass with a more random behaviour, possibly showing certain number of jumps, but still respecting the basic constrains.

After having computed these two different walking bass bars the algorithm will randomly choose one of them and construct a multicolored and ever changing bass line!
<p align="center">
<img src="https://user-images.githubusercontent.com/57997005/91876344-e167d680-ec7c-11ea-9260-d4bf05276bb9.png" alt="Walking" width="500"/>
</p>

### Voicings
If the keys Spice level is set to its maximum, whenever in the chord progression is detected a II - V - I fragement, then voicings are performed. 

Voicings are particular arrangements and movements of the pitches of a chord aimed at achieving a pleasurable effect. The chords used can include 7ths, 9ths and also 13ths and they can have two configurations:
* Basic:
<img src="https://user-images.githubusercontent.com/57997005/92108562-e8f7be80-ede7-11ea-824f-5250d232e16a.jpg" alt="beat_4" width="300"/> 

* First Inversion:
<img src="https://user-images.githubusercontent.com/57997005/92108563-ea28eb80-ede7-11ea-85c5-ac1946a0e525.jpg" alt="beat_4" width="300"/>

The algorithm chooses everytime the one that falls within the range D4 - F5.





