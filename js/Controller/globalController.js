//onclick function function of toggle button
let instrumentBtn = document.getElementById("instrumentToggle");
let onAirBtn = document.querySelector(".onAirBtn");
let playLoopBtn = document.getElementById("playLoop");
let tempoBox = document.getElementById("tempoBox");
let arrow = document.getElementsByClassName("arrow")[0];
let keySelect = document.getElementById("keyRoot");
let scaleType = document.getElementById("typeOfScale");
let spicers = document.querySelectorAll(".spicerBtn");

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

function changeSpice(button) {
  let spicerEngine;

  button.onclick = () => {
    switch (button.name) {
      case "piano":
        spicerEngine = spicer;
        break;
      case "bass":
        spicerEngine = bass_spicer;
        break;
      case "drums":
        spicerEngine = player;        // Drums are in the player
        break;
    }
  
    button.value == 1
      ? spicerEngine.levelUp()
      : spicerEngine.levelDown();
  }
}


instrumentBtn.onclick = toggleInstrument;
playLoopBtn.onclick = playback;
arrow.onclick = showSpicer;     //Defined in View/spicerSection
//document.getElementById("tempoBox").oninput = (event) => {
tempoBox.oninput = () => {
  metronome.setTempo(event.target.value);
  document.getElementById("showTempo").innerText = metronome.getTempo();
};
keySelect.onchange = (e) => key.setRootKey(e.target.value);
scaleType.onchange = (e) => key.setScaleType(e.target.value);
spicers.forEach(changeSpice);



document.onkeydown = (e) => {
  switch(e.code) {

    case "KeyR":
      playSynth ? toggleInstrument() : 0;
      cleanRec();           //Defined in global.js
      activeNotes.splice(0, activeNotes.length);
      metronome.pause();      //stop the metronome (if it was playing)
      metronome.start();      // Start the metronome (and recording)
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