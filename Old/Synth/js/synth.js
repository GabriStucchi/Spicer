var osc = [new Oscillator(440, "sine"), new Oscillator(440, "sine")];
var mixer = new Mixer;
var filter = new Filter;
var lfos = [new Lfo(1400), new Lfo(5000)];
var envelope = new Envelope(0.2, 0.1, 0.7, 0.2);
var filterEnvelope = new FilterEnvelope(0.2, 0.1, 0.7, 0.2, 10010);
var reverb = new Tone.Reverb(2);
var delay = new Tone.PingPongDelay(0.25, 0.25);
var mainGain = new Tone.Gain();

var osc2detune = document.querySelector("#osc2detune");
var volumes = document.querySelectorAll(".volumes");
var cutoff = document.querySelector("#cutoff");
var resonance = document.querySelector("#resonance");
var mainVolume = document.querySelector("#output");
var lfoPitchParams = document.querySelectorAll(".lfoPitchParam");
var lfoCutoffParams = document.querySelectorAll(".lfoCutoffParam");
var envelopeParams = document.querySelectorAll(".envelope");
var filterEnvAMT = document.querySelector("#filterAMT");
var reverbMix = document.querySelector("#reverbMix");
var delayMix = document.querySelector("#delayMix");
var duration = document.querySelector("#duration");

//-----------CONNECTIONS-----------------
mixer.connect(osc[0], osc[1]);
envelope.connect(mixer.getGain1());
envelope.connect(mixer.getGain2());
envelope.connect(mixer.getNoiseGain());
filter.connect(envelope.get());
filter.connectEnvelope(filterEnvelope.get());
filter.get().connect(reverb);
reverb.connect(delay);
delay.connect(mainGain);
mainGain.toMaster();

osc.forEach(function(osc) {
    lfos[0].connect(osc.getDetune());
})
lfos[1].connect(filter.getDetune());
//-----------------------------------------

//-------------EFFECT INITIALIZATION-------
reverb.wet.value = 0;
delay.wet.value = 0;
//-----------------------------------------

function resume() {
    Tone.context.resume();
}

function play() {
    envelope.trigger(duration.value);
    filterEnvelope.trigger(duration.value);
    reverb.generate();
}

//------------OSCILLATORS-------------------
function changeWaveform(index, type) {
    osc[index].setWaveform(type);
}

osc2detune.oninput = function() {
    osc[1].setDetune(osc2detune.value);
}

function changeOctave(index, octave) {
    osc[index].setOctave(octave);
    osc[1].setDetune(osc2detune.value);
}
//-----------------------------------------

//------------MIXER---------------------
function changeNoise(value){
    mixer.changeNoiseType(value);
}

volumes.forEach(changeVolume);

function changeVolume(element, index){
    element.oninput = function(){
        mixer.changeVolumeValue(index, element.value);
    }
}
//--------------------------------------

//------------FILTER----------------------
cutoff.oninput = function() {
    filter.changeCutoff(cutoff.value);
    filterEnvelope.changeBaseFreq(cutoff.value);
}

function changeFilter(type) {
    filter.changeType(type);
}

resonance.oninput = function() {
    filter.changeResonance(resonance.value);
}
//------------------------------------------

//------------OUTPUT------------------------
mainVolume.oninput = function() {
    mainGain.gain.value = mainVolume.value;
}
//------------------------------------------

//------------MODULATION--------------------
lfoPitchParams.forEach(changePitchParam);

function changePitchParam(param, index) {
    param.oninput = function() {
        lfos[0].changeParamValue(index, param.value);
    }
}

lfoCutoffParams.forEach(changeCutoffParam);

function changeCutoffParam(param, index) {
    param.oninput = function() {
        lfos[1].changeParamValue(index, param.value);
    }
}

function changeLfoWaveform(index, type) {
    lfos[index].changeWaveform(type);
}

function toggleLfo(index) {
    lfos[index].toggle();
}
//---------------------------------------------

//------------ENVELOPE-----------------------
envelopeParams.forEach(changeEnvelope);

function changeEnvelope(param, index) {
    param.oninput = function() {
        envelope.changeParam(index, param.value);
        filterEnvelope.changeParam(index, param.value);
    }
}

filterEnvAMT.oninput = function() {
    filterEnvelope.changeOctaves(filterEnvAMT.value);
}

/*modulateCutoff.onclick = function() {
    if(modulateCutoff.checked)
        filter.connectEnvelope(filterEnvelope.get());
    else{
        filter.disconnectEnvelope(filterEnvelope.get());
        filter.changeCutoff(cutoff.value);
    }
}*/
//-------------------------------------------

//-----------EFFECTS--------------------------
reverbMix.oninput = function() {
    reverb.wet.value = reverbMix.value;
}

delayMix.oninput = function() {
    delay.wet.value = delayMix.value;
}
//--------------------------------------------
