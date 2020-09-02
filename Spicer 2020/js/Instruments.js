
var tone = _tone_0000_JCLive_sf2_file;
var bassTone = _tone_0000_JCLive_sf2_file;
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();
var bassAudioContext = new AudioContextFunc();
var webAudioFontPlayer = new WebAudioFontPlayer();

var selIns = document.getElementById('ins');

webAudioFontPlayer.loader.decodeAfterLoading(audioContext, '_tone_0000_JCLive_sf2_file');
webAudioFontPlayer.loader.decodeAfterLoading(bassAudioContext, '_tone_0000_JCLive_sf2_file');

for(var i = 0; i < webAudioFontPlayer.loader.instrumentKeys().length; i++) {
    var opt = document.createElement('option');
    opt.innerHTML = ''+(i+1)+'. '+webAudioFontPlayer.loader.instrumentInfo(i).title;
    selIns.appendChild(opt);
}

function selectIns(o){
    var n = selIns.selectedIndex;
    var info = webAudioFontPlayer.loader.instrumentInfo(n)
    console.log('select',n,info);
    webAudioFontPlayer.loader.startLoad(audioContext, info.url, info.variable);
    webAudioFontPlayer.loader.waitLoad(function () {
        console.log('done',info.variable);
        tone=window[info.variable];
        webAudioFontPlayer.cancelQueue(audioContext);
    });
}

webAudioFontPlayer.loader.startLoad(bassAudioContext, webAudioFontPlayer.loader.instrumentInfo(378).url, webAudioFontPlayer.loader.instrumentInfo(378).variable);
webAudioFontPlayer.loader.waitLoad(function () {
    console.log('done',webAudioFontPlayer.loader.instrumentInfo(378).variable);
    bassTone = window[webAudioFontPlayer.loader.instrumentInfo(378).variable];
    webAudioFontPlayer.cancelQueue(bassAudioContext);
});