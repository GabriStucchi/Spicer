
let synth = new Synth;


//--------LFO--------

//KNOB.NAME identifies the LFO (0:PITCH, 1:CUTOFF)
//INDEX identifies the parameter to change (0:RATE, 1:AMT)
function changeLFOParam(knob, index) {
  knob.oninput = () => synth.setLFOParameter(knob.name, index, knob.value);
}

//BUTTON.NAME identifies the LFO (0:PITCH, 1:CUTOFF)
function changeLFOWave(button) {
  button.onclick = () => synth.setLFOWaveform(button.name, button.value);
}

//BUTTON.NAME identifies the LFO (0:PITCH, 1:CUTOFF)
function toggleLFO(button) {
  button.onclick = () => synth.toggleLFO(button.name);
}


//-------- OSCILLATORS --------

// BUTTON.NAME identifies the Oscillator (0 or 1)
function changeOscWave(button) {
  button.onclick = () => synth.setOscWaveform(button.name, button.value);
}

function changeOscOct(button) {
  button.onclick = () => synth.setOscOctave(button.name, button.value)
}


//-------- MIXER --------

// INDEX identifies the component (0:OSC1, 1:OSC2, 2:NOISE)
function changeMixerVol(knob, index) {
  knob.oninput = () => synth.setMixerGain(index, knob.value);
}

// BUTTON.VALUE identifies the type of noise (white, pink, brown)
function changeNoise(button) {
  button.onclick = () => synth.setMixerNoise(button.value);
}


//-------- FILTER --------

// BUTTON.VALUE identifies the type of filter (lowpass, highpass, bandpass)
function changeFilterType(button) {
  button.onclick = () => synth.setFilterType(button.value);
}


//-------- ENVELOPE --------

//INDEX identifies the parameter to be changed (0: ATTACK, 1: DECAY, 2:SUSTAIN, 3:RELEASE)
function changeEnvelope(knob, index) {
  knob.oninput = () => synth.setEnvelope(index, knob.value);
}

//-------- MIDI ---------

function changeSynthNote(note) {
  synth.changeNote(note);
}

function synthNoteOn() {
  synth.play();
}

function synthNoteOff() {
  synth.stop();
}

function muteSynth(bool) {
  synth.mute(bool);
}


//------- RESUME --------
function resume() {
  Tone.start();
}


//LFO links to function
document.querySelectorAll(".lfoPitchParam").forEach(changeLFOParam);
document.querySelectorAll(".lfoCutoffParam").forEach(changeLFOParam);
document.querySelectorAll(".lfoWaveform").forEach(changeLFOWave);
document.querySelectorAll(".toggle").forEach(toggleLFO);

//OSCILLATORS links to function
document.querySelectorAll(".oscWaveform").forEach(changeOscWave);
document.querySelectorAll(".oscOctave").forEach(changeOscOct);

//MIXER links to function
document.querySelectorAll(".volumes").forEach(changeMixerVol);
document.getElementsByName("noiseType").forEach(changeNoise);

//FILTER links to function
let cutoff = document.getElementById("cutoff");
cutoff.oninput = () => synth.setCutoff(cutoff.value);
let resonance = document.getElementById("resonance");
resonance.oninput = () => synth.setResonance(resonance.value);
document.getElementsByName("filterType").forEach(changeFilterType);

//ENVELOPE links to function
document.querySelectorAll(".envelope").forEach(changeEnvelope);
let filterEnvAMT = document.getElementById("filterAMT");
filterEnvAMT.oninput = () => synth.setFilterEnvelopeAMT(filterEnvAMT.value);

//DELAY links to function
let delay = document.getElementById("delayMix");
delay.oninput = () => synth.setDelay(delay.value);

//REVERB links to function
let reverb = document.getElementById("reverbMix");
reverb.oninput = () => synth.setReverb(reverb.value);

//OUTPUT links to function
let output = document.getElementById("outputGain");
output.oninput = () => synth.setOutputGain(output.value);
