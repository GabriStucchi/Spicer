//onclick function function of toggle button
let instrumentBtn = document.getElementById("instrumentToggle");
let onAirBtn = document.querySelector(".onAirBtn");
let playLoopBtn = document.getElementById("playLoop");
let tempoBox = document.getElementById("tempoBox");
let arrow = document.getElementsByClassName("arrow")[0];
let keySelect = document.getElementById("keyRoot");
let scaleType = document.getElementById("typeOfScale")


function toggleInstrument() {
  playSynth = !playSynth;
  if (playSynth) {
    muteSynth(false);
    stopAllNotes()
  } else {
    muteSynth(true);
    synthNoteOff();
  }
  activeNotes.splice(0, activeNotes.length);
}

function playback() {
  if(playLoopBtn.innerText == "START"){
    metronome.resume();
    setLoopBtnTxt("STOP")
  }
  else {
    metronome.pause();
    setLoopBtnTxt("START");
  }
}

function setOnAirTxt(txt) {
  txt == undefined
    ? (onAirBtn.innerText = "ON AIR")
    : (onAirBtn.innerText = txt);
}

function setLoopBtnTxt(txt) {
  playLoopBtn.innerText = txt;
}

function toggleOnAirLight() {
  onAirBtn.classList.toggle("onAir");
}


instrumentBtn.onclick = toggleInstrument;
playLoopBtn.onclick = playback;
arrow.onclick = showSpicer;     //Defined in View/spicerSection
//document.getElementById("tempoBox").oninput = (event) => {
tempoBox.oninput = () => {
  metronome.setTempo(event.target.value);
  player.setTempo(event.target.value);
  document.getElementById("showTempo").innerText = metronome.getTempo();
};
keySelect.onchange = (e) => key.setRootKey(e.target.value);
scaleType.onchange = (e) => key.setScaleType(e.target.value);



document.onkeydown = (e) => {
  switch(e.code) {

    case "Space":
      playSynth ? toggleInstrument() : 0;
      metronome.pause();     //stop the metronome (if it was playing)
      cleanRec();           //Defined in global.js
      activeNotes.splice(0, activeNotes.length);
      metronome.start();
      break;

    case "KeyP":
      playback();
      break;

    case "ShiftLeft":
      showSpicer();
      break;
    
    case "ShiftRight":
      showSpicer();
      break;
  }
};