
var tone = _tone_0000_JCLive_sf2_file;
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();
var player = new WebAudioFontPlayer();

var selIns = document.getElementById('ins');

player.loader.decodeAfterLoading(audioContext, '_tone_0000_JCLive_sf2_file');

for(var i = 0; i < player.loader.instrumentKeys().length; i++) {
    var opt = document.createElement('option');
    opt.innerHTML = ''+(i+1)+'. '+player.loader.instrumentInfo(i).title;
    selIns.appendChild(opt);
}

function selectIns(o){
    var n = selIns.selectedIndex;
    var info = player.loader.instrumentInfo(n)
    console.log('select',n,info);
    player.loader.startLoad(audioContext, info.url, info.variable);
    player.loader.waitLoad(function () {
        console.log('done',info.variable);
        tone=window[info.variable];
        player.cancelQueue(audioContext);
    });
}