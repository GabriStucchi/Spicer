//onclick function function of toggle button
let instrumentBtn = document.getElementById("instrumentToggle");
let onAirBtn = document.querySelector(".onAirBtn");

instrumentBtn.onclick = toggleInstrument;

function toggleInstrument() {
  playSynth = !playSynth;
  console.log(playSynth);
  if (playSynth) {
    muteSynth(false);
    stopAllNotes()
    console.log(activeNotes)
  } else {
    muteSynth(true);
    synthNoteOff();
  }
  activeNotes.splice(0, activeNotes.length);
}

document.getElementById("tempoBox").oninput = (event) => {
  metronome.setTempo(event.target.value);
  document.getElementById("showTempo").innerText = metronome.getTempo();
};

document.onkeydown = (e) => {
  if (e.code == "Space") {
    if (playSynth) {
      toggleInstrument();
    }
    cleanRec();
    activeNotes.splice(0, activeNotes.length);
    metronome.play();
  }
};

function setOnAirTxt(txt) {
  txt == undefined
    ? (onAirBtn.innerText = "ON AIR")
    : (onAirBtn.innerText = txt);
}

function toggleOnAirLight() {
  onAirBtn.classList.toggle("onAir");
}
