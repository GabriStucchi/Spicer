
var tone = _tone_0000_JCLive_sf2_file;
var bassTone = _tone_0000_JCLive_sf2_file;
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();
var bassAudioContext = new AudioContextFunc();
var webAudioFontPlayer = new WebAudioFontPlayer();
let availableInstruments = [1, 45, 46, 47, 49, 60, 170, 182, 183, 960, 965, 1020];

var selIns = document.getElementById('ins');


webAudioFontPlayer.loader.decodeAfterLoading(audioContext, '_tone_0000_JCLive_sf2_file');
webAudioFontPlayer.loader.decodeAfterLoading(bassAudioContext, '_tone_0000_JCLive_sf2_file');

// Populating the instruments list
availableInstruments.forEach((instr, index) => {
    var opt = document.createElement('option');
    opt.innerHTML = ''+(index+1)+'. '+ webAudioFontPlayer.loader.instrumentInfo(instr).title;
    selIns.appendChild(opt);
})

// Load the selected sound
function selectIns(o){
    var n = selIns.selectedIndex;
    var info = webAudioFontPlayer.loader.instrumentInfo(availableInstruments[n]);
    console.log('select',n,info);
    webAudioFontPlayer.loader.startLoad(audioContext, info.url, info.variable);
    webAudioFontPlayer.loader.waitLoad(function () {
        console.log('done',info.variable);
        tone=window[info.variable];
        webAudioFontPlayer.cancelQueue(audioContext);
    });
}

// Load the bass sound (predefined)
webAudioFontPlayer.loader.startLoad(bassAudioContext, webAudioFontPlayer.loader.instrumentInfo(378).url, webAudioFontPlayer.loader.instrumentInfo(378).variable);
webAudioFontPlayer.loader.waitLoad(function () {
    console.log('done',webAudioFontPlayer.loader.instrumentInfo(378).variable);
    bassTone = window[webAudioFontPlayer.loader.instrumentInfo(378).variable];
    webAudioFontPlayer.cancelQueue(bassAudioContext);
});