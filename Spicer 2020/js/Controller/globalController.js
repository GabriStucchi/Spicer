//onclick function function of toggle button
let instrumentBtn = document.getElementById("instrumentToggle");
let onAirBtn = document.querySelector(".onAirBtn");
let playLoopBtn = document.getElementById("playLoop");

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

document.getElementById("tempoBox").oninput = (event) => {
  metronome.setTempo(event.target.value);
  player.setTempo(event.target.value);
  document.getElementById("showTempo").innerText = metronome.getTempo();
};

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