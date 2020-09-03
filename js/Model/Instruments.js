
var tone = _tone_0000_JCLive_sf2_file;
var bassTone = _tone_0000_JCLive_sf2_file;
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();
var webAudioFontPlayer = new WebAudioFontPlayer();
let availableInstruments = [1, 45, 46, 47, 60, 170, 182, 183, 960, 965, 1020];
let selectedInstrument = 0;
let instrumentChanged = false;

let compressor = audioContext.createDynamicsCompressor();	
compressor.threshold.setValueAtTime(-45, audioContext.currentTime);
compressor.knee.setValueAtTime(40, audioContext.currentTime);
compressor.ratio.setValueAtTime(8, audioContext.currentTime);
compressor.attack.setValueAtTime(0.02, audioContext.currentTime);
compressor.release.setValueAtTime(0.25, audioContext.currentTime);
compressor.connect(audioContext.destination);

var selIns = document.getElementById('ins');

webAudioFontPlayer.loader.decodeAfterLoading(audioContext, '_tone_0000_JCLive_sf2_file');

// Populating the instruments list
availableInstruments.forEach((instr, index) => {
    var opt = document.createElement('option');
    opt.innerHTML = ''+(index+1)+'. '+ webAudioFontPlayer.loader.instrumentInfo(instr).title;
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
    console.log('done',webAudioFontPlayer.loader.instrumentInfo(378).variable);
    bassTone = window[webAudioFontPlayer.loader.instrumentInfo(378).variable];
    webAudioFontPlayer.cancelQueue(audioContext);
});


function changeInstrument() {
    var info = webAudioFontPlayer.loader.instrumentInfo(availableInstruments[selectedInstrument]);
    console.log('select',selectedInstrument,info);
    webAudioFontPlayer.loader.startLoad(audioContext, info.url, info.variable);
    webAudioFontPlayer.loader.waitLoad(function () {
        console.log('done',info.variable);
        tone=window[info.variable];
        webAudioFontPlayer.cancelQueue(audioContext);
    });
    instrumentChanged = false
}