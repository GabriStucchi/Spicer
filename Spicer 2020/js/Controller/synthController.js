
let synth = new Synth;

//Getting all elements from index. NOT REALLY NECESSARY
/*let lfoPitchParams = document.querySelectorAll(".lfoPitchParam");
let lfoPitchWaves = document.querySelectorAll(".lfoPitchWave");
let lfoCutoffParams = document.querySelectorAll(".lfoCutoffParam");
let lfoCutoffWaves = document.querySelectorAll(".lfoCutoffWave");
let lfoToggles = document.querySelectorAll(".toggle");*/


//-------------------------LFO-----------------------------------------

//INDEX identifies the parameter to change
function changeLFOPitchParam(knob, index) {
  knob.oninput = () => synth.changeLFOParameter(0, index, knob.value);
}

function changeLFOCutoffParam(knob, index) {
  knob.oninput = () => synth.changeLFOParameter(1, index, knob.value);
}

//BUTTON.NAME identifies the LFO (0 for PITCH and 1 for CUTOFF)
function changeLFOWave(button) {
  button.onclick = () => synth.changeLFOWaveform(button.name, button.value);
}

//BUTTON.VALUE identifies the LFO (0 for PITCH and 1 for CUTOFF)
function toggleLFO(button) {
  button.onclick = () => synth.toggleLFO(button.value);
}


//----------------------OSCILLATORS--------------------------------

// BUTTON.NAME identifies the Oscillator (0 or 1)
function changeOscWave(button) {
  button.onclick = () => synth.changeOscWaveform(button.name, button.value);
}

function changeOscOct(button) {
  button.onclick = () => synth.changeOscOctave(button.name, button.value)
}

function changeSynthNote(frequency) {

}


//-------- PLAY ---------

function changeSynthNote(midiNote) {
  synth.changeNote(midiNote);
}

function synthNoteOn() {
  synth.play();
}

function synthNoteOff() {
  synth.stop();
}


//LFO links to functions
document.querySelectorAll(".lfoPitchParam").forEach(changeLFOPitchParam);
document.querySelectorAll(".lfoCutoffParam").forEach(changeLFOCutoffParam);
document.querySelectorAll(".lfoWaveform").forEach(changeLFOWave);
document.querySelectorAll(".toggle").forEach(toggleLFO);

//OSCILLATORS links to function
document.querySelectorAll("oscWaveform").forEach(changeOscWave);
document.querySelectorAll("oscOctave").forEach(changeOscOct);