
var tone = _tone_0000_JCLive_sf2_file;
var bassTone = _tone_0000_JCLive_sf2_file;
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();
var webAudioFontPlayer = new WebAudioFontPlayer();
let availableInstruments = [0, 45, 46, 60, 169, 181, 182, 960];
let instrumentNames = ["acoustic grand piano", "electric piano 1", "electric piano 2", "electric piano 3", "organ", "rock organ 1", 
                        "rock organ 2", "synth pad"]
let selectedInstrument = 0;
let instrumentChanged = false;
let pianoCompressor;
let bassCompressor;
let pianoGain;          // Piano (WebAudio) Gain: 0 - 1
let bassGain;           // Bass (WebAudio) Gain: 0 - 1
let drumsGain;          // Drum gain (not WebAudio): 0 - 0.4
var selIns = document.getElementById('ins');

pianoCompressor = audioContext.createDynamicsCompressor();	
bassCompressor = audioContext.createDynamicsCompressor();	
pianoGain = audioContext.createGain();
bassGain = audioContext.createGain();

pianoCompressor.threshold.setValueAtTime(-45, audioContext.currentTime);
pianoCompressor.knee.setValueAtTime(40, audioContext.currentTime);
pianoCompressor.ratio.setValueAtTime(8, audioContext.currentTime);
pianoCompressor.attack.setValueAtTime(0.02, audioContext.currentTime);
pianoCompressor.release.setValueAtTime(0.25, audioContext.currentTime);

bassCompressor.threshold.setValueAtTime(-45, audioContext.currentTime);
bassCompressor.knee.setValueAtTime(40, audioContext.currentTime);
bassCompressor.ratio.setValueAtTime(8, audioContext.currentTime);
bassCompressor.attack.setValueAtTime(0.02, audioContext.currentTime);
bassCompressor.release.setValueAtTime(0.25, audioContext.currentTime);

pianoGain.gain.value = 0.7;
bassGain.gain.value = 0.7;
drumsGain = 0.3;

pianoCompressor.connect(pianoGain);
bassCompressor.connect(bassGain);
pianoGain.connect(audioContext.destination);
bassGain.connect(audioContext.destination);

webAudioFontPlayer.loader.decodeAfterLoading(audioContext, '_tone_0000_JCLive_sf2_file');

// Populating the instruments list
availableInstruments.forEach((instr, index) => {
    var opt = document.createElement('option');
    opt.innerHTML = instrumentNames[index];
    selIns.appendChild(opt);
})

// Load the selected sound
function selectIns(o){
    selectedInstrument = selIns.selectedIndex;
    instrumentChanged = true;
    if(!metronome.isPlaying()) {
        changeInstrument();
    } 
}

// Load the bass sound (predefined)
webAudioFontPlayer.loader.startLoad(audioContext, webAudioFontPlayer.loader.instrumentInfo(378).url, webAudioFontPlayer.loader.instrumentInfo(378).variable);
webAudioFontPlayer.loader.waitLoad(function () {
    bassTone = window[webAudioFontPlayer.loader.instrumentInfo(378).variable];
    webAudioFontPlayer.cancelQueue(audioContext);
});


function changeInstrument() {
    var info = webAudioFontPlayer.loader.instrumentInfo(availableInstruments[selectedInstrument]);
    webAudioFontPlayer.loader.startLoad(audioContext, info.url, info.variable);
    webAudioFontPlayer.loader.waitLoad(function () {
        tone=window[info.variable];
        webAudioFontPlayer.cancelQueue(audioContext);
    });
    instrumentChanged = false
    if(selectedInstrument == 0) {
        pianoGain.gain.value = 0.7;
    }
    else{
        pianoGain.gain.value = 0.55;
    }
}