
let keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
let tonalities = ["Maj", "Min"];
let selectedKey = 'C';
let selectedTonality = 'Maj';

let selKey = document.getElementById('key');
let selTonality = document.getElementById('tonality');

keys.forEach(function(key) {
    var opt = document.createElement('option');
    opt.innerHTML = key;
    selKey.appendChild(opt);
})

tonalities.forEach(function(tonality) {
    var opt = document.createElement('option');
    opt.innerHTML = tonality;
    selTonality.appendChild(opt);
})

function selectTonality(o){
    selectedTonality = tonalities[selTonality.selectedIndex];
}

function selectKey(o){
    selectedKey = keys[selKey.selectedIndex];
}